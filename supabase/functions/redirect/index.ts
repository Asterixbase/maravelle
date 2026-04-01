/**
 * Supabase Edge Function: /r/:linkId
 * Records affiliate click → 302 to merchant URL
 * Rate limited: 10 req/60s per IP via Upstash Redis
 */

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { Redis } from 'https://esm.sh/@upstash/redis@1'

const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
)

const redis = new Redis({
  url: Deno.env.get('UPSTASH_REDIS_REST_URL')!,
  token: Deno.env.get('UPSTASH_REDIS_REST_TOKEN')!,
})

/** Simple bot filter */
function isBot(ua: string): boolean {
  const bots = /bot|crawl|spider|slurp|mediapartners|AdsBot|Googlebot|bingbot/i
  return bots.test(ua)
}

/** Hash IP for privacy (no PII stored) */
async function hashIp(ip: string): Promise<string> {
  const data = new TextEncoder().encode(ip + Deno.env.get('IP_HASH_SALT', 'mrv'))
  const hash = await crypto.subtle.digest('SHA-256', data)
  return Array.from(new Uint8Array(hash)).map(b => b.toString(16).padStart(2, '0')).join('').slice(0, 16)
}

Deno.serve(async (req: Request) => {
  const url = new URL(req.url)
  const linkId = url.pathname.replace(/^\/r\//, '').replace(/^\//, '')

  if (!linkId) {
    return new Response('Not found', { status: 404 })
  }

  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? '0.0.0.0'
  const ua = req.headers.get('user-agent') ?? ''

  // Bot filter
  if (isBot(ua)) {
    return new Response('', { status: 302, headers: { location: '/' } })
  }

  // Rate limit: 10 requests per 60 seconds per IP
  const rateLimitKey = `rl:redirect:${ip}`
  const count = await redis.incr(rateLimitKey)
  if (count === 1) await redis.expire(rateLimitKey, 60)
  if (count > 10) {
    return new Response('Too many requests', { status: 429 })
  }

  // Look up product by link_id
  const { data: product, error } = await supabase
    .from('products')
    .select('id, affiliate_url, brand_id')
    .eq('link_id', linkId)
    .single()

  if (error || !product) {
    return new Response('Link not found', { status: 404 })
  }

  // Parse session from cookie or generate new one
  const cookieHeader = req.headers.get('cookie') ?? ''
  const sidMatch = cookieHeader.match(/mrv_sid=([^;]+)/)
  const sessionId = sidMatch?.[1] ?? crypto.randomUUID()

  // Parse user from JWT if present
  let userId: string | null = null
  const auth = req.headers.get('authorization')
  if (auth?.startsWith('Bearer ')) {
    const { data: { user } } = await supabase.auth.getUser(auth.slice(7))
    userId = user?.id ?? null
  }

  // Record click (fire-and-forget, non-blocking)
  const ipHash = await hashIp(ip)
  const country = req.headers.get('cf-ipcountry') ?? null

  supabase.from('affiliate_clicks').insert({
    link_id: linkId,
    product_id: product.id,
    user_id: userId,
    session_id: sessionId,
    ip_hash: ipHash,
    user_agent: ua.slice(0, 500),
    referer: req.headers.get('referer')?.slice(0, 500) ?? null,
    country,
  }).then(() => {}).catch(console.error)

  // 302 redirect to affiliate URL
  const headers = new Headers({
    location: product.affiliate_url,
    'cache-control': 'no-store, no-cache',
    'x-robots-tag': 'noindex',
  })

  // Set session cookie if new
  if (!sidMatch) {
    headers.set('set-cookie', `mrv_sid=${sessionId}; Path=/; SameSite=Lax; Max-Age=86400; Secure`)
  }

  return new Response(null, { status: 302, headers })
})

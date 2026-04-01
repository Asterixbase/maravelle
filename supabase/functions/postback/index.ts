/**
 * Supabase Edge Function: /postback
 * Receives S2S postback from Awin / Rakuten
 * Validates HMAC-SHA256 signature, records conversion
 */

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
)

/** Validate Awin S2S postback signature */
async function validateAwin(req: Request, body: string): Promise<boolean> {
  const secret = Deno.env.get('AWIN_POSTBACK_SECRET')
  if (!secret) return false
  const sig = req.headers.get('x-awin-signature') ?? ''
  const keyData = new TextEncoder().encode(secret)
  const messageData = new TextEncoder().encode(body)
  const cryptoKey = await crypto.subtle.importKey(
    'raw', keyData, { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']
  )
  const signatureBuffer = await crypto.subtle.sign('HMAC', cryptoKey, messageData)
  const expected = Array.from(new Uint8Array(signatureBuffer))
    .map(b => b.toString(16).padStart(2, '0')).join('')
  return sig === expected
}

/** Validate Rakuten postback via shared secret token */
function validateRakuten(req: Request): boolean {
  const token = req.headers.get('x-rakuten-token') ?? new URL(req.url).searchParams.get('token')
  return token === Deno.env.get('RAKUTEN_POSTBACK_TOKEN')
}

Deno.serve(async (req: Request) => {
  const url = new URL(req.url)
  const network = url.searchParams.get('network') as 'awin' | 'rakuten' | null

  if (!network) return new Response('Missing network', { status: 400 })

  const rawBody = await req.text()

  // Validate signature
  let valid = false
  if (network === 'awin') valid = await validateAwin(req, rawBody)
  else if (network === 'rakuten') valid = validateRakuten(req)

  if (!valid) {
    console.error(`Invalid postback signature from ${network}`)
    return new Response('Unauthorized', { status: 401 })
  }

  // Parse postback params (both networks use query params or JSON body)
  let params: Record<string, string>
  try {
    params = JSON.parse(rawBody)
  } catch {
    params = Object.fromEntries(new URLSearchParams(rawBody))
  }

  const orderId = params.order_id ?? params.orderId ?? params.transaction_id ?? ''
  const commissionGbp = parseFloat(params.commission ?? params.pub_commission ?? '0')
  const saleAmountGbp = parseFloat(params.sale_amount ?? params.order_value ?? '0')

  if (!orderId) return new Response('Missing order_id', { status: 400 })

  // Find original click via session/click ID if provided
  let clickId: string | null = null
  const sessionId = params.click_ref ?? params.session_id ?? null
  if (sessionId) {
    const { data } = await supabase
      .from('affiliate_clicks')
      .select('id')
      .eq('session_id', sessionId)
      .order('clicked_at', { ascending: false })
      .limit(1)
      .single()
    clickId = data?.id ?? null
  }

  // Insert conversion (idempotent via unique constraint on network + order_id)
  const { error } = await supabase.from('affiliate_conversions').insert({
    click_id: clickId,
    network,
    order_id: orderId,
    commission_gbp: commissionGbp,
    sale_amount_gbp: saleAmountGbp,
    status: 'pending',
  })

  if (error && !error.message.includes('unique')) {
    console.error('Conversion insert error:', error)
    return new Response('Internal error', { status: 500 })
  }

  // If we have a product linkId, increment conversion count
  const linkId = params.link_id ?? params.click_ref ?? null
  if (linkId) {
    await supabase.rpc('increment_conversion_count', { p_link_id: linkId }).catch(console.error)
  }

  return new Response('OK', { status: 200 })
})

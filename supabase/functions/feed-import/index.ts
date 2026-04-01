/**
 * Supabase Edge Function: /feed-import
 * Imports Awin product feed CSV for a given brand
 * Triggered by Vercel cron (daily at 03:00 UTC)
 */

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
)

function slugify(str: string): string {
  return str.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '')
}

function shortId(): string {
  return crypto.randomUUID().replace(/-/g, '').slice(0, 12)
}

Deno.serve(async (req: Request) => {
  // Verify cron secret
  const secret = req.headers.get('x-cron-secret')
  if (secret !== Deno.env.get('CRON_SECRET')) {
    return new Response('Unauthorized', { status: 401 })
  }

  const { brandSlug } = await req.json()
  if (!brandSlug) return new Response('Missing brandSlug', { status: 400 })

  const { data: brand } = await supabase
    .from('brands')
    .select('id, merchant_id, network')
    .eq('slug', brandSlug)
    .single()

  if (!brand) return new Response('Brand not found', { status: 404 })

  // Create run record
  const { data: run } = await supabase
    .from('brand_feed_runs')
    .insert({ brand_id: brand.id })
    .select()
    .single()

  let added = 0
  let updated = 0

  try {
    // Fetch Awin feed
    const awinApiKey = Deno.env.get('AWIN_API_KEY')
    const feedUrl = `https://productdata.awin.com/datafeed/download/apikey/${awinApiKey}/language/en/fid/${brand.merchant_id}/columns/aw_product_id,product_name,description,category_name,search_price,display_price,merchant_product_id,aw_image_url,merchant_image_url,aw_deep_link,in_stock,product_url/format/json/delimiter/%2C/compression/zip/`

    const res = await fetch(feedUrl)
    if (!res.ok) throw new Error(`Awin feed error: ${res.status}`)

    const feedItems: Record<string, string>[] = await res.json()

    // Process in batches of 100
    for (let i = 0; i < Math.min(feedItems.length, 2000); i += 100) {
      const batch = feedItems.slice(i, i + 100)
      const upserts = batch.map((item) => ({
        brand_id: brand.id,
        slug: slugify(item.product_name ?? '') + '-' + shortId(),
        name: item.product_name ?? 'Unknown',
        description: item.description?.slice(0, 2000) ?? null,
        category: 'women-fashion' as const, // mapped from category_name in real impl
        price_gbp: parseFloat(item.search_price ?? '0'),
        image_urls: [item.aw_image_url ?? item.merchant_image_url ?? ''].filter(Boolean),
        affiliate_url: item.aw_deep_link ?? item.product_url ?? '',
        link_id: shortId(),
        in_stock: item.in_stock === '1' || item.in_stock === 'true',
        is_new_arrival: true,
      }))

      const { error } = await supabase
        .from('products')
        .upsert(upserts, { onConflict: 'slug', ignoreDuplicates: false })

      if (!error) added += batch.length
    }

    // Mark run complete
    await supabase
      .from('brand_feed_runs')
      .update({ status: 'success', products_added: added, products_updated: updated, finished_at: new Date().toISOString() })
      .eq('id', run.id)

    return Response.json({ ok: true, added, updated })
  } catch (err) {
    await supabase
      .from('brand_feed_runs')
      .update({ status: 'failed', error_message: String(err), finished_at: new Date().toISOString() })
      .eq('id', run.id)
    return new Response(String(err), { status: 500 })
  }
})

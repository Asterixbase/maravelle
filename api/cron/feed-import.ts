/**
 * Vercel Cron Job — daily at 03:00 UTC
 * Calls the Supabase feed-import Edge Function for each active brand
 * Schedule configured in vercel.json
 */
export const config = { runtime: 'edge' }

const BRANDS = ['john-lewis', 'marks-and-spencer', 'harrods', 'fenwick']

export default async function handler(req: Request) {
  const authHeader = req.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response('Unauthorized', { status: 401 })
  }

  const supabaseUrl = process.env.SUPABASE_URL!
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

  const results = await Promise.allSettled(
    BRANDS.map((brandSlug) =>
      fetch(`${supabaseUrl}/functions/v1/feed-import`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${serviceKey}`,
          'x-cron-secret': process.env.CRON_SECRET!,
        },
        body: JSON.stringify({ brandSlug }),
      }).then((r) => r.json())
    )
  )

  return Response.json({
    ok: true,
    results: results.map((r, i) => ({
      brand: BRANDS[i],
      status: r.status,
      value: r.status === 'fulfilled' ? r.value : r.reason?.message,
    })),
  })
}

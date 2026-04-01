import { useSearchParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { ProductGrid } from '@/components/product/ProductGrid'
import { Input } from '@/components/ui/input'
import { trackSearch } from '@/lib/analytics'
import type { Product } from '@/types'

export function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const q = searchParams.get('q') ?? ''
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(false)
  const [query, setQuery] = useState(q)

  useEffect(() => {
    if (!q) return
    setLoading(true)
    trackSearch(q)
    supabase
      .from('products')
      .select('*, brands(*)')
      .textSearch('name', q, { type: 'websearch', config: 'english' })
      .eq('in_stock', true)
      .limit(48)
      .then(({ data }) => {
        setProducts((data ?? []) as Product[])
        setLoading(false)
      })
  }, [q])

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (query.trim()) setSearchParams({ q: query.trim() })
  }

  return (
    <main className="pt-[calc(2.5rem+4rem)] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="font-display text-4xl font-light text-[#f0ebe0] mb-8">Search</h1>

        <form onSubmit={handleSubmit} className="max-w-xl mb-10">
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search brands, products, styles…"
            className="text-base"
          />
        </form>

        {q && (
          <p className="text-sm text-[#6b7280] font-body mb-6">
            {loading ? 'Searching…' : `${products.length} results for "${q}"`}
          </p>
        )}

        {!loading && <ProductGrid products={products} />}
      </div>
    </main>
  )
}

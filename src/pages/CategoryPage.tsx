import { useParams, Link } from 'react-router-dom'
import { useState } from 'react'
import { SlidersHorizontal, X } from 'lucide-react'
import { useProducts } from '@/api/products'
import { ProductGrid } from '@/components/product/ProductGrid'
import { Button } from '@/components/ui/button'
import type { ProductCategory, SearchFilters } from '@/types'

const CATEGORY_LABELS: Record<string, string> = {
  'new-in': 'New In',
  women: 'Women',
  men: 'Men',
  beauty: 'Beauty',
  homeware: 'Homeware',
  sale: 'Sale',
}

const CATEGORY_MAP: Record<string, ProductCategory | undefined> = {
  women: 'women-fashion',
  men: 'men-fashion',
  beauty: 'beauty',
  homeware: 'homeware',
}

const SORT_OPTIONS = [
  { label: 'Newest', value: 'newest' },
  { label: 'Price: Low–High', value: 'price_asc' },
  { label: 'Price: High–Low', value: 'price_desc' },
  { label: 'Trending', value: 'trending' },
  { label: 'Most Popular', value: 'popular' },
]

export function CategoryPage() {
  const { category = '' } = useParams<{ category: string }>()
  const [sortBy, setSortBy] = useState<SearchFilters['sortBy']>('newest')
  const [filtersOpen, setFiltersOpen] = useState(false)

  const filters: SearchFilters = {
    category: CATEGORY_MAP[category],
    sortBy,
    isOnSale: category === 'sale',
    isNewArrival: category === 'new-in' ? true : undefined,
  } as SearchFilters

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useProducts(filters)

  const products = data?.pages.flatMap((p) => p.data) ?? []
  const total = data?.pages[0]?.total ?? 0

  return (
    <main className="pt-[calc(2.5rem+4rem)] min-h-screen">
      {/* Category header */}
      <div className="bg-[#0d1117] border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 py-10">
          <nav className="flex gap-2 text-xs font-body text-[#6b7280] mb-3">
            <Link to="/" className="hover:text-[#d4952a]">Home</Link>
            <span>/</span>
            <span className="text-[#9ca3af]">{CATEGORY_LABELS[category] ?? category}</span>
          </nav>
          <h1 className="font-display text-4xl font-light text-[#f0ebe0]">
            {CATEGORY_LABELS[category] ?? category}
          </h1>
          {total > 0 && (
            <p className="text-xs text-[#6b7280] font-body mt-2">{total} products</p>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Toolbar */}
        <div className="flex items-center justify-between mb-8">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setFiltersOpen(!filtersOpen)}
            className="text-[#9ca3af]"
          >
            <SlidersHorizontal className="h-4 w-4 mr-2" />
            Filters
          </Button>

          <div className="flex items-center gap-2">
            <span className="text-xs font-body text-[#6b7280] tracking-wider uppercase">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SearchFilters['sortBy'])}
              className="bg-[#0d1117] border border-white/10 text-[#f0ebe0] text-xs font-body rounded-sm px-3 py-2 focus:outline-none focus:border-[#d4952a]"
            >
              {SORT_OPTIONS.map(({ label, value }) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </select>
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-24">
            <div className="h-10 w-10 border-2 border-[#d4952a] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <ProductGrid
            products={products}
            hasMore={hasNextPage}
            loadingMore={isFetchingNextPage}
            onLoadMore={() => fetchNextPage()}
          />
        )}
      </div>
    </main>
  )
}

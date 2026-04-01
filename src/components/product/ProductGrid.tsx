import { useEffect, useRef } from 'react'
import { ProductCard } from './ProductCard'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import type { Product } from '@/types'

interface ProductGridProps {
  products: Product[]
  hasMore?: boolean
  loadingMore?: boolean
  onLoadMore?: () => void
  className?: string
}

export function ProductGrid({ products, hasMore, loadingMore, onLoadMore, className }: ProductGridProps) {
  const sentinelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!onLoadMore || !hasMore) return
    const observer = new IntersectionObserver(
      (entries) => { if (entries[0].isIntersecting && !loadingMore) onLoadMore() },
      { rootMargin: '200px' }
    )
    if (sentinelRef.current) observer.observe(sentinelRef.current)
    return () => observer.disconnect()
  }, [onLoadMore, hasMore, loadingMore])

  if (!products.length) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-[#6b7280]">
        <p className="font-display text-2xl mb-2">No products found</p>
        <p className="text-sm font-body">Try adjusting your filters</p>
      </div>
    )
  }

  return (
    <div className={cn('flex flex-col gap-8', className)}>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {hasMore && (
        <div ref={sentinelRef} className="flex justify-center py-4">
          {loadingMore ? (
            <div className="h-8 w-8 border-2 border-[#d4952a] border-t-transparent rounded-full animate-spin" />
          ) : (
            <Button variant="outline" onClick={onLoadMore}>
              Load More
            </Button>
          )}
        </div>
      )}
    </div>
  )
}

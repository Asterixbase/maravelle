import { useParams, Link } from 'react-router-dom'

import { useBrand } from '@/api/brands'
import { useProducts } from '@/api/products'
import { ProductGrid } from '@/components/product/ProductGrid'
import { cloudinaryUrl } from '@/lib/utils'

export function BrandPage() {
  const { slug } = useParams<{ slug: string }>()
  const { data: brand, isLoading: brandLoading } = useBrand(slug ?? '')
  const {
    data: productsData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useProducts({ brandId: brand?.id })

  const products = productsData?.pages.flatMap((p) => p.data) ?? []

  if (brandLoading) {
    return (
      <main className="pt-[calc(2.5rem+4rem)] min-h-screen flex items-center justify-center">
        <div className="h-10 w-10 border-2 border-[#d4952a] border-t-transparent rounded-full animate-spin" />
      </main>
    )
  }

  if (!brand) {
    return (
      <main className="pt-[calc(2.5rem+4rem)] min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="font-display text-3xl text-[#f0ebe0] mb-2">Brand not found</p>
          <Link to="/brands" className="text-[#d4952a] hover:underline font-body text-sm">
            View all brands
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="pt-[calc(2.5rem+4rem)]">
      {/* Hero */}
      <section className="relative h-64 md:h-96 overflow-hidden">
        {brand.heroImageUrl ? (
          <img
            src={cloudinaryUrl(brand.heroImageUrl, { width: 1440, height: 400 })}
            alt={brand.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[#0d1117] to-[#1a4d33]/30" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#06090c] via-[#06090c]/50 to-transparent" />
        <div className="absolute inset-0 flex flex-col items-center justify-end pb-12 px-4 text-center">
          {brand.logoUrl && (
            <img
              src={cloudinaryUrl(brand.logoUrl, { width: 160, height: 60 })}
              alt={brand.name}
              className="h-12 object-contain filter invert mb-4"
            />
          )}
          <h1 className="font-display text-4xl md:text-5xl font-light text-[#f0ebe0] mb-2">
            {brand.name}
          </h1>
          {brand.tagline && (
            <p className="text-sm text-[#9ca3af] font-body max-w-md">{brand.tagline}</p>
          )}
        </div>
      </section>

      {/* Products */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-display text-2xl text-[#f0ebe0]">{products.length} Products</h2>
        </div>
        <ProductGrid
          products={products}
          hasMore={hasNextPage}
          loadingMore={isFetchingNextPage}
          onLoadMore={() => fetchNextPage()}
        />
      </section>
    </main>
  )
}

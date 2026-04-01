import { useParams, Link } from 'react-router-dom'
import { Heart, ExternalLink, Share2, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useProduct } from '@/api/products'
import { useWishlistStore } from '@/store/wishlist'
import { useAuthStore } from '@/store/auth'
import { trackAffiliateClick } from '@/lib/analytics'
import { formatPrice, discountPercent, cloudinaryUrl, cn } from '@/lib/utils'
import { useState } from 'react'

export function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const { data: product, isLoading, error } = useProduct(slug ?? '')
  const { toggle, has } = useWishlistStore()
  const { session } = useAuthStore()
  const [activeImage, setActiveImage] = useState(0)

  if (isLoading) {
    return (
      <main className="pt-[calc(2.5rem+4rem)] min-h-screen flex items-center justify-center">
        <div className="h-10 w-10 border-2 border-[#d4952a] border-t-transparent rounded-full animate-spin" />
      </main>
    )
  }

  if (error || !product) {
    return (
      <main className="pt-[calc(2.5rem+4rem)] min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="font-display text-3xl text-[#f0ebe0] mb-2">Product not found</p>
          <Link to="/" className="text-[#d4952a] hover:underline font-body text-sm">
            Back to home
          </Link>
        </div>
      </main>
    )
  }

  const wishlisted = has(product.id)
  const discount = product.salePriceGbp ? discountPercent(product.priceGbp, product.salePriceGbp) : null

  function handleShopNow() {
    trackAffiliateClick(product!.linkId, product!.name, product!.brand?.name ?? '')
    window.open(`/r/${product!.linkId}`, '_blank', 'noopener,noreferrer')
  }

  function handleShare() {
    navigator.share?.({ title: product!.name, url: window.location.href }).catch(() => {})
  }

  // JSON-LD Product schema
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.imageUrls.map((id) => cloudinaryUrl(id, { width: 800 })),
    brand: { '@type': 'Brand', name: product.brand?.name },
    offers: {
      '@type': 'Offer',
      priceCurrency: 'GBP',
      price: product.salePriceGbp ?? product.priceGbp,
      availability: product.inStock
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      url: `/r/${product.linkId}`,
    },
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="pt-[calc(2.5rem+4rem)]">
        <div className="max-w-7xl mx-auto px-4 py-8">

          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs font-body text-[#6b7280] mb-8">
            <Link to="/" className="hover:text-[#d4952a]">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <Link to={`/${product.category.split('-')[0]}`} className="hover:text-[#d4952a] capitalize">
              {product.category.replace('-', ' ')}
            </Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-[#9ca3af] truncate max-w-[200px]">{product.name}</span>
          </nav>

          <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
            {/* Images */}
            <div className="flex gap-4">
              {product.imageUrls.length > 1 && (
                <div className="flex flex-col gap-2 w-20">
                  {product.imageUrls.slice(0, 5).map((imgId, i) => (
                    <button
                      key={imgId}
                      onClick={() => setActiveImage(i)}
                      className={cn(
                        'aspect-square rounded-sm overflow-hidden border-2 transition-colors',
                        activeImage === i ? 'border-[#d4952a]' : 'border-transparent'
                      )}
                    >
                      <img
                        src={cloudinaryUrl(imgId, { width: 100, height: 100 })}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
              <div className="flex-1 aspect-[3/4] rounded-sm overflow-hidden">
                <img
                  src={cloudinaryUrl(product.imageUrls[activeImage] ?? product.imageUrls[0], { width: 800, height: 1000 })}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Info */}
            <div className="flex flex-col">
              <Link
                to={`/brands/${product.brand?.slug}`}
                className="text-xs font-body tracking-widest uppercase text-[#d4952a] hover:text-[#e8b84b] mb-2"
              >
                {product.brand?.name}
              </Link>
              <h1 className="font-display text-3xl md:text-4xl font-light text-[#f0ebe0] mb-4 leading-tight">
                {product.name}
              </h1>

              {/* Badges */}
              <div className="flex flex-wrap gap-2 mb-4">
                {product.isNewArrival && <Badge variant="new">New</Badge>}
                {product.isEditorsPick && <Badge variant="gold">Editor's Pick</Badge>}
                {product.isTrending && <Badge variant="forest">Trending</Badge>}
                {discount && <Badge variant="sale">{discount}% Off</Badge>}
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3 mb-6">
                {product.salePriceGbp ? (
                  <>
                    <span className="font-display text-3xl text-[#d4952a]">
                      {formatPrice(product.salePriceGbp)}
                    </span>
                    <span className="font-body text-lg text-[#6b7280] line-through">
                      {formatPrice(product.priceGbp)}
                    </span>
                  </>
                ) : (
                  <span className="font-display text-3xl text-[#f0ebe0]">
                    {formatPrice(product.priceGbp)}
                  </span>
                )}
              </div>

              {/* Description */}
              {product.description && (
                <p className="text-sm text-[#9ca3af] font-body leading-relaxed mb-6 border-t border-white/5 pt-6">
                  {product.description}
                </p>
              )}

              {/* Sizes */}
              {product.sizes.length > 0 && (
                <div className="mb-6">
                  <p className="text-xs font-body tracking-wider uppercase text-[#6b7280] mb-2">Available Sizes</p>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size) => (
                      <span
                        key={size}
                        className="px-3 py-1 border border-white/10 rounded-sm text-xs font-body text-[#9ca3af]"
                      >
                        {size}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* CTA */}
              <div className="flex flex-col gap-3 mt-auto">
                <Button onClick={handleShopNow} size="lg" variant="gold" className="w-full">
                  <ExternalLink className="h-4 w-4" /> Shop at {product.brand?.name}
                </Button>
                <div className="flex gap-2">
                  <Button
                    onClick={() => toggle(product, session?.user.id)}
                    variant="outline"
                    size="lg"
                    className="flex-1"
                  >
                    <Heart className={cn('h-4 w-4', wishlisted && 'fill-current text-[#d4952a]')} />
                    {wishlisted ? 'Wishlisted' : 'Save'}
                  </Button>
                  <Button onClick={handleShare} variant="ghost" size="icon" aria-label="Share">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Affiliate disclaimer */}
              <p className="text-xs text-[#6b7280] font-body mt-4 pt-4 border-t border-white/5">
                You will be redirected to {product.brand?.name}'s website to complete your
                purchase. Maravelle earns a small commission at no extra cost to you.{' '}
                <Link to="/legal/affiliate-disclosure" className="text-[#d4952a] hover:underline">
                  Learn more
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

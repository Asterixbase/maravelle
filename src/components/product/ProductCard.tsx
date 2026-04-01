import { Link } from 'react-router-dom'
import { Heart } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { cn, formatPrice, discountPercent, cloudinaryUrl } from '@/lib/utils'
import { trackAffiliateClick, trackSelectItem } from '@/lib/analytics'
import { useWishlistStore } from '@/store/wishlist'
import { useAuthStore } from '@/store/auth'
import type { Product } from '@/types'

interface ProductCardProps {
  product: Product
  className?: string
}

export function ProductCard({ product, className }: ProductCardProps) {
  const { toggle, has } = useWishlistStore()
  const { session } = useAuthStore()
  const wishlisted = has(product.id)

  const imageUrl = product.imageUrls[0]
    ? cloudinaryUrl(product.imageUrls[0], { width: 600, height: 750 })
    : '/placeholder-product.jpg'

  function handleWishlist(e: React.MouseEvent) {
    e.preventDefault()
    e.stopPropagation()
    void toggle(product, session?.user.id)
  }

  function handleClick() {
    trackSelectItem({
      id: product.id,
      name: product.name,
      brand: product.brand?.name,
      priceGbp: product.priceGbp,
    })
  }

  function handleAffiliateClick(e: React.MouseEvent) {
    e.preventDefault()
    trackAffiliateClick(product.linkId, product.name, product.brand?.name ?? '')
    window.open(`/r/${product.linkId}`, '_blank', 'noopener,noreferrer')
  }

  const discount = product.salePriceGbp
    ? discountPercent(product.priceGbp, product.salePriceGbp)
    : null

  return (
    <article
      className={cn(
        'group relative flex flex-col bg-[#1a0e06] border border-white/5 rounded-md overflow-hidden',
        'transition-all duration-300 hover:border-[#f97316]/25 hover:shadow-[0_8px_32px_rgba(194,65,12,0.2)]',
        className
      )}
    >
      {/* Image */}
      <Link to={`/products/${product.slug}`} onClick={handleClick} className="block relative overflow-hidden aspect-[3/4]">
        <img
          src={imageUrl}
          alt={product.name}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1">
          {product.isNewArrival && <Badge variant="new">New</Badge>}
          {discount && <Badge variant="sale">-{discount}%</Badge>}
          {product.isEditorsPick && <Badge variant="gold">Editor's Pick</Badge>}
        </div>

        {/* Wishlist button */}
        <button
          onClick={handleWishlist}
          aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          className={cn(
            'absolute top-3 right-3 h-9 w-9 rounded-full bg-[#0e0803]/80 backdrop-blur-sm flex items-center justify-center',
            'transition-all duration-200 hover:bg-[#0e0803]',
            wishlisted ? 'text-[#d4952a]' : 'text-[#9ca3af] hover:text-[#d4952a]'
          )}
        >
          <Heart className={cn('h-4 w-4', wishlisted && 'fill-current')} />
        </button>

        {/* Quick shop overlay */}
        <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <button
            onClick={handleAffiliateClick}
            className="w-full py-3 bg-[#d4952a] text-[#06090c] text-xs font-medium tracking-widest uppercase font-body hover:bg-[#e8b84b] transition-colors"
          >
            Shop Now
          </button>
        </div>
      </Link>

      {/* Info */}
      <div className="p-4 flex flex-col gap-1 flex-1">
        <Link
          to={`/brands/${product.brand?.slug ?? ''}`}
          className="text-xs text-[#9ca3af] hover:text-[#d4952a] tracking-widest uppercase font-body transition-colors"
        >
          {product.brand?.name}
        </Link>
        <Link to={`/products/${product.slug}`} onClick={handleClick}>
          <h3 className="font-display text-sm text-[#f0ebe0] leading-snug line-clamp-2 hover:text-[#d4952a] transition-colors">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center gap-2 mt-auto pt-2">
          {product.salePriceGbp ? (
            <>
              <span className="text-sm font-medium text-[#d4952a]">
                {formatPrice(product.salePriceGbp)}
              </span>
              <span className="text-xs text-[#6b7280] line-through">
                {formatPrice(product.priceGbp)}
              </span>
            </>
          ) : (
            <span className="text-sm font-medium text-[#f0ebe0]">
              {formatPrice(product.priceGbp)}
            </span>
          )}
        </div>
      </div>
    </article>
  )
}

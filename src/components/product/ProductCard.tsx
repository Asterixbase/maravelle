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
    trackSelectItem({ id: product.id, name: product.name, brand: product.brand?.name, priceGbp: product.priceGbp })
  }

  function handleAffiliateClick(e: React.MouseEvent) {
    e.preventDefault()
    trackAffiliateClick(product.linkId, product.name, product.brand?.name ?? '')
    window.open(`/r/${product.linkId}`, '_blank', 'noopener,noreferrer')
  }

  const discount = product.salePriceGbp ? discountPercent(product.priceGbp, product.salePriceGbp) : null

  return (
    <article className={cn('group relative flex flex-col bg-white overflow-hidden', className)}
      style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}
      onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 8px 28px rgba(0,0,0,0.12)')}
      onMouseLeave={e => (e.currentTarget.style.boxShadow = '0 1px 4px rgba(0,0,0,0.06)')}
    >
      {/* Image */}
      <Link to={`/products/${product.slug}`} onClick={handleClick} className="block relative overflow-hidden aspect-[3/4] bg-[#f5f4f2]">
        <img
          src={imageUrl}
          alt={product.name}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1">
          {product.isNewArrival && <Badge variant="new">New</Badge>}
          {discount && <Badge variant="sale">−{discount}%</Badge>}
          {product.isEditorsPick && <Badge variant="gold">Editor's Pick</Badge>}
        </div>

        {/* Wishlist */}
        <button
          onClick={handleWishlist}
          aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          className={cn(
            'absolute top-3 right-3 h-9 w-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-sm',
            'transition-all duration-200 hover:bg-white hover:scale-110',
            wishlisted ? 'text-[#d4952a]' : 'text-[#9ca3af] hover:text-[#d4952a]'
          )}
        >
          <Heart className={cn('h-4 w-4', wishlisted && 'fill-current')} />
        </button>

        {/* Shop Now — slides up on hover, Moss-style black button */}
        <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <button
            onClick={handleAffiliateClick}
            className="w-full py-3 bg-[#111] text-white text-[10px] font-body font-medium tracking-[0.25em] uppercase hover:bg-[#d4952a] transition-colors duration-200"
          >
            Shop Now
          </button>
        </div>
      </Link>

      {/* Info */}
      <div className="px-4 py-4 flex flex-col gap-1 flex-1 border-t border-[#f0f0f0]">
        <Link
          to={`/brands/${product.brand?.slug ?? ''}`}
          className="text-[10px] text-[#9ca3af] hover:text-[#d4952a] tracking-[0.2em] uppercase font-body transition-colors"
        >
          {product.brand?.name}
        </Link>
        <Link to={`/products/${product.slug}`} onClick={handleClick}>
          <h3 className="font-display text-[0.95rem] text-[#111] leading-snug line-clamp-2 hover:text-[#d4952a] transition-colors mt-0.5">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center gap-2 mt-2">
          {product.salePriceGbp ? (
            <>
              <span className="text-sm font-body font-semibold text-[#d4952a]">
                {formatPrice(product.salePriceGbp)}
              </span>
              <span className="text-xs font-body text-[#bbb] line-through">
                {formatPrice(product.priceGbp)}
              </span>
            </>
          ) : (
            <span className="text-sm font-body font-semibold text-[#111]">
              {formatPrice(product.priceGbp)}
            </span>
          )}
        </div>
      </div>
    </article>
  )
}

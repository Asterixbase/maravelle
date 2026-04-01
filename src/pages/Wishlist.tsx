import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Heart } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { ProductCard } from '@/components/product/ProductCard'
import { Button } from '@/components/ui/button'
import { useWishlistStore } from '@/store/wishlist'
import { useAuthStore } from '@/store/auth'
import type { Product } from '@/types'

export function WishlistPage() {
  const { productIds, syncFromDb } = useWishlistStore()
  const { session } = useAuthStore()
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (session) syncFromDb(session.user.id)
  }, [session, syncFromDb])

  useEffect(() => {
    const ids = [...productIds]
    if (!ids.length) { setProducts([]); return }
    setLoading(true)
    supabase
      .from('products')
      .select('*, brands(*)')
      .in('id', ids)
      .then(({ data }) => {
        setProducts((data ?? []) as Product[])
        setLoading(false)
      })
  }, [productIds])

  return (
    <main className="pt-[calc(2.5rem+4rem)] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex items-center gap-3 mb-10">
          <Heart className="h-6 w-6 text-[#d4952a]" />
          <h1 className="font-display text-4xl font-light text-[#f0ebe0]">My Wishlist</h1>
          {products.length > 0 && (
            <span className="text-sm text-[#6b7280] font-body">({products.length} items)</span>
          )}
        </div>

        {loading ? (
          <div className="flex justify-center py-24">
            <div className="h-10 w-10 border-2 border-[#d4952a] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : products.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <Heart className="h-16 w-16 text-white/10 mb-6" />
            <p className="font-display text-2xl text-[#f0ebe0] mb-2">Your wishlist is empty</p>
            <p className="text-sm text-[#9ca3af] font-body mb-8">
              Save pieces you love and find them all here
            </p>
            <Button asChild variant="gold">
              <Link to="/">Start Shopping</Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </main>
  )
}

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { supabase } from '@/lib/supabase'
import { trackAddToWishlist } from '@/lib/analytics'
import type { Product } from '@/types'

interface WishlistStore {
  productIds: Set<string>
  toggle: (product: Product, userId?: string) => Promise<void>
  has: (productId: string) => boolean
  syncFromDb: (userId: string) => Promise<void>
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      productIds: new Set<string>(),

      has: (productId) => get().productIds.has(productId),

      toggle: async (product, userId) => {
        const ids = new Set(get().productIds)
        if (ids.has(product.id)) {
          ids.delete(product.id)
          if (userId) {
            await supabase
              .from('wishlist_items')
              .delete()
              .match({ user_id: userId, product_id: product.id })
          }
        } else {
          ids.add(product.id)
          trackAddToWishlist(product.id, product.name, product.priceGbp)
          if (userId) {
            await supabase
              .from('wishlist_items')
              .insert({ user_id: userId, product_id: product.id })
          }
        }
        set({ productIds: ids })
      },

      syncFromDb: async (userId) => {
        const { data } = await supabase
          .from('wishlist_items')
          .select('product_id')
          .eq('user_id', userId)
        if (data) {
          set({ productIds: new Set(data.map((r: { product_id: string }) => r.product_id)) })
        }
      },
    }),
    {
      name: 'mrv-wishlist',
      partialize: (state) => ({ productIds: [...state.productIds] }),
      onRehydrateStorage: () => (state) => {
        if (state && Array.isArray(state.productIds)) {
          state.productIds = new Set(state.productIds as unknown as string[])
        }
      },
    }
  )
)

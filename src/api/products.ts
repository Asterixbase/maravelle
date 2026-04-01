import { useQuery, useInfiniteQuery } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'
import type { Product, SearchFilters, PaginatedResponse } from '@/types'

const PAGE_SIZE = 24

async function fetchProducts(
  filters: SearchFilters = {},
  page = 1
): Promise<PaginatedResponse<Product>> {
  let query = supabase
    .from('products')
    .select('*, brands(*)', { count: 'exact' })
    .eq('in_stock', true)
    .range((page - 1) * PAGE_SIZE, page * PAGE_SIZE - 1)

  if (filters.category) query = query.eq('category', filters.category)
  if (filters.brandId) query = query.eq('brand_id', filters.brandId)
  if (filters.minPrice != null) query = query.gte('price_gbp', filters.minPrice)
  if (filters.maxPrice != null) query = query.lte('price_gbp', filters.maxPrice)
  if (filters.inStock) query = query.eq('in_stock', true)
  if (filters.isOnSale) query = query.not('sale_price_gbp', 'is', null)

  switch (filters.sortBy) {
    case 'price_asc': query = query.order('price_gbp', { ascending: true }); break
    case 'price_desc': query = query.order('price_gbp', { ascending: false }); break
    case 'trending': query = query.order('click_count', { ascending: false }); break
    case 'popular': query = query.order('conversion_count', { ascending: false }); break
    default: query = query.order('created_at', { ascending: false })
  }

  const { data, error, count } = await query
  if (error) throw error

  return {
    data: (data ?? []) as Product[],
    total: count ?? 0,
    page,
    pageSize: PAGE_SIZE,
    hasMore: (count ?? 0) > page * PAGE_SIZE,
  }
}

export function useProducts(filters: SearchFilters = {}) {
  return useInfiniteQuery({
    queryKey: ['products', filters],
    queryFn: ({ pageParam }) => fetchProducts(filters, pageParam as number),
    initialPageParam: 1,
    getNextPageParam: (last) => (last.hasMore ? last.page + 1 : undefined),
    staleTime: 1000 * 60 * 5,
  })
}

export function useProduct(slug: string) {
  return useQuery({
    queryKey: ['product', slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*, brands(*)')
        .eq('slug', slug)
        .single()
      if (error) throw error
      return data as Product
    },
    staleTime: 1000 * 60 * 10,
    enabled: !!slug,
  })
}

export function useFeaturedProducts(limit = 8) {
  return useQuery({
    queryKey: ['products', 'featured', limit],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*, brands(*)')
        .eq('is_editors_pick', true)
        .eq('in_stock', true)
        .order('created_at', { ascending: false })
        .limit(limit)
      if (error) throw error
      return (data ?? []) as Product[]
    },
    staleTime: 1000 * 60 * 10,
  })
}

export function useTrendingProducts(limit = 12) {
  return useQuery({
    queryKey: ['products', 'trending', limit],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*, brands(*)')
        .eq('is_trending', true)
        .eq('in_stock', true)
        .order('click_count', { ascending: false })
        .limit(limit)
      if (error) throw error
      return (data ?? []) as Product[]
    },
    staleTime: 1000 * 60 * 5,
  })
}

export function useNewArrivals(limit = 12) {
  return useQuery({
    queryKey: ['products', 'new-arrivals', limit],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*, brands(*)')
        .eq('is_new_arrival', true)
        .eq('in_stock', true)
        .order('created_at', { ascending: false })
        .limit(limit)
      if (error) throw error
      return (data ?? []) as Product[]
    },
    staleTime: 1000 * 60 * 5,
  })
}

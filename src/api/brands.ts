import { useQuery } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'
import type { Brand } from '@/types'

export function useBrands() {
  return useQuery({
    queryKey: ['brands'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('brands')
        .select('*')
        .eq('is_active', true)
        .order('featured_rank', { ascending: true, nullsFirst: false })
      if (error) throw error
      return (data ?? []) as Brand[]
    },
    staleTime: 1000 * 60 * 30,
  })
}

export function useBrand(slug: string) {
  return useQuery({
    queryKey: ['brand', slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('brands')
        .select('*')
        .eq('slug', slug)
        .single()
      if (error) throw error
      return data as Brand
    },
    staleTime: 1000 * 60 * 30,
    enabled: !!slug,
  })
}

export function useFeaturedBrands(limit = 6) {
  return useQuery({
    queryKey: ['brands', 'featured', limit],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('brands')
        .select('*')
        .eq('is_active', true)
        .not('featured_rank', 'is', null)
        .order('featured_rank', { ascending: true })
        .limit(limit)
      if (error) throw error
      return (data ?? []) as Brand[]
    },
    staleTime: 1000 * 60 * 30,
  })
}

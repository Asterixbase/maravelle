import { create } from 'zustand'
import { supabase } from '@/lib/supabase'
import type { UserProfile } from '@/types'
import type { Session } from '@supabase/supabase-js'

interface AuthStore {
  session: Session | null
  profile: UserProfile | null
  loading: boolean
  bootstrap: () => Promise<void>
  signIn: (email: string) => Promise<void>
  signOut: () => Promise<void>
  setSession: (session: Session | null) => void
  fetchProfile: (userId: string) => Promise<void>
}

export const useAuthStore = create<AuthStore>((set) => ({
  session: null,
  profile: null,
  loading: true,

  fetchProfile: async (userId: string) => {
    const { data } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('id', userId)
      .single()
    set({ profile: data as UserProfile | null })
  },

  bootstrap: async () => {
    const { data: { session } } = await supabase.auth.getSession()
    set({ session })
    if (session) {
      const { data } = await supabase.from('user_profiles').select('*').eq('id', session.user.id).single()
      set({ profile: data as UserProfile | null })
    }
    set({ loading: false })

    supabase.auth.onAuthStateChange(async (_event, session) => {
      set({ session })
      if (session) {
        const { data } = await supabase.from('user_profiles').select('*').eq('id', session.user.id).single()
        set({ profile: data as UserProfile | null })
      } else {
        set({ profile: null })
      }
    })
  },

  signIn: async (email: string) => {
    await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${window.location.origin}/auth/callback` },
    })
  },

  signOut: async () => {
    await supabase.auth.signOut()
    set({ session: null, profile: null })
  },

  setSession: (session) => set({ session }),
}))

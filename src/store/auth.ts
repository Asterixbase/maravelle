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
}

export const useAuthStore = create<AuthStore>((set, get) => ({
  session: null,
  profile: null,
  loading: true,

  bootstrap: async () => {
    const { data: { session } } = await supabase.auth.getSession()
    set({ session })
    if (session) await get().fetchProfile(session.user.id)
    set({ loading: false })

    supabase.auth.onAuthStateChange((_event, session) => {
      set({ session })
      if (session) get().fetchProfile(session.user.id)
      else set({ profile: null })
    })
  },

  fetchProfile: async (userId: string) => {
    const { data } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('id', userId)
      .single()
    set({ profile: data as UserProfile | null })
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

// Augment type for internal use
declare module '@/store/auth' {
  interface AuthStore {
    fetchProfile: (userId: string) => Promise<void>
  }
}

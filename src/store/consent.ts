import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { grantConsent, loadGA4 } from '@/lib/analytics'

interface ConsentStore {
  analytics: boolean
  marketing: boolean
  functionality: boolean
  hasResponded: boolean
  acceptAll: () => void
  rejectAll: () => void
  saveCustom: (opts: { analytics: boolean; marketing: boolean; functionality: boolean }) => void
}

export const useConsentStore = create<ConsentStore>()(
  persist(
    (set) => ({
      analytics: false,
      marketing: false,
      functionality: false,
      hasResponded: false,

      acceptAll: () => {
        grantConsent({ analytics: true, marketing: true })
        loadGA4(import.meta.env.VITE_GA4_MEASUREMENT_ID)
        set({ analytics: true, marketing: true, functionality: true, hasResponded: true })
      },

      rejectAll: () => {
        grantConsent({ analytics: false, marketing: false })
        set({ analytics: false, marketing: false, functionality: false, hasResponded: true })
      },

      saveCustom: ({ analytics, marketing, functionality }) => {
        grantConsent({ analytics, marketing })
        if (analytics) loadGA4(import.meta.env.VITE_GA4_MEASUREMENT_ID)
        set({ analytics, marketing, functionality, hasResponded: true })
      },
    }),
    { name: 'mrv-consent' }
  )
)

import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'sonner'

import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { ConsentBanner } from '@/components/layout/ConsentBanner'

import { HomePage } from '@/pages/Home'
import { CategoryPage } from '@/pages/CategoryPage'
import { ProductDetailPage } from '@/pages/ProductDetail'
import { BrandPage } from '@/pages/BrandPage'
import { BrandsDirectoryPage } from '@/pages/BrandsDirectory'
import { WishlistPage } from '@/pages/Wishlist'
import { SearchPage } from '@/pages/SearchPage'
import { SignInPage } from '@/pages/auth/SignIn'
import { AccountPage } from '@/pages/Account'
import { PrivacyPage } from '@/pages/legal/Privacy'
import { TermsPage } from '@/pages/legal/Terms'
import { CookiesPage } from '@/pages/legal/Cookies'
import { AffiliateDisclosurePage } from '@/pages/legal/AffiliateDisclosure'

import { trackPageView } from '@/lib/analytics'
import { useAuthStore } from '@/store/auth'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 30,
      retry: 2,
    },
  },
})

function PageTracker() {
  const location = useLocation()
  useEffect(() => {
    trackPageView(location.pathname, document.title)
  }, [location])
  return null
}

function AppBootstrap({ children }: { children: React.ReactNode }) {
  const { bootstrap } = useAuthStore()
  useEffect(() => { void bootstrap() }, [bootstrap])
  return <>{children}</>
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AppBootstrap>
          <PageTracker />
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/new-in" element={<CategoryPage />} />
            <Route path="/women" element={<CategoryPage />} />
            <Route path="/men" element={<CategoryPage />} />
            <Route path="/beauty" element={<CategoryPage />} />
            <Route path="/homeware" element={<CategoryPage />} />
            <Route path="/sale" element={<CategoryPage />} />
            <Route path="/products/:slug" element={<ProductDetailPage />} />
            <Route path="/brands" element={<BrandsDirectoryPage />} />
            <Route path="/brands/:slug" element={<BrandPage />} />
            <Route path="/wishlist" element={<WishlistPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/auth/sign-in" element={<SignInPage />} />
            <Route path="/account" element={<AccountPage />} />
            <Route path="/legal/privacy" element={<PrivacyPage />} />
            <Route path="/legal/terms" element={<TermsPage />} />
            <Route path="/legal/cookies" element={<CookiesPage />} />
            <Route path="/legal/affiliate-disclosure" element={<AffiliateDisclosurePage />} />
          </Routes>
          <Footer />
          <ConsentBanner />
          <Toaster position="bottom-right" theme="dark" richColors />
        </AppBootstrap>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

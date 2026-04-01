import { Navigate, Link } from 'react-router-dom'
import { Heart, LogOut, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAuthStore } from '@/store/auth'
import { useWishlistStore } from '@/store/wishlist'

export function AccountPage() {
  const { session, profile, signOut } = useAuthStore()
  const { productIds } = useWishlistStore()

  if (!session) return <Navigate to="/auth/sign-in" replace />

  return (
    <main className="pt-[calc(2.5rem+4rem)] min-h-screen">
      <div className="max-w-2xl mx-auto px-4 py-12">
        <h1 className="font-display text-4xl font-light text-[#f0ebe0] mb-10">My Account</h1>

        {/* Profile card */}
        <div className="glass-card p-6 mb-6 flex items-center gap-4">
          <div className="h-14 w-14 rounded-full bg-[#1a4d33]/60 flex items-center justify-center">
            <User className="h-7 w-7 text-[#d4952a]" />
          </div>
          <div>
            <p className="text-sm font-medium text-[#f0ebe0] font-body">
              {profile?.displayName ?? session.user.email}
            </p>
            <p className="text-xs text-[#6b7280] font-body">{session.user.email}</p>
          </div>
        </div>

        {/* Quick links */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <Link
            to="/wishlist"
            className="glass-card p-6 flex flex-col items-center gap-2 hover:border-[#d4952a]/30 transition-all"
          >
            <Heart className="h-6 w-6 text-[#d4952a]" />
            <span className="text-sm font-body text-[#f0ebe0]">Wishlist</span>
            <span className="text-xs text-[#6b7280] font-body">{productIds.size} saved items</span>
          </Link>
          <Link
            to="/legal/privacy"
            className="glass-card p-6 flex flex-col items-center gap-2 hover:border-[#d4952a]/30 transition-all"
          >
            <span className="text-2xl">🔒</span>
            <span className="text-sm font-body text-[#f0ebe0]">Privacy</span>
            <span className="text-xs text-[#6b7280] font-body">Manage your data</span>
          </Link>
        </div>

        <Button
          onClick={() => void signOut()}
          variant="ghost"
          className="text-[#9ca3af] hover:text-red-400"
        >
          <LogOut className="h-4 w-4 mr-2" />
          Sign Out
        </Button>
      </div>
    </main>
  )
}

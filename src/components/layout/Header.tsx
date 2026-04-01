import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Search, Heart, User, Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useAuthStore } from '@/store/auth'
import { useWishlistStore } from '@/store/wishlist'

const NAV_LINKS = [
  { label: 'New In', to: '/new-in' },
  { label: 'Women', to: '/women' },
  { label: 'Men', to: '/men' },
  { label: 'Beauty', to: '/beauty' },
  { label: 'Home', to: '/homeware' },
  { label: 'Brands', to: '/brands' },
  { label: 'Sale', to: '/sale', className: 'text-[#d4952a]' },
]

export function Header() {
  const [searchOpen, setSearchOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [query, setQuery] = useState('')
  const navigate = useNavigate()
  const { session } = useAuthStore()
  const { productIds } = useWishlistStore()

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`)
      setSearchOpen(false)
      setQuery('')
    }
  }

  return (
    <>
      <header className="fixed top-0 inset-x-0 z-50 bg-[#06090c]/95 backdrop-blur-md border-b border-white/5">
        {/* Announcement bar */}
        <div className="bg-[#1a4d33] text-[#f0ebe0] text-xs text-center py-1.5 font-body tracking-widest">
          Free returns on all UK orders · Curated from Britain's finest brands
        </div>

        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center gap-6">
          {/* Logo */}
          <Link
            to="/"
            className="font-display text-2xl font-light tracking-[0.15em] text-[#f0ebe0] hover:text-[#d4952a] transition-colors mr-auto md:mr-0"
          >
            MARAVELLE
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6 mx-auto">
            {NAV_LINKS.map(({ label, to, className }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  cn(
                    'text-xs font-medium tracking-widest uppercase font-body transition-colors',
                    isActive ? 'text-[#d4952a]' : 'text-[#9ca3af] hover:text-[#f0ebe0]',
                    className
                  )
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3 ml-auto md:ml-0">
            <button
              onClick={() => setSearchOpen(true)}
              aria-label="Search"
              className="text-[#9ca3af] hover:text-[#d4952a] transition-colors"
            >
              <Search className="h-5 w-5" />
            </button>

            <Link
              to="/wishlist"
              aria-label={`Wishlist (${productIds.size})`}
              className="relative text-[#9ca3af] hover:text-[#d4952a] transition-colors"
            >
              <Heart className="h-5 w-5" />
              {productIds.size > 0 && (
                <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-[#d4952a] text-[#06090c] text-[9px] font-bold flex items-center justify-center font-body">
                  {productIds.size}
                </span>
              )}
            </Link>

            <Link
              to={session ? '/account' : '/auth/sign-in'}
              aria-label="Account"
              className="text-[#9ca3af] hover:text-[#d4952a] transition-colors"
            >
              <User className="h-5 w-5" />
            </Link>

            <button
              className="md:hidden text-[#9ca3af] hover:text-[#d4952a] transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Menu"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Search overlay */}
      {searchOpen && (
        <div
          className="fixed inset-0 z-[60] bg-[#06090c]/95 backdrop-blur-sm flex items-start justify-center pt-24 px-4"
          onClick={() => setSearchOpen(false)}
        >
          <form
            className="w-full max-w-2xl"
            onClick={(e) => e.stopPropagation()}
            onSubmit={handleSearch}
          >
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#6b7280]" />
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search brands, products, styles…"
                className="w-full h-14 pl-12 pr-4 bg-[#0d1117] border border-[#d4952a]/40 rounded-sm text-[#f0ebe0] font-body text-base placeholder:text-[#6b7280] focus:outline-none focus:border-[#d4952a]"
              />
            </div>
            <button
              onClick={() => setSearchOpen(false)}
              className="mt-4 text-xs text-[#6b7280] font-body tracking-widest uppercase hover:text-[#d4952a]"
            >
              Press Esc to close
            </button>
          </form>
        </div>
      )}

      {/* Mobile nav */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 top-[calc(2.5rem+4rem)] z-40 bg-[#06090c] border-t border-white/5 px-6 py-8 flex flex-col gap-4">
          {NAV_LINKS.map(({ label, to, className }) => (
            <Link
              key={to}
              to={to}
              onClick={() => setMobileOpen(false)}
              className={cn(
                'text-base font-medium tracking-wider uppercase font-body text-[#9ca3af] hover:text-[#d4952a] transition-colors py-2 border-b border-white/5',
                className
              )}
            >
              {label}
            </Link>
          ))}
        </div>
      )}
    </>
  )
}

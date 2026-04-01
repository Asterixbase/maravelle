import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Search, Heart, User, Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useAuthStore } from '@/store/auth'
import { useWishlistStore } from '@/store/wishlist'

interface NavItem { label: string; to: string; className?: string }

const NAV_LEFT: NavItem[]  = [
  { label: 'New In',  to: '/new-in' },
  { label: 'Women',   to: '/women' },
  { label: 'Men',     to: '/men' },
]

const NAV_RIGHT: NavItem[] = [
  { label: 'Beauty',  to: '/beauty' },
  { label: 'Brands',  to: '/brands' },
  { label: 'Sale',    to: '/sale', className: 'text-[#d4952a]' },
]

const ALL_NAV: NavItem[] = [...NAV_LEFT, ...NAV_RIGHT]

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

  const navLinkClass = (isActive: boolean, extra?: string) =>
    cn(
      'text-[10px] font-body font-medium tracking-[0.2em] uppercase transition-colors whitespace-nowrap',
      isActive ? 'text-[#d4952a]' : 'text-[#9ca3af] hover:text-[#f0ebe0]',
      extra
    )

  return (
    <>
      <header className="fixed top-0 inset-x-0 z-50 bg-[#06090c]/95 backdrop-blur-md border-b border-white/5">
        {/* Announcement bar */}
        <div className="bg-[#1a4d33] text-[#f0ebe0] text-[10px] text-center py-1.5 font-body tracking-widest">
          Free returns on all UK orders · Curated from Britain's finest brands
        </div>

        {/* Main nav bar — three equal columns: left nav | brand | right nav + actions */}
        <div className="w-full px-8 md:px-14 lg:px-20 h-16 grid grid-cols-[1fr_auto_1fr] items-center gap-2">

          {/* Left nav links */}
          <nav className="hidden md:flex items-center gap-5 justify-end pr-8">
            {NAV_LEFT.map(({ label, to }) => (
              <NavLink key={to} to={to} className={({ isActive }) => navLinkClass(isActive)}>
                {label}
              </NavLink>
            ))}
          </nav>

          {/* Brand name — always centred */}
          <Link
            to="/"
            className="font-display text-2xl font-light tracking-[0.2em] text-[#f0ebe0] hover:text-[#d4952a] transition-colors text-center"
          >
            MARAVELLE
          </Link>

          {/* Right nav links + actions */}
          <div className="hidden md:flex items-center gap-5 justify-start pl-8">
            {NAV_RIGHT.map(({ label, to, className }) => (
              <NavLink key={to} to={to} className={({ isActive }) => navLinkClass(isActive, className)}>
                {label}
              </NavLink>
            ))}

            <div className="flex items-center gap-4 ml-auto pl-4 border-l border-white/10">
              <button onClick={() => setSearchOpen(true)} aria-label="Search"
                className="text-[#9ca3af] hover:text-[#d4952a] transition-colors">
                <Search className="h-4 w-4" />
              </button>

              <Link to="/wishlist" aria-label={`Wishlist (${productIds.size})`}
                className="relative text-[#9ca3af] hover:text-[#d4952a] transition-colors">
                <Heart className="h-4 w-4" />
                {productIds.size > 0 && (
                  <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-[#d4952a] text-[#06090c] text-[9px] font-bold flex items-center justify-center font-body">
                    {productIds.size}
                  </span>
                )}
              </Link>

              <Link to={session ? '/account' : '/auth/sign-in'} aria-label="Account"
                className="text-[#9ca3af] hover:text-[#d4952a] transition-colors">
                <User className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Mobile: search + hamburger on right */}
          <div className="md:hidden flex items-center gap-3 justify-end">
            <button onClick={() => setSearchOpen(true)} aria-label="Search"
              className="text-[#9ca3af] hover:text-[#d4952a] transition-colors">
              <Search className="h-5 w-5" />
            </button>
            <button onClick={() => setMobileOpen(!mobileOpen)} aria-label="Menu"
              className="text-[#9ca3af] hover:text-[#d4952a] transition-colors">
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>

          {/* Mobile: empty left slot so brand stays centred */}
          <div className="md:hidden" />
        </div>
      </header>

      {/* Search overlay */}
      {searchOpen && (
        <div className="fixed inset-0 z-[60] bg-[#06090c]/95 backdrop-blur-sm flex items-start justify-center pt-24 px-4"
          onClick={() => setSearchOpen(false)}>
          <form className="w-full max-w-2xl" onClick={e => e.stopPropagation()} onSubmit={handleSearch}>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#6b7280]" />
              <input
                autoFocus
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Search brands, products, styles…"
                className="w-full h-14 pl-12 pr-4 bg-[#0d1117] border border-[#d4952a]/40 rounded-sm text-[#f0ebe0] font-body text-base placeholder:text-[#6b7280] focus:outline-none focus:border-[#d4952a]"
              />
            </div>
            <button onClick={() => setSearchOpen(false)}
              className="mt-4 text-xs text-[#6b7280] font-body tracking-widest uppercase hover:text-[#d4952a]">
              Press Esc to close
            </button>
          </form>
        </div>
      )}

      {/* Mobile nav drawer */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 top-[calc(1.625rem+4rem)] z-40 bg-[#06090c] border-t border-white/5 px-6 py-8 flex flex-col gap-1">
          {ALL_NAV.map(({ label, to, className }) => (
            <Link key={to} to={to} onClick={() => setMobileOpen(false)}
              className={cn(
                'text-sm font-body font-medium tracking-[0.2em] uppercase text-[#9ca3af] hover:text-[#d4952a] transition-colors py-3 border-b border-white/5',
                className
              )}>
              {label}
            </Link>
          ))}
          <div className="flex items-center gap-6 mt-6 pt-4 border-t border-white/10">
            <Link to="/wishlist" className="flex items-center gap-2 text-xs text-[#9ca3af] font-body tracking-widest uppercase hover:text-[#d4952a]">
              <Heart className="h-4 w-4" /> Wishlist {productIds.size > 0 && `(${productIds.size})`}
            </Link>
            <Link to={session ? '/account' : '/auth/sign-in'} className="flex items-center gap-2 text-xs text-[#9ca3af] font-body tracking-widest uppercase hover:text-[#d4952a]">
              <User className="h-4 w-4" /> Account
            </Link>
          </div>
        </div>
      )}
    </>
  )
}

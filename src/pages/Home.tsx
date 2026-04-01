import { Link } from 'react-router-dom'
import { ArrowRight, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ProductCard } from '@/components/product/ProductCard'
import { useFeaturedProducts, useTrendingProducts, useNewArrivals } from '@/api/products'
import { useFeaturedBrands } from '@/api/brands'

const HERO_CATEGORIES = [
  {
    label: 'Women',
    to: '/women',
    gradient: 'from-[#3d0c00] via-[#7c2d12] to-[#c2410c]',
    accent: '#f97316',
  },
  {
    label: 'Men',
    to: '/men',
    gradient: 'from-[#1a0d2e] via-[#3d1a5c] to-[#6d28d9]',
    accent: '#a78bfa',
  },
  {
    label: 'Beauty',
    to: '/beauty',
    gradient: 'from-[#3d0c1a] via-[#831843] to-[#c2410c]',
    accent: '#f59e0b',
  },
  {
    label: 'Home',
    to: '/homeware',
    gradient: 'from-[#1c1200] via-[#713f12] to-[#92400e]',
    accent: '#fbbf24',
  },
]

const BRAND_NAMES = [
  'John Lewis', 'Harrods', 'Burberry', 'Ralph Lauren',
  'Marks & Spencer', 'Ted Baker', 'Reiss', 'Fenwick',
  'Mulberry', 'AllSaints', 'Paul Smith', 'Hugo Boss',
]

/* Sunset palette constants for inline styles */
const BG_DEEP   = '#0e0803'   // dark warm ground
const BG_WARM   = '#160b03'   // slightly lighter warm
const BG_SECTION = '#120903'  // section alternate

export function HomePage() {
  const { data: featured } = useFeaturedProducts(8)
  const { data: trending } = useTrendingProducts(12)
  const { data: newArrivals } = useNewArrivals(8)
  const { data: brands } = useFeaturedBrands(6)

  const marqueeNames = brands?.length ? brands.map(b => b.name) : BRAND_NAMES

  return (
    <main className="pt-[calc(2.5rem+4rem)]" style={{ backgroundColor: BG_DEEP }}>

      {/* ── Hero — savanna sunset ─────────────────────────────── */}
      <section className="relative h-[88vh] min-h-[620px] flex items-center justify-center overflow-hidden">
        {/* Sky gradient — purple night → burnt sienna → amber horizon */}
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(to bottom, #1a0d2e 0%, #3d1230 18%, #7c2d12 38%, #c2410c 58%, #ea8c2a 74%, #f59e0b 83%, #92400e 92%, #0e0803 100%)'
        }} />
        {/* Sun glow at horizon */}
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(ellipse 65% 45% at 50% 78%, #fde68a 0%, #f97316 28%, #c2410c 52%, transparent 72%)'
        }} />
        {/* Acacia silhouette shimmer — faint horizontal streaks */}
        <div className="absolute inset-0 opacity-15" style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 38px, #7c2d1208 38px, #7c2d1208 39px)',
        }} />
        {/* Dark vignette overlay at very top and bottom */}
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(to bottom, #1a0d2e88 0%, transparent 30%, transparent 65%, #0e080388 100%)'
        }} />

        {/* Centred hero content */}
        <div className="relative z-10 w-full max-w-4xl mx-auto px-6 text-center flex flex-col items-center">
          <p className="text-xs font-body tracking-[0.4em] uppercase text-[#fde68a] mb-5 drop-shadow-sm">
            New Season · Spring 2025
          </p>
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-light leading-[1.05] mb-6"
            style={{ color: '#fef9f0', textShadow: '0 2px 24px rgba(0,0,0,0.5)' }}>
            The Art of<br />Effortless Luxury
          </h1>
          <p className="text-base md:text-lg text-[#fde68a]/80 font-body max-w-lg mb-10 leading-relaxed">
            Curated edits from Harrods, Burberry, Marks &amp; Spencer and Britain's
            most beloved heritage brands — delivered to your door.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button asChild size="lg" variant="gold">
              <Link to="/new-in">Shop New In <ArrowRight className="h-4 w-4" /></Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/brands">Explore Brands</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ── Category tiles ────────────────────────────────────── */}
      <section style={{ backgroundColor: BG_DEEP }} className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-10">
            <p className="text-xs font-body tracking-[0.35em] uppercase text-[#f97316] mb-2">Shop by</p>
            <h2 className="font-display text-3xl md:text-4xl font-light text-[#fef9f0]">Category</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {HERO_CATEGORIES.map(({ label, to, gradient, accent }) => (
              <Link
                key={to}
                to={to}
                className="group relative aspect-[3/4] overflow-hidden rounded-md"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${gradient} transition-transform duration-700 group-hover:scale-110`} />
                {/* Glow circle */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full opacity-20 group-hover:opacity-40 transition-opacity duration-500"
                  style={{ background: `radial-gradient(circle, ${accent}, transparent 70%)` }} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute bottom-5 left-0 right-0 flex flex-col items-center gap-1">
                  <span className="font-display text-2xl text-white drop-shadow">{label}</span>
                  <span className="flex items-center gap-1 text-xs font-body tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ color: accent }}>
                    Shop <ChevronRight className="h-3 w-3" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Brand marquee ─────────────────────────────────────── */}
      <section className="py-10 overflow-hidden" style={{
        backgroundColor: BG_WARM,
        borderTop: '1px solid rgba(249,115,22,0.12)',
        borderBottom: '1px solid rgba(249,115,22,0.12)',
      }}>
        <p className="text-xs font-body tracking-[0.35em] uppercase text-center mb-7"
          style={{ color: '#92400e' }}>
          As featured from
        </p>
        <div className="relative">
          {/* Fade edges matching warm bg */}
          <div className="absolute left-0 top-0 bottom-0 w-28 z-10 pointer-events-none"
            style={{ background: `linear-gradient(to right, ${BG_WARM}, transparent)` }} />
          <div className="absolute right-0 top-0 bottom-0 w-28 z-10 pointer-events-none"
            style={{ background: `linear-gradient(to left, ${BG_WARM}, transparent)` }} />

          <div
            className="flex items-center"
            style={{ animation: 'marquee 32s linear infinite' }}
            onMouseEnter={e => (e.currentTarget.style.animationPlayState = 'paused')}
            onMouseLeave={e => (e.currentTarget.style.animationPlayState = 'running')}
          >
            {[...marqueeNames, ...marqueeNames].map((name, i) => (
              <Link
                key={`${name}-${i}`}
                to={`/brands/${name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                className="flex-shrink-0 mx-10 md:mx-14 transition-all duration-300 hover:scale-110"
                style={{ opacity: 0.35 }}
                onMouseEnter={e => ((e.currentTarget as HTMLElement).style.opacity = '1')}
                onMouseLeave={e => ((e.currentTarget as HTMLElement).style.opacity = '0.35')}
              >
                <span className="font-display text-xl md:text-2xl text-[#fef9f0] tracking-widest whitespace-nowrap">
                  {name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Editor's Picks ────────────────────────────────────── */}
      <section style={{ backgroundColor: BG_DEEP }} className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-xs font-body tracking-[0.35em] uppercase text-[#f97316] mb-2">Handpicked</p>
              <h2 className="font-display text-3xl md:text-4xl font-light text-[#fef9f0]">Editor's Picks</h2>
            </div>
            <Link to="/edit/editors-picks" className="hidden md:flex items-center gap-1 text-xs font-body tracking-widest uppercase text-[#92400e] hover:text-[#f97316] transition-colors">
              View All <ArrowRight className="h-3 w-3" />
            </Link>
          </div>

          {featured && featured.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
              {featured.map((product) => <ProductCard key={product.id} product={product} />)}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="aspect-[3/4] rounded-md animate-pulse" style={{ backgroundColor: BG_WARM }} />
                ))}
              </div>
              <p className="text-center text-xs text-[#92400e] font-body mt-8 tracking-wider">
                Products coming soon — we're curating the best of British luxury
              </p>
            </>
          )}
        </div>
      </section>

      {/* ── New Arrivals — warm panel ─────────────────────────── */}
      {newArrivals && newArrivals.length > 0 && (
        <section className="py-20" style={{ backgroundColor: BG_SECTION }}>
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-end justify-between mb-10">
              <div>
                <p className="text-xs font-body tracking-[0.35em] uppercase text-[#f97316] mb-2">Just Landed</p>
                <h2 className="font-display text-3xl md:text-4xl font-light text-[#fef9f0]">New Arrivals</h2>
              </div>
              <Link to="/new-in" className="hidden md:flex items-center gap-1 text-xs font-body tracking-widest uppercase text-[#92400e] hover:text-[#f97316] transition-colors">
                See All <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
              {newArrivals.map((product) => <ProductCard key={product.id} product={product} />)}
            </div>
          </div>
        </section>
      )}

      {/* ── Trending ──────────────────────────────────────────── */}
      {trending && trending.length > 0 && (
        <section style={{ backgroundColor: BG_DEEP }} className="py-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-end justify-between mb-10">
              <div>
                <p className="text-xs font-body tracking-[0.35em] uppercase text-[#f97316] mb-2">Most Wanted</p>
                <h2 className="font-display text-3xl md:text-4xl font-light text-[#fef9f0]">Trending Now</h2>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
              {trending.slice(0, 8).map((product) => <ProductCard key={product.id} product={product} />)}
            </div>
          </div>
        </section>
      )}

      {/* ── Philosophy strip — sunset glow ────────────────────── */}
      <section className="relative py-28 overflow-hidden" style={{ backgroundColor: BG_WARM }}>
        {/* Sunset radial glow behind text */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: 'radial-gradient(ellipse 70% 80% at 50% 50%, #7c2d1222 0%, #c2410c11 40%, transparent 70%)'
        }} />
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 60px, #f9731604 60px, #f9731604 61px)',
        }} />
        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <p className="text-xs font-body tracking-[0.4em] uppercase text-[#f97316] mb-5">Our Philosophy</p>
          <h2 className="font-display text-4xl md:text-6xl font-light text-[#fef9f0] mb-7 leading-tight"
            style={{ textShadow: '0 2px 32px rgba(249,115,22,0.2)' }}>
            Quality over quantity.<br />Always.
          </h2>
          <p className="text-base text-[#fde68a]/70 font-body leading-relaxed mb-10 max-w-xl mx-auto">
            Maravelle doesn't list everything — we list what's worth owning. Every product is
            reviewed by our editors for quality, craftsmanship, and lasting value. No fast
            fashion. No compromise.
          </p>
          <Button asChild variant="outline" size="lg">
            <Link to="/about">About Maravelle</Link>
          </Button>
        </div>
      </section>
    </main>
  )
}

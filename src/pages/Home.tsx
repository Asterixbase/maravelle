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
    gradient: 'from-[#1a0a00] via-[#3d1f00] to-[#1a4d33]',
    accent: '#d4952a',
  },
  {
    label: 'Men',
    to: '/men',
    gradient: 'from-[#06090c] via-[#0d1117] to-[#1a2040]',
    accent: '#9ca3af',
  },
  {
    label: 'Beauty',
    to: '/beauty',
    gradient: 'from-[#1a0010] via-[#3d0025] to-[#1a4d33]',
    accent: '#e8b84b',
  },
  {
    label: 'Home',
    to: '/homeware',
    gradient: 'from-[#06090c] via-[#1a4d33] to-[#0d2818]',
    accent: '#d4952a',
  },
]

const BRAND_NAMES = [
  'John Lewis', 'Harrods', 'Burberry', 'Ralph Lauren',
  'Marks & Spencer', 'Ted Baker', 'Reiss', 'Fenwick',
  'Mulberry', 'AllSaints', 'Paul Smith', 'Hugo Boss',
]

export function HomePage() {
  const { data: featured } = useFeaturedProducts(8)
  const { data: trending } = useTrendingProducts(12)
  const { data: newArrivals } = useNewArrivals(8)
  const { data: brands } = useFeaturedBrands(6)

  return (
    <main className="pt-[calc(2.5rem+4rem)]">

      {/* ── Hero ──────────────────────────────────────────────── */}
      <section className="relative h-[85vh] min-h-[600px] flex items-end overflow-hidden">
        {/* Gradient hero background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#06090c] via-[#0d1a0d] to-[#1a1200]" />
        {/* Decorative gold shimmer */}
        <div className="absolute inset-0 opacity-20"
          style={{ background: 'radial-gradient(ellipse 80% 60% at 60% 40%, #d4952a22 0%, transparent 70%)' }} />
        {/* Subtle grid texture */}
        <div className="absolute inset-0 opacity-5"
          style={{ backgroundImage: 'linear-gradient(#d4952a 1px, transparent 1px), linear-gradient(90deg, #d4952a 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        <div className="absolute inset-0 bg-gradient-to-t from-[#06090c] via-transparent to-transparent" />

        <div className="relative max-w-7xl mx-auto px-4 pb-20 w-full">
          <p className="text-xs font-body tracking-[0.3em] uppercase text-[#d4952a] mb-4">
            New Season · Spring 2025
          </p>
          <h1 className="font-display text-5xl md:text-7xl font-light text-[#f0ebe0] leading-[1.05] mb-6 max-w-2xl">
            The Art of<br />Effortless Luxury
          </h1>
          <p className="text-base text-[#9ca3af] font-body max-w-md mb-8 leading-relaxed">
            Discover curated edits from John Lewis, Harrods, Marks & Spencer and Britain's
            most beloved heritage brands — delivered to your door.
          </p>
          <div className="flex flex-wrap gap-3">
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
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {HERO_CATEGORIES.map(({ label, to, gradient, accent }) => (
            <Link
              key={to}
              to={to}
              className="group relative aspect-square overflow-hidden rounded-sm"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${gradient} transition-transform duration-500 group-hover:scale-105`} />
              {/* Decorative circle */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full opacity-10 transition-opacity duration-300 group-hover:opacity-20"
                style={{ background: `radial-gradient(circle, ${accent}, transparent)` }} />
              <div className="absolute inset-0 bg-gradient-to-t from-[#06090c]/80 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                <span className="font-display text-xl text-[#f0ebe0]">{label}</span>
                <ChevronRight className="h-4 w-4 text-[#d4952a] group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Brand marquee ─────────────────────────────────────── */}
      <section className="border-y border-white/5 py-8 overflow-hidden">
        <p className="text-xs font-body tracking-[0.3em] uppercase text-[#6b7280] text-center mb-6">
          As featured from
        </p>
        {/* Fade edges */}
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
            style={{ background: 'linear-gradient(to right, #06090c, transparent)' }} />
          <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
            style={{ background: 'linear-gradient(to left, #06090c, transparent)' }} />

          {/* Scrolling track — duplicated for seamless loop */}
          <div className="flex items-center" style={{ animation: 'marquee 30s linear infinite' }}>
            {[...(brands?.length ? brands.map(b => b.name) : BRAND_NAMES), ...(brands?.length ? brands.map(b => b.name) : BRAND_NAMES)].map((name, i) => (
              <Link
                key={`${name}-${i}`}
                to={`/brands/${name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                className="flex-shrink-0 opacity-30 hover:opacity-100 transition-opacity duration-300 mx-10 md:mx-16"
              >
                <span className="font-display text-xl md:text-2xl text-[#f0ebe0] tracking-widest whitespace-nowrap">
                  {name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Editor's Picks ────────────────────────────────────── */}
      {featured && featured.length > 0 ? (
        <section className="max-w-7xl mx-auto px-4 py-16">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-xs font-body tracking-[0.3em] uppercase text-[#d4952a] mb-2">Handpicked</p>
              <h2 className="font-display text-3xl md:text-4xl font-light text-[#f0ebe0]">Editor's Picks</h2>
            </div>
            <Link to="/edit/editors-picks" className="hidden md:flex items-center gap-1 text-xs font-body tracking-widest uppercase text-[#9ca3af] hover:text-[#d4952a] transition-colors">
              View All <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {featured.map((product) => <ProductCard key={product.id} product={product} />)}
          </div>
        </section>
      ) : (
        /* Coming soon placeholder when no products yet */
        <section className="max-w-7xl mx-auto px-4 py-16">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-xs font-body tracking-[0.3em] uppercase text-[#d4952a] mb-2">Handpicked</p>
              <h2 className="font-display text-3xl md:text-4xl font-light text-[#f0ebe0]">Editor's Picks</h2>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="aspect-[3/4] bg-[#0d1117] border border-white/5 rounded-sm animate-pulse" />
            ))}
          </div>
          <p className="text-center text-xs text-[#6b7280] font-body mt-6 tracking-wider">
            Products coming soon — we're curating the best of British luxury
          </p>
        </section>
      )}

      {/* ── New Arrivals ──────────────────────────────────────── */}
      {newArrivals && newArrivals.length > 0 && (
        <section className="bg-[#0d1117] py-16">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-end justify-between mb-8">
              <div>
                <p className="text-xs font-body tracking-[0.3em] uppercase text-[#d4952a] mb-2">Just Landed</p>
                <h2 className="font-display text-3xl md:text-4xl font-light text-[#f0ebe0]">New Arrivals</h2>
              </div>
              <Link to="/new-in" className="hidden md:flex items-center gap-1 text-xs font-body tracking-widest uppercase text-[#9ca3af] hover:text-[#d4952a] transition-colors">
                See All <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {newArrivals.map((product) => <ProductCard key={product.id} product={product} />)}
            </div>
          </div>
        </section>
      )}

      {/* ── Trending ──────────────────────────────────────────── */}
      {trending && trending.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 py-16">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-xs font-body tracking-[0.3em] uppercase text-[#d4952a] mb-2">Most Wanted</p>
              <h2 className="font-display text-3xl md:text-4xl font-light text-[#f0ebe0]">Trending Now</h2>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {trending.slice(0, 8).map((product) => <ProductCard key={product.id} product={product} />)}
          </div>
        </section>
      )}

      {/* ── Brand story strip ─────────────────────────────────── */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[#1a4d33]/20" />
        <div className="absolute inset-0 opacity-10"
          style={{ background: 'radial-gradient(ellipse 60% 80% at 50% 50%, #d4952a33, transparent)' }} />
        <div className="relative max-w-3xl mx-auto px-4 text-center">
          <p className="text-xs font-body tracking-[0.3em] uppercase text-[#d4952a] mb-4">Our Philosophy</p>
          <h2 className="font-display text-4xl md:text-5xl font-light text-[#f0ebe0] mb-6 leading-tight">
            Quality over quantity.<br />Always.
          </h2>
          <p className="text-base text-[#9ca3af] font-body leading-relaxed mb-8">
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

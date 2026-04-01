import { Link } from 'react-router-dom'
import { ArrowRight, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ProductCard } from '@/components/product/ProductCard'
import { useFeaturedProducts, useTrendingProducts, useNewArrivals } from '@/api/products'
import { useFeaturedBrands } from '@/api/brands'
import { cloudinaryUrl } from '@/lib/utils'

const HERO_CATEGORIES = [
  { label: 'Women', to: '/women', image: 'maravelle/hero-women' },
  { label: 'Men', to: '/men', image: 'maravelle/hero-men' },
  { label: 'Beauty', to: '/beauty', image: 'maravelle/hero-beauty' },
  { label: 'Home', to: '/homeware', image: 'maravelle/hero-home' },
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
        <img
          src="/hero-main.jpg"
          alt="Maravelle — Curated British Luxury"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#06090c] via-[#06090c]/40 to-transparent" />
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
          {HERO_CATEGORIES.map(({ label, to, image }) => (
            <Link
              key={to}
              to={to}
              className="group relative aspect-square overflow-hidden rounded-sm"
            >
              <img
                src={cloudinaryUrl(image, { width: 400, height: 400 })}
                alt={label}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#06090c]/80 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                <span className="font-display text-xl text-[#f0ebe0]">{label}</span>
                <ChevronRight className="h-4 w-4 text-[#d4952a] group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Featured brands ───────────────────────────────────── */}
      {brands && brands.length > 0 && (
        <section className="border-y border-white/5 py-10">
          <div className="max-w-7xl mx-auto px-4">
            <p className="text-xs font-body tracking-[0.3em] uppercase text-[#6b7280] text-center mb-8">
              As featured from
            </p>
            <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
              {brands.map((brand) => (
                <Link
                  key={brand.id}
                  to={`/brands/${brand.slug}`}
                  className="opacity-50 hover:opacity-100 transition-opacity"
                >
                  {brand.logoUrl ? (
                    <img
                      src={cloudinaryUrl(brand.logoUrl, { width: 120, height: 40 })}
                      alt={brand.name}
                      className="h-8 w-auto object-contain filter invert"
                    />
                  ) : (
                    <span className="font-display text-lg text-[#f0ebe0]">{brand.name}</span>
                  )}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Editor's Picks ────────────────────────────────────── */}
      {featured && featured.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 py-16">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-xs font-body tracking-[0.3em] uppercase text-[#d4952a] mb-2">
                Handpicked
              </p>
              <h2 className="font-display text-3xl md:text-4xl font-light text-[#f0ebe0]">
                Editor's Picks
              </h2>
            </div>
            <Link
              to="/edit/editors-picks"
              className="hidden md:flex items-center gap-1 text-xs font-body tracking-widest uppercase text-[#9ca3af] hover:text-[#d4952a] transition-colors"
            >
              View All <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {featured.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}

      {/* ── New Arrivals ──────────────────────────────────────── */}
      {newArrivals && newArrivals.length > 0 && (
        <section className="bg-[#0d1117] py-16">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-end justify-between mb-8">
              <div>
                <p className="text-xs font-body tracking-[0.3em] uppercase text-[#d4952a] mb-2">
                  Just Landed
                </p>
                <h2 className="font-display text-3xl md:text-4xl font-light text-[#f0ebe0]">
                  New Arrivals
                </h2>
              </div>
              <Link
                to="/new-in"
                className="hidden md:flex items-center gap-1 text-xs font-body tracking-widest uppercase text-[#9ca3af] hover:text-[#d4952a] transition-colors"
              >
                See All <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {newArrivals.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Trending ──────────────────────────────────────────── */}
      {trending && trending.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 py-16">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-xs font-body tracking-[0.3em] uppercase text-[#d4952a] mb-2">
                Most Wanted
              </p>
              <h2 className="font-display text-3xl md:text-4xl font-light text-[#f0ebe0]">
                Trending Now
              </h2>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {trending.slice(0, 8).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}

      {/* ── Brand story strip ─────────────────────────────────── */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[#1a4d33]/20" />
        <div className="relative max-w-3xl mx-auto px-4 text-center">
          <p className="text-xs font-body tracking-[0.3em] uppercase text-[#d4952a] mb-4">
            Our Philosophy
          </p>
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

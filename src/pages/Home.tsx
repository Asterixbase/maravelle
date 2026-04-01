import { Link } from 'react-router-dom'
import { ArrowRight, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ProductCard } from '@/components/product/ProductCard'
import { useFeaturedProducts, useTrendingProducts, useNewArrivals } from '@/api/products'
import { useFeaturedBrands } from '@/api/brands'
import { useState, useEffect } from 'react'

const HERO_SLIDES = [
  'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1600&h=900&fit=crop&q=85', // women fashion
  'https://images.unsplash.com/photo-1617137968427-85924c800a22?w=1600&h=900&fit=crop&q=85', // men suit
  'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=1600&h=900&fit=crop&q=85', // luxury bags
  'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=1600&h=900&fit=crop&q=85', // luxury shoes
  'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600&h=900&fit=crop&q=85', // fashion store
]

const HERO_CATEGORIES = [
  {
    label: 'Women', to: '/women', accent: '#d4952a',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&h=600&fit=crop&q=80',
  },
  {
    label: 'Men', to: '/men', accent: '#9ca3af',
    image: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?w=600&h=600&fit=crop&q=80',
  },
  {
    label: 'Beauty', to: '/beauty', accent: '#e8b84b',
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&h=600&fit=crop&q=80',
  },
  {
    label: 'Home', to: '/homeware', accent: '#d4952a',
    image: 'https://images.unsplash.com/photo-1615529182904-14819c35db37?w=600&h=600&fit=crop&q=80',
  },
]

const BRAND_NAMES = [
  'John Lewis', 'Harrods', 'Burberry', 'Ralph Lauren',
  'Marks & Spencer', 'Ted Baker', 'Reiss', 'Fenwick',
  'Mulberry', 'AllSaints', 'Paul Smith', 'Hugo Boss',
]

export function HomePage() {
  const { data: featured  } = useFeaturedProducts(10)
  const { data: trending  } = useTrendingProducts(12)
  const { data: newArrivals } = useNewArrivals(8)
  const { data: brands    } = useFeaturedBrands(6)

  const marqueeNames = brands?.length ? brands.map(b => b.name) : BRAND_NAMES

  const [activeSlide, setActiveSlide] = useState(0)
  const [prevSlide, setPrevSlide] = useState<number | null>(null)
  const [transitioning, setTransitioning] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setTransitioning(true)
      setPrevSlide(activeSlide)
      setActiveSlide(i => (i + 1) % HERO_SLIDES.length)
      setTimeout(() => {
        setPrevSlide(null)
        setTransitioning(false)
      }, 1200)
    }, 5000)
    return () => clearInterval(interval)
  }, [activeSlide])

  return (
    <main className="pt-[calc(2.5rem+4rem)]">

      {/* ── Hero ──────────────────────────────────────────────── */}
      <section className="relative h-[85vh] min-h-[600px] flex items-end overflow-hidden">
        {/* Slideshow — outgoing image fades out, incoming fades in */}
        {prevSlide !== null && (
          <img
            key={`prev-${prevSlide}`}
            src={HERO_SLIDES[prevSlide]}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ opacity: transitioning ? 0 : 1, transition: 'opacity 1.2s ease' }}
          />
        )}
        <img
          key={`active-${activeSlide}`}
          src={HERO_SLIDES[activeSlide]}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ opacity: transitioning ? 1 : 1, transition: 'opacity 1.2s ease' }}
        />
        {/* Dark green tint overlay — keeps brand colour while showing the photo */}
        <div className="absolute inset-0" style={{ background: 'rgba(10,31,10,0.55)' }} />
        {/* Gold shimmer */}
        <div className="absolute inset-0 opacity-20"
          style={{ background: 'radial-gradient(ellipse 80% 60% at 60% 40%, #d4952a22 0%, transparent 70%)' }} />
        {/* Bottom fade to section below */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a1f0a] via-transparent to-transparent" />
        {/* Slide indicator dots */}
        <div className="absolute bottom-6 right-6 flex gap-2 z-10">
          {HERO_SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => { setPrevSlide(activeSlide); setActiveSlide(i) }}
              aria-label={`Slide ${i + 1}`}
              className="w-1.5 h-1.5 rounded-full transition-all duration-300"
              style={{ background: i === activeSlide ? '#d4952a' : 'rgba(240,235,224,0.35)', width: i === activeSlide ? '1.5rem' : '0.375rem' }}
            />
          ))}
        </div>

        <div className="relative max-w-7xl mx-auto px-8 pb-20 w-full">
          <p className="text-xs font-body tracking-[0.35em] uppercase text-[#d4952a] mb-4">
            New Season · Spring 2025
          </p>
          <h1 className="font-display text-5xl md:text-7xl font-light text-[#f0ebe0] leading-[1.05] mb-6 max-w-2xl">
            The Art of<br />Effortless Luxury
          </h1>
          <p className="text-base text-[#9ca3af] font-body max-w-md mb-8 leading-relaxed">
            Discover curated edits from John Lewis, Harrods, Marks &amp; Spencer and Britain's
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
      <section className="bg-[#06090c] py-12">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {HERO_CATEGORIES.map(({ label, to, accent, image }) => (
              <Link key={to} to={to} className="group relative aspect-square overflow-hidden rounded-sm">
                {/* Photo */}
                <img
                  src={image}
                  alt={label}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Dark gradient overlay so text stays readable */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                {/* Subtle accent glow */}
                <div className="absolute bottom-0 left-0 right-0 h-1/2 opacity-0 group-hover:opacity-30 transition-opacity duration-500"
                  style={{ background: `radial-gradient(ellipse at 50% 100%, ${accent}, transparent 70%)` }} />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                  <span className="font-display text-xl text-white drop-shadow">{label}</span>
                  <ChevronRight className="h-4 w-4 text-[#d4952a] group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Brand marquee ─────────────────────────────────────── */}
      <section className="bg-[#06090c] border-y border-white/5 py-10 overflow-hidden">
        <p className="text-[10px] font-body tracking-[0.4em] uppercase text-[#6b7280] text-center mb-7">
          As featured from
        </p>
        <div className="relative mx-8 md:mx-16">
          {/* Wider fade on both sides so names never clip at edge */}
          <div className="absolute left-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
            style={{ background: 'linear-gradient(to right, #06090c 40%, transparent)' }} />
          <div className="absolute right-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
            style={{ background: 'linear-gradient(to left, #06090c 40%, transparent)' }} />

          <div
            className="flex items-center"
            style={{ animation: 'marquee 36s linear infinite' }}
            onMouseEnter={e => (e.currentTarget.style.animationPlayState = 'paused')}
            onMouseLeave={e => (e.currentTarget.style.animationPlayState = 'running')}
          >
            {[...marqueeNames, ...marqueeNames].map((name, i) => (
              <span key={`${name}-${i}`} className="flex-shrink-0 flex items-center">
                <Link
                  to={`/brands/${name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                  className="opacity-40 hover:opacity-100 transition-opacity duration-300 px-8 md:px-12"
                >
                  <span className="font-display text-2xl md:text-3xl text-[#f0ebe0] tracking-[0.2em] uppercase whitespace-nowrap">
                    {name}
                  </span>
                </Link>
                {/* Pipe separator */}
                <span className="text-[#d4952a]/30 text-xl select-none" aria-hidden="true">|</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Editor's Picks ── white ────────────────────────────── */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex items-end justify-between mb-10 pb-4 border-b border-[#e8e8e8]">
            <div>
              <p className="text-[10px] font-body tracking-[0.35em] uppercase text-[#d4952a] mb-1">Handpicked</p>
              <h2 className="font-display text-3xl md:text-4xl font-light text-[#111]">Editor's Picks</h2>
            </div>
            <Link to="/edit/editors-picks" className="hidden md:flex items-center gap-1 text-[10px] font-body tracking-[0.2em] uppercase text-[#6b7280] hover:text-[#111] transition-colors">
              View All <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
          {featured && featured.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {featured.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="aspect-[3/4] bg-[#f5f5f5] rounded-sm animate-pulse" />
                ))}
              </div>
              <p className="text-center text-xs text-[#9ca3af] font-body mt-8 tracking-wider">
                Products coming soon — curating the best of British luxury
              </p>
            </>
          )}
        </div>
      </section>

      {/* ── New Arrivals ── off-white ─────────────────────────── */}
      {newArrivals && newArrivals.length > 0 && (
        <section className="bg-[#f8f7f5] py-16 border-t border-[#ebebeb]">
          <div className="max-w-7xl mx-auto px-8">
            <div className="flex items-end justify-between mb-10 pb-4 border-b border-[#e8e8e8]">
              <div>
                <p className="text-[10px] font-body tracking-[0.35em] uppercase text-[#d4952a] mb-1">Just Landed</p>
                <h2 className="font-display text-3xl md:text-4xl font-light text-[#111]">New Arrivals</h2>
              </div>
              <Link to="/new-in" className="hidden md:flex items-center gap-1 text-[10px] font-body tracking-[0.2em] uppercase text-[#6b7280] hover:text-[#111] transition-colors">
                See All <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {newArrivals.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        </section>
      )}

      {/* ── Trending ── white ──────────────────────────────────── */}
      {trending && trending.length > 0 && (
        <section className="bg-white py-16 border-t border-[#ebebeb]">
          <div className="max-w-7xl mx-auto px-8">
            <div className="flex items-end justify-between mb-10 pb-4 border-b border-[#e8e8e8]">
              <div>
                <p className="text-[10px] font-body tracking-[0.35em] uppercase text-[#d4952a] mb-1">Most Wanted</p>
                <h2 className="font-display text-3xl md:text-4xl font-light text-[#111]">Trending Now</h2>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {trending.slice(0, 8).map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        </section>
      )}

      {/* ── Philosophy strip ──────────────────────────────────── */}
      <section className="relative py-24 overflow-hidden bg-[#06090c]">
        <div className="absolute inset-0 bg-[#1a4d33]/20" />
        <div className="absolute inset-0 opacity-10"
          style={{ background: 'radial-gradient(ellipse 60% 80% at 50% 50%, #d4952a33, transparent)' }} />
        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <p className="text-[10px] font-body tracking-[0.35em] uppercase text-[#d4952a] mb-4">Our Philosophy</p>
          <h2 className="font-display text-4xl md:text-5xl font-light text-[#f0ebe0] mb-6 leading-tight">
            Quality over quantity.<br />Always.
          </h2>
          <p className="text-base text-[#9ca3af] font-body leading-relaxed mb-8 max-w-xl mx-auto">
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

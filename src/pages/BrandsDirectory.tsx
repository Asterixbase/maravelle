import { Link } from 'react-router-dom'
import { useBrands } from '@/api/brands'
import { cloudinaryUrl } from '@/lib/utils'

export function BrandsDirectoryPage() {
  const { data: brands, isLoading } = useBrands()

  return (
    <main className="pt-[calc(2.5rem+4rem)] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="mb-10">
          <p className="text-xs font-body tracking-[0.3em] uppercase text-[#d4952a] mb-2">Our Partners</p>
          <h1 className="font-display text-4xl font-light text-[#f0ebe0]">All Brands</h1>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-24">
            <div className="h-10 w-10 border-2 border-[#d4952a] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {brands?.map((brand) => (
              <Link
                key={brand.id}
                to={`/brands/${brand.slug}`}
                className="group glass-card p-8 flex flex-col items-center justify-center text-center hover:border-[#d4952a]/30 transition-all duration-200 min-h-[160px]"
              >
                {brand.logoUrl ? (
                  <img
                    src={cloudinaryUrl(brand.logoUrl, { width: 160, height: 60 })}
                    alt={brand.name}
                    className="h-10 object-contain filter invert opacity-60 group-hover:opacity-100 transition-opacity"
                  />
                ) : (
                  <span className="font-display text-2xl text-[#f0ebe0] opacity-70 group-hover:opacity-100 group-hover:text-[#d4952a] transition-all">
                    {brand.name}
                  </span>
                )}
                {brand.tagline && (
                  <p className="text-xs text-[#6b7280] font-body mt-3 line-clamp-2">{brand.tagline}</p>
                )}
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}

import { Link } from 'react-router-dom'

const LINKS = {
  Shop: [
    { label: 'New In', to: '/new-in' },
    { label: 'Women', to: '/women' },
    { label: 'Men', to: '/men' },
    { label: 'Beauty', to: '/beauty' },
    { label: 'Homeware', to: '/homeware' },
    { label: 'Sale', to: '/sale' },
  ],
  Brands: [
    { label: 'John Lewis', to: '/brands/john-lewis' },
    { label: 'Marks & Spencer', to: '/brands/marks-and-spencer' },
    { label: 'Harrods', to: '/brands/harrods' },
    { label: 'Fenwick', to: '/brands/fenwick' },
    { label: 'All Brands', to: '/brands' },
  ],
  Company: [
    { label: 'About Maravelle', to: '/about' },
    { label: 'How It Works', to: '/how-it-works' },
    { label: 'Editorial', to: '/editorial' },
    { label: 'Contact', to: '/contact' },
  ],
  Legal: [
    { label: 'Privacy Policy', to: '/legal/privacy' },
    { label: 'Cookie Policy', to: '/legal/cookies' },
    { label: 'Terms of Use', to: '/legal/terms' },
    { label: 'Affiliate Disclosure', to: '/legal/affiliate-disclosure' },
  ],
}

export function Footer() {
  return (
    <footer className="bg-[#06090c]">
      <div className="w-full px-8 md:px-14 lg:px-20 py-16">

        {/* Brand centrepiece */}
        <div className="text-center pb-12 mb-12 border-b border-white/5">
          <Link
            to="/"
            className="font-display text-5xl md:text-6xl font-light tracking-[0.25em] text-[#f0ebe0] hover:text-[#d4952a] transition-colors"
          >
            MARAVELLE
          </Link>
          <p className="mt-4 text-xs text-[#6b7280] font-body tracking-[0.2em] uppercase">
            Curated luxury fashion, beauty &amp; homeware from Britain's finest heritage brands
          </p>
        </div>

        {/* Link columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {Object.entries(LINKS).map(([heading, items]) => (
            <div key={heading}>
              <h4 className="text-xs font-medium tracking-widest uppercase text-[#d4952a] mb-4 font-body">
                {heading}
              </h4>
              <ul className="flex flex-col gap-2">
                {items.map(({ label, to }) => (
                  <li key={to}>
                    <Link
                      to={to}
                      className="text-sm text-[#9ca3af] hover:text-[#f0ebe0] transition-colors font-body"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#6b7280] font-body">
            &copy; {new Date().getFullYear()} Maravelle Ltd. All rights reserved.
          </p>
          <p className="text-xs text-[#6b7280] font-body text-center max-w-md">
            Maravelle is an affiliate storefront. We earn a commission when you purchase via our
            links at no extra cost to you.{' '}
            <Link to="/legal/affiliate-disclosure" className="text-[#d4952a] hover:underline">
              Learn more
            </Link>
          </p>
        </div>
      </div>
    </footer>
  )
}

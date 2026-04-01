import { Link } from 'react-router-dom'

export function AffiliateDisclosurePage() {
  return (
    <main className="pt-[calc(2.5rem+4rem)] min-h-screen">
      <div className="max-w-3xl mx-auto px-4 py-16">
        <h1 className="font-display text-4xl font-light text-[#f0ebe0] mb-2">Affiliate Disclosure</h1>
        <p className="text-xs text-[#6b7280] font-body mb-10">Last updated: April 2025</p>

        <div className="prose-luxury">
          <section className="mb-8">
            <h2 className="font-display text-2xl text-[#d4952a] mb-3">Our Relationship with Retailers</h2>
            <p className="text-sm text-[#9ca3af] font-body leading-relaxed">
              Maravelle is an affiliate marketing website. When you click a product link on our
              site and make a purchase on a retailer's website, we may earn a commission from
              that sale. This commission is paid by the retailer — <strong className="text-[#f0ebe0]">not by you</strong>.
              You pay exactly the same price you would if you visited the retailer directly.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-display text-2xl text-[#d4952a] mb-3">Affiliate Networks We Work With</h2>
            <ul className="text-sm text-[#9ca3af] font-body space-y-2">
              <li><strong className="text-[#f0ebe0]">Awin</strong> — John Lewis, Marks & Spencer, Fenwick</li>
              <li><strong className="text-[#f0ebe0]">Rakuten Advertising</strong> — Harrods</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="font-display text-2xl text-[#d4952a] mb-3">Editorial Independence</h2>
            <p className="text-sm text-[#9ca3af] font-body leading-relaxed">
              Our editorial team selects products independently, based on quality, value, and
              style. We do not accept payment from brands to feature their products, and our
              commission relationships do not influence which products we recommend.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-display text-2xl text-[#d4952a] mb-3">UK FCA & ASA Compliance</h2>
            <p className="text-sm text-[#9ca3af] font-body leading-relaxed">
              In accordance with UK Advertising Standards Authority (ASA) and FTC guidelines,
              we clearly label affiliate content. All product pages that link to affiliate
              partners include the disclosure: "Maravelle earns a small commission at no extra
              cost to you." This page constitutes our primary full disclosure statement.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-[#d4952a] mb-3">Questions?</h2>
            <p className="text-sm text-[#9ca3af] font-body leading-relaxed">
              If you have questions about our affiliate relationships, please{' '}
              <Link to="/contact" className="text-[#d4952a] hover:underline">contact us</Link>.
            </p>
          </section>
        </div>
      </div>
    </main>
  )
}

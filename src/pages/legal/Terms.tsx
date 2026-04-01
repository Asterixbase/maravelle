import { Link } from 'react-router-dom'

export function TermsPage() {
  return (
    <main className="pt-[calc(2.5rem+4rem)] min-h-screen">
      <div className="max-w-3xl mx-auto px-4 py-16">
        <h1 className="font-display text-4xl font-light text-[#f0ebe0] mb-2">Terms of Use</h1>
        <p className="text-xs text-[#6b7280] font-body mb-10">Last updated: April 2025</p>

        <div className="space-y-8 text-sm text-[#9ca3af] font-body leading-relaxed">
          <section>
            <h2 className="font-display text-2xl text-[#d4952a] mb-3">1. Acceptance</h2>
            <p>
              By using maravelle.co.uk you accept these Terms of Use. If you do not agree,
              please stop using the site. These terms are governed by the laws of England and
              Wales.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-[#d4952a] mb-3">2. Nature of the Service</h2>
            <p>
              Maravelle is an affiliate storefront. We do not sell products directly. All
              purchases are made on third-party retailer websites. We have no involvement in
              order fulfilment, delivery, returns, or customer service for those purchases.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-[#d4952a] mb-3">3. Prices & Availability</h2>
            <p>
              Prices and availability are sourced from retailer product feeds and may not
              always reflect the current price on the retailer's website. Always verify the
              price on the retailer's site before purchasing.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-[#d4952a] mb-3">4. Accounts</h2>
            <p>
              You are responsible for maintaining the security of your account. Maravelle is
              not liable for any loss resulting from unauthorised account access.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-[#d4952a] mb-3">5. Intellectual Property</h2>
            <p>
              All content on Maravelle (text, design, logos, editorial) is owned by Maravelle
              Ltd or its licensors. Product images remain the property of their respective
              brands. Do not reproduce content without permission.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-[#d4952a] mb-3">6. Limitation of Liability</h2>
            <p>
              To the extent permitted by law, Maravelle is not liable for any indirect,
              consequential, or incidental losses arising from use of the site or purchases
              made via affiliate links.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-[#d4952a] mb-3">7. Changes</h2>
            <p>
              We may update these Terms at any time. Continued use of the site after changes
              constitutes acceptance.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-[#d4952a] mb-3">8. Contact</h2>
            <p>
              Questions? Email legal@maravelle.co.uk or see our{' '}
              <Link to="/legal/privacy" className="text-[#d4952a] hover:underline">Privacy Policy</Link>.
            </p>
          </section>
        </div>
      </div>
    </main>
  )
}

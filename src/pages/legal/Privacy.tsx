export function PrivacyPage() {
  return (
    <main className="pt-[calc(2.5rem+4rem)] min-h-screen">
      <div className="max-w-3xl mx-auto px-4 py-16">
        <h1 className="font-display text-4xl font-light text-[#f0ebe0] mb-2">Privacy Policy</h1>
        <p className="text-xs text-[#6b7280] font-body mb-10">Last updated: April 2025</p>

        <div className="space-y-8 text-sm text-[#9ca3af] font-body leading-relaxed">
          <section>
            <h2 className="font-display text-2xl text-[#d4952a] mb-3">1. Who We Are</h2>
            <p>
              Maravelle Ltd, a company registered in England and Wales. We operate
              maravelle.co.uk, a curated luxury affiliate storefront. Our data controller
              contact is: privacy@maravelle.co.uk.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-[#d4952a] mb-3">2. Data We Collect</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong className="text-[#f0ebe0]">Account data:</strong> email address when you create an account.</li>
              <li><strong className="text-[#f0ebe0]">Wishlist data:</strong> products you save, stored against your account.</li>
              <li><strong className="text-[#f0ebe0]">Click data:</strong> which products you click, hashed IP address, country.</li>
              <li><strong className="text-[#f0ebe0]">Analytics:</strong> page views and behaviour (only with your consent, via GA4).</li>
              <li><strong className="text-[#f0ebe0]">Cookies:</strong> see our Cookie Policy for details.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-2xl text-[#d4952a] mb-3">3. Legal Basis (UK GDPR)</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>Contract performance — to provide your account and wishlist.</li>
              <li>Legitimate interests — fraud prevention, site security, click tracking for affiliate revenue.</li>
              <li>Consent — analytics and marketing cookies (withdrawn at any time).</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-2xl text-[#d4952a] mb-3">4. Your Rights</h2>
            <p>
              Under UK GDPR you have the right to access, correct, delete, restrict or port
              your data, and to object to processing. Email privacy@maravelle.co.uk. We will
              respond within 30 days.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-[#d4952a] mb-3">5. Data Retention</h2>
            <p>
              Account data is retained while your account is active and for 12 months after
              deletion. Click data is retained for 24 months for commission dispute resolution.
              Analytics data is retained per Google's standard retention periods.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-[#d4952a] mb-3">6. Third Parties</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>Supabase (EU-West-2, London) — database hosting</li>
              <li>Vercel — website hosting</li>
              <li>Google Analytics 4 — analytics (consent required)</li>
              <li>Awin / Rakuten — affiliate tracking (via redirect links)</li>
              <li>Cloudinary — image hosting</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-2xl text-[#d4952a] mb-3">7. Contact & Complaints</h2>
            <p>
              Email privacy@maravelle.co.uk. You have the right to lodge a complaint with the
              ICO (Information Commissioner's Office) at ico.org.uk.
            </p>
          </section>
        </div>
      </div>
    </main>
  )
}

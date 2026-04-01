import { Button } from '@/components/ui/button'
import { useConsentStore } from '@/store/consent'

export function CookiesPage() {
  const { acceptAll, rejectAll } = useConsentStore()

  return (
    <main className="pt-[calc(2.5rem+4rem)] min-h-screen">
      <div className="max-w-3xl mx-auto px-4 py-16">
        <h1 className="font-display text-4xl font-light text-[#f0ebe0] mb-2">Cookie Policy</h1>
        <p className="text-xs text-[#6b7280] font-body mb-10">Last updated: April 2025</p>

        <div className="space-y-8 text-sm text-[#9ca3af] font-body leading-relaxed">
          <section>
            <h2 className="font-display text-2xl text-[#d4952a] mb-3">What Are Cookies?</h2>
            <p>
              Cookies are small text files stored on your device when you visit a website.
              They help websites remember your preferences and provide functionality.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-[#d4952a] mb-3">Cookies We Use</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-xs border-collapse">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-2 pr-4 text-[#f0ebe0] font-medium">Name</th>
                    <th className="text-left py-2 pr-4 text-[#f0ebe0] font-medium">Purpose</th>
                    <th className="text-left py-2 pr-4 text-[#f0ebe0] font-medium">Category</th>
                    <th className="text-left py-2 text-[#f0ebe0] font-medium">Duration</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {[
                    { name: 'mrv-consent', purpose: 'Stores your cookie preferences', cat: 'Essential', dur: '1 year' },
                    { name: 'mrv-wishlist', purpose: 'Saves your wishlist items locally', cat: 'Functional', dur: 'Persistent' },
                    { name: 'mrv-auth', purpose: 'Maintains your login session', cat: 'Essential', dur: 'Session' },
                    { name: 'mrv_sid', purpose: 'Session identifier for affiliate tracking', cat: 'Essential', dur: 'Session' },
                    { name: '_ga, _ga_*', purpose: 'Google Analytics — site usage analytics', cat: 'Analytics', dur: '2 years' },
                    { name: 'awc', purpose: 'Awin affiliate tracking cookie', cat: 'Affiliate', dur: '30 days' },
                  ].map(({ name, purpose, cat, dur }) => (
                    <tr key={name}>
                      <td className="py-2 pr-4 font-mono text-[10px] text-[#d4952a]">{name}</td>
                      <td className="py-2 pr-4">{purpose}</td>
                      <td className="py-2 pr-4">{cat}</td>
                      <td className="py-2">{dur}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="font-display text-2xl text-[#d4952a] mb-3">Your Choices</h2>
            <p className="mb-4">
              You can update your cookie preferences at any time using the buttons below.
              Withdrawing consent will not affect the lawfulness of processing based on
              consent before its withdrawal.
            </p>
            <div className="flex gap-3">
              <Button onClick={acceptAll} variant="gold" size="sm">Accept All Cookies</Button>
              <Button onClick={rejectAll} variant="outline" size="sm">Reject Non-Essential</Button>
            </div>
          </section>

          <section>
            <h2 className="font-display text-2xl text-[#d4952a] mb-3">Third-Party Cookies</h2>
            <p>
              Affiliate network cookies (Awin, Rakuten) are set when you click a product link.
              These are used to track whether a purchase resulted from a Maravelle referral,
              which is how we earn our commission. You can opt out by not clicking affiliate
              links or by using a browser extension that blocks tracking cookies.
            </p>
          </section>
        </div>
      </div>
    </main>
  )
}

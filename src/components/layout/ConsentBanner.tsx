import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { useConsentStore } from '@/store/consent'

export function ConsentBanner() {
  const { hasResponded, acceptAll, rejectAll } = useConsentStore()
  const [showDetails, setShowDetails] = useState(false)

  if (hasResponded) return null

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:max-w-md z-[100] bg-[#0d1117] border border-[#d4952a]/20 rounded-sm shadow-[0_8px_40px_rgba(0,0,0,0.6)] p-6"
    >
      <h2 className="font-display text-lg mb-2 text-[#f0ebe0]">Your privacy matters</h2>
      <p className="text-xs text-[#9ca3af] font-body leading-relaxed mb-4">
        We use cookies to improve your experience and measure site performance. You can choose
        which cookies to accept.{' '}
        <Link to="/legal/cookies" className="text-[#d4952a] hover:underline">
          Cookie Policy
        </Link>
      </p>

      {!showDetails ? (
        <div className="flex flex-col gap-2">
          <Button onClick={acceptAll} variant="gold" size="sm" className="w-full">
            Accept All
          </Button>
          <div className="flex gap-2">
            <Button onClick={rejectAll} variant="ghost" size="sm" className="flex-1 text-[#9ca3af]">
              Reject All
            </Button>
            <Button onClick={() => setShowDetails(true)} variant="outline" size="sm" className="flex-1">
              Customise
            </Button>
          </div>
        </div>
      ) : (
        <CustomisePanel onClose={() => setShowDetails(false)} />
      )}
    </div>
  )
}

function CustomisePanel({ onClose }: { onClose: () => void }) {
  const { saveCustom } = useConsentStore()
  const [analytics, setAnalytics] = useState(false)
  const [marketing, setMarketing] = useState(false)

  return (
    <div className="flex flex-col gap-4">
      <label className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-medium text-[#f0ebe0] font-body">Essential</p>
          <p className="text-xs text-[#6b7280] font-body">Required for the site to function</p>
        </div>
        <input type="checkbox" checked disabled className="accent-[#d4952a]" readOnly />
      </label>
      <label className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-medium text-[#f0ebe0] font-body">Analytics</p>
          <p className="text-xs text-[#6b7280] font-body">Help us understand how visitors use the site</p>
        </div>
        <input
          type="checkbox"
          checked={analytics}
          onChange={(e) => setAnalytics(e.target.checked)}
          className="accent-[#d4952a]"
        />
      </label>
      <label className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-medium text-[#f0ebe0] font-body">Marketing</p>
          <p className="text-xs text-[#6b7280] font-body">Personalised ads and recommendations</p>
        </div>
        <input
          type="checkbox"
          checked={marketing}
          onChange={(e) => setMarketing(e.target.checked)}
          className="accent-[#d4952a]"
        />
      </label>
      <div className="flex gap-2">
        <Button onClick={onClose} variant="ghost" size="sm" className="flex-1">
          Back
        </Button>
        <Button
          onClick={() => saveCustom({ analytics, marketing, functionality: true })}
          variant="gold"
          size="sm"
          className="flex-1"
        >
          Save Preferences
        </Button>
      </div>
    </div>
  )
}

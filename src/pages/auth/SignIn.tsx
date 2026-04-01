import { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useAuthStore } from '@/store/auth'
import { toast } from 'sonner'

export function SignInPage() {
  const { session, signIn } = useAuthStore()
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  if (session) return <Navigate to="/account" replace />

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return
    setLoading(true)
    try {
      await signIn(email)
      setSent(true)
    } catch (err) {
      toast.error('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="pt-[calc(2.5rem+4rem)] min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-10">
          <Link to="/" className="font-display text-3xl tracking-[0.15em] text-[#f0ebe0]">
            MARAVELLE
          </Link>
          <p className="text-sm text-[#9ca3af] font-body mt-2">
            {sent ? 'Check your email' : 'Sign in or create an account'}
          </p>
        </div>

        {sent ? (
          <div className="glass-card p-8 text-center">
            <p className="text-sm text-[#f0ebe0] font-body mb-2">
              We've sent a magic link to <strong className="text-[#d4952a]">{email}</strong>
            </p>
            <p className="text-xs text-[#6b7280] font-body mb-6">
              Click the link in your email to sign in. You can close this tab.
            </p>
            <Button variant="ghost" onClick={() => setSent(false)} size="sm">
              Use a different email
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="glass-card p-8 flex flex-col gap-4">
            <Input
              label="Email address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              autoFocus
            />
            <Button type="submit" variant="gold" loading={loading} className="w-full">
              Continue with Email
            </Button>
            <p className="text-xs text-[#6b7280] font-body text-center">
              By continuing, you agree to our{' '}
              <Link to="/legal/terms" className="text-[#d4952a] hover:underline">Terms</Link>
              {' '}and{' '}
              <Link to="/legal/privacy" className="text-[#d4952a] hover:underline">Privacy Policy</Link>
            </p>
          </form>
        )}
      </div>
    </main>
  )
}

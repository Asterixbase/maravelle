import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '@/lib/supabase'

export function AuthCallbackPage() {
  const navigate = useNavigate()

  useEffect(() => {
    supabase.auth.exchangeCodeForSession(window.location.search).then(({ error }) => {
      if (error) navigate('/auth/sign-in')
      else navigate('/account')
    })
  }, [navigate])

  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="h-10 w-10 border-2 border-[#d4952a] border-t-transparent rounded-full animate-spin" />
    </main>
  )
}

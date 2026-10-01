'use client'

import { FormEvent, Suspense, useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { createClient } from '@/lib/supabase/client'
import { useAuth } from '@/lib/auth-context'
import { useI18n } from '@/lib/i18n-context'
import { accountCopy } from '@/data/account-copy'

type Mode = 'login' | 'signup' | 'reset'

function ConnectionContent() {
  const router = useRouter()
  const params = useSearchParams()
  const { locale } = useI18n()
  const c = accountCopy[locale]
  const { user, loading: authLoading } = useAuth()
  const supabase = useMemo(() => createClient(), [])
  const requestedMode = params.get('mode')
  const [mode, setMode] = useState<Mode>(requestedMode === 'reset' ? 'reset' : 'login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [message, setMessage] = useState(params.get('reason') === 'checkout' ? c.checkoutRequired : '')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const nextPath = params.get('next')?.startsWith('/') ? params.get('next')! : '/compte'

  useEffect(() => {
    if (!authLoading && user && mode !== 'reset') router.replace(nextPath)
  }, [authLoading, mode, nextPath, router, user])

  const submit = async (event: FormEvent) => {
    event.preventDefault()
    setSubmitting(true)
    setError('')
    setMessage('')

    if (mode === 'signup') {
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { first_name: firstName.trim(), last_name: lastName.trim() } },
      })
      if (signUpError) setError(signUpError.message)
      else if (data.session) router.replace(nextPath)
      else setMessage(c.confirmEmail)
    } else if (mode === 'reset') {
      if (user) {
        const { error: updateError } = await supabase.auth.updateUser({ password })
        if (updateError) setError(updateError.message)
        else { setMessage(locale === 'de' ? 'Passwort aktualisiert.' : locale === 'it' ? 'Password aggiornata.' : 'Mot de passe mis à jour.'); setMode('login') }
      } else {
        const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, { redirectTo: `${window.location.origin}/connexion?mode=reset` })
        if (resetError) setError(resetError.message)
        else setMessage(c.resetSent)
      }
    } else {
      const { error: signInError } = await supabase.auth.signInWithPassword({ email, password })
      if (signInError) setError(signInError.message)
      else router.replace(nextPath)
    }
    setSubmitting(false)
  }

  const switchMode = (next: Mode) => { setMode(next); setError(''); setMessage('') }
  const signup = mode === 'signup'

  return <>
    <Header />
    <main id="main-content" className="bk-home bk-auth-page">
      <section className="bk-auth-intro">
        <p className="bk-eyebrow">BRAVIKO / {c.account}</p>
        <h1>{signup ? c.signupTitle : c.loginTitle}</h1>
        <p>{signup ? c.signupIntro : c.loginIntro}</p>
        <Link href="/boutique" className="bk-text-link">{c.shop}<span aria-hidden="true">↗</span></Link>
      </section>
      <section className="bk-auth-panel" aria-labelledby="auth-form-title">
        <p className="bk-eyebrow">{mode === 'reset' ? c.forgot : signup ? c.create : c.login}</p>
        <h2 id="auth-form-title">{mode === 'reset' ? c.forgot : signup ? c.signupTitle : c.login}</h2>
        <form onSubmit={submit} className="bk-account-form">
          {signup && <div className="bk-form-row"><label>{c.firstName}<input value={firstName} onChange={event => setFirstName(event.target.value)} required autoComplete="given-name" /></label><label>{c.lastName}<input value={lastName} onChange={event => setLastName(event.target.value)} required autoComplete="family-name" /></label></div>}
          {(!user || mode !== 'reset') && <label>{c.email}<input type="email" value={email} onChange={event => setEmail(event.target.value)} required autoComplete="email" /></label>}
          {mode !== 'reset' || user ? <label>{c.password}<input type="password" value={password} onChange={event => setPassword(event.target.value)} required minLength={8} autoComplete={signup || mode === 'reset' ? 'new-password' : 'current-password'} /></label> : null}
          {message && <p className="bk-form-message" role="status">{message}</p>}
          {error && <p className="bk-form-error" role="alert">{error}</p>}
          <button className="bk-button" type="submit" disabled={submitting}>{submitting ? '…' : mode === 'reset' ? c.forgot : signup ? c.signUp : c.signIn}<span aria-hidden="true">↗</span></button>
        </form>
        <div className="bk-auth-switch">
          {mode === 'login' && <><button type="button" onClick={() => switchMode('reset')}>{c.forgot}</button><p>{c.noAccount} <button type="button" onClick={() => switchMode('signup')}>{c.create}</button></p></>}
          {mode !== 'login' && <p>{c.existingAccount} <button type="button" onClick={() => switchMode('login')}>{c.backToLogin}</button></p>}
        </div>
      </section>
    </main>
    <Footer />
  </>
}

export default function ConnectionPage() {
  return <Suspense fallback={<main className="bk-home bk-container bk-section">Chargement…</main>}><ConnectionContent /></Suspense>
}

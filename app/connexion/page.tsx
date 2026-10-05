'use client'

import { FormEvent, Suspense, useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PageSkeleton from '@/components/PageSkeleton'
import { createClient } from '@/lib/supabase/client'
import { useAuth } from '@/lib/auth-context'
import { useI18n } from '@/lib/i18n-context'
import { accountCopy } from '@/data/account-copy'

type Mode = 'login' | 'signup' | 'reset'

const countries = [
  { code: '+33', short: 'FR', flag: 'fr' },
  { code: '+49', short: 'DE', flag: 'de' },
  { code: '+39', short: 'IT', flag: 'it' },
  { code: '+32', short: 'BE', flag: 'be' },
  { code: '+41', short: 'CH', flag: 'ch' },
  { code: '+352', short: 'LU', flag: 'lu' },
] as const

function ConnectionContent() {
  const router = useRouter()
  const params = useSearchParams()
  const { locale } = useI18n()
  const c = accountCopy[locale]
  const { user, isAdmin, loading: authLoading } = useAuth()
  const supabase = useMemo(() => createClient(), [])
  const requestedMode = params.get('mode')
  const [mode, setMode] = useState<Mode>(requestedMode === 'reset' ? 'reset' : 'signup')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [phoneCountry, setPhoneCountry] = useState('+33')
  const [phone, setPhone] = useState('')
  const [message, setMessage] = useState(params.get('reason') === 'checkout' ? c.checkoutRequired : '')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const errorRef = useRef<HTMLParagraphElement>(null)
  const nextPath = params.get('next')?.startsWith('/') ? params.get('next')! : '/compte'

  useEffect(() => {
    if (!authLoading && user && mode !== 'reset') router.replace(isAdmin ? '/admin' : nextPath)
  }, [authLoading, isAdmin, mode, nextPath, router, user])

  useEffect(() => {
    if (error) errorRef.current?.focus()
  }, [error])

  const authError = (raw: string) => {
    const normalized = raw.toLowerCase()
    if (normalized.includes('invalid login credentials')) return c.invalidCredentials
    if (normalized.includes('email not confirmed')) return c.emailNotConfirmed
    if (normalized.includes('already registered') || normalized.includes('user already exists')) return c.emailExists
    if (normalized.includes('password') && (normalized.includes('weak') || normalized.includes('breach') || normalized.includes('strength'))) return c.passwordWeak
    if (normalized.includes('rate limit') || normalized.includes('too many') || normalized.includes('over_email_send_rate_limit')) return c.rateLimited
    return c.genericError
  }

  const submit = async (event: FormEvent) => {
    event.preventDefault()
    setSubmitting(true)
    setError('')
    setMessage('')

    const trimmedEmail = email.trim()
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    try {
      if (mode === 'signup') {
        if (!firstName.trim()) { setError(c.requiredFirstName); return }
        if (!lastName.trim()) { setError(c.requiredLastName); return }
        const normalizedPhone = `${phoneCountry}${phone.replace(/\D/g, '').replace(/^0/, '')}`
        if (!/^\+\d{8,15}$/.test(normalizedPhone)) { setError(c.invalidPhone); return }
        if (!trimmedEmail) { setError(c.requiredEmail); return }
        if (!emailPattern.test(trimmedEmail)) { setError(c.invalidEmail); return }
        if (!password) { setError(c.requiredPassword); return }
        if (password.length < 8) { setError(c.passwordTooShort); return }

        const { data, error: signUpError } = await supabase.auth.signUp({
          email: trimmedEmail,
          password,
          options: { data: { first_name: firstName.trim(), last_name: lastName.trim(), phone: normalizedPhone } },
        })
        if (signUpError) setError(authError(signUpError.message))
        else if (data.session) router.replace(nextPath)
        else setMessage(c.confirmEmail)
      } else if (mode === 'reset') {
        if (user) {
          if (!password) { setError(c.requiredPassword); return }
          if (password.length < 8) { setError(c.passwordTooShort); return }
          const { error: updateError } = await supabase.auth.updateUser({ password })
          if (updateError) setError(authError(updateError.message))
          else { setMessage(c.passwordUpdated); setMode('login') }
        } else {
          if (!trimmedEmail) { setError(c.requiredEmail); return }
          if (!emailPattern.test(trimmedEmail)) { setError(c.invalidEmail); return }
          const { error: resetError } = await supabase.auth.resetPasswordForEmail(trimmedEmail, { redirectTo: `${window.location.origin}/connexion?mode=reset` })
          if (resetError) setError(authError(resetError.message))
          else setMessage(c.resetSent)
        }
      } else {
        if (!trimmedEmail) { setError(c.requiredEmail); return }
        if (!emailPattern.test(trimmedEmail)) { setError(c.invalidEmail); return }
        if (!password) { setError(c.requiredPassword); return }
        const { error: signInError } = await supabase.auth.signInWithPassword({ email: trimmedEmail, password })
        if (signInError) setError(authError(signInError.message))
        else router.replace(nextPath)
      }
    } catch {
      setError(c.genericError)
    } finally {
      setSubmitting(false)
    }
  }

  const switchMode = (next: Mode) => { setMode(next); setError(''); setMessage('') }
  const signup = mode === 'signup'
  const selectedCountry = countries.find(country => country.code === phoneCountry) || countries[0]

  return <>
    <Header />
    <main id="main-content" className="bk-home bk-auth-page">
      <section className="bk-auth-intro">
        <Image className="bk-auth-intro-image" src="/images/login-wood-fired-heater.jpg" alt="Poêle à bois dans une maison chaleureuse" fill priority sizes="(max-width: 900px) 100vw, 52vw" />
        <div className="bk-auth-intro-shade" aria-hidden="true" />
        <p className="bk-eyebrow">BRAVIKO / {c.account}</p>
        <h1>{signup ? c.signupTitle : c.loginTitle}</h1>
        <p>{signup ? c.signupIntro : c.loginIntro}</p>
        <Link href="/boutique" className="bk-text-link">{c.shop}<span aria-hidden="true">↗</span></Link>
      </section>
      <section className="bk-auth-panel" aria-labelledby="auth-form-title">
        <p className="bk-eyebrow">{mode === 'reset' ? c.forgot : signup ? c.create : c.login}</p>
        <h2 id="auth-form-title">{mode === 'reset' ? c.forgot : signup ? c.signupDetails : c.login}</h2>
        <form onSubmit={submit} className="bk-account-form" noValidate>
          {signup && <>
            <div className="bk-form-row"><label htmlFor="first-name">{c.firstName}<input id="first-name" name="firstName" value={firstName} onChange={event => setFirstName(event.target.value)} required autoComplete="given-name" /></label><label htmlFor="last-name">{c.lastName}<input id="last-name" name="lastName" value={lastName} onChange={event => setLastName(event.target.value)} required autoComplete="family-name" /></label></div>
            <div className="bk-field"><label htmlFor="phone">{c.phone}</label><span className="bk-phone-field"><span className="bk-country-select"><span className={`bk-country-flag bk-flag-${selectedCountry.flag}`} aria-hidden="true" /><select id="phone-country" name="phoneCountry" value={phoneCountry} onChange={event => setPhoneCountry(event.target.value)} aria-label={c.phoneCountry}>{countries.map(country => <option key={country.code} value={country.code}>{country.short} {country.code}</option>)}</select></span><input id="phone" name="phone" value={phone} onChange={event => setPhone(event.target.value.replace(/[^\d ]/g, ''))} aria-label={c.phone} required inputMode="tel" autoComplete="tel-national" placeholder="6 12 34 56 78" /></span></div>
          </>}
          {(!user || mode !== 'reset') && <label htmlFor="email">{c.email}<input id="email" name="email" type="email" value={email} onChange={event => setEmail(event.target.value)} required autoComplete="email" /></label>}
          {mode !== 'reset' || user ? <div className="bk-field"><label htmlFor="password">{c.password}</label><span className="bk-password-field"><input id="password" name="password" type={showPassword ? 'text' : 'password'} value={password} onChange={event => setPassword(event.target.value)} required minLength={8} autoComplete={signup || mode === 'reset' ? 'new-password' : 'current-password'} aria-describedby="password-hint" /><button className="bk-password-toggle" type="button" onClick={() => setShowPassword(value => !value)} aria-label={showPassword ? c.hidePassword : c.showPassword}>{showPassword ? c.hidePassword : c.showPassword}</button></span><span id="password-hint" className="bk-form-hint">{c.passwordHint}</span></div> : null}
          {message && <p className="bk-form-message" role="status">{message}</p>}
          {error && <p ref={errorRef} tabIndex={-1} className="bk-form-error" role="alert">{error}</p>}
          {signup && <p className="bk-auth-legal">{c.signupLegal.before} <Link href="/conditions-generales">{c.signupLegal.terms}</Link> {c.signupLegal.and} <Link href="/confidentialite">{c.signupLegal.privacy}</Link>.</p>}
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
  return <Suspense fallback={<PageSkeleton variant="auth" label="Chargement de la connexion" />}><ConnectionContent /></Suspense>
}

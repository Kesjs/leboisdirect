'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PageSkeleton from '@/components/PageSkeleton'
import Button from '@/components/Button'
import { useCart } from '@/lib/cart-context'
import { formatPrice } from '@/lib/utils'
import { useRouter } from 'next/navigation'
import { saveOrderDraft } from '@/lib/order'
import { useI18n } from '@/lib/i18n-context'
import { commerceCopy } from '@/data/commerce-copy'
import { productLabel } from '@/data/product-labels'
import { useAuth } from '@/lib/auth-context'

type BankTransferCoords = {
  accountHolder: string
  iban: string
  bic: string
}

type BankTransferOrderState = {
  reference: string
  total: number
  maskedDetails: BankTransferCoords
  revealToken: string
}

async function fetchWithTimeout(input: RequestInfo | URL, init: RequestInit, timeoutMs = 15000) {
  const controller = new AbortController()
  const timeout = window.setTimeout(() => controller.abort(), timeoutMs)
  try {
    return await fetch(input, { ...init, signal: controller.signal })
  } finally {
    window.clearTimeout(timeout)
  }
}

export default function CheckoutPage() {
  const router = useRouter()
  const { items, totalPrice, clearCart, hydrated: cartHydrated } = useCart()
  const { locale } = useI18n()
  const c = commerceCopy[locale]
  const { user } = useAuth()
  const [step, setStep] = useState(1)
  const [formError, setFormError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [bankSubmitting, setBankSubmitting] = useState(false)
  const [bankTransferOrder, setBankTransferOrder] = useState<BankTransferOrderState | null>(null)
  const [revealedBankDetails, setRevealedBankDetails] = useState<BankTransferCoords | null>(null)
  const [revealLoading, setRevealLoading] = useState(false)
  const [revealError, setRevealError] = useState('')
  const [copiedField, setCopiedField] = useState<string | null>(null)
  const paymentLock = useRef(false)
  const storageRestored = useRef(false)
  const exitingCheckout = useRef(false)

  const paymentCopy = {
    error: 'Impossibile avviare il pagamento. Riprova.',
    unavailable: 'Il pagamento con carta non è ancora disponibile.',
    card: 'Pagamento con carta',
    cardBody: 'Pagamento sicuro',
    bank: 'Bonifico SEPA',
    bankBody: 'Ricevi riferimento e coordinate bancarie su richiesta sicura.',
    bankTitle: 'Il tuo bonifico SEPA',
    bankIntro: 'Ordine registrato. Effettua il bonifico dell’importo totale indicando il riferimento qui sotto nella causale.',
    holder: 'Intestatario del conto',
    iban: 'IBAN',
    bic: 'BIC / SWIFT',
    reference: 'Riferimento del bonifico',
    copy: 'Copia',
    copied: 'Copiato',
    close: 'Chiudi e torna al negozio',
    backToShop: 'Termina e torna al negozio',
    revealButton: 'Mostra le coordinate bancarie',
    revealing: 'Caricamento sicuro…',
    hideButton: 'Nascondi coordinate',
    maskedNotice: 'Per riservatezza, le coordinate bancarie sono nascoste per impostazione predefinita.',
    revealError: 'Impossibile mostrare le coordinate al momento. Riprova.',
    processingTitle: 'Tempi di accredito',
    processingBody: 'Un bonifico SEPA ordinario richiede 1–2 giorni lavorativi. Per una spedizione più rapida, scegli il bonifico istantaneo se offerto dalla tua banca.',
    bankError: 'Impossibile preparare il bonifico. Riprova.',
    proofTitle: 'Dopo il bonifico',
    proofBody: 'Una volta effettuato il bonifico, invia la ricevuta o la prova di pagamento a',
    proofBodyEnd: 'indicando il riferimento dell’ordine. Spediremo dopo la conferma dell’accredito.',
    proofEmail: 'contact@braviko.fr',
    proofSubject: 'Prova di pagamento',
  }
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    addressComplement: '',
    country: 'Italia',
    city: '',
    postalCode: '',
    phone: '',
    phoneCountry: 'IT',
    phoneCode: '+39',
  })

  useEffect(() => {
    if (!cartHydrated || storageRestored.current) return
    storageRestored.current = true
    try {
      const saved = window.localStorage.getItem('braviko-checkout-form')
      if (saved) {
        const parsed = JSON.parse(saved)
        if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
          setFormData(current => ({ ...current, ...parsed }))
        }
      }
      if (window.localStorage.getItem('braviko-checkout-step') === '2' && items.length > 0) setStep(2)
    } catch { /* Continue with an empty form when browser storage is unavailable. */ }
  }, [cartHydrated, items.length])

  useEffect(() => {
    if (!cartHydrated) return
    try {
      window.localStorage.setItem('braviko-checkout-form', JSON.stringify(formData))
      window.localStorage.setItem('braviko-checkout-step', String(step))
    } catch { /* The active checkout remains usable without browser storage. */ }
  }, [cartHydrated, formData, step])

  useEffect(() => {
    if (!cartHydrated || exitingCheckout.current) return
    if (items.length === 0 && !bankTransferOrder) {
      router.replace('/panier')
    }
  }, [bankTransferOrder, cartHydrated, items.length, router])

  useEffect(() => {
    if (!user) return
    setFormData(current => ({
      ...current,
      email: current.email || user.email || '',
      firstName: current.firstName || user.user_metadata?.first_name || '',
      lastName: current.lastName || user.user_metadata?.last_name || '',
    }))
  }, [user])

  if (!cartHydrated) return <PageSkeleton variant="checkout" label="Caricamento dell'ordine" />
  if (items.length === 0 && !bankTransferOrder) return null

  const buildCustomerPayload = () => ({
    email: formData.email.trim(),
    firstName: formData.firstName.trim(),
    lastName: formData.lastName.trim(),
    phone: `${formData.phoneCode} ${formData.phone.trim()}`.trim(),
    address: formData.address.trim(),
    addressComplement: formData.addressComplement.trim(),
    country: formData.country,
    postalCode: formData.postalCode.trim(),
    city: formData.city.trim(),
  })

  const validateStep1 = () => {
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())
    const phoneDigits = formData.phone.replace(/\D/g, '')
    if (!emailOk || !formData.firstName.trim() || !formData.lastName.trim() || phoneDigits.length < 6) {
      setStep(1)
      setFormError('Verifica il tuo indirizzo email, nome, cognome e numero di telefono.')
      return false
    }
    return true
  }

  const validateBeforePayment = () => {
    if (!validateStep1()) return false
    if (!formData.address.trim() || !formData.postalCode.trim() || !formData.city.trim()) {
      setFormError('Inserisci indirizzo, CAP e città di consegna.')
      return false
    }
    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (step === 1) {
      if (!validateStep1()) return
      setFormError('')
      setStep(2)
      return
    }

    if (!validateBeforePayment()) return
    if (paymentLock.current) return
    paymentLock.current = true
    setSubmitting(true)
    setFormError('')
    try {
      const checkoutResponse = await fetchWithTimeout('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer: buildCustomerPayload(),
          locale,
          items: items.map(item => ({ productId: item.product.id, variantId: item.variantId, quantity: item.quantity })),
        }),
      })
      const checkoutResult = await checkoutResponse.json().catch(() => ({}))
      if (!checkoutResponse.ok || !checkoutResult.url) {
        const checkoutError = new Error(checkoutResult.error || 'CHECKOUT_UNAVAILABLE')
        ;(checkoutError as Error & { userMessage?: string }).userMessage = checkoutResult.message
        throw checkoutError
      }
      try { window.localStorage.removeItem('braviko-checkout-step') } catch { /* Ignore unavailable storage. */ }
      window.location.assign(checkoutResult.url)
    } catch (error) {
      const code = error instanceof Error ? error.message : 'CHECKOUT_UNAVAILABLE'
      const userMessage = error instanceof Error && 'userMessage' in error ? (error as Error & { userMessage?: string }).userMessage : undefined
      setFormError(userMessage || (code === 'STRIPE_NOT_CONFIGURED' ? paymentCopy.unavailable : code === 'PRODUCT_UNAVAILABLE' ? 'Uno dei prodotti nel carrello non è più disponibile.' : paymentCopy.error))
      setSubmitting(false)
      paymentLock.current = false
    }
  }

  const handleBankTransfer = async () => {
    if (!validateBeforePayment()) return
    if (paymentLock.current) return
    paymentLock.current = true
    setBankSubmitting(true)
    setFormError('')
    try {
      const customerPayload = buildCustomerPayload()
      const response = await fetchWithTimeout('/api/bank-transfer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer: customerPayload,
          locale,
          items: items.map(item => ({ productId: item.product.id, variantId: item.variantId, quantity: item.quantity })),
        }),
      })
      const result = await response.json().catch(() => ({}))
      if (!response.ok || !result.ok || !result.reference || !result.maskedDetails || !result.revealToken) {
        const bankErr = new Error(result.error || 'BANK_TRANSFER_UNAVAILABLE')
        ;(bankErr as Error & { userMessage?: string }).userMessage = result.message
        throw bankErr
      }
      saveOrderDraft({
        reference: result.reference,
        createdAt: new Date().toISOString(),
        customer: {
          email: customerPayload.email,
          firstName: customerPayload.firstName,
          lastName: customerPayload.lastName,
          address: [customerPayload.address, customerPayload.addressComplement, customerPayload.country].filter(Boolean).join(', '),
          city: customerPayload.city,
          postalCode: customerPayload.postalCode,
          phone: customerPayload.phone,
        },
        items,
        subtotal: typeof result.total === 'number' ? result.total : totalPrice,
      })
      setRevealedBankDetails(null)
      setRevealError('')
      setBankTransferOrder({
        reference: result.reference,
        total: typeof result.total === 'number' ? result.total : totalPrice,
        maskedDetails: result.maskedDetails,
        revealToken: result.revealToken,
      })
      try { window.localStorage.removeItem('braviko-checkout-step') } catch { /* Ignore unavailable storage. */ }
    } catch (error) {
      const userMessage = error instanceof Error && 'userMessage' in error ? (error as Error & { userMessage?: string }).userMessage : undefined
      setFormError(userMessage || paymentCopy.bankError)
      paymentLock.current = false
    } finally {
      setBankSubmitting(false)
    }
  }

  const handleRevealBankDetails = async () => {
    if (!bankTransferOrder || revealLoading) return
    setRevealLoading(true)
    setRevealError('')
    try {
      const response = await fetchWithTimeout('/api/bank-transfer/reveal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          reference: bankTransferOrder.reference,
          revealToken: bankTransferOrder.revealToken,
        }),
      })
      const result = await response.json().catch(() => ({}))
      if (!response.ok || !result.iban || !result.bic || !result.accountHolder) {
        throw new Error(result.message || paymentCopy.revealError)
      }
      setRevealedBankDetails({
        accountHolder: result.accountHolder,
        iban: result.iban,
        bic: result.bic,
      })
    } catch (error) {
      setRevealError(error instanceof Error && error.message ? error.message : paymentCopy.revealError)
    } finally {
      setRevealLoading(false)
    }
  }

  const finishBankTransfer = () => {
    exitingCheckout.current = true
    clearCart()
    setBankTransferOrder(null)
    setRevealedBankDetails(null)
    paymentLock.current = false
    router.push('/boutique')
  }

  const copyBankValue = async (field: string, value: string) => {
    try {
      await navigator.clipboard.writeText(value)
      setCopiedField(field)
      window.setTimeout(() => setCopiedField(current => current === field ? null : current), 1800)
    } catch { setCopiedField(null) }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <>
      <Header />
      <main id="main-content" className="bk-home bg-ivory">
        <div className="bg-white border-b border-hairline">
          <div className="container-custom py-24">
            <Link
              href="/panier"
              className="inline-flex items-center gap-12 text-body-sm text-smoke hover:text-braise transition-colors mb-24 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-braise focus-visible:ring-offset-2"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M13 8H3m0 0l4-4m-4 4l4 4" />
              </svg>
              {c.back}
            </Link>
            <h1 className="text-heading-md font-semibold text-charcoal">{c.checkoutTitle}</h1>
          </div>
        </div>

        <div className="container-custom py-40">
          <div className="grid lg:grid-cols-12 gap-32">
            {/* Form */}
            <div className="min-w-0 lg:col-span-7">
              {/* Progress */}
              <div className="flex items-center justify-between gap-12 mb-32" aria-label="Avanzamento dell'ordine">
                {[1, 2].map((s) => (
                  <div key={s} className={`flex items-center ${s === 1 ? 'min-w-0 flex-1' : 'shrink-0'}`}>
                    <button
                      type="button"
                      onClick={() => s < step && setStep(s)}
                      aria-current={s === step ? 'step' : undefined}
                      aria-label={s < step ? `Torna al passaggio ${s}` : `Passaggio ${s}`}
                      className={`h-40 w-40 shrink-0 rounded-full flex items-center justify-center text-body-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-braise focus-visible:ring-offset-2 ${
                        s <= step
                          ? 'bg-charcoal text-white'
                          : 'bg-mist text-ash border border-hairline'
                      } ${s < step ? 'cursor-pointer hover:bg-braise' : 'cursor-default'}`}
                    >
                      {s}
                    </button>
                    <span className={`ml-8 hidden text-body-sm sm:block ${s === step ? 'font-semibold text-charcoal' : 'text-smoke'}`}>
                      {s === 1 ? c.contact : c.deliveryAddress}
                    </span>
                    {s < 2 && (
                      <div
                        className={`flex-1 h-[2px] mx-12 transition-colors ${
                          s < step ? 'bg-charcoal' : 'bg-hairline'
                        }`}
                      />
                    )}
                  </div>
                ))}
              </div>

              <form onSubmit={handleSubmit}>
                {/* Step 1: Contact */}
                {step === 1 && (
                  <div className="bg-white rounded-card border border-hairline p-24 md:p-32">
                    <h2 className="text-heading-sm font-semibold text-charcoal mb-8">
                      {c.contact}
                    </h2>
                    {!user ? (
                      <p className="mb-20 text-body-sm text-smoke">
                        Ordine rapido senza registrazione. Già cliente?{' '}
                        <Link
                          href="/connexion?mode=login&next=/checkout"
                          className="font-medium text-braise underline underline-offset-4 hover:text-charcoal"
                        >
                          Accedi
                        </Link>
                      </p>
                    ) : (
                      <p className="mb-20 text-body-sm text-smoke">
                        Connesso come <strong className="font-medium text-charcoal">{user.email}</strong>.
                      </p>
                    )}
                    {formError && (
                      <p role="alert" className="mb-20 rounded-card border border-red-200 bg-red-50 px-16 py-12 text-body-sm text-red-700">
                        {formError}
                      </p>
                    )}
                    <div className="space-y-20">
                      <div>
                        <label htmlFor="email" className="block text-body-sm font-medium text-charcoal mb-8">
                          Email
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          autoComplete="email"
                          maxLength={160}
                          className="w-full px-16 py-12 border border-hairline rounded-card text-body text-charcoal focus:outline-none focus:ring-2 focus:ring-charcoal"
                          placeholder="nome@email.it"
                        />
                      </div>
                      <div className="grid grid-cols-1 gap-20 sm:grid-cols-2">
                        <div>
                          <label htmlFor="firstName" className="block text-body-sm font-medium text-charcoal mb-8">
                            {c.firstName}
                          </label>
                          <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            required
                            autoComplete="given-name"
                            maxLength={80}
                            className="w-full px-16 py-12 border border-hairline rounded-card text-body text-charcoal focus:outline-none focus:ring-2 focus:ring-charcoal"
                          />
                        </div>
                        <div>
                          <label htmlFor="lastName" className="block text-body-sm font-medium text-charcoal mb-8">
                            {c.name}
                          </label>
                          <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            required
                            autoComplete="family-name"
                            maxLength={80}
                            className="w-full px-16 py-12 border border-hairline rounded-card text-body text-charcoal focus:outline-none focus:ring-2 focus:ring-charcoal"
                          />
                        </div>
                      </div>
                      <div>
                        <label htmlFor="phone" className="block text-body-sm font-medium text-charcoal mb-8">
                          {c.phone}
                        </label>
                        <div className="bk-phone-field">
                          <span className="bk-country-select">
                            <span className={`bk-country-flag bk-flag-${formData.phoneCountry.toLowerCase()}`} aria-hidden="true" />
                            <select
                              id="phoneCountry"
                              name="phoneCountry"
                              value={formData.phoneCountry}
                              onChange={(event) => {
                                const codes: Record<string, string> = { IT: '+39', FR: '+33', BE: '+32', CH: '+41', LU: '+352', DE: '+49' }
                                setFormData({ ...formData, phoneCountry: event.target.value, phoneCode: codes[event.target.value] ?? '+39' })
                              }}
                              aria-label="Prefisso telefonico"
                              className="w-full px-12 py-12 border border-hairline rounded-card bg-white text-body text-charcoal focus:border-braise focus:outline-none"
                            >
                            <option value="IT">IT +39</option>
                            <option value="FR">FR +33</option>
                            <option value="CH">CH +41</option>
                            <option value="DE">DE +49</option>
                            <option value="BE">BE +32</option>
                            <option value="LU">LU +352</option>
                            </select>
                          </span>
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            required
                            inputMode="tel"
                            autoComplete="tel-national"
                            maxLength={24}
                            aria-describedby="phone-hint"
                            className="w-full px-16 py-12 border border-hairline rounded-card text-body text-charcoal focus:border-braise focus:outline-none"
                            placeholder="333 123 4567"
                          />
                        </div>
                        <p id="phone-hint" className="mt-8 text-body-sm text-smoke">Scegli il prefisso internazionale e inserisci il tuo numero di telefono.</p>
                      </div>
                    </div>
                    <Button type="submit" size="lg" className="w-full mt-32 rounded-card">
                      {c.nextDelivery}
                    </Button>
                  </div>
                )}

                {/* Step 2: Delivery */}
                {step === 2 && (
                  <div className="bg-white rounded-card border border-hairline p-24 md:p-32">
                      <h2 className="text-heading-sm font-semibold text-charcoal mb-8">
                      {c.deliveryAddress}
                    </h2>
                    <p className="text-body-sm text-smoke mb-24">Indica l’indirizzo completo per la consegna del tuo ordine.</p>
                    <div className="space-y-20">
                      <div>
                        <label htmlFor="country" className="block text-body-sm font-medium text-charcoal mb-8">Paese di consegna</label>
                        <select id="country" name="country" value={formData.country} onChange={handleInputChange} required autoComplete="country-name" className="w-full px-16 py-12 border border-hairline rounded-card bg-white text-body text-charcoal focus:border-braise focus:outline-none">
                          <option>Italia</option><option>Francia</option><option>Svizzera</option><option>Germania</option><option>Belgio</option><option>Lussemburgo</option>
                        </select>
                      </div>
                      <div>
                        <label htmlFor="address" className="block text-body-sm font-medium text-charcoal mb-8">
                          {c.deliveryAddress}
                        </label>
                        <input
                          type="text"
                          id="address"
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          required
                          autoComplete="street-address"
                          maxLength={160}
                          className="w-full px-16 py-12 border border-hairline rounded-card text-body text-charcoal focus:border-braise focus:outline-none"
                          placeholder="Via Roma 12"
                        />
                      </div>
                      <div>
                        <label htmlFor="addressComplement" className="block text-body-sm font-medium text-charcoal mb-8">Complemento indirizzo <span className="text-smoke">(facoltativo)</span></label>
                        <input type="text" id="addressComplement" name="addressComplement" value={formData.addressComplement} onChange={handleInputChange} autoComplete="address-line2" maxLength={120} className="w-full px-16 py-12 border border-hairline rounded-card text-body text-charcoal focus:border-braise focus:outline-none" placeholder="Interno, edificio, scala, citofono…" />
                      </div>
                      <div className="grid grid-cols-1 gap-20 sm:grid-cols-2">
                        <div>
                          <label htmlFor="postalCode" className="block text-body-sm font-medium text-charcoal mb-8">
                            {c.postalCode}
                          </label>
                          <input
                            type="text"
                            id="postalCode"
                            name="postalCode"
                            value={formData.postalCode}
                            onChange={handleInputChange}
                            required
                            autoComplete="postal-code"
                            maxLength={12}
                            className="w-full px-16 py-12 border border-hairline rounded-card text-body text-charcoal focus:border-braise focus:outline-none"
                            placeholder="00100"
                          />
                        </div>
                        <div>
                          <label htmlFor="city" className="block text-body-sm font-medium text-charcoal mb-8">
                            {c.city}
                          </label>
                          <input
                            type="text"
                            id="city"
                            name="city"
                            value={formData.city}
                            onChange={handleInputChange}
                            required
                            autoComplete="address-level2"
                            maxLength={100}
                            className="w-full px-16 py-12 border border-hairline rounded-card text-body text-charcoal focus:border-braise focus:outline-none"
                            placeholder="Roma"
                          />
                        </div>
                      </div>
                    </div>
                    {formError && <p role="alert" className="mt-24 rounded-card border border-red-200 bg-red-50 px-16 py-12 text-body-sm text-red-700">{formError}</p>}
                    <div className="bk-checkout-payment mt-32 space-y-12" aria-label={c.payment}>
                      <div className="bk-checkout-payment-heading">
                        <h3 className="text-heading-sm font-semibold text-charcoal">{c.payment}</h3>
                        <p className="mt-8 text-body-sm text-smoke">Scegli una modalità per completare l’ordine.</p>
                      </div>
                      <div className="grid gap-12 sm:grid-cols-2">
                        <button type="submit" className="min-h-[72px] w-full rounded-card bg-charcoal px-20 py-12 text-left text-white transition-colors hover:bg-charcoal/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-braise focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60" disabled={submitting || bankSubmitting} aria-busy={submitting}>
                          <span className="flex w-full items-center justify-between gap-16">
                            <span>
                              <span className="block font-semibold">{submitting ? 'Apertura del pagamento…' : paymentCopy.card}</span>
                              <span className="mt-4 block text-body-sm text-white/70">{paymentCopy.cardBody}</span>
                            </span>
                          </span>
                        </button>
                        <button type="button" className="min-h-[72px] w-full rounded-card border border-charcoal bg-white px-20 py-12 text-left text-charcoal transition-colors hover:bg-mist focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-braise focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60" onClick={handleBankTransfer} disabled={submitting || bankSubmitting} aria-busy={bankSubmitting}>
                          <span className="flex items-center gap-16">
                            <span>
                              <span className="block font-semibold">{bankSubmitting ? 'Preparazione bonifico…' : paymentCopy.bank}</span>
                              <span className="mt-4 block text-body-sm text-smoke">{paymentCopy.bankBody}</span>
                            </span>
                          </span>
                        </button>
                      </div>
                      <Button type="button" variant="secondary" size="md" className="w-full rounded-card" onClick={() => setStep(1)}>
                        {c.back}
                      </Button>
                    </div>
                  </div>
                )}

              </form>
            </div>

            {/* Summary */}
            <div className="min-w-0 lg:col-span-5">
              <div className="lg:sticky lg:top-[120px] bg-white rounded-card border border-hairline p-24 md:p-32">
                <h2 className="text-heading-sm font-semibold text-charcoal mb-24">
                  {c.summary}
                </h2>

                <div className="space-y-20 mb-24 pb-24 border-b border-hairline">
                  {items.map((item) => {
                    const variant = item.product.variants?.find((v) => v.id === item.variantId)
                    const price = variant?.price || item.product.price

                    return (
                      <div key={`${item.product.id}-${item.variantId}`} className="flex gap-16">
                        <div className="relative w-64 h-64 flex-shrink-0 rounded-card overflow-hidden">
                          <Image
                            src={item.product.image}
                            alt={item.product.name}
                            fill
                            className="object-cover"
                            sizes="64px"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-body-sm font-semibold text-charcoal truncate">
                            {productLabel(item.product, locale).name}
                          </p>
                          <p className="text-body-sm text-smoke">
                            {c.quantity}: {item.quantity}
                          </p>
                          <p className="text-body-sm font-semibold text-charcoal">
                            {formatPrice(price * item.quantity)}
                          </p>
                        </div>
                      </div>
                    )
                  })}
                </div>

                <div className="space-y-12 mb-24">
                  <div className="flex justify-between text-body">
                    <span className="text-smoke">{c.subtotal}</span>
                    <span className="font-semibold text-charcoal">{formatPrice(totalPrice)}</span>
                  </div>
                  <div className="flex justify-between text-body">
                    <span className="text-smoke">{c.delivery}</span>
                    <span className="font-semibold text-charcoal">{c.deliveryLater}</span>
                  </div>
                </div>

                <div className="flex justify-between text-heading-sm pt-24 border-t border-hairline">
                  <span className="font-semibold text-charcoal">{c.total}</span>
                  <span className="font-semibold text-charcoal">{formatPrice(totalPrice)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      {bankTransferOrder && (
        <div className="fixed inset-0 z-50 flex items-stretch justify-center bg-charcoal/60 sm:items-center sm:p-20" role="dialog" aria-modal="true" aria-labelledby="bank-transfer-title">
          <div className="relative h-full w-full max-w-lg overflow-y-auto bg-white p-20 pb-[max(20px,env(safe-area-inset-bottom))] shadow-2xl sm:h-auto sm:max-h-[min(94dvh,820px)] sm:rounded-card sm:p-24">
            <button type="button" className="absolute right-12 top-12 flex h-[40px] w-[40px] items-center justify-center rounded-card text-smoke hover:bg-mist hover:text-charcoal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-braise" onClick={finishBankTransfer} aria-label={paymentCopy.close}>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true"><path d="M4 4l10 10M14 4L4 14" /></svg>
            </button>
            <div className="mb-12 flex items-center justify-between gap-16 border-b border-hairline pb-12 pr-32">
              <h2 id="bank-transfer-title" className="text-heading-sm font-semibold text-charcoal">{paymentCopy.bankTitle}</h2>
            </div>
            <div className="mb-16 pr-24">
              <p className="text-body-sm leading-relaxed text-smoke">{paymentCopy.bankIntro}</p>
            </div>
            <div className="mb-16 rounded-card border border-hairline bg-mist px-16 py-12">
              <div className="flex items-center justify-between gap-16 text-body-sm"><span className="text-smoke">{c.total}</span><strong className="text-charcoal tabular-nums">{formatPrice(bankTransferOrder.total)}</strong></div>
              <div className="mt-[6px] flex items-center justify-between gap-16 text-body-sm"><span className="text-smoke">{paymentCopy.reference}</span><strong className="text-charcoal">{bankTransferOrder.reference}</strong></div>
            </div>

            {!revealedBankDetails ? (
              <div className="mb-16 rounded-card border border-hairline bg-[#FAF9F6] p-12">
                <p className="text-body-sm text-smoke">{paymentCopy.maskedNotice}</p>
                <button
                  type="button"
                  onClick={handleRevealBankDetails}
                  disabled={revealLoading}
                  className="mt-[10px] inline-flex min-h-[42px] w-full items-center justify-center gap-8 rounded-card bg-charcoal px-16 py-8 text-body-sm font-medium text-white transition-colors hover:bg-braise focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-braise focus-visible:ring-offset-2 disabled:opacity-60"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                    <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                  <span>{revealLoading ? paymentCopy.revealing : paymentCopy.revealButton}</span>
                </button>
                {revealError && (
                  <p role="alert" className="mt-[10px] text-body-sm text-red-700">{revealError}</p>
                )}
              </div>
            ) : (
              <div className="mb-16 flex items-center justify-between gap-12 rounded-card border border-emerald-200 bg-emerald-50 px-16 py-[10px] text-body-sm text-emerald-900">
                <span>Coordinate bancarie visibili</span>
                <button
                  type="button"
                  onClick={() => setRevealedBankDetails(null)}
                  className="font-medium underline underline-offset-4 hover:text-charcoal"
                >
                  {paymentCopy.hideButton}
                </button>
              </div>
            )}

            <div className="space-y-8">
              {(
                [
                  [
                    paymentCopy.holder,
                    revealedBankDetails ? revealedBankDetails.accountHolder : bankTransferOrder.maskedDetails.accountHolder,
                    'holder',
                    Boolean(revealedBankDetails),
                  ],
                  [
                    paymentCopy.iban,
                    revealedBankDetails ? revealedBankDetails.iban : bankTransferOrder.maskedDetails.iban,
                    'iban',
                    Boolean(revealedBankDetails),
                  ],
                  [
                    paymentCopy.bic,
                    revealedBankDetails ? revealedBankDetails.bic : bankTransferOrder.maskedDetails.bic,
                    'bic',
                    Boolean(revealedBankDetails),
                  ],
                  [paymentCopy.reference, bankTransferOrder.reference, 'reference', true],
                ] as const
              ).map(([label, value, field, canCopy]) => (
                <div key={field} className="flex items-center justify-between gap-12 rounded-card border border-hairline bg-white px-16 py-[10px]">
                  <div className="min-w-0">
                    <p className="text-[12px] text-smoke">{label}</p>
                    <p className={`mt-[4px] text-body-sm font-medium ${canCopy ? 'break-words text-charcoal' : 'break-words font-mono text-smoke'}`}>
                      {value}
                    </p>
                  </div>
                  {canCopy ? (
                    <button
                      type="button"
                      className="h-[40px] shrink-0 rounded-card bg-charcoal px-12 py-8 text-body-sm font-medium text-white hover:bg-charcoal/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-braise focus-visible:ring-offset-2"
                      onClick={() => copyBankValue(field, value)}
                    >
                      {copiedField === field ? paymentCopy.copied : paymentCopy.copy}
                    </button>
                  ) : (
                    <span className="shrink-0 rounded-[4px] bg-mist px-[10px] py-[4px] text-[11px] font-medium text-smoke">
                      Nascosto
                    </span>
                  )}
                </div>
              ))}
            </div>
            <div className="mt-16 rounded-card border border-amber-200 bg-amber-50 p-12 text-body-sm leading-relaxed text-amber-900">
              <p className="flex items-center gap-8 font-semibold">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>
                {paymentCopy.processingTitle}
              </p>
              <p className="mt-[6px]">{paymentCopy.processingBody}</p>
            </div>
            <div className="mt-12 rounded-card border border-hairline bg-white p-12 text-body-sm leading-relaxed text-charcoal">
              <p className="flex items-center gap-8 font-semibold">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></svg>
                {paymentCopy.proofTitle}
              </p>
              <p className="mt-[6px]">
                {paymentCopy.proofBody}{' '}
                <a
                  className="break-all font-medium underline underline-offset-4 hover:text-braise"
                  href={`mailto:${paymentCopy.proofEmail}?subject=${encodeURIComponent(`${paymentCopy.proofSubject} – ${bankTransferOrder.reference}`)}`}
                >
                  {paymentCopy.proofEmail}
                </a>{' '}
                {paymentCopy.proofBodyEnd}
              </p>
            </div>
            <button type="button" className="mx-auto mt-16 block min-h-[42px] w-fit whitespace-nowrap rounded-card border border-charcoal bg-white px-16 py-8 text-center text-body-sm font-medium leading-none text-charcoal hover:bg-mist focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-braise focus-visible:ring-offset-2" onClick={finishBankTransfer}>{paymentCopy.backToShop}</button>
          </div>
        </div>
      )}
      <Footer />
    </>
  )
}

'use client'

import { useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PageSkeleton from '@/components/PageSkeleton'
import Button from '@/components/Button'
import { useCart } from '@/lib/cart-context'
import { formatPrice } from '@/lib/utils'
import { useRouter } from 'next/navigation'
import { createOrderDraft, saveOrderDraft } from '@/lib/order'
import { useI18n } from '@/lib/i18n-context'
import { commerceCopy } from '@/data/commerce-copy'
import { productLabel } from '@/data/product-labels'
import { useAuth } from '@/lib/auth-context'
import { createClient } from '@/lib/supabase/client'
import { useMemo } from 'react'

async function fetchWithTimeout(input: RequestInfo | URL, init: RequestInit, timeoutMs = 15000) {
  const controller = new AbortController()
  const timeout = window.setTimeout(() => controller.abort(), timeoutMs)
  try {
    return await fetch(input, { ...init, signal: controller.signal })
  } finally {
    window.clearTimeout(timeout)
  }
}

type CheckoutSelectOption = { value: string; label: string }

function CheckoutSelect({
  id,
  value,
  options,
  onChange,
  ariaLabel,
  leading,
}: {
  id: string
  value: string
  options: CheckoutSelectOption[]
  onChange: (value: string) => void
  ariaLabel: string
  leading?: (option: CheckoutSelectOption) => ReactNode
}) {
  const selected = options.find(option => option.value === value) || options[0]

  return (
    <div className="relative w-full">
      {leading && (
        <span className="pointer-events-none absolute left-16 top-1/2 z-10 -translate-y-1/2">
          {leading(selected)}
        </span>
      )}
      <select
        id={id}
        value={value}
        onChange={event => onChange(event.target.value)}
        className={`min-h-[52px] w-full rounded-card border border-hairline bg-white py-12 text-body text-charcoal transition-colors hover:border-charcoal focus:border-braise focus:outline-none focus:ring-2 focus:ring-braise/30 ${leading ? 'pl-48 pr-40' : 'px-16'}`}
        aria-label={ariaLabel}
      >
        {options.map(option => <option key={option.value} value={option.value}>{option.label}</option>)}
      </select>
    </div>
  )
}

export default function CheckoutPage() {
  const router = useRouter()
  const { items, totalPrice, clearCart, hydrated: cartHydrated } = useCart()
  const { locale } = useI18n()
  const c = commerceCopy[locale]
  const { user, loading: authLoading } = useAuth()
  const supabase = useMemo(() => createClient(), [])
  const [step, setStep] = useState(1)
  const [formError, setFormError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [bankSubmitting, setBankSubmitting] = useState(false)
  const [paymentCancelled, setPaymentCancelled] = useState(false)
  const [checkoutHydrated, setCheckoutHydrated] = useState(false)
  const paymentLock = useRef(false)
  const paymentCopy = locale === 'de'
      ? { error: 'Die Zahlung konnte nicht gestartet werden. Bitte versuchen Sie es erneut.', unavailable: 'Die Zahlung ist derzeit nicht verfügbar.', cancelled: 'Die Zahlung wurde abgebrochen. Deine Angaben und dein Warenkorb bleiben erhalten. Du kannst es erneut versuchen.', card: 'Mit Karte bezahlen', cardBody: 'Sichere Zahlung', bank: 'SEPA-Überweisung', bankBody: 'Erhalten Sie die Bankverbindung und Ihre Bestellreferenz.', bankTitle: 'Ihre SEPA-Überweisung', bankIntro: 'Überweisen Sie den Gesamtbetrag und geben Sie diese Bestellreferenz im Verwendungszweck an.', holder: 'Kontoinhaber', iban: 'IBAN', bic: 'BIC / SWIFT', reference: 'Überweisungsreferenz', copy: 'Kopieren', copied: 'Kopiert', close: 'Schließen', backToShop: 'Zurück zum Shop', processingTitle: 'Bearbeitungszeit', processingBody: 'Eine klassische SEPA-Überweisung kann 1 bis 2 Werktage dauern. Für eine schnellere Lieferung nutzen Sie, wenn möglich, eine Echtzeitüberweisung.', bankError: 'Die Überweisung konnte nicht vorbereitet werden. Bitte versuchen Sie es erneut.' }
    : locale === 'it'
      ? { error: 'Impossibile avviare il pagamento. Riprova.', unavailable: 'Il pagamento non è al momento disponibile.', cancelled: 'Il pagamento è stato annullato. I tuoi dati e il carrello sono rimasti invariati: puoi riprovare.', card: 'Paga con carta', cardBody: 'Pagamento sicuro', bank: 'Bonifico SEPA', bankBody: 'Ricevi le coordinate bancarie e il riferimento dell’ordine.', bankTitle: 'Il tuo bonifico SEPA', bankIntro: 'Effettua il bonifico per l’importo totale e indica questo riferimento nella causale.', holder: 'Intestatario', iban: 'IBAN', bic: 'BIC / SWIFT', reference: 'Riferimento del bonifico', copy: 'Copia', copied: 'Copiato', close: 'Chiudi', backToShop: 'Torna al negozio', processingTitle: 'Tempi di elaborazione', processingBody: 'Un bonifico SEPA classico può richiedere da 1 a 2 giorni lavorativi. Per una consegna più rapida, usa un bonifico istantaneo se la tua banca lo consente.', bankError: 'Impossibile preparare il bonifico. Riprova.' }
      : { error: 'Impossibile avviare il pagamento. Riprova.', unavailable: 'Il pagamento con carta non è al momento disponibile.', cancelled: 'Le paiement a été annulé. Vos informations et votre panier sont conservés : vous pouvez réessayer.', card: 'Paga con carta', cardBody: 'Pagamento sicuro', bank: 'Bonifico SEPA', bankBody: 'Ricevi le coordinate bancarie e il riferimento dell’ordine.', bankTitle: 'Il tuo bonifico SEPA', bankIntro: 'Effettua il bonifico per l’importo totale e indica questo riferimento nella causale.', holder: 'Intestatario', iban: 'IBAN', bic: 'BIC / SWIFT', reference: 'Riferimento del bonifico', copy: 'Copia', copied: 'Copiato', close: 'Chiudi', backToShop: 'Torna al negozio', processingTitle: 'Tempi di elaborazione', processingBody: 'Un bonifico SEPA classico può richiedere da 1 a 2 giorni lavorativi. Per una consegna più rapida, usa un bonifico istantaneo se la tua banca lo consente.', bankError: 'Impossibile preparare il bonifico. Riprova.' }
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
    if (!cartHydrated) return
    try {
      const saved = window.localStorage.getItem('braviko-checkout-form')
      if (saved) {
        const parsed = JSON.parse(saved)
        if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
          setFormData(current => ({ ...current, ...parsed }))
        }
      }
      const savedStep = window.localStorage.getItem('braviko-checkout-step')
      setStep(savedStep === '2' && items.length > 0 ? 2 : 1)
    } catch { /* Continue with an empty form when browser storage is unavailable. */ }
    setCheckoutHydrated(true)
  }, [cartHydrated, items.length])
  useEffect(() => {
    if (!checkoutHydrated) return
    try {
      window.localStorage.setItem('braviko-checkout-form', JSON.stringify(formData))
      window.localStorage.setItem('braviko-checkout-step', String(step))
    } catch { /* The active checkout remains usable without browser storage. */ }
  }, [checkoutHydrated, formData, step])

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (params.get('payment') !== 'cancelled') return
    setPaymentCancelled(true)
    setStep(2)
    setSubmitting(false)
    setFormError(paymentCopy.cancelled)
    paymentLock.current = false
    try { window.localStorage.setItem('braviko-checkout-step', '2') } catch { /* Ignore unavailable storage. */ }
    window.history.replaceState(null, '', '/checkout')
  }, [paymentCopy.cancelled, router])

  useEffect(() => {
    if (!cartHydrated || !checkoutHydrated) return
    if (!authLoading && !user) router.replace('/connexion?mode=signup&next=/checkout&reason=checkout')
    else if (items.length === 0 && step === 1) router.replace('/panier')
  }, [authLoading, cartHydrated, checkoutHydrated, items.length, router, step, user])
  useEffect(() => {
    if (!user) return
    setFormData(current => ({
      ...current,
      email: current.email || user.email || '',
      firstName: current.firstName || user.user_metadata?.first_name || '',
      lastName: current.lastName || user.user_metadata?.last_name || '',
    }))
  }, [user])
  if (authLoading || !cartHydrated || !checkoutHydrated) return <PageSkeleton variant="checkout" label="Caricamento dell’ordine" />
  if (!user || (items.length === 0 && step === 1)) return null

  const createPendingOrder = async () => {
    const draft = createOrderDraft(formData, items, totalPrice)
    const orderItems = items.map(item => {
      const variant = item.product.variants?.find(value => value.id === item.variantId)
      return {
        product_id: item.product.id,
        variant_id: item.variantId ?? null,
        product_name: productLabel(item.product, locale).name,
        variant_label: variant?.label ?? (variant?.volume ? `${variant.volume} stero/i` : null),
        quantity: item.quantity,
        unit_price: variant?.price ?? item.product.price,
      }
    })
    const { error } = await supabase.rpc('create_braviko_order', {
      p_reference: draft.reference,
      p_customer: {
        email: formData.email, first_name: formData.firstName, last_name: formData.lastName,
        phone: `${formData.phoneCode} ${formData.phone}`.trim(), address: [formData.address, formData.addressComplement, formData.country].filter(Boolean).join(', '), postal_code: formData.postalCode, city: formData.city,
      },
      p_items: orderItems,
    })
    if (error) throw new Error(error.message)
    saveOrderDraft(draft)
    return draft
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (step === 1) {
      setFormError('')
      setPaymentCancelled(false)
      setStep(step + 1)
      return
    }

    if (paymentLock.current) return
    paymentLock.current = true
    setSubmitting(true)
    setFormError('')
    setPaymentCancelled(false)
    try {
      const draft = await createPendingOrder()
      const checkoutResponse = await fetchWithTimeout('/api/stripe/checkout', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ reference: draft.reference, locale, items: items.map(item => ({ productId: item.product.id, variantId: item.variantId, quantity: item.quantity })) }) })
      const checkoutResult = await checkoutResponse.json().catch(() => ({}))
      if (!checkoutResponse.ok || !checkoutResult.url) {
        const checkoutError = new Error(checkoutResult.error || 'CHECKOUT_UNAVAILABLE')
        ;(checkoutError as Error & { userMessage?: string }).userMessage = checkoutResult.message
        throw checkoutError
      }
      try { window.localStorage.setItem('braviko-checkout-step', '2') } catch { /* Ignore unavailable storage. */ }
      window.location.assign(checkoutResult.url)
    } catch (error) {
      const code = error instanceof Error ? error.message : 'CHECKOUT_UNAVAILABLE'
      const userMessage = error instanceof Error && 'userMessage' in error ? (error as Error & { userMessage?: string }).userMessage : undefined
      setFormError(userMessage || (code === 'STRIPE_NOT_CONFIGURED' ? paymentCopy.unavailable : code === 'AUTH_REQUIRED' ? 'La sessione è scaduta. Accedi di nuovo.' : code === 'PRODUCT_UNAVAILABLE' ? 'Un prodotto del carrello non è più disponibile.' : paymentCopy.error))
      setSubmitting(false)
      paymentLock.current = false
    }
  }

  const handleBankTransfer = async () => {
    if (paymentLock.current) return
    paymentLock.current = true
    setBankSubmitting(true)
    setFormError('')
    setPaymentCancelled(false)
    try {
      const draft = await createPendingOrder()
      const response = await fetchWithTimeout('/api/bank-transfer', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ reference: draft.reference }) })
      if (!response.ok) throw new Error('BANK_TRANSFER_UNAVAILABLE')
      try { window.localStorage.removeItem('braviko-checkout-step') } catch { /* Ignore unavailable storage. */ }
      router.push(`/commande/bonifico?reference=${encodeURIComponent(draft.reference)}`)
    } catch (error) {
      const code = error instanceof Error ? error.message : 'BANK_TRANSFER_UNAVAILABLE'
      setFormError(code === 'AUTH_REQUIRED' ? 'La sessione è scaduta. Accedi di nuovo.' : paymentCopy.bankError)
      paymentLock.current = false
    } finally {
      setBankSubmitting(false)
    }
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
              <div className="flex items-center justify-between gap-12 mb-32" aria-label="Avanzamento dell’ordine">
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
                        className={`flex-1 h-1 mx-12 transition-colors ${
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
                    <h2 className="text-heading-sm font-semibold text-charcoal mb-24">
                      {c.contact}
                    </h2>
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
                          placeholder="tuo@email.it"
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
                            <CheckoutSelect
                              id="phoneCountry"
                              value={formData.phoneCountry}
                              options={[{ value: 'FR', label: 'FR +33' }, { value: 'BE', label: 'BE +32' }, { value: 'CH', label: 'CH +41' }, { value: 'LU', label: 'LU +352' }, { value: 'DE', label: 'DE +49' }, { value: 'IT', label: 'IT +39' }]}
                              ariaLabel="Paese del telefono"
                              leading={(option) => <span className={`bk-country-flag bk-flag-${option.value.toLowerCase()}`} aria-hidden="true" />}
                              onChange={(value) => {
                                const codes: Record<string, string> = { FR: '+33', BE: '+32', CH: '+41', LU: '+352', DE: '+49', IT: '+39' }
                                setFormData(current => ({ ...current, phoneCountry: value, phoneCode: codes[value] ?? '+39' }))
                              }}
                            />
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
                        <p id="phone-hint" className="mt-8 text-body-sm text-smoke">Scegli il Paese e inserisci il tuo numero di telefono.</p>
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
                        <CheckoutSelect
                          id="country"
                          value={formData.country}
                          options={[{ value: 'Italia', label: 'Italia' }, { value: 'Francia', label: 'Francia' }, { value: 'Belgio', label: 'Belgio' }, { value: 'Lussemburgo', label: 'Lussemburgo' }, { value: 'Svizzera', label: 'Svizzera' }, { value: 'Germania', label: 'Germania' }]}
                          ariaLabel="Paese di consegna"
                          onChange={(value) => setFormData(current => ({ ...current, country: value }))}
                        />
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
                        <label htmlFor="addressComplement" className="block text-body-sm font-medium text-charcoal mb-8">Complemento dell’indirizzo <span className="text-smoke">(facoltativo)</span></label>
                        <input type="text" id="addressComplement" name="addressComplement" value={formData.addressComplement} onChange={handleInputChange} autoComplete="address-line2" maxLength={120} className="w-full px-16 py-12 border border-hairline rounded-card text-body text-charcoal focus:border-braise focus:outline-none" placeholder="Appartamento, edificio, piano, citofono…" />
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
                            placeholder="75001"
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
                    {formError && <p role="alert" data-payment-cancelled={paymentCancelled ? 'true' : undefined} className={`mt-24 rounded-card border px-16 py-12 text-body-sm ${paymentCancelled ? 'border-amber-200 bg-amber-50 text-amber-900' : 'border-red-200 bg-red-50 text-red-700'}`}>{formError}</p>}
                    <div className="bk-checkout-payment mt-32 space-y-12" aria-label={c.payment}>
                      <div className="bk-checkout-payment-heading">
                        <h3 className="text-heading-sm font-semibold text-charcoal">{c.payment}</h3>
                        <p className="mt-8 text-body-sm text-smoke">Scegli un’opzione per completare l’ordine.</p>
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
                              <span className="block font-semibold">{bankSubmitting ? 'Preparazione del bonifico…' : paymentCopy.bank}</span>
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
      <Footer />
    </>
  )
}

'use client'

import { useEffect, useRef, useState, type KeyboardEvent } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PageSkeleton from '@/components/PageSkeleton'
import Button from '@/components/Button'
import { CountryPrefixSelect, DeliveryCountrySelect } from '@/components/CountrySelect'
import { PaymentBadgesRow } from '@/components/PaymentLogos'
import { useCart } from '@/lib/cart-context'
import { formatPrice } from '@/lib/utils'
import { useRouter } from 'next/navigation'
import { saveOrderDraft } from '@/lib/order'
import { useI18n } from '@/lib/i18n-context'
import { commerceCopy } from '@/data/commerce-copy'
import { productLabel } from '@/data/product-labels'
import { useAuth } from '@/lib/auth-context'
import {
  getCountryByIso,
  getCountryByName,
  sanitizePhoneInput,
  validatePhoneForCountry,
  validatePostalCodeForCountry,
  type CountryIso,
  type EuropeanCountry,
} from '@/lib/countries'
import type { AddressSuggestion } from '@/app/api/address-autocomplete/route'

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

type FormFields = {
  email: string
  firstName: string
  lastName: string
  address: string
  addressComplement: string
  country: string
  city: string
  postalCode: string
  phone: string
  phoneCountry: CountryIso
  phoneCode: string
}

type FieldErrorKey = 'email' | 'firstName' | 'lastName' | 'phone' | 'address' | 'postalCode' | 'city'
type FieldErrors = Partial<Record<FieldErrorKey, string>>

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
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({})
  const [touchedFields, setTouchedFields] = useState<Partial<Record<FieldErrorKey, boolean>>>({})
  const [submitting, setSubmitting] = useState(false)
  const [bankSubmitting, setBankSubmitting] = useState(false)
  const [bankTransferOrder, setBankTransferOrder] = useState<BankTransferOrderState | null>(null)
  const [revealedBankDetails, setRevealedBankDetails] = useState<BankTransferCoords | null>(null)
  const [revealLoading, setRevealLoading] = useState(false)
  const [revealError, setRevealError] = useState('')
  const [copiedField, setCopiedField] = useState<string | null>(null)

  const [addressSuggestions, setAddressSuggestions] = useState<AddressSuggestion[]>([])
  const [addressDropdownOpen, setAddressDropdownOpen] = useState(false)
  const [addressLoading, setAddressLoading] = useState(false)
  const [addressActiveIndex, setAddressActiveIndex] = useState(-1)
  const [addressVerified, setAddressVerified] = useState(false)
  const [addressSearchedEmpty, setAddressSearchedEmpty] = useState(false)

  const paymentLock = useRef(false)
  const storageRestored = useRef(false)
  const exitingCheckout = useRef(false)
  const addressContainerRef = useRef<HTMLDivElement>(null)
  const addressQueryLockRef = useRef(false)

  const paymentCopy = {
    error: 'Impossibile avviare il pagamento. Riprova.',
    unavailable: 'Il pagamento con carta non è ancora disponibile.',
    card: 'Pagamento con carta',
    cardBody: 'Carta bancaria tramite Stripe 3D Secure',
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

  const [formData, setFormData] = useState<FormFields>({
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
          const restoredPhoneCountry = getCountryByIso(parsed.phoneCountry).iso
          setFormData((current) => ({
            ...current,
            ...parsed,
            phoneCountry: restoredPhoneCountry,
            phoneCode: getCountryByIso(restoredPhoneCountry).dialCode,
          }))
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
    setFormData((current) => ({
      ...current,
      email: current.email || user.email || '',
      firstName: current.firstName || user.user_metadata?.first_name || '',
      lastName: current.lastName || user.user_metadata?.last_name || '',
    }))
  }, [user])

  useEffect(() => {
    if (!addressDropdownOpen) return
    const handleOutside = (event: PointerEvent) => {
      if (!addressContainerRef.current?.contains(event.target as Node)) {
        setAddressDropdownOpen(false)
      }
    }
    document.addEventListener('pointerdown', handleOutside)
    return () => document.removeEventListener('pointerdown', handleOutside)
  }, [addressDropdownOpen])

  useEffect(() => {
    if (step !== 2) return
    if (addressQueryLockRef.current) {
      addressQueryLockRef.current = false
      return
    }
    const q = formData.address.trim()
    if (q.length < 3 || addressVerified) {
      setAddressSuggestions([])
      setAddressLoading(false)
      setAddressSearchedEmpty(false)
      return
    }

    const countryIso = getCountryByName(formData.country).iso
    const controller = new AbortController()
    const timer = window.setTimeout(async () => {
      setAddressLoading(true)
      setAddressSearchedEmpty(false)
      try {
        const res = await fetch(
          `/api/address-autocomplete?q=${encodeURIComponent(q)}&country=${encodeURIComponent(countryIso)}`,
          { signal: controller.signal },
        )
        if (!res.ok) {
          setAddressSuggestions([])
          return
        }
        const payload = (await res.json()) as { suggestions?: AddressSuggestion[] }
        const list = payload.suggestions || []
        setAddressSuggestions(list)
        setAddressActiveIndex(list.length > 0 ? 0 : -1)
        setAddressDropdownOpen(true)
        setAddressSearchedEmpty(list.length === 0)
      } catch (err) {
        if ((err as Error)?.name !== 'AbortError') {
          setAddressSuggestions([])
        }
      } finally {
        if (!controller.signal.aborted) {
          setAddressLoading(false)
        }
      }
    }, 280)

    return () => {
      window.clearTimeout(timer)
      controller.abort()
    }
  }, [formData.address, formData.country, step, addressVerified])

  if (!cartHydrated) return <PageSkeleton variant="checkout" label="Caricamento dell'ordine" />
  if (items.length === 0 && !bankTransferOrder) return null

  const phoneCountryObj = getCountryByIso(formData.phoneCountry)
  const deliveryCountryObj = getCountryByName(formData.country)

  const validateSingleField = (key: FieldErrorKey, data: FormFields): string | null => {
    switch (key) {
      case 'email': {
        const val = data.email.trim()
        if (!val) return 'Inserisci il tuo indirizzo email.'
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
          return 'Inserisci un indirizzo email valido (es. nome@email.it).'
        }
        return null
      }
      case 'firstName': {
        const val = data.firstName.trim()
        if (!val) return 'Inserisci il tuo nome.'
        if (val.length < 2) return 'Il nome deve contenere almeno 2 caratteri.'
        return null
      }
      case 'lastName': {
        const val = data.lastName.trim()
        if (!val) return 'Inserisci il tuo cognome.'
        if (val.length < 2) return 'Il cognome deve contenere almeno 2 caratteri.'
        return null
      }
      case 'phone':
        return validatePhoneForCountry(data.phoneCountry, data.phone, locale)
      case 'address': {
        const val = data.address.trim()
        if (!val) return 'Inserisci la via e il numero civico di consegna.'
        if (val.length < 4) return 'Inserisci un indirizzo completo (via e numero civico).'
        return null
      }
      case 'postalCode':
        return validatePostalCodeForCountry(data.country, data.postalCode, locale)
      case 'city': {
        const val = data.city.trim()
        if (!val) return 'Inserisci la città o località di consegna.'
        if (val.length < 2) return 'Inserisci il nome completo della città.'
        return null
      }
    }
  }

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
    const keys: FieldErrorKey[] = ['email', 'firstName', 'lastName', 'phone']
    const nextErrors: FieldErrors = { ...fieldErrors }
    const nextTouched = { ...touchedFields }
    let firstInvalid: FieldErrorKey | null = null

    for (const key of keys) {
      nextTouched[key] = true
      const err = validateSingleField(key, formData)
      if (err) {
        nextErrors[key] = err
        if (!firstInvalid) firstInvalid = key
      } else {
        delete nextErrors[key]
      }
    }

    setTouchedFields(nextTouched)
    setFieldErrors(nextErrors)

    if (firstInvalid) {
      setStep(1)
      setFormError(nextErrors[firstInvalid] || 'Verifica i dati evidenziati prima di proseguire.')
      window.setTimeout(() => document.getElementById(firstInvalid!)?.focus(), 0)
      return false
    }
    setFormError('')
    return true
  }

  const validateBeforePayment = () => {
    if (!validateStep1()) return false
    const keys: FieldErrorKey[] = ['address', 'postalCode', 'city']
    const nextErrors: FieldErrors = { ...fieldErrors }
    const nextTouched = { ...touchedFields }
    let firstInvalid: FieldErrorKey | null = null

    for (const key of keys) {
      nextTouched[key] = true
      const err = validateSingleField(key, formData)
      if (err) {
        nextErrors[key] = err
        if (!firstInvalid) firstInvalid = key
      } else {
        delete nextErrors[key]
      }
    }

    setTouchedFields(nextTouched)
    setFieldErrors(nextErrors)

    if (firstInvalid) {
      setFormError(nextErrors[firstInvalid] || 'Completa correttamente indirizzo, CAP e città di consegna.')
      window.setTimeout(() => document.getElementById(firstInvalid!)?.focus(), 0)
      return false
    }
    setFormError('')
    return true
  }

  const handleFieldBlur = (key: FieldErrorKey) => {
    setTouchedFields((prev) => ({ ...prev, [key]: true }))
    const err = validateSingleField(key, formData)
    setFieldErrors((prev) => {
      const next = { ...prev }
      if (err) next[key] = err
      else delete next[key]
      return next
    })
  }

  const updateField = (key: keyof FormFields, rawValue: string) => {
    const value = key === 'phone' ? sanitizePhoneInput(rawValue) : rawValue
    const updated = { ...formData, [key]: value }
    setFormData(updated)

    if (key === 'address') {
      setAddressVerified(false)
    }

    if (['email', 'firstName', 'lastName', 'phone', 'address', 'postalCode', 'city'].includes(key)) {
      const fKey = key as FieldErrorKey
      if (touchedFields[fKey]) {
        const err = validateSingleField(fKey, updated)
        setFieldErrors((prev) => {
          const next = { ...prev }
          if (err) next[fKey] = err
          else delete next[fKey]
          return next
        })
      }
    }
  }

  const handlePhoneCountrySelect = (country: EuropeanCountry) => {
    const updated: FormFields = {
      ...formData,
      phoneCountry: country.iso,
      phoneCode: country.dialCode,
    }
    setFormData(updated)
    if (touchedFields.phone || formData.phone.trim().length > 0) {
      setTouchedFields((prev) => ({ ...prev, phone: true }))
      const err = validateSingleField('phone', updated)
      setFieldErrors((prev) => {
        const next = { ...prev }
        if (err) next.phone = err
        else delete next.phone
        return next
      })
    }
  }

  const handleDeliveryCountrySelect = (country: EuropeanCountry) => {
    const updated: FormFields = {
      ...formData,
      country: country.name[locale],
    }
    setFormData(updated)
    setAddressSuggestions([])
    setAddressDropdownOpen(false)
    setAddressVerified(false)
    setAddressSearchedEmpty(false)

    if (touchedFields.postalCode && formData.postalCode.trim()) {
      const postalErr = validateSingleField('postalCode', updated)
      setFieldErrors((prev) => {
        const next = { ...prev }
        if (postalErr) next.postalCode = postalErr
        else delete next.postalCode
        return next
      })
    }
  }

  const applyAddressSuggestion = (suggestion: AddressSuggestion) => {
    addressQueryLockRef.current = true
    const updated: FormFields = {
      ...formData,
      address: suggestion.streetLine,
      postalCode: suggestion.postalCode || formData.postalCode,
      city: suggestion.city || formData.city,
    }
    setFormData(updated)
    setAddressVerified(true)
    setAddressDropdownOpen(false)
    setAddressSuggestions([])
    setAddressSearchedEmpty(false)
    setFieldErrors((prev) => {
      const next = { ...prev }
      delete next.address
      if (suggestion.postalCode) delete next.postalCode
      if (suggestion.city) delete next.city
      return next
    })
  }

  const handleAddressKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (!addressDropdownOpen || addressSuggestions.length === 0) return
    if (event.key === 'ArrowDown') {
      event.preventDefault()
      setAddressActiveIndex((prev) => (prev + 1) % addressSuggestions.length)
    } else if (event.key === 'ArrowUp') {
      event.preventDefault()
      setAddressActiveIndex((prev) => (prev - 1 + addressSuggestions.length) % addressSuggestions.length)
    } else if (event.key === 'Enter' && addressActiveIndex >= 0 && addressSuggestions[addressActiveIndex]) {
      event.preventDefault()
      applyAddressSuggestion(addressSuggestions[addressActiveIndex])
    } else if (event.key === 'Escape') {
      setAddressDropdownOpen(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (step === 1) {
      if (!validateStep1()) return
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
          items: items.map((item) => ({ productId: item.product.id, variantId: item.variantId, quantity: item.quantity })),
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
          items: items.map((item) => ({ productId: item.product.id, variantId: item.variantId, quantity: item.quantity })),
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
      window.setTimeout(() => setCopiedField((current) => (current === field ? null : current)), 1800)
    } catch { setCopiedField(null) }
  }

  const inputClass = (hasError?: boolean) =>
    `h-[52px] w-full rounded-[6px] border px-16 text-[15px] text-[#252823] placeholder:text-[#A3A3A3] transition-colors focus:outline-none ${
      hasError
        ? 'border-red-500 bg-red-50/20 focus:border-red-600 focus:ring-2 focus:ring-red-500/15'
        : 'border-[#DEDFD6] bg-white hover:border-[#252823]/40 focus:border-[#995033] focus:ring-2 focus:ring-[#995033]/15'
    }`

  return (
    <>
      <Header />
      <main id="main-content" className="bk-home bg-ivory">
        <div className="bg-white border-b border-hairline">
          <div className="container-custom py-24">
            <Link
              href="/panier"
              className="inline-flex items-center gap-12 text-body-sm text-smoke hover:text-braise transition-colors mb-16 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-braise focus-visible:ring-offset-2"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M13 8H3m0 0l4-4m-4 4l4 4" />
              </svg>
              {c.back}
            </Link>
            <div className="flex flex-wrap items-center justify-between gap-12">
              <h1 className="text-heading-md font-semibold text-charcoal">{c.checkoutTitle}</h1>
              <span className="inline-flex items-center gap-[8px] rounded-[6px] border border-[#34483A]/20 bg-[#34483A]/10 px-12 py-[6px] text-[13px] font-medium text-[#34483A]">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                  <path d="M3 6h11v10H3zM14 10h4l3 3v3h-7z" />
                  <circle cx="7" cy="18" r="2" />
                  <circle cx="18" cy="18" r="2" />
                </svg>
                Spedizione gratuita su tutto il catalogo
              </span>
            </div>
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

              <form onSubmit={handleSubmit} noValidate>
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
                      <p role="alert" className="mb-20 rounded-[6px] border border-red-200 bg-red-50 px-16 py-12 text-body-sm text-red-700">
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
                          onChange={(e) => updateField('email', e.target.value)}
                          onBlur={() => handleFieldBlur('email')}
                          required
                          autoComplete="email"
                          maxLength={160}
                          aria-invalid={Boolean(fieldErrors.email)}
                          aria-describedby={fieldErrors.email ? 'email-error' : undefined}
                          className={inputClass(Boolean(fieldErrors.email))}
                          placeholder="nome@email.it"
                        />
                        {fieldErrors.email && (
                          <p id="email-error" role="alert" className="mt-[6px] text-[13px] font-medium text-red-600">
                            {fieldErrors.email}
                          </p>
                        )}
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
                            onChange={(e) => updateField('firstName', e.target.value)}
                            onBlur={() => handleFieldBlur('firstName')}
                            required
                            autoComplete="given-name"
                            maxLength={80}
                            aria-invalid={Boolean(fieldErrors.firstName)}
                            aria-describedby={fieldErrors.firstName ? 'firstName-error' : undefined}
                            className={inputClass(Boolean(fieldErrors.firstName))}
                            placeholder="Marco"
                          />
                          {fieldErrors.firstName && (
                            <p id="firstName-error" role="alert" className="mt-[6px] text-[13px] font-medium text-red-600">
                              {fieldErrors.firstName}
                            </p>
                          )}
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
                            onChange={(e) => updateField('lastName', e.target.value)}
                            onBlur={() => handleFieldBlur('lastName')}
                            required
                            autoComplete="family-name"
                            maxLength={80}
                            aria-invalid={Boolean(fieldErrors.lastName)}
                            aria-describedby={fieldErrors.lastName ? 'lastName-error' : undefined}
                            className={inputClass(Boolean(fieldErrors.lastName))}
                            placeholder="Rossi"
                          />
                          {fieldErrors.lastName && (
                            <p id="lastName-error" role="alert" className="mt-[6px] text-[13px] font-medium text-red-600">
                              {fieldErrors.lastName}
                            </p>
                          )}
                        </div>
                      </div>

                      <div>
                        <label htmlFor="phone" className="block text-body-sm font-medium text-charcoal mb-8">
                          {c.phone}
                        </label>
                        <div className="grid grid-cols-1 gap-10 min-[420px]:grid-cols-[152px_minmax(0,1fr)]">
                          <CountryPrefixSelect
                            id="phoneCountry"
                            value={formData.phoneCountry}
                            onChange={handlePhoneCountrySelect}
                            ariaLabel="Prefisso telefonico internazionale"
                            hasError={Boolean(fieldErrors.phone)}
                          />
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={(e) => updateField('phone', e.target.value)}
                            onBlur={() => handleFieldBlur('phone')}
                            required
                            inputMode="tel"
                            autoComplete="tel-national"
                            maxLength={phoneCountryObj.phoneInputMaxLength}
                            aria-invalid={Boolean(fieldErrors.phone)}
                            aria-describedby={fieldErrors.phone ? 'phone-error' : 'phone-hint'}
                            className={inputClass(Boolean(fieldErrors.phone))}
                            placeholder={phoneCountryObj.phonePlaceholder}
                          />
                        </div>
                        {fieldErrors.phone ? (
                          <p id="phone-error" role="alert" className="mt-[6px] text-[13px] font-medium text-red-600">
                            {fieldErrors.phone}
                          </p>
                        ) : (
                          <p id="phone-hint" className="mt-[6px] text-[13px] text-smoke">
                            Il corriere utilizzerà questo numero per l’appuntamento di consegna (es. {phoneCountryObj.phoneExample}).
                          </p>
                        )}
                      </div>
                    </div>

                    <Button type="submit" size="lg" className="w-full mt-32 rounded-[6px]">
                      {c.nextDelivery}
                    </Button>
                  </div>
                )}

                {/* Step 2: Delivery */}
                {step === 2 && (
                  <div className="bg-white rounded-card border border-hairline p-24 md:p-32">
                    <div className="mb-24 flex flex-wrap items-start justify-between gap-12 border-b border-hairline pb-20">
                      <div>
                        <h2 className="text-heading-sm font-semibold text-charcoal mb-6">
                          {c.deliveryAddress}
                        </h2>
                        <p className="text-body-sm text-smoke">
                          {deliveryCountryObj.deliveryDelay[locale]} · Preavviso telefonico incluso.
                        </p>
                      </div>
                      <span className="inline-flex items-center gap-[6px] rounded-[6px] bg-[#34483A]/10 px-12 py-[6px] text-[12px] font-semibold text-[#34483A]">
                        Consegna gratuita · 0 €
                      </span>
                    </div>

                    <div className="space-y-20">
                      <div>
                        <label htmlFor="country" className="block text-body-sm font-medium text-charcoal mb-8">
                          Paese di consegna
                        </label>
                        <DeliveryCountrySelect
                          id="country"
                          value={formData.country}
                          onChange={handleDeliveryCountrySelect}
                          ariaLabel="Paese di consegna"
                          freeShippingBadge="Spedizione gratuita"
                        />
                      </div>

                      <div ref={addressContainerRef} className="relative">
                        <div className="mb-8 flex items-center justify-between gap-12">
                          <label htmlFor="address" className="block text-body-sm font-medium text-charcoal">
                            {c.deliveryAddress}
                          </label>
                          {addressVerified && (
                            <span className="inline-flex items-center gap-[5px] text-[12px] font-medium text-[#34483A]">
                              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                <path d="M3.5 8.5 6.5 11.5 12.5 5" />
                              </svg>
                              Indirizzo selezionato
                            </span>
                          )}
                        </div>
                        <div className="relative">
                          <input
                            type="text"
                            id="address"
                            name="address"
                            value={formData.address}
                            onChange={(e) => updateField('address', e.target.value)}
                            onFocus={() => {
                              if (addressSuggestions.length > 0) setAddressDropdownOpen(true)
                            }}
                            onBlur={() => handleFieldBlur('address')}
                            onKeyDown={handleAddressKeyDown}
                            required
                            autoComplete="off"
                            role="combobox"
                            aria-autocomplete="list"
                            aria-expanded={addressDropdownOpen && addressSuggestions.length > 0}
                            aria-controls="address-suggestions"
                            aria-activedescendant={
                              addressDropdownOpen && addressActiveIndex >= 0
                                ? `address-option-${addressActiveIndex}`
                                : undefined
                            }
                            maxLength={160}
                            aria-invalid={Boolean(fieldErrors.address)}
                            aria-describedby={fieldErrors.address ? 'address-error' : 'address-hint'}
                            className={`${inputClass(Boolean(fieldErrors.address))} pr-[44px]`}
                            placeholder={deliveryCountryObj.addressPlaceholder}
                          />
                          {addressLoading && (
                            <span className="pointer-events-none absolute right-[14px] top-1/2 -translate-y-1/2" aria-hidden="true">
                              <span className="block h-[16px] w-[16px] animate-spin rounded-full border-2 border-[#DEDFD6] border-t-[#995033]" />
                            </span>
                          )}
                        </div>

                        {addressDropdownOpen && (addressSuggestions.length > 0 || addressSearchedEmpty) && (
                          <div
                            id="address-suggestions"
                            className="absolute left-0 right-0 top-[calc(100%+6px)] z-40 overflow-hidden rounded-[8px] border border-[#DEDFD6] bg-white shadow-[0_18px_40px_rgba(37,40,35,0.14)]"
                          >
                            {addressSuggestions.length > 0 ? (
                              <>
                                <div className="border-b border-[#DEDFD6] bg-[#FAF9F6] px-[14px] py-[8px] text-[11px] font-semibold uppercase tracking-[0.08em] text-[#64685F]">
                                  Indirizzi reali suggeriti ({deliveryCountryObj.iso})
                                </div>
                                <ul role="listbox" className="max-h-[260px] divide-y divide-[#DEDFD6]/60 overflow-y-auto">
                                  {addressSuggestions.map((s, idx) => {
                                    const active = idx === addressActiveIndex
                                    return (
                                      <li
                                        key={s.id}
                                        id={`address-option-${idx}`}
                                        role="option"
                                        aria-selected={active}
                                        onMouseEnter={() => setAddressActiveIndex(idx)}
                                        onMouseDown={(e) => {
                                          e.preventDefault()
                                          applyAddressSuggestion(s)
                                        }}
                                        className={`flex cursor-pointer items-start gap-[10px] px-[14px] py-[11px] text-left transition-colors ${
                                          active ? 'bg-[#EEEEE7]' : 'bg-white hover:bg-[#FAF9F6]'
                                        }`}
                                      >
                                        <svg
                                          width="16"
                                          height="16"
                                          viewBox="0 0 24 24"
                                          fill="none"
                                          stroke="#995033"
                                          strokeWidth="1.8"
                                          className="mt-[2px] shrink-0"
                                          aria-hidden="true"
                                        >
                                          <path d="M12 21s-6-5.33-6-10a6 6 0 1 1 12 0c0 4.67-6 10-6 10Z" />
                                          <circle cx="12" cy="11" r="2.2" />
                                        </svg>
                                        <span className="min-w-0">
                                          <span className="block text-[14px] font-medium text-[#252823]">
                                            {s.streetLine}
                                          </span>
                                          <span className="block text-[12px] text-[#64685F]">
                                            {[s.postalCode, s.city, s.region].filter(Boolean).join(' · ')}
                                          </span>
                                        </span>
                                      </li>
                                    )
                                  })}
                                </ul>
                              </>
                            ) : (
                              <p className="px-[14px] py-[12px] text-[13px] text-[#64685F]">
                                Nessun suggerimento trovato per questa ricerca. Puoi inserire via, numero civico, CAP e città manualmente qui sotto.
                              </p>
                            )}
                          </div>
                        )}

                        {fieldErrors.address ? (
                          <p id="address-error" role="alert" className="mt-[6px] text-[13px] font-medium text-red-600">
                            {fieldErrors.address}
                          </p>
                        ) : (
                          <p id="address-hint" className="mt-[6px] text-[13px] text-smoke">
                            Inizia a scrivere via e città (es. “{deliveryCountryObj.addressPlaceholder} {deliveryCountryObj.cityPlaceholder}”) per compilare CAP e città in automatico.
                          </p>
                        )}
                      </div>

                      <div>
                        <label htmlFor="addressComplement" className="block text-body-sm font-medium text-charcoal mb-8">
                          Complemento indirizzo <span className="text-smoke">(facoltativo)</span>
                        </label>
                        <input
                          type="text"
                          id="addressComplement"
                          name="addressComplement"
                          value={formData.addressComplement}
                          onChange={(e) => updateField('addressComplement', e.target.value)}
                          autoComplete="address-line2"
                          maxLength={120}
                          className={inputClass(false)}
                          placeholder="Interno, edificio, scala, citofono, istruzioni di accesso…"
                        />
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
                            onChange={(e) => updateField('postalCode', e.target.value)}
                            onBlur={() => handleFieldBlur('postalCode')}
                            required
                            autoComplete="postal-code"
                            maxLength={12}
                            aria-invalid={Boolean(fieldErrors.postalCode)}
                            aria-describedby={fieldErrors.postalCode ? 'postalCode-error' : undefined}
                            className={inputClass(Boolean(fieldErrors.postalCode))}
                            placeholder={deliveryCountryObj.postalPlaceholder}
                          />
                          {fieldErrors.postalCode && (
                            <p id="postalCode-error" role="alert" className="mt-[6px] text-[13px] font-medium text-red-600">
                              {fieldErrors.postalCode}
                            </p>
                          )}
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
                            onChange={(e) => updateField('city', e.target.value)}
                            onBlur={() => handleFieldBlur('city')}
                            required
                            autoComplete="address-level2"
                            maxLength={100}
                            aria-invalid={Boolean(fieldErrors.city)}
                            aria-describedby={fieldErrors.city ? 'city-error' : undefined}
                            className={inputClass(Boolean(fieldErrors.city))}
                            placeholder={deliveryCountryObj.cityPlaceholder}
                          />
                          {fieldErrors.city && (
                            <p id="city-error" role="alert" className="mt-[6px] text-[13px] font-medium text-red-600">
                              {fieldErrors.city}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    {formError && (
                      <p role="alert" className="mt-24 rounded-[6px] border border-red-200 bg-red-50 px-16 py-12 text-body-sm text-red-700">
                        {formError}
                      </p>
                    )}

                    <div className="bk-checkout-payment mt-32 space-y-12" aria-label={c.payment}>
                      <div className="bk-checkout-payment-heading">
                        <h3 className="text-heading-sm font-semibold text-charcoal">{c.payment}</h3>
                        <p className="mt-8 text-body-sm text-smoke">Scegli una modalità sicura per completare l’ordine.</p>
                      </div>
                      <div className="grid gap-12 sm:grid-cols-2">
                        <button
                          type="submit"
                          className="min-h-[76px] w-full rounded-[6px] bg-charcoal px-20 py-14 text-left text-white transition-colors hover:bg-charcoal/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-braise focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
                          disabled={submitting || bankSubmitting}
                          aria-busy={submitting}
                        >
                          <span className="flex w-full items-center justify-between gap-16">
                            <span>
                              <span className="block font-semibold">{submitting ? 'Apertura del pagamento…' : paymentCopy.card}</span>
                              <span className="mt-4 block text-body-sm text-white/75">{paymentCopy.cardBody}</span>
                            </span>
                          </span>
                        </button>
                        <button
                          type="button"
                          className="min-h-[76px] w-full rounded-[6px] border border-charcoal bg-white px-20 py-14 text-left text-charcoal transition-colors hover:bg-mist focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-braise focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
                          onClick={handleBankTransfer}
                          disabled={submitting || bankSubmitting}
                          aria-busy={bankSubmitting}
                        >
                          <span className="flex items-center gap-16">
                            <span>
                              <span className="block font-semibold">{bankSubmitting ? 'Preparazione bonifico…' : paymentCopy.bank}</span>
                              <span className="mt-4 block text-body-sm text-smoke">{paymentCopy.bankBody}</span>
                            </span>
                          </span>
                        </button>
                      </div>
                      <Button type="button" variant="secondary" size="md" className="w-full rounded-[6px]" onClick={() => { setFormError(''); setStep(1) }}>
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
                  <div className="flex justify-between items-center text-body">
                    <span className="text-smoke">{c.delivery}</span>
                    <span className="font-semibold text-[#34483A]">
                      Gratuita · {deliveryCountryObj.name[locale]}
                    </span>
                  </div>
                </div>

                <div className="flex justify-between text-heading-sm pt-24 border-t border-hairline">
                  <span className="font-semibold text-charcoal">{c.total}</span>
                  <span className="font-semibold text-charcoal">{formatPrice(totalPrice)}</span>
                </div>

                <div className="mt-24 pt-20 border-t border-hairline space-y-10 text-[13px] text-smoke">
                  <p className="flex items-center gap-[8px]">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#34483A" strokeWidth="2" aria-hidden="true">
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                    Consegna gratuita inclusa senza minimo d’ordine
                  </p>
                  <p className="flex items-center gap-[8px]">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#34483A" strokeWidth="2" aria-hidden="true">
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                    Preavviso telefonico o SMS con sponda idraulica
                  </p>
                  <p className="flex items-center gap-[8px]">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#34483A" strokeWidth="2" aria-hidden="true">
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                    Recesso 14 giorni e assistenza dedicata
                  </p>
                  <PaymentBadgesRow className="pt-[6px]" />
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

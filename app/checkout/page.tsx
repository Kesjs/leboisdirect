'use client'

import { useEffect, useState } from 'react'
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
import { bankTransferDetails } from '@/data/bank-transfer'

export default function CheckoutPage() {
  const router = useRouter()
  const { items, totalPrice, clearCart } = useCart()
  const { locale } = useI18n()
  const c = commerceCopy[locale]
  const { user, loading: authLoading } = useAuth()
  const supabase = useMemo(() => createClient(), [])
  const [step, setStep] = useState(1)
  const [formError, setFormError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [bankSubmitting, setBankSubmitting] = useState(false)
  const [bankTransferReference, setBankTransferReference] = useState<string | null>(null)
  const [copiedField, setCopiedField] = useState<string | null>(null)
  const [previewItem, setPreviewItem] = useState<typeof items[number] | null>(null)
  const paymentState = typeof window !== 'undefined' ? new URLSearchParams(window.location.search).get('payment') : null
  const paymentCopy = locale === 'de'
    ? { cancelled: 'Zahlung abgebrochen. Sie können es erneut versuchen.', error: 'Die Zahlung konnte nicht gestartet werden. Bitte versuchen Sie es erneut.', unavailable: 'Die Zahlung ist derzeit nicht verfügbar.', card: 'Mit Karte bezahlen', cardBody: 'Sichere Weiterleitung zu Stripe Checkout.', bank: 'SEPA-Überweisung', bankBody: 'Erhalten Sie die Bankverbindung und Ihre Bestellreferenz.', bankTitle: 'Ihre SEPA-Überweisung', bankIntro: 'Überweisen Sie den Gesamtbetrag und geben Sie diese Bestellreferenz im Verwendungszweck an.', holder: 'Kontoinhaber', iban: 'IBAN', bic: 'BIC / SWIFT', reference: 'Überweisungsreferenz', copy: 'Kopieren', copied: 'Kopiert', close: 'Schließen', backToShop: 'Zurück zum Shop', processingTitle: 'Bearbeitungszeit', processingBody: 'Eine klassische SEPA-Überweisung kann 1 bis 2 Werktage dauern. Für eine schnellere Lieferung nutzen Sie, wenn möglich, eine Echtzeitüberweisung.', bankError: 'Die Überweisung konnte nicht vorbereitet werden. Bitte versuchen Sie es erneut.' }
    : locale === 'it'
      ? { cancelled: 'Pagamento annullato. Puoi riprovare.', error: 'Impossibile avviare il pagamento. Riprova.', unavailable: 'Il pagamento non è al momento disponibile.', card: 'Paga con carta', cardBody: 'Reindirizzamento sicuro a Stripe Checkout.', bank: 'Bonifico SEPA', bankBody: 'Ricevi le coordinate bancarie e il riferimento dell’ordine.', bankTitle: 'Il tuo bonifico SEPA', bankIntro: 'Effettua il bonifico per l’importo totale e indica questo riferimento nella causale.', holder: 'Intestatario', iban: 'IBAN', bic: 'BIC / SWIFT', reference: 'Riferimento del bonifico', copy: 'Copia', copied: 'Copiato', close: 'Chiudi', backToShop: 'Torna al negozio', processingTitle: 'Tempi di elaborazione', processingBody: 'Un bonifico SEPA classico può richiedere da 1 a 2 giorni lavorativi. Per una consegna più rapida, usa un bonifico istantaneo se la tua banca lo consente.', bankError: 'Impossibile preparare il bonifico. Riprova.' }
      : { cancelled: 'Paiement annulé. Vous pouvez réessayer.', error: 'Le paiement n’a pas pu être lancé. Réessayez.', unavailable: 'Le paiement est momentanément indisponible.', card: 'Payer par carte', cardBody: 'Redirection sécurisée vers Stripe Checkout.', bank: 'Virement SEPA', bankBody: 'Recevez les coordonnées bancaires et la référence de commande.', bankTitle: 'Votre virement SEPA', bankIntro: 'Effectuez le virement du montant total et indiquez cette référence dans le libellé.', holder: 'Titulaire du compte', iban: 'IBAN', bic: 'BIC / SWIFT', reference: 'Référence du virement', copy: 'Copier', copied: 'Copié', close: 'Fermer', backToShop: 'Retour à la boutique', processingTitle: 'Délai de traitement', processingBody: 'Un virement SEPA classique peut prendre 1 à 2 jours ouvrés. Pour une livraison plus rapide, privilégiez un virement instantané si votre banque le propose.', bankError: 'Le virement n’a pas pu être préparé. Réessayez.' }
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    addressComplement: '',
    country: 'France',
    city: '',
    postalCode: '',
    phone: '',
    phoneCountry: 'FR',
    phoneCode: '+33',
  })
  useEffect(() => {
    try {
      const saved = window.localStorage.getItem('braviko-checkout-form')
      if (saved) setFormData(current => ({ ...current, ...JSON.parse(saved) }))
      if (window.localStorage.getItem('braviko-checkout-step') === '2') setStep(2)
    } catch { /* Continue with an empty form when browser storage is unavailable. */ }
  }, [])
  useEffect(() => {
    try {
      window.localStorage.setItem('braviko-checkout-form', JSON.stringify(formData))
      window.localStorage.setItem('braviko-checkout-step', String(step))
    } catch { /* The active checkout remains usable without browser storage. */ }
  }, [formData, step])

  useEffect(() => {
    if (!authLoading && !user) router.replace('/connexion?mode=signup&next=/checkout&reason=checkout')
    else if (items.length === 0 && step === 1) router.replace('/panier')
  }, [authLoading, items.length, router, step, user])
  useEffect(() => {
    if (!user) return
    setFormData(current => ({
      ...current,
      email: current.email || user.email || '',
      firstName: current.firstName || user.user_metadata?.first_name || '',
      lastName: current.lastName || user.user_metadata?.last_name || '',
    }))
  }, [user])
  if (authLoading) return <PageSkeleton variant="checkout" label="Chargement de la commande" />
  if (!user || (items.length === 0 && step === 1)) return null

  const createPendingOrder = async () => {
    const draft = createOrderDraft(formData, items, totalPrice)
    const orderItems = items.map(item => {
      const variant = item.product.variants?.find(value => value.id === item.variantId)
      return {
        product_id: item.product.id,
        variant_id: item.variantId ?? null,
        product_name: productLabel(item.product, locale).name,
        variant_label: variant?.label ?? (variant?.volume ? `${variant.volume} stère(s)` : null),
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
      setStep(step + 1)
      return
    }

    setSubmitting(true)
    setFormError('')
    try {
      const draft = await createPendingOrder()
      const checkoutResponse = await fetch('/api/stripe/checkout', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ reference: draft.reference, locale, items: items.map(item => ({ productId: item.product.id, variantId: item.variantId, quantity: item.quantity })) }) })
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
      setFormError(userMessage || (code === 'STRIPE_NOT_CONFIGURED' ? paymentCopy.unavailable : code === 'AUTH_REQUIRED' ? 'Votre session a expiré. Veuillez vous reconnecter.' : code === 'PRODUCT_UNAVAILABLE' ? 'Un des produits du panier n’est plus disponible.' : paymentCopy.error))
      setSubmitting(false)
    }
  }

  const handleBankTransfer = async () => {
    setBankSubmitting(true)
    setFormError('')
    try {
      const draft = await createPendingOrder()
      const response = await fetch('/api/bank-transfer', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ reference: draft.reference }) })
      if (!response.ok) throw new Error('BANK_TRANSFER_UNAVAILABLE')
      setBankTransferReference(draft.reference)
      try { window.localStorage.removeItem('braviko-checkout-step') } catch { /* Ignore unavailable storage. */ }
    } catch (error) {
      const code = error instanceof Error ? error.message : 'BANK_TRANSFER_UNAVAILABLE'
      setFormError(code === 'AUTH_REQUIRED' ? 'Votre session a expiré. Veuillez vous reconnecter.' : paymentCopy.bankError)
    } finally {
      setBankSubmitting(false)
    }
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
          <div className="container-custom py-32">
            <Link
              href="/panier"
              className="inline-flex items-center gap-12 text-body-sm text-smoke hover:text-braise transition-colors mb-24"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M13 8H3m0 0l4-4m-4 4l4 4" />
              </svg>
              {c.back}
            </Link>
            <h1 className="text-heading-lg font-semibold text-charcoal">{c.checkoutTitle}</h1>
          </div>
        </div>

        <div className="container-custom py-64">
          <div className="grid lg:grid-cols-12 gap-48">
            {/* Form */}
            <div className="lg:col-span-7">
              {/* Progress */}
              <div className="flex items-center justify-between mb-48">
                {[1, 2].map((s) => (
                  <div key={s} className="flex items-center flex-1">
                    <button
                      type="button"
                      onClick={() => s < step && setStep(s)}
                      aria-label={s < step ? `Revenir à l’étape ${s}` : `Étape ${s}`}
                      className={`w-40 h-40 rounded-full flex items-center justify-center text-body-sm font-semibold transition-colors ${
                        s <= step
                          ? 'bg-charcoal text-white'
                          : 'bg-mist text-ash border border-hairline'
                      } ${s < step ? 'cursor-pointer hover:bg-braise' : 'cursor-default'}`}
                    >
                      {s}
                    </button>
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
                  <div className="bg-white rounded-card border border-hairline p-32">
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
                          className="w-full px-16 py-12 border border-hairline rounded-card text-body text-charcoal focus:outline-none focus:ring-2 focus:ring-charcoal"
                          placeholder="votre@email.fr"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-20">
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
                                const codes: Record<string, string> = { FR: '+33', BE: '+32', CH: '+41', LU: '+352', DE: '+49', IT: '+39' }
                                setFormData({ ...formData, phoneCountry: event.target.value, phoneCode: codes[event.target.value] ?? '+33' })
                              }}
                              aria-label="Pays du téléphone"
                              className="w-full px-12 py-12 border border-hairline rounded-card bg-white text-body text-charcoal focus:border-braise focus:outline-none"
                            >
                            <option value="FR">FR +33</option>
                            <option value="BE">BE +32</option>
                            <option value="CH">CH +41</option>
                            <option value="LU">LU +352</option>
                            <option value="DE">DE +49</option>
                            <option value="IT">IT +39</option>
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
                            className="w-full px-16 py-12 border border-hairline rounded-card text-body text-charcoal focus:border-braise focus:outline-none"
                            placeholder="06 12 34 56 78"
                          />
                        </div>
                        <p className="mt-8 text-body-sm text-smoke">Choisissez votre pays, puis indiquez votre numéro de téléphone.</p>
                      </div>
                    </div>
                    <Button type="submit" size="lg" className="w-full mt-32 rounded-card">
                      {c.nextDelivery}
                    </Button>
                  </div>
                )}

                {/* Step 2: Delivery */}
                {step === 2 && (
                  <div className="bg-white rounded-card border border-hairline p-32">
                      <h2 className="text-heading-sm font-semibold text-charcoal mb-8">
                      {c.deliveryAddress}
                    </h2>
                    <p className="text-body-sm text-smoke mb-24">Indiquez l’adresse complète où votre commande doit être livrée.</p>
                    <div className="space-y-20">
                      <div>
                        <label htmlFor="country" className="block text-body-sm font-medium text-charcoal mb-8">Pays de livraison</label>
                        <select id="country" name="country" value={formData.country} onChange={handleInputChange} required className="w-full px-16 py-12 border border-hairline rounded-card bg-white text-body text-charcoal focus:border-braise focus:outline-none">
                          <option>France</option><option>Belgique</option><option>Luxembourg</option><option>Suisse</option><option>Allemagne</option><option>Italie</option>
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
                          className="w-full px-16 py-12 border border-hairline rounded-card text-body text-charcoal focus:border-braise focus:outline-none"
                          placeholder="12 rue de la République"
                        />
                      </div>
                      <div>
                        <label htmlFor="addressComplement" className="block text-body-sm font-medium text-charcoal mb-8">Complément d’adresse <span className="text-smoke">(facultatif)</span></label>
                        <input type="text" id="addressComplement" name="addressComplement" value={formData.addressComplement} onChange={handleInputChange} className="w-full px-16 py-12 border border-hairline rounded-card text-body text-charcoal focus:border-braise focus:outline-none" placeholder="Appartement, bâtiment, étage, portail…" />
                      </div>
                      <div className="grid grid-cols-2 gap-20">
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
                            className="w-full px-16 py-12 border border-hairline rounded-card text-body text-charcoal focus:border-braise focus:outline-none"
                            placeholder="Paris"
                          />
                        </div>
                      </div>
                    </div>
                    {formError && <p role="alert" className="mt-24 rounded-card border border-red-200 bg-red-50 px-16 py-12 text-body-sm text-red-700">{formError}</p>}
                    <div className="mt-32 space-y-12" aria-label={c.payment}>
                      <Button type="submit" size="lg" className="w-full rounded-card" disabled={submitting || bankSubmitting} aria-busy={submitting}>
                        <span className="flex w-full items-center justify-between gap-16">
                          <span>{submitting ? 'Ouverture du paiement sécurisé…' : paymentCopy.card}</span>
                          <span aria-hidden="true">→</span>
                        </span>
                      </Button>
                      <p className="text-center text-body-sm text-smoke">{paymentCopy.cardBody}</p>
                      <div className="flex items-center gap-12 py-4 text-body-sm text-smoke"><span className="h-px flex-1 bg-hairline" /><span>ou</span><span className="h-px flex-1 bg-hairline" /></div>
                      <button type="button" className="w-full rounded-card border border-charcoal bg-white px-20 py-16 text-left text-charcoal transition-colors hover:bg-mist disabled:cursor-not-allowed disabled:opacity-60" onClick={handleBankTransfer} disabled={submitting || bankSubmitting} aria-busy={bankSubmitting}>
                        <span className="flex items-center justify-between gap-16">
                          <span>
                            <span className="block font-semibold">{bankSubmitting ? 'Préparation du virement…' : paymentCopy.bank}</span>
                            <span className="mt-4 block text-body-sm text-smoke">{paymentCopy.bankBody}</span>
                          </span>
                          <span aria-hidden="true">↗</span>
                        </span>
                      </button>
                      <Button type="button" variant="secondary" size="md" className="w-full rounded-card" onClick={() => setStep(1)}>
                        {c.back}
                      </Button>
                    </div>
                  </div>
                )}

              </form>
            </div>

            {/* Summary */}
            <div className="lg:col-span-5">
              <div className="sticky top-[120px] bg-white rounded-card border border-hairline p-32">
                <h2 className="text-heading-sm font-semibold text-charcoal mb-24">
                  {c.summary}
                </h2>

                <div className="space-y-20 mb-24 pb-24 border-b border-hairline">
                  {items.map((item) => {
                    const variant = item.product.variants?.find((v) => v.id === item.variantId)
                    const price = variant?.price || item.product.price

                    return (
                      <div key={`${item.product.id}-${item.variantId}`} className="flex gap-16">
                        <button
                          type="button"
                          className="relative w-64 h-64 flex-shrink-0 rounded-card overflow-hidden cursor-zoom-in focus:outline-none focus-visible:ring-2 focus-visible:ring-braise"
                          onClick={() => setPreviewItem(item)}
                          aria-label={`Agrandir ${productLabel(item.product, locale).name}`}
                        >
                          <Image
                            src={item.product.image}
                            alt={item.product.name}
                            fill
                            className="object-cover"
                            sizes="64px"
                          />
                        </button>
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
      {previewItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal/60 p-20" role="dialog" aria-modal="true" aria-label="Aperçu du produit" onClick={() => setPreviewItem(null)}>
          <div className="relative grid w-full max-w-2xl gap-24 rounded-card bg-white p-24 md:grid-cols-2 md:p-32" onClick={(event) => event.stopPropagation()}>
            <button type="button" className="absolute right-16 top-12 text-2xl text-smoke hover:text-charcoal" onClick={() => setPreviewItem(null)} aria-label="Fermer">×</button>
            <div className="relative aspect-square overflow-hidden rounded-card bg-mist">
              <Image src={previewItem.product.image} alt={productLabel(previewItem.product, locale).name} fill className="object-cover" sizes="(max-width: 768px) 90vw, 320px" />
            </div>
            <div className="flex flex-col justify-center gap-16 pr-8">
              <h2 className="text-heading-sm font-semibold text-charcoal">{productLabel(previewItem.product, locale).name}</h2>
              <p className="text-body-sm text-smoke">{c.quantity}: {previewItem.quantity}</p>
              <p className="text-body font-semibold text-charcoal">{formatPrice((previewItem.product.variants?.find((v) => v.id === previewItem.variantId)?.price ?? previewItem.product.price) * previewItem.quantity)}</p>
              <Link href="/panier" className="rounded-card bg-charcoal px-20 py-12 text-center text-body-sm font-medium text-white hover:bg-charcoal/90">Modifier dans le panier</Link>
              <Link href={`/produit/${previewItem.product.slug}`} className="rounded-card border border-charcoal px-20 py-12 text-center text-body-sm font-medium text-charcoal hover:bg-charcoal/5">Voir la fiche produit</Link>
            </div>
          </div>
        </div>
      )}
      {bankTransferReference && (
        <div className="fixed inset-0 z-50 flex items-stretch justify-center bg-charcoal/60 sm:items-center sm:p-20" role="dialog" aria-modal="true" aria-labelledby="bank-transfer-title">
          <div className="relative h-full w-full max-w-lg overflow-y-auto bg-white p-24 shadow-2xl sm:h-auto sm:max-h-[min(92dvh,760px)] sm:rounded-card sm:p-32">
            <button type="button" className="absolute right-20 top-16 rounded-full px-8 py-4 text-2xl leading-none text-smoke hover:text-charcoal" onClick={() => setBankTransferReference(null)} aria-label={paymentCopy.close}>×</button>
            <div className="mb-24 flex items-center justify-between gap-16 border-b border-hairline pb-16 pr-32">
              <h2 className="text-heading-sm font-semibold text-charcoal">{c.summary}</h2>
              <button type="button" className="rounded-card bg-amber-300 px-16 py-10 text-body-sm font-semibold text-charcoal hover:bg-amber-400" onClick={() => setBankTransferReference(null)}>{c.back}</button>
            </div>
            <div className="mb-24 pr-32">
              <p className="text-body-sm font-semibold uppercase tracking-[0.16em] text-braise">BRAVIKO / {paymentCopy.bank}</p>
              <h3 id="bank-transfer-title" className="mt-8 text-heading-sm font-semibold text-charcoal">{paymentCopy.bankTitle}</h3>
              <p className="mt-8 text-body-sm leading-relaxed text-smoke">{paymentCopy.bankIntro}</p>
            </div>
            <div className="mb-20 rounded-card border border-hairline bg-mist p-16">
              <div className="flex items-center justify-between gap-16 text-body-sm"><span className="text-smoke">{c.total}</span><strong className="text-charcoal">{formatPrice(totalPrice)}</strong></div>
              <div className="mt-8 flex items-center justify-between gap-16 text-body-sm"><span className="text-smoke">{paymentCopy.reference}</span><strong className="text-charcoal">{bankTransferReference}</strong></div>
            </div>
            <div className="space-y-12">
              {[
                [paymentCopy.holder, bankTransferDetails.accountHolder, 'holder'],
                [paymentCopy.iban, bankTransferDetails.iban, 'iban'],
                [paymentCopy.bic, bankTransferDetails.bic, 'bic'],
                [paymentCopy.reference, bankTransferReference, 'reference'],
              ].map(([label, value, field]) => (
                <div key={field} className="flex items-center justify-between gap-12 rounded-card border border-hairline bg-white px-16 py-12">
                  <div className="min-w-0"><p className="text-body-sm text-smoke">{label}</p><p className="mt-4 break-all font-medium text-charcoal">{value}</p></div>
                  <button type="button" className="shrink-0 rounded-card bg-charcoal px-12 py-8 text-body-sm font-medium text-white hover:bg-charcoal/90" onClick={() => copyBankValue(field, value)}>{copiedField === field ? paymentCopy.copied : paymentCopy.copy}</button>
                </div>
              ))}
            </div>
            <div className="mt-20 rounded-card border border-amber-200 bg-amber-50 p-16 text-body-sm leading-relaxed text-amber-900">
              <p className="font-semibold">◷ {paymentCopy.processingTitle}</p>
              <p className="mt-8">{paymentCopy.processingBody}</p>
            </div>
            <button type="button" className="mt-24 w-full rounded-card bg-charcoal px-20 py-14 text-center text-body-sm font-medium text-white hover:bg-charcoal/90" onClick={() => { clearCart(); router.push('/boutique') }}>{paymentCopy.backToShop}</button>
          </div>
        </div>
      )}
      <Footer />
    </>
  )
}

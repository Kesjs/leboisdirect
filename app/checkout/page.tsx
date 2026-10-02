'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
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

export default function CheckoutPage() {
  const router = useRouter()
  const { items, totalPrice, clearCart } = useCart()
  const { locale } = useI18n()
  const c = commerceCopy[locale]
  const { user, isAdmin, loading: authLoading } = useAuth()
  const supabase = useMemo(() => createClient(), [])
  const [step, setStep] = useState(1)
  const [paymentAcknowledged, setPaymentAcknowledged] = useState(false)
  const [formError, setFormError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const paymentState = typeof window !== 'undefined' ? new URLSearchParams(window.location.search).get('payment') : null
  const paymentCopy = locale === 'de'
    ? { cancelled: 'Zahlung abgebrochen. Sie können es erneut versuchen.', error: 'Die Zahlung konnte nicht gestartet werden. Bitte versuchen Sie es erneut.', unavailable: 'Die Zahlung ist derzeit nicht verfügbar.' }
    : locale === 'it'
      ? { cancelled: 'Pagamento annullato. Puoi riprovare.', error: 'Impossibile avviare il pagamento. Riprova.', unavailable: 'Il pagamento non è al momento disponibile.' }
      : { cancelled: 'Paiement annulé. Vous pouvez réessayer.', error: 'Le paiement n’a pas pu être lancé. Réessayez.', unavailable: 'Le paiement est momentanément indisponible.' }
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    postalCode: '',
    phone: '',
  })

  useEffect(() => {
    if (!authLoading && isAdmin) router.replace('/admin')
    else if (!authLoading && !user) router.replace('/connexion?next=/checkout&reason=checkout')
    else if (items.length === 0 && step === 1) router.replace('/panier')
  }, [authLoading, isAdmin, items.length, router, step, user])
  useEffect(() => {
    if (!user) return
    setFormData(current => ({
      ...current,
      email: current.email || user.email || '',
      firstName: current.firstName || user.user_metadata?.first_name || '',
      lastName: current.lastName || user.user_metadata?.last_name || '',
    }))
  }, [user])
  if (authLoading || !user || isAdmin || (items.length === 0 && step === 1)) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (step < 3) {
      setFormError('')
      setStep(step + 1)
    } else {
      if (!paymentAcknowledged) { setFormError(c.acknowledgement); return }
      setSubmitting(true)
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
          phone: formData.phone, address: formData.address, postal_code: formData.postalCode, city: formData.city,
        },
        p_items: orderItems,
      })
      if (error) {
        setFormError(error.message)
        setSubmitting(false)
        return
      }
      saveOrderDraft(draft)
      const checkoutResponse = await fetch('/api/stripe/checkout', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ reference: draft.reference, locale, items: items.map(item => ({ productId: item.product.id, variantId: item.variantId, quantity: item.quantity })) }) })
      const checkoutResult = await checkoutResponse.json().catch(() => ({}))
      if (!checkoutResponse.ok || !checkoutResult.url) { setFormError(checkoutResult.error === 'STRIPE_NOT_CONFIGURED' ? paymentCopy.unavailable : paymentCopy.error); setSubmitting(false); return }
      window.location.assign(checkoutResult.url)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
                {[1, 2, 3].map((s) => (
                  <div key={s} className="flex items-center flex-1">
                    <div
                      className={`w-40 h-40 rounded-full flex items-center justify-center text-body-sm font-semibold transition-colors ${
                        s <= step
                          ? 'bg-charcoal text-white'
                          : 'bg-mist text-ash border border-hairline'
                      }`}
                    >
                      {s}
                    </div>
                    {s < 3 && (
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
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          required
                          className="w-full px-16 py-12 border border-hairline rounded-card text-body text-charcoal focus:outline-none focus:ring-2 focus:ring-charcoal"
                          placeholder="06 12 34 56 78"
                        />
                      </div>
                    </div>
                    <Button type="submit" size="lg" className="w-full mt-32">
                      {c.nextDelivery}
                    </Button>
                  </div>
                )}

                {/* Step 2: Delivery */}
                {step === 2 && (
                  <div className="bg-white rounded-card border border-hairline p-32">
                    <h2 className="text-heading-sm font-semibold text-charcoal mb-24">
                      {c.deliveryAddress}
                    </h2>
                    <div className="space-y-20">
                      <div>
                        <label htmlFor="address" className="block text-body-sm font-medium text-charcoal mb-8">
                          {c.address}
                        </label>
                        <input
                          type="text"
                          id="address"
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          required
                          className="w-full px-16 py-12 border border-hairline rounded-card text-body text-charcoal focus:outline-none focus:ring-2 focus:ring-charcoal"
                          placeholder="12 rue de la République"
                        />
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
                            className="w-full px-16 py-12 border border-hairline rounded-card text-body text-charcoal focus:outline-none focus:ring-2 focus:ring-charcoal"
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
                            className="w-full px-16 py-12 border border-hairline rounded-card text-body text-charcoal focus:outline-none focus:ring-2 focus:ring-charcoal"
                            placeholder="Paris"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-16 mt-32">
                      <Button
                        type="button"
                        variant="secondary"
                        size="lg"
                        className="flex-1"
                        onClick={() => setStep(1)}
                      >
                        {c.back}
                      </Button>
                      <Button type="submit" size="lg" className="flex-1">
                        {c.nextPayment}
                      </Button>
                    </div>
                  </div>
                )}

                {/* Step 3: Payment */}
                {step === 3 && (
                  <div className="bg-white rounded-card border border-hairline p-32">
                    <h2 className="text-heading-sm font-semibold text-charcoal mb-24">{c.payment}</h2>
                    {paymentState === 'cancelled' && <p role="alert" className="text-body-sm text-braise mb-16">{paymentCopy.cancelled}</p>}
                    <div className="bg-ivory/50 rounded-card border border-hairline p-24 mb-24">
                      <p className="text-body-sm text-smoke">
                        {c.pending}
                      </p>
                    </div>
                    <label className="flex gap-12 items-start text-body-sm text-smoke mb-20">
                      <input type="checkbox" checked={paymentAcknowledged} onChange={(event) => setPaymentAcknowledged(event.target.checked)} className="mt-4 accent-braise" />
                      <span>{c.acknowledgement}</span>
                    </label>
                    {formError && <p role="alert" className="text-body-sm text-braise mb-16">{formError}</p>}
                    <div className="flex gap-16">
                      <Button
                        type="button"
                        variant="secondary"
                        size="lg"
                        className="flex-1"
                        onClick={() => setStep(2)}
                      >
                        {c.back}
                      </Button>
                      <Button type="submit" size="lg" className="flex-1" disabled={submitting}>
                        {submitting ? '…' : c.request}
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

'use client'

import Link from 'next/link'
import Image from 'next/image'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Button from '@/components/Button'
import { useCart } from '@/lib/cart-context'
import { formatPrice } from '@/lib/utils'

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalPrice } = useCart()

  if (items.length === 0) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-ivory">
          <div className="container-custom py-120">
            <div className="max-w-[600px] mx-auto text-center">
              <svg
                width="80"
                height="80"
                viewBox="0 0 80 80"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="mx-auto mb-32 text-ash"
              >
                <path d="M10 10h10l8.4 42a10 10 0 0010 8h32a10 10 0 0010-8L85 25H25" />
                <circle cx="35" cy="70" r="5" />
                <circle cx="65" cy="70" r="5" />
              </svg>
              <h1 className="text-heading-lg font-semibold text-charcoal mb-20">
                Votre panier est vide
              </h1>
              <p className="text-body-lg text-smoke mb-48">
                Découvrez notre sélection de bois de chauffage premium et commencez votre commande.
              </p>
              <Link href="/boutique">
                <Button size="lg">Découvrir nos produits</Button>
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-ivory">
        <div className="bg-white border-b border-hairline">
          <div className="container-custom py-48">
            <h1 className="text-heading-lg md:text-display font-semibold text-charcoal tracking-tight">
              Votre panier
            </h1>
          </div>
        </div>

        <div className="container-custom py-64">
          <div className="grid lg:grid-cols-12 gap-48">
            <div className="lg:col-span-8">
              <div className="space-y-24">
                {items.map((item) => {
                  const variant = item.product.variants?.find((v) => v.id === item.variantId)
                  const price = variant?.price || item.product.price

                  return (
                    <div
                      key={`${item.product.id}-${item.variantId || 'default'}`}
                      className="bg-white rounded-card border border-hairline p-24 flex gap-24"
                    >
                      <div className="relative w-120 h-120 flex-shrink-0 rounded-card overflow-hidden bg-mist">
                        <Image
                          src={item.product.image}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                          sizes="120px"
                        />
                      </div>

                      <div className="flex-1">
                        <div className="flex justify-between gap-16 mb-12">
                          <div>
                            <h3 className="text-heading-sm font-semibold text-charcoal mb-8">
                              {item.product.name}
                            </h3>
                            {variant && (
                              <p className="text-body-sm text-smoke">
                                {variant.volume} stère{variant.volume && variant.volume > 1 ? 's' : ''}
                              </p>
                            )}
                          </div>
                          <button
                            onClick={() => removeItem(item.product.id, item.variantId)}
                            className="text-smoke hover:text-braise transition-colors h-fit"
                            aria-label="Retirer du panier"
                          >
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M15 5L5 15M5 5l10 10" />
                            </svg>
                          </button>
                        </div>

                        <p className="text-heading font-semibold text-charcoal mb-20">
                          {formatPrice(price)}
                        </p>

                        <div className="flex items-center gap-12">
                          <div className="flex items-center gap-8 bg-ivory rounded-card border border-hairline">
                            <button
                              onClick={() =>
                                updateQuantity(
                                  item.product.id,
                                  item.quantity - 1,
                                  item.variantId
                                )
                              }
                              className="w-40 h-40 flex items-center justify-center text-charcoal hover:bg-mist transition-colors"
                              aria-label="Diminuer"
                            >
                              −
                            </button>
                            <span className="text-body font-medium text-charcoal w-40 text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(
                                  item.product.id,
                                  item.quantity + 1,
                                  item.variantId
                                )
                              }
                              className="w-40 h-40 flex items-center justify-center text-charcoal hover:bg-mist transition-colors"
                              aria-label="Augmenter"
                            >
                              +
                            </button>
                          </div>
                          <span className="text-body-sm text-smoke">
                            Total: {formatPrice(price * item.quantity)}
                          </span>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>

              <Link
                href="/boutique"
                className="inline-flex items-center gap-12 mt-32 text-body text-smoke hover:text-braise transition-colors"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M13 8H3m0 0l4-4m-4 4l4 4" />
                </svg>
                Continuer mes achats
              </Link>
            </div>

            <div className="lg:col-span-4">
              <div className="sticky top-[120px] bg-white rounded-card border border-hairline p-32">
                <h2 className="text-heading-sm font-semibold text-charcoal mb-24">
                  Résumé de la commande
                </h2>

                <div className="space-y-16 mb-24 pb-24 border-b border-hairline">
                  <div className="flex justify-between text-body">
                    <span className="text-smoke">Sous-total</span>
                    <span className="font-semibold text-charcoal">{formatPrice(totalPrice)}</span>
                  </div>
                  <div className="flex justify-between text-body">
                    <span className="text-smoke">Livraison</span>
                    <span className="text-smoke">Calculée à l'étape suivante</span>
                  </div>
                </div>

                <div className="flex justify-between text-heading mb-32">
                  <span className="font-semibold text-charcoal">Total</span>
                  <span className="font-semibold text-charcoal">{formatPrice(totalPrice)}</span>
                </div>

                <Link href="/checkout">
                  <Button size="lg" className="w-full">
                    Procéder au paiement
                  </Button>
                </Link>

                <p className="text-caption text-ash mt-20 text-center">
                  Paiement sécurisé et livraison rapide
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

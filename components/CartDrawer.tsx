'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useCart } from '@/lib/cart-context'
import { formatPrice } from '@/lib/utils'
import Button from './Button'

interface CartDrawerProps {
  isOpen: boolean
  onClose: () => void
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const { items, removeItem, updateQuantity, totalItems, totalPrice } = useCart()

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-charcoal/40 backdrop-blur-sm z-50 transition-opacity"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed right-0 top-0 bottom-0 w-full max-w-[480px] bg-white shadow-2xl z-50 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-24 border-b border-hairline">
          <h2 className="text-heading-sm font-semibold text-charcoal">
            Panier ({totalItems})
          </h2>
          <button
            onClick={onClose}
            className="p-8 hover:bg-mist rounded-full transition-colors"
            aria-label="Fermer le panier"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M15 5L5 15M5 5l10 10" />
            </svg>
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-24">
          {items.length === 0 ? (
            <div className="text-center py-64">
              <svg
                width="64"
                height="64"
                viewBox="0 0 64 64"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="mx-auto mb-20 text-ash"
              >
                <path d="M8 8h8l6.72 33.6a8 8 0 008 6.4h25.6a8 8 0 008-6.4L68 20H20" />
                <circle cx="28" cy="56" r="4" />
                <circle cx="52" cy="56" r="4" />
              </svg>
              <p className="text-body text-smoke mb-24">Votre panier est vide</p>
              <Button onClick={onClose}>Découvrir les bois</Button>
            </div>
          ) : (
            <div className="space-y-24">
              {items.map((item) => {
                const variant = item.product.variants?.find((v) => v.id === item.variantId)
                const price = variant?.price || item.product.price

                return (
                  <div
                    key={`${item.product.id}-${item.variantId || 'default'}`}
                    className="flex gap-16 bg-ivory/50 rounded-card p-16 border border-hairline"
                  >
                    <div className="relative w-80 h-80 flex-shrink-0 rounded-card overflow-hidden bg-white">
                      <Image
                        src={item.product.image}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="text-body font-semibold text-charcoal mb-4 truncate">
                        {item.product.name}
                      </h3>
                      {variant && (
                        <p className="text-body-sm text-smoke mb-8">
                          {variant.volume} stère{variant.volume && variant.volume > 1 ? 's' : ''}
                        </p>
                      )}
                      <p className="text-body font-semibold text-charcoal mb-12">
                        {formatPrice(price)}
                      </p>

                      <div className="flex items-center gap-12">
                        <div className="flex items-center gap-8 bg-white rounded-card border border-hairline">
                          <button
                            onClick={() =>
                              updateQuantity(
                                item.product.id,
                                item.quantity - 1,
                                item.variantId
                              )
                            }
                            className="w-32 h-32 flex items-center justify-center text-charcoal hover:bg-mist transition-colors"
                            aria-label="Diminuer"
                          >
                            −
                          </button>
                          <span className="text-body-sm font-medium text-charcoal w-32 text-center">
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
                            className="w-32 h-32 flex items-center justify-center text-charcoal hover:bg-mist transition-colors"
                            aria-label="Augmenter"
                          >
                            +
                          </button>
                        </div>

                        <button
                          onClick={() => removeItem(item.product.id, item.variantId)}
                          className="text-body-sm text-smoke hover:text-braise transition-colors"
                        >
                          Retirer
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-hairline p-24 bg-white">
            <div className="flex items-center justify-between mb-24">
              <span className="text-body text-smoke">Sous-total</span>
              <span className="text-heading font-semibold text-charcoal">
                {formatPrice(totalPrice)}
              </span>
            </div>
            <p className="text-caption text-ash mb-24">
              Frais de livraison calculés à l'étape suivante
            </p>
            <Link href="/panier" onClick={onClose}>
              <Button size="lg" className="w-full mb-12">
                Voir le panier
              </Button>
            </Link>
            <button
              onClick={onClose}
              className="w-full text-center text-body-sm text-smoke hover:text-braise transition-colors py-8"
            >
              Continuer mes achats
            </button>
          </div>
        )}
      </div>
    </>
  )
}

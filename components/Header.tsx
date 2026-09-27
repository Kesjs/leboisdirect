'use client'

import { useState } from 'react'
import Link from 'next/link'
import Logo from './Logo'
import CartDrawer from './CartDrawer'
import { useCart } from '@/lib/cart-context'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  const { totalItems } = useCart()

  return (
    <>
      <header className="sticky top-0 z-50 bg-ivory/95 backdrop-blur-sm border-b border-hairline">
        <div className="container-custom">
          <div className="flex items-center justify-between h-[72px]">
            <Link href="/" className="flex items-center">
              <Logo />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-32">
              <Link
                href="/boutique"
                className="text-body text-charcoal hover:text-braise transition-colors"
              >
                Boutique
              </Link>
              <Link
                href="/boutique?cat=buches"
                className="text-body text-charcoal hover:text-braise transition-colors"
              >
                Bois de chauffage
              </Link>
              <Link
                href="/livraison"
                className="text-body text-charcoal hover:text-braise transition-colors"
              >
                Livraison
              </Link>
              <Link
                href="/conseils"
                className="text-body text-charcoal hover:text-braise transition-colors"
              >
                Conseils
              </Link>
              <Link
                href="/notre-histoire"
                className="text-body text-charcoal hover:text-braise transition-colors"
              >
                Notre histoire
              </Link>
            </nav>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center gap-20">
              <button
                className="p-8 hover:bg-mist rounded-full transition-colors"
                aria-label="Rechercher"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <circle cx="9" cy="9" r="6" />
                  <path d="M14 14l4 4" />
                </svg>
              </button>
              <button
                className="p-8 hover:bg-mist rounded-full transition-colors"
                aria-label="Compte"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <circle cx="10" cy="7" r="3" />
                  <path d="M4 18c0-3.3 2.7-6 6-6s6 2.7 6 6" />
                </svg>
              </button>
              <button
                onClick={() => setCartOpen(true)}
                className="p-8 hover:bg-mist rounded-full transition-colors relative"
                aria-label="Panier"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path d="M3 3h2l1.68 8.39a2 2 0 002 1.61h8.64a2 2 0 002-1.61L20 7H6" />
                  <circle cx="8" cy="17" r="1" />
                  <circle cx="16" cy="17" r="1" />
                </svg>
                {totalItems > 0 && (
                  <span className="absolute -top-4 -right-4 bg-braise text-white text-[10px] font-semibold rounded-full w-16 h-16 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-8"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Menu"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                {mobileMenuOpen ? (
                  <>
                    <path d="M18 6L6 18" />
                    <path d="M6 6l12 12" />
                  </>
                ) : (
                  <>
                    <path d="M3 12h18" />
                    <path d="M3 6h18" />
                    <path d="M3 18h18" />
                  </>
                )}
              </svg>
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden border-t border-hairline py-20">
              <nav className="flex flex-col gap-16">
                <Link
                  href="/boutique"
                  className="text-body text-charcoal hover:text-braise transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Boutique
                </Link>
                <Link
                  href="/boutique?cat=buches"
                  className="text-body text-charcoal hover:text-braise transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Bois de chauffage
                </Link>
                <Link
                  href="/livraison"
                  className="text-body text-charcoal hover:text-braise transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Livraison
                </Link>
                <Link
                  href="/conseils"
                  className="text-body text-charcoal hover:text-braise transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Conseils
                </Link>
                <Link
                  href="/notre-histoire"
                  className="text-body text-charcoal hover:text-braise transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Notre histoire
                </Link>
              </nav>
              <div className="flex items-center gap-16 mt-24 pt-24 border-t border-hairline">
                <button className="text-body-sm text-smoke">Rechercher</button>
                <button className="text-body-sm text-smoke">Compte</button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false)
                    setCartOpen(true)
                  }}
                  className="text-body-sm text-smoke"
                >
                  Panier ({totalItems})
                </button>
              </div>
            </div>
          )}
        </div>
      </header>

      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  )
}

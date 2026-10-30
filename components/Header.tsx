'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import Logo from './Logo'
import CartDrawer from './CartDrawer'
import { useCart } from '@/lib/cart-context'
import { useI18n } from '@/lib/i18n-context'
import { bravikoCopy } from '@/data/braviko-copy'
import { accountCopy } from '@/data/account-copy'
import { useAuth } from '@/lib/auth-context'

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [accountOpen, setAccountOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { totalItems } = useCart()
  const { locale } = useI18n()
  const copy = bravikoCopy[locale]
  const account = accountCopy[locale]
  const { user, isAdmin, loading: authLoading } = useAuth()
  const pathname = usePathname()
  const reduced = useReducedMotion()
  const sentinel = useRef<HTMLDivElement>(null)
  const header = useRef<HTMLElement>(null)
  const menuButton = useRef<HTMLButtonElement>(null)
  const searchButton = useRef<HTMLButtonElement>(null)
  const searchInput = useRef<HTMLInputElement>(null)
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setScrolled(!entry.isIntersecting))
    if (sentinel.current) observer.observe(sentinel.current)
    return () => observer.disconnect()
  }, [])
  useEffect(() => {
    if (searchOpen) searchInput.current?.focus()
  }, [searchOpen])
  useEffect(() => {
    const dismiss = (event: PointerEvent) => {
      if (!header.current?.contains(event.target as Node)) {
        setSearchOpen(false); setMobileOpen(false); setAccountOpen(false)
      }
    }
    document.addEventListener('pointerdown', dismiss)
    return () => document.removeEventListener('pointerdown', dismiss)
  }, [])
  const links = [
    ['/boutique', copy.shop], ['/consigli', copy.advice], ['/consegna', copy.delivery], ['/retours-remboursements', copy.returns], ['/faq', copy.faq],
  ]
  const collapse = () => { setMobileOpen(false); setSearchOpen(false); setAccountOpen(false) }
  return (
    <>
      <div ref={sentinel} className="bk-header-sentinel" aria-hidden="true" />
      <header ref={header} className={'bk-header' + (scrolled ? ' is-scrolled' : '')}
        onKeyDown={event => {
          if (event.key !== 'Escape') return
          if (searchOpen) searchButton.current?.focus()
          else if (mobileOpen) menuButton.current?.focus()
          collapse()
        }}>
        <a href="#main-content" className="bk-skip">{copy.skip}</a>
        <div className="bk-info-bar" role="note">
          <div className="bk-container bk-info-bar-inner">
            <span className="bk-info-message">{copy.infoBar}</span>
            <div className="bk-info-points" aria-label={copy.delivery}>
              <span className="bk-mobile-info-delivery"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 6h11v10H3zM14 10h4l3 3v3h-7zM7 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm11 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" /></svg>{copy.infoDelivery}</span>
              <span><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3 5 6v5c0 4.6 2.9 8.2 7 10 4.1-1.8 7-5.4 7-10V6l-7-3Z" /><path d="m9 12 2 2 4-4" /></svg>{copy.infoSelection}</span>
              <span><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8" /><path d="M12 8v5l3 2" /></svg>{copy.infoSupport}</span>
            </div>
            <Link href="/consegna" onClick={collapse}>{copy.delivery}</Link>
          </div>
        </div>
        <div className="bk-container bk-nav">
          <Link href="/" aria-label="Braviko" onClick={collapse}><Logo /></Link>
          <nav className="bk-desktop-nav" aria-label={copy.menu}>
            {links.map(([href, title]) => <Link key={href} href={href} onClick={collapse} aria-current={pathname === href ? 'page' : undefined}>{title}</Link>)}
          </nav>
          <div className="bk-nav-actions">
            <span className="bk-locale-fixed" lang="it" title="Italia" aria-label="Italia">
              <Image src="https://flagcdn.com/24x18/it.png" alt="Italia" width={24} height={18} />
            </span>
            <button ref={searchButton} type="button" className="bk-icon-button bk-search-trigger" aria-label={copy.search} aria-expanded={searchOpen} aria-controls="header-search"
              onClick={() => { setSearchOpen(!searchOpen) }}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><circle cx="8.5" cy="8.5" r="5.5" /><path d="m13 13 4 4" /></svg>
            </button>
            <button type="button" className="bk-cart-trigger" aria-label={copy.cart + ' (' + totalItems + ')'} onClick={() => { collapse(); setCartOpen(true) }}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M3 6h14l-1 12H4L3 6Z" /><path d="M7 6V5a3 3 0 0 1 6 0v1" /></svg>
              <motion.span key={totalItems} initial={false} animate={{ scale: reduced ? 1 : [1, 1.18, 1] }} transition={{ duration: 0.3 }}>{totalItems}</motion.span>
            </button>
            {authLoading ? <span className="bk-profile-trigger is-loading" aria-label={account.loading as string}>…</span> : isAdmin ? <Link
              href="/admin"
              className="bk-profile-trigger is-admin"
              aria-label={account.adminLink as string}
              title={account.adminLink as string}
              onClick={collapse}
            >
              <span aria-hidden="true">A</span>
            </Link> : user ? <Link
              href="/compte"
              className="bk-profile-trigger is-authenticated"
              aria-label={account.dashboardLink as string}
              title={account.dashboardLink as string}
              onClick={collapse}
            >
              <span aria-hidden="true">{(user.user_metadata?.first_name || user.email || 'B').slice(0, 1).toUpperCase()}</span>
            </Link> : (
              <Link
                href="/connexion?mode=signup"
                className="bk-profile-trigger"
                aria-label={authLoading ? account.loading as string : account.login as string}
                title={account.login as string}
                onClick={collapse}
              >
                <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><circle cx="12" cy="8" r="4" /><path d="M4.5 21a7.5 7.5 0 0 1 15 0" /></svg>
              </Link>
            )}
            <button ref={menuButton} type="button" className="bk-icon-button bk-menu-trigger" aria-label={mobileOpen ? copy.close : copy.menu} aria-expanded={mobileOpen} aria-controls="mobile-navigation"
              onClick={() => { setMobileOpen(!mobileOpen); setSearchOpen(false) }}>
              {mobileOpen ? <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><path d="m4 4 12 12M16 4 4 16" /></svg> : <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><path d="M3 5h14M3 10h14M3 15h14" /></svg>}
            </button>
          </div>
        </div>
        <form id="mobile-search" action="/boutique" className="bk-mobile-search bk-container">
          <label className="sr-only" htmlFor="mobile-search-query">{copy.search}</label>
          <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><circle cx="8.5" cy="8.5" r="5.5" /><path d="m13 13 4 4" /></svg>
          <input id="mobile-search-query" name="q" placeholder={copy.searchPlaceholder} type="search" />
          <button type="submit" aria-label={copy.search}>↗</button>
        </form>
        {searchOpen && <form id="header-search" action="/boutique" className="bk-search bk-container">
          <label className="sr-only" htmlFor="search-query">{copy.search}</label>
          <input id="search-query" ref={searchInput} name="q" placeholder={copy.searchPlaceholder} type="search" required />
          <button className="bk-button" type="submit">{copy.search}<span aria-hidden="true">↗</span></button>
        </form>}
        <AnimatePresence>
          {mobileOpen && <motion.nav id="mobile-navigation" className="bk-mobile-nav bk-container" aria-label={copy.menu}
            initial={{ opacity: 0, y: reduced ? 0 : -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: reduced ? 0 : 0.2 }}>
            <div className="bk-mobile-nav-head"><span>{copy.menu}</span><span aria-hidden="true">BRAVIKO</span></div>
            {[...links, ['/notre-histoire', copy.story], ['/contact', 'Contatti']].map(([href, title]) => <Link href={href} key={href} onClick={collapse}>{title}</Link>)}
          </motion.nav>}
        </AnimatePresence>
      </header>
      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  )
}

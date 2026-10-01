'use client'

import Link from 'next/link'
import Logo from './Logo'
import { useI18n } from '@/lib/i18n-context'
import { bravikoCopy } from '@/data/braviko-copy'
import { legalNavigation } from '@/data/legal-copy'

export default function Footer() {
  const { locale } = useI18n()
  const copy = bravikoCopy[locale]
  const legal = legalNavigation[locale]
  return (
    <footer className="bk-footer">
      <div className="bk-container">
        <div className="bk-footer-top">
          <div><Link href="/" aria-label="Braviko"><Logo /></Link><p>{copy.footer}</p></div>
          <nav aria-label={copy.universes}><h2>{copy.universes}</h2><Link href="/boutique?universe=heating">{copy.heating}</Link><Link href="/boutique?universe=agriculture">{copy.agriculture}</Link><Link href="/boutique">{copy.all}</Link></nav>
          <nav aria-label={copy.help}><h2>{copy.help}</h2><Link href="/livraison">{copy.delivery}</Link><Link href="/conseils">{copy.advice}</Link><Link href="/faq">FAQ</Link><Link href="/notre-histoire">{copy.story}</Link><a href="mailto:contact@leboisdirect.fr">Contact</a></nav>
        </div>
        <div className="bk-footer-wordmark" aria-hidden="true">braviko<span>.</span></div>
        <nav className="bk-footer-legal" aria-label={legal.legal}><Link href="/mentions-legales">{legal.legal}</Link><Link href="/confidentialite">{legal.privacy}</Link><Link href="/conditions-generales">{legal.terms}</Link><Link href="/cookies">{legal.cookies}</Link></nav>
        <div className="bk-footer-bottom"><p>© {new Date().getFullYear()} Braviko. {copy.rights}</p><a href="mailto:contact@leboisdirect.fr">contact@leboisdirect.fr</a><span>FR / DE / IT</span></div>
      </div>
    </footer>
  )
}

'use client'

import Link from 'next/link'
import Logo from './Logo'
import { useI18n } from '@/lib/i18n-context'
import { bravikoCopy } from '@/data/braviko-copy'
import { legalNavigation } from '@/data/legal-copy'
import { commerceInfoLinks } from '@/data/commerce-info-copy'
import NewsletterSignup from './NewsletterSignup'

export default function Footer() {
  const { locale } = useI18n()
  const copy = bravikoCopy[locale]
  const legal = legalNavigation[locale]
  const commerceLinks = commerceInfoLinks[locale]
  return (
    <footer className="bk-footer">
      <div className="bk-container">
        <NewsletterSignup />
        <div className="bk-footer-top">
          <div><Link href="/" aria-label="Braviko"><Logo /></Link><p>{copy.footer}</p></div>
        <nav aria-label={copy.universes}><h2>{copy.universes}</h2><Link href="/boutique?universe=heating">{copy.heating}</Link><Link href="/boutique">{copy.all}</Link></nav>
        <nav aria-label={copy.help}><h2>{copy.help}</h2><Link href="/livraison">{copy.delivery}</Link><Link href="/expedition">{commerceLinks.shipping}</Link><Link href="/retours-remboursements">{commerceLinks.returns}</Link><Link href="/assurance">{commerceLinks.assurance}</Link><Link href="/informations-produits">{commerceLinks.details}</Link><Link href="/tva">{commerceLinks.vat}</Link><Link href="/conseils">{copy.advice}</Link><Link href="/faq">FAQ</Link><Link href="/notre-histoire">{copy.story}</Link><Link href="/contact">Contact</Link></nav>
        </div>
        <div className="bk-footer-wordmark" aria-hidden="true">braviko<span>.</span></div>
        <nav className="bk-footer-legal" aria-label={legal.legal}><Link href="/mentions-legales">{legal.legal}</Link><Link href="/confidentialite">{legal.privacy}</Link><Link href="/conditions-generales">{legal.terms}</Link><Link href="/cookies">{legal.cookies}</Link></nav>
        <div className="bk-footer-bottom"><p>© {new Date().getFullYear()} Braviko. {copy.rights}</p><a href="mailto:contact@leboisdirect.fr">contact@leboisdirect.fr</a><span>FR / DE / IT</span></div>
      </div>
    </footer>
  )
}

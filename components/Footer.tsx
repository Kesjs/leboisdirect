'use client'

import Link from 'next/link'
import Logo from './Logo'
import { useI18n } from '@/lib/i18n-context'
import { bravikoCopy } from '@/data/braviko-copy'
import { legalNavigation } from '@/data/legal-copy'
import { commerceInfoLinks } from '@/data/commerce-info-copy'
import NewsletterSignup from './NewsletterSignup'
import { PaymentBadgesRow } from './PaymentLogos'

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
          <div className="bk-footer-brand">
            <Link href="/" aria-label="Braviko">
              <Logo />
            </Link>
            <p className="bk-footer-tagline">{copy.footer}</p>
            <div className="bk-footer-meta">
              <a href="mailto:contact@braviko.fr" className="bk-footer-email">
                contact@braviko.fr
              </a>
              <span>{copy.infoDelivery}</span>
              <PaymentBadgesRow className="bk-footer-payments" />
            </div>
          </div>

          <nav aria-label="Catalogo">
            <h2>Catalogo</h2>
            <Link href="/boutique">{copy.all}</Link>
            <Link href="/boutique?group=combustibles">Legna e pellet</Link>
            <Link href="/boutique?group=appareils">Stufe e inserti</Link>
            <Link href="/boutique?group=exterieur">Bracieri ed esterni</Link>
            <Link href="/boutique?group=rangement">Portalegna e spaccalegna</Link>
          </nav>

          <nav aria-label="Consegna e ordini">
            <h2>Consegna e ordini</h2>
            <Link href="/livraison">{copy.delivery}</Link>
            <Link href="/expedition">{commerceLinks.shipping}</Link>
            <Link href="/retours-remboursements">{commerceLinks.returns}</Link>
            <Link href="/assurance">{commerceLinks.assurance}</Link>
            <Link href="/tva">{commerceLinks.vat}</Link>
          </nav>

          <nav aria-label="Guide e supporto">
            <h2>Guide e supporto</h2>
            <Link href="/conseils">{copy.advice}</Link>
            <Link href="/faq">FAQ</Link>
            <Link href="/informations-produits">{commerceLinks.details}</Link>
            <Link href="/notre-histoire">{copy.story}</Link>
            <Link href="/contact">Contatti</Link>
          </nav>
        </div>

        <div className="bk-footer-bottom">
          <p>
            © {new Date().getFullYear()} Braviko. {copy.rights}
          </p>
          <nav className="bk-footer-legal-inline" aria-label={legal.legal}>
            <Link href="/mentions-legales">{legal.legal}</Link>
            <Link href="/confidentialite">{legal.privacy}</Link>
            <Link href="/conditions-generales">{legal.terms}</Link>
            <Link href="/cookies">{legal.cookies}</Link>
          </nav>
          <span>Italia · EUR</span>
        </div>
      </div>
    </footer>
  )
}

import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function NotFound() {
  return <><Header /><main id="main-content" className="bk-home bk-container bk-section"><p className="bk-eyebrow">404 / BRAVIKO</p><h1 className="bk-title">Cette page n’existe pas.</h1><p className="bk-lead">Revenez vers la boutique ou découvrez les deux univers Braviko.</p><div className="flex gap-16" style={{marginTop:'32px'}}><Link href="/boutique" className="bk-button">Voir la boutique <span aria-hidden="true">↗</span></Link><Link href="/" className="bk-text-link">Accueil <span aria-hidden="true">↗</span></Link></div></main><Footer /></>
}

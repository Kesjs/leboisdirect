import Link from 'next/link'
import Logo from './Logo'

export default function Footer() {
  return (
    <footer className="bg-white border-t border-hairline">
      <div className="container-custom py-64">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-48 mb-64">
          {/* Brand */}
          <div className="md:col-span-4">
            <Logo className="mb-20" />
            <p className="text-body-sm text-smoke leading-relaxed max-w-[320px]">
              Votre bois de chauffage premium livré directement chez vous. 
              Qualité garantie, commande simple.
            </p>
          </div>

          {/* Products */}
          <div className="md:col-span-2">
            <h3 className="text-body font-semibold text-charcoal mb-16">Produits</h3>
            <nav className="flex flex-col gap-12">
              <Link href="/boutique?cat=buches" className="text-body-sm text-smoke hover:text-braise transition-colors">
                Bûches
              </Link>
              <Link href="/boutique?cat=bois-compresse" className="text-body-sm text-smoke hover:text-braise transition-colors">
                Bois compressé
              </Link>
              <Link href="/boutique?cat=granules" className="text-body-sm text-smoke hover:text-braise transition-colors">
                Granulés
              </Link>
              <Link href="/boutique?cat=allumage" className="text-body-sm text-smoke hover:text-braise transition-colors">
                Allumage
              </Link>
            </nav>
          </div>

          {/* Information */}
          <div className="md:col-span-3">
            <h3 className="text-body font-semibold text-charcoal mb-16">Informations</h3>
            <nav className="flex flex-col gap-12">
              <Link href="/livraison" className="text-body-sm text-smoke hover:text-braise transition-colors">
                Livraison
              </Link>
              <Link href="/faq" className="text-body-sm text-smoke hover:text-braise transition-colors">
                FAQ
              </Link>
              <Link href="/notre-histoire" className="text-body-sm text-smoke hover:text-braise transition-colors">
                Notre histoire
              </Link>
              <Link href="/conseils" className="text-body-sm text-smoke hover:text-braise transition-colors">
                Conseils
              </Link>
              <a href="mailto:contact@leboisdirect.fr" className="text-body-sm text-smoke hover:text-braise transition-colors">Contact</a>
            </nav>
          </div>

          {/* Legal */}
          <div className="md:col-span-3">
            <h3 className="text-body font-semibold text-charcoal mb-16">Légal</h3>
            <nav className="flex flex-col gap-12">
              <li className="list-none text-body-sm text-smoke">Informations légales sur demande</li>
            </nav>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-32 border-t border-hairline flex flex-col md:flex-row justify-between items-center gap-16">
          <p className="text-body-sm text-ash">
            © {new Date().getFullYear()} LeBoisDirect. Tous droits réservés.
          </p>
          <div className="flex items-center gap-24">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-smoke hover:text-braise transition-colors"
              aria-label="Facebook"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10 0C4.477 0 0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.879V12.89h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.989C16.343 19.128 20 14.991 20 10c0-5.523-4.477-10-10-10z"/>
              </svg>
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-smoke hover:text-braise transition-colors"
              aria-label="Instagram"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10 0C7.284 0 6.944.012 5.877.06 4.813.109 4.086.277 3.45.525a4.945 4.945 0 00-1.786 1.163A4.945 4.945 0 00.525 3.45C.277 4.086.109 4.813.06 5.877.012 6.944 0 7.284 0 10s.012 3.056.06 4.123c.049 1.064.217 1.791.465 2.427a4.945 4.945 0 001.163 1.786 4.945 4.945 0 001.786 1.163c.636.248 1.363.416 2.427.465C6.944 19.988 7.284 20 10 20s3.056-.012 4.123-.06c1.064-.049 1.791-.217 2.427-.465a4.945 4.945 0 001.786-1.163 4.945 4.945 0 001.163-1.786c.248-.636.416-1.363.465-2.427C19.988 13.056 20 12.716 20 10s-.012-3.056-.06-4.123c-.049-1.064-.217-1.791-.465-2.427a4.945 4.945 0 00-1.163-1.786A4.945 4.945 0 0016.55.525C15.914.277 15.187.109 14.123.06 13.056.012 12.716 0 10 0zm0 1.802c2.67 0 2.987.01 4.041.059.975.045 1.505.207 1.858.344.467.182.8.398 1.15.748.35.35.566.683.748 1.15.137.353.3.883.344 1.858.048 1.054.058 1.37.058 4.039 0 2.67-.01 2.986-.058 4.04-.045.975-.207 1.505-.344 1.858a3.097 3.097 0 01-.748 1.15c-.35.35-.683.566-1.15.748-.353.137-.883.3-1.858.344-1.054.048-1.37.058-4.04.058-2.669 0-2.985-.01-4.039-.058-.975-.045-1.505-.207-1.858-.344a3.098 3.098 0 01-1.15-.748 3.098 3.098 0 01-.748-1.15c-.137-.353-.3-.883-.344-1.858-.048-1.054-.058-1.37-.058-4.04 0-2.668.01-2.985.058-4.038.045-.975.207-1.505.344-1.858.182-.467.398-.8.748-1.15.35-.35.683-.566 1.15-.748.353-.137.883-.3 1.858-.344 1.054-.048 1.37-.058 4.04-.058z"/>
                <path d="M10 13.333A3.333 3.333 0 1110 6.667a3.333 3.333 0 010 6.666zM10 5a5 5 0 100 10 5 5 0 000-10zm6.406-1.845a1.167 1.167 0 11-2.334 0 1.167 1.167 0 012.334 0z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

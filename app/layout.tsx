import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Script from 'next/script'
import { CartProvider } from '@/lib/cart-context'
import { I18nProvider } from '@/lib/i18n-context'
import { AuthProvider } from '@/lib/auth-context'
import NavigationProgress from '@/components/NavigationProgress'
import { ToastProvider } from '@/components/Toast'
import './globals.css'
import './braviko.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-suisse',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://leboisdirect.vercel.app'),
  title: 'Braviko — Les produits utiles, simplement',
  description: 'Préparez votre chauffage au bois avec des bûches, granulés et équipements sélectionnés pour l’hiver.',
  keywords: 'Braviko, chauffage au bois, bûches, granulés, bois compressé, hiver',
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    siteName: 'Braviko',
    locale: 'fr_FR',
    title: 'Braviko — Les produits utiles, simplement',
    description: 'Préparez votre chauffage au bois avec des bûches, granulés et équipements sélectionnés pour l’hiver.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" className={inter.variable}>
      <body>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-18503582950"
          strategy="afterInteractive"
        />
        <Script id="google-ads-tag" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'AW-18503582950');`}
        </Script>
        <Script
          src="https://tryqualio.pro/widget.js"
          data-key="0nC-GIbzwk3dlT2rKWFvauRpJtdPZD_E"
          strategy="afterInteractive"
        />
        <NavigationProgress />
        <I18nProvider><AuthProvider><CartProvider><ToastProvider>{children}</ToastProvider></CartProvider></AuthProvider></I18nProvider>
      </body>
    </html>
  )
}

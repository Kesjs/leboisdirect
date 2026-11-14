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
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://braviko.fr'),
  title: 'Braviko — Riscaldamento a legna e soluzioni per l’inverno',
  description: 'Prepara il riscaldamento a legna per l’inverno: legna da ardere, pellet, tronchetti compressi, stufe e bracieri con spedizione gratuita in Italia.',
  keywords: 'Braviko, legna da ardere, pellet, tronchetti compressi, stufe a legna, inserti camino, bracieri, riscaldamento, Italia',
  alternates: { canonical: '/' },
  verification: {
    google: 'QTU2oN2k4JNkADG259tGdDwK31jtE0WyQvbptMg46QU',
  },
  openGraph: {
    type: 'website',
    siteName: 'Braviko',
    locale: 'it_IT',
    title: 'Braviko — Riscaldamento a legna e soluzioni per l’inverno',
    description: 'Prepara il riscaldamento a legna per l’inverno: legna da ardere, pellet, tronchetti compressi, stufe e bracieri con spedizione gratuita in Italia.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="it" className={inter.variable}>
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
        <NavigationProgress />
        <I18nProvider><AuthProvider><CartProvider><ToastProvider>{children}</ToastProvider></CartProvider></AuthProvider></I18nProvider>
      </body>
    </html>
  )
}

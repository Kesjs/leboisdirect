import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { CartProvider } from '@/lib/cart-context'
import { I18nProvider } from '@/lib/i18n-context'
import { AuthProvider } from '@/lib/auth-context'
import NavigationProgress from '@/components/NavigationProgress'
import './globals.css'
import './braviko.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-suisse',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Braviko — Les produits utiles, simplement',
  description: 'Découvrez les produits Braviko pour votre maison, votre chauffage et vos activités agricoles.',
  keywords: 'Braviko, chauffage, bois, agriculture, machines agricoles, équipements',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" className={inter.variable}>
      <body>
        <NavigationProgress />
        <I18nProvider><AuthProvider><CartProvider>{children}</CartProvider></AuthProvider></I18nProvider>
      </body>
    </html>
  )
}

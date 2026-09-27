import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { CartProvider } from '@/lib/cart-context'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-suisse',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'LeBoisDirect — Votre bois de chauffage livré chez vous',
  description: 'Commandez votre bois de chauffage en ligne. Chêne, hêtre, charme. Livraison rapide partout en France.',
  keywords: 'bois de chauffage, bûches, granulés, livraison bois, chauffage hiver',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" className={inter.variable}>
      <body>
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  )
}

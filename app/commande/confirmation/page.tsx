'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { readOrderDraft, type OrderDraft } from '@/lib/order'
import { formatPrice } from '@/lib/utils'

export default function OrderConfirmationPage() {
  const [order, setOrder] = useState<OrderDraft | null>(null)
  useEffect(() => setOrder(readOrderDraft()), [])
  return <><Header /><main id="main-content" className="bk-home bk-container bk-section"><p className="bk-eyebrow">BRAVIKO / DEMANDE ENREGISTRÉE</p><h1 className="bk-title">Votre demande a été enregistrée.</h1><p className="bk-lead">Aucun paiement n’a été effectué. Le paiement en ligne et les e-mails transactionnels seront disponibles une fois le prestataire de paiement connecté.</p>{order ? <section className="bk-section" aria-labelledby="order-summary"><div className="bk-agriculture-preview"><div><p className="bk-eyebrow">Référence</p><h2 id="order-summary">{order.reference}</h2><p>Créée le {new Intl.DateTimeFormat('fr-FR', { dateStyle: 'long' }).format(new Date(order.createdAt))} pour {order.customer.firstName} {order.customer.lastName}.</p></div><div><p className="bk-eyebrow">Articles</p>{order.items.map(item => <p key={item.product.id + item.variantId}>{item.quantity} × {item.product.name}</p>)}<p style={{marginTop:'20px'}}><strong>{formatPrice(order.subtotal)}</strong></p></div></div></section> : <p className="bk-lead">Aucun récapitulatif de demande n’est disponible dans ce navigateur.</p>}<div className="flex gap-16"><Link href="/boutique" className="bk-button">Continuer mes achats <span aria-hidden="true">↗</span></Link><Link href="/" className="bk-text-link">Retour à l’accueil <span aria-hidden="true">↗</span></Link></div></main><Footer /></>
}

'use client'
import Link from 'next/link'
import Image from 'next/image'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { useCart } from '@/lib/cart-context'
import { useI18n } from '@/lib/i18n-context'
import { commerceCopy } from '@/data/commerce-copy'
import { productLabel } from '@/data/product-labels'

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalPrice } = useCart(); const { locale } = useI18n(); const c = commerceCopy[locale]
  const money = (value: number) => new Intl.NumberFormat(locale, { style:'currency', currency:'EUR' }).format(value)
  return <><Header /><main id="main-content" className="bk-home bk-container bk-section"><p className="bk-eyebrow">BRAVIKO / {c.cart}</p><h1 className="bk-title">{c.cart}</h1>{items.length === 0 ? <section className="bk-cart-empty"><span aria-hidden="true">B.</span><h2>{c.empty}</h2><p className="bk-lead">{c.emptyBody}</p><Link className="bk-button" href="/boutique">{c.shop}<span aria-hidden="true">↗</span></Link></section> : <div className="bk-commerce-layout"><section aria-label={c.cart}>{items.map(item => { const variant=item.product.variants?.find(v=>v.id===item.variantId); const price=variant?.price ?? item.product.price; const label=productLabel(item.product,locale); return <article className="bk-cart-item" key={item.product.id+item.variantId}><Link className="bk-cart-item-photo" href={`/produit/${item.product.slug}`}><Image src={item.product.image} alt={label.name} fill sizes="88px" className="bk-image" /></Link><div><Link href={`/produit/${item.product.slug}`}><h2>{label.name}</h2></Link><p>{variant?.volume ? `${variant.volume} ${locale==='de'?'Raummeter':locale==='it'?'steri':'stère(s)'}` : label.conditioning}</p><strong>{money(price)}</strong><div className="bk-cart-item-controls"><div className="bk-quantity"><button aria-label={c.decrease} onClick={()=>updateQuantity(item.product.id,item.quantity-1,item.variantId)}>−</button><span>{item.quantity}</span><button aria-label={c.increase} onClick={()=>updateQuantity(item.product.id,item.quantity+1,item.variantId)}>+</button></div><span>{c.total}: {money(price*item.quantity)}</span><button className="bk-remove" onClick={()=>removeItem(item.product.id,item.variantId)}>{c.remove}</button></div></div></article>})}<Link className="bk-text-link" href="/boutique">{c.continue}<span aria-hidden="true">↗</span></Link></section><aside className="bk-commerce-summary"><p className="bk-eyebrow">{c.summary}</p><div><span>{c.subtotal}</span><strong>{money(totalPrice)}</strong></div><p>{c.delivery}: {c.deliveryLater}</p><div><span>{c.total}</span><strong>{money(totalPrice)}</strong></div><Link className="bk-button" href="/checkout">{c.checkout}<span aria-hidden="true">↗</span></Link></aside></div>}</main><Footer /></>
}

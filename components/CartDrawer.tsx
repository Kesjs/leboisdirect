'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useReducedMotion } from 'framer-motion'
import { useCart } from '@/lib/cart-context'
import { useI18n } from '@/lib/i18n-context'
import { bravikoCopy } from '@/data/braviko-copy'
import { productLabel } from '@/data/product-labels'

export default function CartDrawer({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { items, removeItem, updateQuantity, clearCart, totalItems, totalPrice } = useCart()
  const { locale } = useI18n()
  const copy = bravikoCopy[locale]
  const reduced = useReducedMotion()
  const [confirmClear, setConfirmClear] = useState(false)
  const [panelVisible, setPanelVisible] = useState(false)
  const dialog = useRef<HTMLDialogElement>(null)
  const closeButton = useRef<HTMLButtonElement>(null)
  const lastFocus = useRef<HTMLElement | null>(null)
  const money = (value: number) => new Intl.NumberFormat(locale, { style: 'currency', currency: 'EUR' }).format(value)
  useEffect(() => {
    let frame = 0
    let closeTimer = 0
    if (isOpen) {
      lastFocus.current = document.activeElement as HTMLElement
      if (!dialog.current?.open) dialog.current?.showModal()
      setPanelVisible(false)
      frame = window.requestAnimationFrame(() => setPanelVisible(true))
      closeButton.current?.focus()
      const previous = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      return () => {
        window.cancelAnimationFrame(frame)
        document.body.style.overflow = previous
      }
    }

    setPanelVisible(false)
    if (dialog.current?.open) {
      closeTimer = window.setTimeout(() => {
        dialog.current?.close()
        lastFocus.current?.focus()
      }, reduced ? 0 : 320)
    }
    return () => window.clearTimeout(closeTimer)
  }, [isOpen, reduced])
  return (
    <dialog ref={dialog} className="bk-cart-dialog" aria-labelledby="cart-heading" onCancel={event => { event.preventDefault(); onClose() }}>
      <div className={`bk-cart-backdrop${panelVisible ? ' is-visible' : ''}`} aria-hidden="true" onClick={onClose} />
      <div className={`bk-cart-panel${panelVisible ? ' is-visible' : ''}`}>
        <div className="bk-cart-heading"><h2 id="cart-heading">{copy.cart} <span>({totalItems})</span></h2><div className="bk-cart-heading-actions">{items.length > 0 && <button className="bk-cart-clear" type="button" onClick={() => setConfirmClear(true)}>{copy.clear}</button>}<button ref={closeButton} className="bk-icon-button" onClick={onClose} aria-label={copy.close}><span aria-hidden="true">×</span></button></div></div>
        <div className="bk-cart-items">
          {items.length === 0 ? <div className="bk-cart-empty"><span aria-hidden="true">B.</span><h3>{copy.empty}</h3><Link href="/boutique" className="bk-button" onClick={onClose}>{copy.discover}<span aria-hidden="true">↗</span></Link></div> : items.map(item => {
            const variant = item.product.variants?.find(v => v.id === item.variantId)
            const label = productLabel(item.product, locale)
            return <article className="bk-cart-item" key={item.product.id + '-' + (item.variantId ?? 'base')}>
              <Link onClick={onClose} href={'/produit/' + item.product.slug} className="bk-cart-item-photo"><Image src={item.product.image} alt={label.name} fill sizes="88px" className="bk-image" /></Link>
              <div><Link onClick={onClose} href={'/produit/' + item.product.slug}><h3>{label.name}</h3></Link>
                <p>{variant?.volume ? variant.volume + ({ fr: ' stère(s)', de: ' Raummeter', it: ' steri' }[locale]) : label.conditioning}</p><strong>{money(variant?.price ?? item.product.price)}</strong>
                <div className="bk-cart-item-controls"><div className="bk-quantity"><button onClick={() => updateQuantity(item.product.id, item.quantity - 1, item.variantId)} aria-label={copy.decrease + ' : ' + label.name}>−</button><span>{item.quantity}</span><button onClick={() => updateQuantity(item.product.id, item.quantity + 1, item.variantId)} aria-label={copy.increase + ' : ' + label.name}>+</button></div><button className="bk-remove" onClick={() => removeItem(item.product.id, item.variantId)}>{copy.remove}</button></div>
              </div>
            </article>
          })}
        </div>
        {items.length > 0 && <div className="bk-cart-summary"><div><span>{copy.subtotal}</span><strong>{money(totalPrice)}</strong></div><p>{copy.shipping}</p><Link href="/panier" onClick={onClose} className="bk-button">{copy.viewCart}<span aria-hidden="true">↗</span></Link><button onClick={onClose} className="bk-cart-continue">{copy.continue}</button></div>}
        {confirmClear && <div className="bk-cart-confirm" role="dialog" aria-modal="true" aria-labelledby="clear-cart-title"><div className="bk-cart-confirm-card"><h3 id="clear-cart-title">{copy.clearConfirm}</h3><div><button type="button" className="bk-cart-confirm-cancel" onClick={() => setConfirmClear(false)}>{copy.cancel}</button><button type="button" className="bk-cart-confirm-action" onClick={() => { clearCart(); setConfirmClear(false) }}>{copy.confirm}</button></div></div></div>}
      </div>
    </dialog>
  )
}

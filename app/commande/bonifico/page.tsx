'use client'

import { Suspense, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PageSkeleton from '@/components/PageSkeleton'
import { bankTransferDetails } from '@/data/bank-transfer'
import { useCart } from '@/lib/cart-context'
import { useI18n } from '@/lib/i18n-context'
import { productLabel } from '@/data/product-labels'
import { formatPrice } from '@/lib/utils'

function CopyRow({
  label,
  value,
  copyLabel,
  copiedLabel,
  mono = false,
}: {
  label: string
  value: string
  copyLabel: string
  copiedLabel: string
  mono?: boolean
}) {
  const [done, setDone] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value)
      setDone(true)
      window.setTimeout(() => setDone(false), 1800)
    } catch {
      setDone(false)
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="group flex w-full items-center justify-between gap-16 px-20 py-16 text-left transition-colors hover:bg-mist focus-visible:bg-mist focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-braise"
      aria-label={`${done ? copiedLabel : copyLabel} ${label}`}
    >
      <span className="min-w-0">
        <span className="block text-body-sm text-smoke">{label}</span>
        <span className={`mt-4 block break-words text-body font-medium text-charcoal ${mono ? 'font-mono tracking-wide' : ''}`}>
          {value}
        </span>
      </span>
      <span className="bk-copy-control" data-done={done ? 'true' : undefined} aria-live="polite">
        {done ? copiedLabel : copyLabel}
      </span>
    </button>
  )
}

function BankTransferPageContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { locale } = useI18n()
  const { items, totalPrice, clearCart } = useCart()
  const reference = searchParams.get('reference')?.trim() || ''

  const copy = locale === 'de'
    ? {
        eyebrow: 'BRAVIKO / SEPA-ÜBERWEISUNG',
        received: 'Bestellung erhalten',
        title: 'Zahlung per Überweisung abschließen',
        intro: 'Schließe deine Zahlung mit den folgenden Bankdaten ab. Deine Bestellung bleibt bis zum Eingang der Überweisung vorgemerkt.',
        orderReference: 'Bestellreferenz',
        referenceCause: 'Verwendungszweck (Bestellreferenz)',
        total: 'Gesamtbetrag',
        bankDetails: 'Bankverbindung',
        copy: 'Kopieren',
        copied: 'Kopiert',
        holder: 'Kontoinhaber',
        bank: 'Bank',
        currency: 'Währung',
        afterTitle: 'Nach der Überweisung',
        afterBody: 'Wir prüfen den Zahlungseingang und bestätigen deine Bestellung per E-Mail. Eine klassische SEPA-Überweisung kann 1 bis 2 Werktage dauern.',
        summary: 'Bestellübersicht',
        emptySummary: 'Die Bestelldaten werden mit deiner Bestellung verknüpft.',
        backToShop: 'Zurück zum Shop',
        account: 'Zu deinem Konto',
        missingTitle: 'Überweisung nicht gefunden',
        missingBody: 'Dieser Link enthält keine gültige Bestellreferenz. Starte den Bezahlvorgang erneut.',
        backToCheckout: 'Zurück zur Kasse',
      }
    : locale === 'fr'
      ? {
          eyebrow: 'BRAVIKO / VIREMENT SEPA',
          received: 'Commande reçue',
          title: 'Finalisez le paiement par virement',
          intro: 'Finalisez votre paiement avec les coordonnées bancaires ci-dessous. Votre commande reste en attente de réception du virement.',
          orderReference: 'Référence de commande',
          referenceCause: 'Motif (référence de commande)',
          total: 'Total',
          bankDetails: 'Coordonnées bancaires',
          copy: 'Copier',
          copied: 'Copié',
          holder: 'Titulaire',
          bank: 'Banque',
          currency: 'Devise',
          afterTitle: 'Après le virement',
          afterBody: 'Nous vérifions la réception et confirmons votre commande par e-mail. Un virement SEPA classique peut prendre 1 à 2 jours ouvrés.',
          summary: 'Récapitulatif de la commande',
          emptySummary: 'Les détails seront associés à votre commande.',
          backToShop: 'Retour à la boutique',
          account: 'Accéder à votre compte',
          missingTitle: 'Virement introuvable',
          missingBody: 'Ce lien ne contient pas de référence de commande valide. Recommencez le paiement.',
          backToCheckout: 'Retour au paiement',
        }
      : {
          eyebrow: 'BRAVIKO / BONIFICO SEPA',
          received: 'Ordine ricevuto',
          title: 'Completa il pagamento con bonifico',
          intro: 'Concludi il pagamento con le coordinate qui sotto. Il tuo ordine resta in attesa della ricezione del bonifico.',
          orderReference: 'Riferimento ordine',
          referenceCause: 'Causale (riferimento ordine)',
          total: 'Totale',
          bankDetails: 'Coordinate bancarie',
          copy: 'Copia',
          copied: 'Copiato',
          holder: 'Intestatario',
          bank: 'Banca',
          currency: 'Valuta',
          afterTitle: 'Dopo il bonifico',
          afterBody: 'Verifichiamo l’accredito e confermiamo l’ordine via email. Un bonifico SEPA classico può richiedere da 1 a 2 giorni lavorativi.',
          summary: 'Riepilogo ordine',
          emptySummary: 'I dati dell’ordine saranno collegati alla tua richiesta.',
          backToShop: 'Torna al negozio',
          account: 'Vai al tuo account',
          missingTitle: 'Bonifico non trovato',
          missingBody: 'Questo link non contiene un riferimento d’ordine valido. Ricomincia il pagamento.',
          backToCheckout: 'Torna al checkout',
        }

  const leaveOrder = () => {
    clearCart()
    router.push('/boutique')
  }

  return (
    <>
      <Header />
      <main id="main-content" className="bk-home bg-ivory">
        {!reference ? (
          <section className="container-custom flex min-h-[55vh] items-center py-56 md:py-80">
            <div className="max-w-xl">
              <p className="eyebrow text-braise">BRAVIKO / PAGAMENTO</p>
              <h1 className="mt-16 text-heading-lg font-semibold text-charcoal">{copy.missingTitle}</h1>
              <p className="mt-16 max-w-lg text-body-lg leading-relaxed text-smoke">{copy.missingBody}</p>
              <Link href="/checkout" className="mt-32 inline-flex min-h-48 items-center justify-center rounded-card bg-charcoal px-20 py-12 text-body-sm font-semibold text-white transition-colors hover:bg-braise focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-braise focus-visible:ring-offset-2">
                {copy.backToCheckout}
              </Link>
            </div>
          </section>
        ) : (
          <>
            <div className="border-b border-hairline bg-white">
              <div className="container-custom py-20 md:py-24">
                <Link href="/checkout" className="inline-flex items-center gap-10 text-body-sm text-smoke transition-colors hover:text-braise focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-braise focus-visible:ring-offset-2">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M13 8H3m0 0 4-4m-4 4 4 4" /></svg>
                  {copy.backToCheckout}
                </Link>
              </div>
            </div>

            <div className="container-custom py-40 md:py-64">
              <div className="grid gap-40 lg:grid-cols-[minmax(0,1.08fr)_minmax(320px,.72fr)] lg:items-start lg:gap-64">
                <section aria-labelledby="bank-transfer-title">
                  <p className="inline-flex rounded-full bg-emerald-50 px-12 py-6 text-xs font-medium text-emerald-800">{copy.received}</p>
                  <h1 id="bank-transfer-title" className="mt-16 max-w-2xl text-heading-lg font-semibold text-charcoal md:text-display-sm">{copy.title}</h1>
                  <p className="mt-20 max-w-2xl text-body-lg leading-relaxed text-smoke">{copy.intro} <strong className="font-semibold text-charcoal">{formatPrice(totalPrice)}</strong>.</p>

                  <div className="mt-32 overflow-hidden rounded-card border border-braise/30 bg-braise/10 p-4">
                    <CopyRow label={copy.referenceCause} value={reference} copyLabel={copy.copy} copiedLabel={copy.copied} mono />
                  </div>

                  <div className="mt-24 overflow-hidden rounded-card border border-hairline bg-white">
                    <div className="flex items-end justify-between gap-16 border-b border-hairline px-20 py-16">
                      <h2 className="text-heading-sm font-semibold text-charcoal">{copy.bankDetails}</h2>
                      <span className="text-body-sm text-smoke">{bankTransferDetails.currency} · SEPA</span>
                    </div>
                    <div className="divide-y divide-hairline">
                      <CopyRow label={copy.holder} value={bankTransferDetails.accountHolder} copyLabel={copy.copy} copiedLabel={copy.copied} />
                      <CopyRow label="IBAN" value={bankTransferDetails.iban} copyLabel={copy.copy} copiedLabel={copy.copied} mono />
                      <div className="grid divide-y divide-hairline sm:grid-cols-2 sm:divide-x sm:divide-y-0">
                        <CopyRow label="BIC / SWIFT" value={bankTransferDetails.bic} copyLabel={copy.copy} copiedLabel={copy.copied} mono />
                        <CopyRow label={copy.bank} value={bankTransferDetails.bankName} copyLabel={copy.copy} copiedLabel={copy.copied} />
                      </div>
                    </div>
                  </div>

                  <div className="mt-24 rounded-card border border-braise/30 bg-braise/10 p-20 md:p-24">
                    <h2 className="text-body font-semibold text-charcoal">{copy.afterTitle}</h2>
                    <p className="mt-8 text-body-sm leading-relaxed text-charcoal/75">{copy.afterBody}</p>
                  </div>
                </section>

                <aside className="lg:sticky lg:top-24">
                  <div className="rounded-card border border-hairline bg-white p-20 md:p-24">
                    <h2 className="text-heading-sm font-semibold text-charcoal">{copy.summary}</h2>
                    {items.length > 0 ? (
                      <div className="mt-20 divide-y divide-hairline">
                        {items.map(item => {
                          const label = productLabel(item.product, locale)
                          const variant = item.product.variants?.find(value => value.id === item.variantId)
                          const unitPrice = variant?.price ?? item.product.price
                          return (
                            <div key={`${item.product.id}-${item.variantId ?? 'default'}`} className="flex gap-12 py-16 first:pt-0 last:pb-0">
                              <div className="relative h-64 w-64 shrink-0 overflow-hidden rounded-card bg-mist">
                                <Image src={item.product.image} alt="" fill sizes="64px" className="object-cover" />
                              </div>
                              <div className="min-w-0 flex-1">
                                <p className="line-clamp-2 text-body-sm font-medium text-charcoal">{label.name}</p>
                                <p className="mt-4 text-body-sm text-smoke">{item.quantity} × {formatPrice(unitPrice)}</p>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    ) : (
                      <p className="mt-16 text-body-sm leading-relaxed text-smoke">{copy.emptySummary}</p>
                    )}
                    <div className="mt-24 flex items-center justify-between border-t border-hairline pt-20 text-body font-semibold text-charcoal">
                      <span>{copy.total}</span>
                      <span>{formatPrice(totalPrice)}</span>
                    </div>
                  </div>

                  <div className="mt-12 grid gap-12 sm:grid-cols-2 lg:grid-cols-1">
                    <button type="button" onClick={leaveOrder} className="inline-flex min-h-48 items-center justify-center rounded-card bg-charcoal px-20 py-12 text-body-sm font-semibold text-white transition-colors hover:bg-braise focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-braise focus-visible:ring-offset-2">
                      {copy.backToShop}
                    </button>
                    <Link href="/compte" className="inline-flex min-h-48 items-center justify-center rounded-card border border-charcoal bg-white px-20 py-12 text-body-sm font-semibold text-charcoal transition-colors hover:bg-mist focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-braise focus-visible:ring-offset-2">
                      {copy.account}
                    </Link>
                  </div>
                </aside>
              </div>
            </div>
          </>
        )}
      </main>
      <Footer />
    </>
  )
}

export default function BankTransferPage() {
  return (
    <Suspense fallback={<PageSkeleton variant="checkout" label="Caricamento del pagamento" />}>
      <BankTransferPageContent />
    </Suspense>
  )
}

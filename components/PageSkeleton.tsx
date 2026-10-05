import Header from '@/components/Header'

type PageSkeletonVariant = 'page' | 'products' | 'product' | 'auth' | 'account' | 'checkout' | 'admin'

type PageSkeletonProps = {
  variant?: PageSkeletonVariant
  label?: string
  withHeader?: boolean
}

function SkeletonBlock({ className = '' }: { className?: string }) {
  return <span className={`bk-skeleton-block ${className}`} aria-hidden="true" />
}

function ProductCardsSkeleton() {
  return <div className="bk-page-skeleton-products">
    {Array.from({ length: 6 }, (_, index) => <div className="bk-page-skeleton-product-card" key={index}>
      <SkeletonBlock className="bk-page-skeleton-product-image" />
      <SkeletonBlock className="bk-page-skeleton-product-kicker" />
      <SkeletonBlock className="bk-page-skeleton-product-title" />
      <SkeletonBlock className="bk-page-skeleton-product-copy" />
      <SkeletonBlock className="bk-page-skeleton-product-price" />
    </div>)}
  </div>
}

export function OrderListSkeleton() {
  return <div className="bk-account-order-skeleton" aria-hidden="true">
    {Array.from({ length: 3 }, (_, index) => <div className="bk-account-order-skeleton-row" key={index}>
      <div><SkeletonBlock className="bk-account-order-skeleton-kicker" /><SkeletonBlock className="bk-account-order-skeleton-title" /><SkeletonBlock className="bk-account-order-skeleton-copy" /></div>
      <SkeletonBlock className="bk-account-order-skeleton-status" />
      <SkeletonBlock className="bk-account-order-skeleton-price" />
    </div>)}
  </div>
}

function PageSkeletonContent({ variant }: { variant: PageSkeletonVariant }) {
  if (variant === 'products') return <>
    <section className="bk-page-skeleton-hero"><div className="bk-page-skeleton-hero-inner"><SkeletonBlock className="bk-page-skeleton-hero-kicker" /><SkeletonBlock className="bk-page-skeleton-hero-title" /><SkeletonBlock className="bk-page-skeleton-hero-copy" /></div></section>
    <div className="bk-page-skeleton-content"><div className="bk-page-skeleton-toolbar"><SkeletonBlock className="bk-page-skeleton-toolbar-count" /><SkeletonBlock className="bk-page-skeleton-toolbar-control" /></div><ProductCardsSkeleton /></div>
  </>

  if (variant === 'product') return <div className="bk-page-skeleton-content bk-page-skeleton-product"><div className="bk-page-skeleton-product-layout"><SkeletonBlock className="bk-page-skeleton-detail-image" /><div className="bk-page-skeleton-detail-copy"><SkeletonBlock className="bk-page-skeleton-detail-kicker" /><SkeletonBlock className="bk-page-skeleton-detail-title" /><SkeletonBlock className="bk-page-skeleton-detail-line" /><SkeletonBlock className="bk-page-skeleton-detail-line bk-page-skeleton-detail-line-short" /><SkeletonBlock className="bk-page-skeleton-detail-price" /><SkeletonBlock className="bk-page-skeleton-detail-actions" /><div className="bk-page-skeleton-detail-list"><SkeletonBlock /><SkeletonBlock /><SkeletonBlock /></div></div></div></div>

  if (variant === 'auth') return <div className="bk-page-skeleton-auth"><div className="bk-page-skeleton-auth-intro"><SkeletonBlock className="bk-page-skeleton-auth-kicker" /><SkeletonBlock className="bk-page-skeleton-auth-title" /><SkeletonBlock className="bk-page-skeleton-auth-copy" /><SkeletonBlock className="bk-page-skeleton-auth-link" /></div><div className="bk-page-skeleton-auth-form"><SkeletonBlock className="bk-page-skeleton-form-kicker" /><SkeletonBlock className="bk-page-skeleton-form-title" /><SkeletonBlock className="bk-page-skeleton-field" /><SkeletonBlock className="bk-page-skeleton-field" /><SkeletonBlock className="bk-page-skeleton-form-button" /></div></div>

  if (variant === 'account') return <div className="bk-page-skeleton-content bk-page-skeleton-account"><div className="bk-page-skeleton-heading"><SkeletonBlock className="bk-page-skeleton-heading-kicker" /><SkeletonBlock className="bk-page-skeleton-heading-title" /><SkeletonBlock className="bk-page-skeleton-heading-copy" /></div><div className="bk-page-skeleton-account-layout"><div className="bk-page-skeleton-profile"><SkeletonBlock className="bk-page-skeleton-avatar" /><SkeletonBlock className="bk-page-skeleton-profile-line" /><SkeletonBlock className="bk-page-skeleton-profile-line-short" /></div><OrderListSkeleton /></div></div>

  if (variant === 'checkout') return <div className="bk-page-skeleton-content bk-page-skeleton-checkout"><div className="bk-page-skeleton-heading"><SkeletonBlock className="bk-page-skeleton-heading-kicker" /><SkeletonBlock className="bk-page-skeleton-heading-title" /></div><div className="bk-page-skeleton-checkout-layout"><div className="bk-page-skeleton-checkout-form"><SkeletonBlock className="bk-page-skeleton-form-title" /><SkeletonBlock className="bk-page-skeleton-field" /><SkeletonBlock className="bk-page-skeleton-field" /><SkeletonBlock className="bk-page-skeleton-field" /><SkeletonBlock className="bk-page-skeleton-form-button" /></div><div className="bk-page-skeleton-summary"><SkeletonBlock className="bk-page-skeleton-summary-title" /><SkeletonBlock className="bk-page-skeleton-summary-line" /><SkeletonBlock className="bk-page-skeleton-summary-line" /><SkeletonBlock className="bk-page-skeleton-summary-total" /></div></div></div>

  if (variant === 'admin') return <div className="bk-page-skeleton-content bk-page-skeleton-admin"><div className="bk-page-skeleton-heading"><SkeletonBlock className="bk-page-skeleton-heading-kicker" /><SkeletonBlock className="bk-page-skeleton-heading-title" /></div><div className="bk-page-skeleton-admin-layout"><SkeletonBlock /><SkeletonBlock /><SkeletonBlock /><SkeletonBlock /></div></div>

  return <div className="bk-page-skeleton-content"><div className="bk-page-skeleton-heading"><SkeletonBlock className="bk-page-skeleton-heading-kicker" /><SkeletonBlock className="bk-page-skeleton-heading-title" /><SkeletonBlock className="bk-page-skeleton-heading-copy" /></div><div className="bk-page-skeleton-copy-block"><SkeletonBlock /><SkeletonBlock /><SkeletonBlock /><SkeletonBlock /></div></div>
}

export default function PageSkeleton({ variant = 'page', label = 'Chargement de la page', withHeader = true }: PageSkeletonProps) {
  return <>
    {withHeader && <Header />}
    <main className={`bk-page-skeleton bk-page-skeleton--${variant}`} aria-busy="true" aria-label={label}>
      <PageSkeletonContent variant={variant} />
    </main>
  </>
}

export default function Loading() {
  return (
    <main className="bk-page-loading" aria-busy="true" aria-label="Chargement de la page">
      <div className="bk-page-loading-heading">
        <span className="bk-skeleton bk-skeleton-kicker" />
        <span className="bk-skeleton bk-skeleton-title" />
        <span className="bk-skeleton bk-skeleton-copy" />
      </div>
      <div className="bk-page-loading-grid">
        {Array.from({ length: 6 }, (_, index) => <div className="bk-skeleton-card" key={index}><span className="bk-skeleton bk-skeleton-image" /><span className="bk-skeleton bk-skeleton-line" /><span className="bk-skeleton bk-skeleton-line bk-skeleton-line-short" /></div>)}
      </div>
    </main>
  )
}

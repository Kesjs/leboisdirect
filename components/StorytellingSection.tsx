import Image from 'next/image'

const stories = [
  ['01', 'Bois', 'Tout commence par le bois', 'Sélectionné avec soin pour sa qualité et son pouvoir calorifique.', '/images/fireplace-with-burning-logs-close-up-stony-fireplace-with-burning-smoldering-logs-fire.jpg'],
  ['02', 'Format', 'Le bon format pour votre foyer', "Bûches de 33 cm ou 50 cm, prêtes à l'emploi.", '/images/decorative-metallic-holder-with-heap-wooden-logs-stony-fireplace-with-burning-logs.jpg'],
  ['03', 'Livraison', 'Le bois arrive chez vous', 'Livraison rapide partout en France, déchargement inclus.', '/images/man-room-with-solid-fuel-boiler-working-biofuel-economical-heating.jpg'],
  ['04', 'Chaleur', "Et l'hiver devient plus simple", "Profitez de la chaleur et du confort d'un feu de bois de qualité.", '/images/scandinavian-interior-with-fireplace-stump-table-pile-logs-fire.jpg'],
]

export default function StorytellingSection() {
  return (
    <section className="bg-[#e8e1d8] py-96 md:py-128">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-24 mb-48 md:mb-64">
          <div className="max-w-[560px]">
            <p className="text-[11px] font-semibold text-braise uppercase tracking-[0.18em] mb-16">Notre façon de faire</p>
            <h2 className="text-heading-lg md:text-display font-semibold text-charcoal tracking-tight leading-[0.98]">Un bon feu commence bien avant l’allumette.</h2>
          </div>
          <p className="text-body-lg text-smoke max-w-[360px] leading-relaxed">Du choix de l’essence jusqu’au déchargement, chaque détail compte.</p>
        </div>
        <div className="grid md:grid-cols-2 gap-16 md:gap-24">
          {stories.map(([number, label, title, description, image], index) => (
            <article key={number} className={`group relative overflow-hidden min-h-[420px] md:min-h-[520px] rounded-[20px] bg-charcoal reveal-up ${index === 0 ? 'md:translate-y-24' : ''}`}>
              <Image src={image} alt={title} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]" />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/20 to-transparent" />
              <div className="absolute inset-x-24 bottom-24 md:inset-x-32 md:bottom-32 text-white">
                <div className="flex items-center gap-12 mb-16"><span className="text-[11px] font-semibold tracking-[0.16em] text-white/70">{number}</span><span className="h-px w-24 bg-braise" /><span className="text-[11px] uppercase tracking-[0.16em] text-white/80">{label}</span></div>
                <h3 className="text-[30px] md:text-[42px] font-semibold tracking-tight leading-[1.02] mb-12 max-w-[480px]">{title}</h3>
                <p className="text-body-sm text-white/75 max-w-[400px] leading-relaxed">{description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

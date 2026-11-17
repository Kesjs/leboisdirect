export type ProductVideo = {
  youtubeId?: string
  mp4Url?: string
  posterUrl?: string
  title: string
}

const videosBySlug: Record<string, ProductVideo> = {
  'four-pizza-ofyr-100-cuisson-feu-bois': {
    youtubeId: 'AY-xZIPpXm8',
    title: 'Forno per pizza OFYR 100 – Cottura a legna',
  },
  'fendeur-buches-scheppach-compact-10t-3150w': {
    mp4Url: '/videos/fendeur-buches-scheppach-compact-10t-3150w.mp4',
    title: 'Spaccalegna Scheppach Compact 10T – 3150 W',
  },
  'brasero-plancha-le-bigorneau-acier-corten-100-cm': {
    mp4Url: '/videos/brasero-plancha-le-bigorneau-acier-corten-100-cm.mp4',
    title: 'Braciere Plancha Le Bigorneau – Acciaio Corten Ø100 cm',
  },
  'chauffage-exterieur-gaz-planika-faro-8-kw': {
    mp4Url: '/videos/chauffage-exterieur-gaz-planika-faro-8-kw.mp4',
    title: 'Riscaldatore da esterno a gas Planika Faro – 8 kW',
  },
  'insert-bois-invicta-p947044-10-kw': {
    mp4Url: '/videos/insert-bois-invicta-p947044-10-kw.mp4',
    title: 'Inserto a legna Invicta P947044 – 10 kW',
  },
  'chauffage-infrarouge-exterieur-frico-term-ip67-2000w': {
    mp4Url: '/videos/chauffage-infrarouge-exterieur-frico-term-ip67-2000w.mp4',
    title: 'Riscaldatore a infrarossi FRICO Term IP67 – 2000 W',
  },
  'chariot-buches-le-marquier-fjord-noir': {
    mp4Url: '/videos/chariot-buches-le-marquier-fjord-noir.mp4',
    title: 'Carrello portalegna Le Marquier Fjord – Nero',
  },
  'foyer-bois-panoramique-acaminetti-flat-150x50': {
    mp4Url: '/videos/foyer-bois-panoramique-acaminetti-flat-150x50.mp4',
    title: 'Focolare panoramico a legna A.Caminetti Flat 150 × 50',
  },
  'cheminee-electrique-purline-verre-noir-2000w': {
    mp4Url: '/videos/cheminee-electrique-purline-verre-noir-2000w.mp4',
    title: 'Camino elettrico Purline – Vetro temperato nero 2000 W',
  },
  'bois-de-chauffage-premium-chene-charme-hetre-2-steres-33-cm': {
    mp4Url: '/videos/bois-de-chauffage-premium-chene-charme-hetre-2-steres.mp4',
    title: 'Legna da ardere Premium – Quercia, Carpino & Faggio – Bancale da 2 steri',
  },
  'buches-densifiees-premium-palette-1000-kg': {
    mp4Url: '/videos/buches-densifiees-premium-palette-1000-kg.mp4',
    title: 'Tronchetti di legno densificato Premium – Bancale 1.000 kg',
  },
  'poele-bois-fonte-bronpi-karen-8-kw': {
    mp4Url: '/videos/poele-bois-fonte-bronpi-karen-8-kw.mp4',
    title: 'Stufa a legna in ghisa Bronpi KAREN – 8 kW',
  },
  'abri-buches-timbela-m985-414m2': {
    mp4Url: '/videos/abri-buches-timbela-m985-414m2.mp4',
    title: 'Legnaia con ripostiglio TIMBELA M985 – 4,14 m²',
  },
  'radiateur-electrique-connecte-sauter-hekla-1500w': {
    mp4Url: '/videos/radiateur-electrique-connecte-sauter-hekla-1500w.mp4',
    title: 'Radiatore elettrico connesso Sauter Hekla – 1500 W',
  },
  'radiateur-electrique-connecte-sauter-ipala-1500w': {
    mp4Url: '/videos/radiateur-electrique-connecte-sauter-ipala-1500w.mp4',
    title: 'Radiatore elettrico connesso Sauter Ipala – 1500 W',
  },
  'ofyr-cage-100-accessoire-cuisson': {
    mp4Url: '/videos/ofyr-cage-100-accessoire-cuisson.mp4',
    title: 'OFYR Cage 100 – Accessorio premium per braciere',
  },
}

import { EXTRA_VIDEOS_BY_SLUG } from './extra-catalog-products'

const videoSlugAliases: Record<string, string> = {
  'chariot-le-marquier-fjord-noir': 'chariot-buches-le-marquier-fjord-noir',
  'chauffage-frico-term-ip67-2000w': 'chauffage-infrarouge-exterieur-frico-term-ip67-2000w',
  'fendeur-buches-scheppach-compact-10t': 'fendeur-buches-scheppach-compact-10t-3150w',
  'foyer-cheminee-acaminetti-flat-150x50': 'foyer-bois-panoramique-acaminetti-flat-150x50',
}

export function getProductVideo(slug: string): ProductVideo | null {
  const resolved = videoSlugAliases[slug] || slug
  return videosBySlug[resolved] ?? EXTRA_VIDEOS_BY_SLUG[resolved] ?? null
}

export function getYouTubeThumbnail(youtubeId: string): string {
  return `https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg`
}

export function getYouTubeEmbedUrl(youtubeId: string): string {
  return `https://www.youtube-nocookie.com/embed/${youtubeId}?rel=0`
}

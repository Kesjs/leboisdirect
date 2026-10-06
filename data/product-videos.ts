export type ProductVideo = {
  youtubeId?: string
  mp4Url?: string
  posterUrl?: string
  title: string
}

const videosBySlug: Record<string, ProductVideo> = {
  'four-pizza-ofyr-100-cuisson-feu-bois': {
    youtubeId: 'AY-xZIPpXm8',
    title: 'Four à pizza OFYR 100 – Cuisson au feu de bois',
  },
  'fendeur-buches-scheppach-compact-10t-3150w': {
    mp4Url: '/videos/fendeur-buches-scheppach-compact-10t-3150w.mp4',
    title: 'Fendeur de bûches Scheppach Compact 10T – 3150 W',
  },
  'brasero-plancha-le-bigorneau-acier-corten-100-cm': {
    youtubeId: '37d-6o4cVeo',
    title: 'Brasero Plancha Le Bigorneau – Acier Corten Ø100 cm',
  },
}

export function getProductVideo(slug: string): ProductVideo | null {
  return videosBySlug[slug] ?? null
}

export function getYouTubeThumbnail(youtubeId: string): string {
  return `https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg`
}

export function getYouTubeEmbedUrl(youtubeId: string): string {
  return `https://www.youtube-nocookie.com/embed/${youtubeId}?rel=0`
}

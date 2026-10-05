export type ProductVideo = {
  youtubeId: string
  title: string
}

const videosBySlug: Record<string, ProductVideo> = {
  'four-pizza-ofyr-100-cuisson-feu-bois': {
    youtubeId: 'AY-xZIPpXm8',
    title: 'Four à pizza OFYR 100 – Cuisson au feu de bois',
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

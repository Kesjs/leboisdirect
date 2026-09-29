/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'flagcdn.com' },
      { protocol: 'https', hostname: 'media.adeo.com' },
      { protocol: 'https', hostname: 'www.mademoisellebuche.com' },
      { protocol: 'https', hostname: 'www.staub-motoculture.fr' },
      { protocol: 'https', hostname: 'm.media-amazon.com' },
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    qualities: [65, 70, 75, 85, 90, 95],
  },
}

module.exports = nextConfig

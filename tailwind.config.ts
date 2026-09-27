import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      'xs': '375px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1440px',
    },
    extend: {
      colors: {
        ivory: '#FAF9F6',
        charcoal: '#1D1D1D',
        braise: {
          DEFAULT: '#B85C3A',
          dark: '#8F432C',
        },
        forest: '#34483A',
        smoke: '#737373',
        ash: '#A3A3A3',
        hairline: '#E5E2DC',
        mist: '#F3F4F6',
      },
      fontFamily: {
        sans: ['var(--font-suisse)', 'Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        caption: ['12px', { lineHeight: '1.5' }],
        'body-sm': ['13px', { lineHeight: '1.6' }],
        body: ['16px', { lineHeight: '1.6' }],
        'body-lg': ['18px', { lineHeight: '1.6' }],
        subheading: ['20px', { lineHeight: '1.4' }],
        'heading-sm': ['24px', { lineHeight: '1.3' }],
        heading: ['36px', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        'heading-lg': ['44px', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        display: ['64px', { lineHeight: '1.05', letterSpacing: '-0.03em' }],
        'display-xl': ['96px', { lineHeight: '1', letterSpacing: '-0.04em' }],
      },
      spacing: {
        '4': '4px',
        '8': '8px',
        '12': '12px',
        '16': '16px',
        '20': '20px',
        '24': '24px',
        '28': '28px',
        '32': '32px',
        '40': '40px',
        '48': '48px',
        '56': '56px',
        '60': '60px',
        '64': '64px',
        '80': '80px',
        '120': '120px',
        '176': '176px',
        '180': '180px',
      },
      borderRadius: {
        'pill': '9999px',
        'card': '8px',
      },
      maxWidth: {
        'container': '1440px',
      },
    },
  },
  plugins: [],
}
export default config

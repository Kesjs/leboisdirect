# LeBoisDirect

Site e-commerce premium français pour la vente de bois de chauffage en ligne.

## Stack Technique

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animations:** GSAP + ScrollTrigger
- **State Management:** React Context API
- **Fonts:** Inter (via Next.js font optimization)

## Design System

Le site adopte une approche **premium éditoriale** inspirée par la retenue et la qualité :

### Couleurs
- **Ivory** (#FAF9F6) - Canvas principal
- **Charcoal** (#1D1D1D) - Texte et CTA primaire
- **Braise** (#B85C3A) - Accent signature (ember/fire)
- **Forest** (#34483A) - Accent naturel secondaire

### Philosophie Visuelle
- Photography-first composition
- Large architectural typography
- Generous whitespace
- Minimal UI chrome
- Cinematic motion for discovery, calm for conversion

## Structure du Projet

```
leboisdirect/
├── app/                      # Next.js App Router pages
│   ├── boutique/            # Shop page with filters
│   ├── produit/[slug]/      # Dynamic product pages
│   ├── panier/              # Cart page
│   ├── checkout/            # Multi-step checkout
│   ├── commande/            # Order confirmation
│   ├── notre-histoire/      # Brand story
│   ├── livraison/           # Delivery info
│   ├── faq/                 # FAQ page
│   └── page.tsx             # Homepage
├── components/              # React components
│   ├── Hero.tsx             # Cinematic hero with GSAP
│   ├── StorytellingSection.tsx  # 4-scene pinned scroll
│   ├── ProductCard.tsx      # Premium product card
│   ├── CartDrawer.tsx       # Cart sidebar
│   ├── Header.tsx           # Main navigation
│   └── Footer.tsx           # Site footer
├── lib/                     # Utilities
│   ├── cart-context.tsx     # Cart state management
│   ├── gsap-utils.ts        # Reusable GSAP functions
│   └── utils.ts             # Helper functions
├── data/                    # Mock data
│   └── products.ts          # Product catalog
├── docs/                    # Documentation
│   ├── DESIGN.md            # Design system specs
│   └── assets-manifest.md   # Image catalog
├── public/images/           # Static assets
└── PRODUCT.md               # Product context

```

## Fonctionnalités Principales

### Pages Principales
- **Homepage** - Hero cinématique, featured products, storytelling 4 scènes
- **Shop** - Filtres (catégorie, essence), tri, grid responsive
- **Product Detail** - Gallery, variants, specs, add to cart
- **Cart** - Mini-drawer + full page, quantity management
- **Checkout** - Multi-step (contact, delivery, payment)
- **Brand Pages** - Notre Histoire, Livraison, FAQ

### Commerce
- Context-based cart avec localStorage
- Variant selection (volume/format)
- Quantity management
- Price calculations
- Mock checkout flow (Stripe-ready)

### Motion Design
- GSAP hero entrance animations
- ScrollTrigger parallax effects
- 4-scene pinned storytelling sequence
- Smooth micro-interactions
- `prefers-reduced-motion` support

## Installation

```bash
npm install
```

## Développement

```bash
npm run dev
```

Le site sera accessible sur [http://localhost:3000](http://localhost:3000)

## Build

```bash
npm run build
npm start
```

## Principes Impeccable Appliqués

Le site suit les standards de qualité Impeccable :

### Surfaces Élevées
- Cartes avec `bg-white`, borders subtiles, pas de wireframes creux
- Proper elevation hierarchy

### Pas de Boîtes dans des Boîtes
- Metrics en flux aéré avec séparations douces
- Pas de containers imbriqués inutiles

### Zéro Liseré Néon
- Pas de `border-t-2 border-rose-500`
- Badges rounded pill avec fills subtils

### Typographie Moderne
- Inter à graisses appropriées
- Scale cohérente 12px → 96px
- Negative tracking pour display sizes

### Actions Hiérarchisées
- Primaire: `bg-charcoal` (conversion principale)
- Secondaire: `bg-transparent border`
- Braise réservé aux accents et états actifs

## Image Hero

L'image hero exacte utilisée :
```
/images/photorealistic-timber-house-interior-with-wooden-decor-furnishings.jpg
```

Toutes les images sont optimisées avec Next.js Image :
- Formats: WebP/AVIF
- Responsive sizes
- Lazy loading (sauf hero)
- Priority loading pour above-fold

## Responsive Breakpoints

```
xs:  375px  (mobile small)
sm:  640px  (mobile)
md:  768px  (tablet)
lg:  1024px (desktop small)
xl:  1280px (desktop)
2xl: 1440px (desktop large)
```

## État Actuel

**Version:** 1.0.0 (Première itération complète)

### Complet
- Design system
- Homepage avec storytelling cinématique
- Shop avec filtres et tri
- Product pages avec variants
- Cart system avec drawer
- Checkout multi-step
- Brand pages (Histoire, Livraison, FAQ)
- Footer
- Responsive design
- Motion system GSAP

### Mock/Placeholder
- Données produits (8 produits réalistes)
- Intégration Stripe (architecture prête)
- Backend Supabase (structure prête)
- Images produits (utilise lifestyle shots)

## Performance

- Next.js 15 optimisations
- Image optimization automatique
- Code splitting par route
- GSAP cleanup proper
- LocalStorage cart persistence

## Accessibilité

- HTML sémantique
- Labels ARIA appropriés
- Navigation clavier
- États de focus visibles
- Contraste WCAG AA
- Support `prefers-reduced-motion`

## Browser Support

- Chrome/Edge (dernières versions)
- Firefox (dernières versions)
- Safari (dernières versions)
- Mobile browsers

## Prochaines Étapes (Production)

1. Intégration Stripe réelle
2. Backend Supabase avec vraies données
3. Photography produits professionnelle
4. Système de commandes complet
5. Email notifications
6. Admin dashboard
7. Analytics
8. SEO optimization complète
9. Tests E2E
10. Performance monitoring

## Licence

Propriétaire - LeBoisDirect

## Contact

Pour toute question : contact@leboisdirect.fr

# Design System — LeBoisDirect

## Visual Identity

**LeBoisDirect** adopts a contemporary premium French aesthetic inspired by editorial restraint and photography-first composition. The visual language combines Cowboy-level sophistication with warm winter storytelling.

### Design Philosophy
- Photography carries the color; interface remains neutral
- Large architectural typography
- Generous whitespace with deliberate rhythm
- Minimal decorative UI chrome
- Cinematic motion for storytelling; calm for commerce

## Color Palette

### Primary Colors
```
ivory:        #FAF9F6   (main canvas)
white:        #FFFFFF   (pure product surfaces)
charcoal:     #1D1D1D   (primary text, primary CTA)
```

### Accent Colors
```
braise:       #B85C3A   (signature ember/fire accent)
braise-dark:  #8F432C   (active states)
forest:       #34483A   (secondary natural accent)
```

### Neutral Palette
```
smoke:        #737373   (secondary text)
ash:          #A3A3A3   (tertiary text, metadata)
hairline:     #E5E2DC   (borders, subtle divisions)
mist:         #F3F4F6   (secondary surfaces)
```

### Color Usage Rules
- Braise is RARE and SIGNATURE — use sparingly for active states, small details, editorial marks
- Never make the entire site orange
- Primary CTA uses charcoal background, not braise
- Photography provides visual color, not the interface

## Typography

### Font Family
- **Primary:** Inter (loaded via Next.js font optimization)
- **Weights:** 400 (regular), 500 (medium), 600 (semibold)
- **Fallbacks:** system-ui, sans-serif

### Type Scale
```
caption:      12px / 1.5
body-sm:      13-14px / 1.6
body:         16px / 1.6
body-lg:      18px / 1.6
subheading:   20px / 1.4
heading-sm:   24px / 1.3
heading:      36px / 1.2 / -0.01em
heading-lg:   44px / 1.1 / -0.02em
display:      64-72px / 1.0 / -0.03em
display-xl:   96-100px / 1.0 / -0.04em
```

### Typography Principles
- Large headlines are architectural, not decorative
- Display typography uses negative letter-spacing
- Editorial headlines breathe; they're not cramped
- Body text prioritizes readability
- Hierarchy through scale and weight, not decoration

## Spacing Scale
Base unit: 4px

```
4, 8, 12, 16, 20, 24, 28, 32, 40, 48, 56, 60, 64, 120, 176, 180
```

### Spacing Philosophy
- Major sections: generous spacing (64-120px)
- Content groupings: moderate spacing (24-48px)
- Tight relationships: minimal spacing (8-16px)
- Alternate density and respiration

## Shape System

### Border Radius
```
pill:  9999px  (buttons, tags, navigation pills)
card:  8px     (product cards, images, inputs)
none:  0       (major sections, containers)
```

### Shadows
**Default: NO SHADOW**

Use subtle shadows ONLY for:
- Floating cart drawer
- Modal dialogs
- Overlays that truly float

Shadow formula when needed:
```
light: 0 2px 10px rgba(0,0,0,0.02)
medium: 0 4px 20px rgba(0,0,0,0.08)
```

## Components

### Buttons

**Primary**
```
bg: charcoal
text: white
shape: pill
padding: 12px 32px (md), 16px 40px (lg)
hover: charcoal/90
```

**Secondary**
```
bg: transparent
border: 1px solid charcoal
text: charcoal
shape: pill
hover: bg-charcoal/5
```

**Ghost**
```
text-only link
minimal underline (optional)
hover: text color shift
```

### Product Card (FLAGSHIP COMPONENT)

High-priority premium component. Must never look cheap or generic.

**Structure:**
- Image (4:3 aspect, rounded-card, subtle hover scale 1.02-1.03)
- Category badge (pill, subtle, top-left)
- Species indicator (optional braise dot, top-right)
- Product name (heading-sm, semibold)
- Species/format info (body-sm, smoke)
- Conditioning (body-sm, smoke)
- Price section (large, semibold)
- Delivery info (caption, ash)

**Interaction:**
- Hover: image scale, title color → braise
- Transition: 300-700ms ease-out
- No aggressive effects

### Header/Navigation

**Structure:**
- Height: 72px desktop
- Logo left
- Navigation center (desktop)
- Actions right (search, account, cart)
- Mobile: hamburger menu

**Style:**
- bg: ivory/95 with backdrop-blur
- border-bottom: hairline
- sticky positioning
- Subtle on-scroll reduction (optional)

### Footer
Clean, organized, not SaaS-heavy.

Sections:
- Products
- Information
- Legal

Typography: body-sm, subtle hierarchy

## Motion System

### Motion Zones by Intent

**ZONE A — Cinematic (Discovery)**
- Hero entrance & scroll parallax
- Storytelling section (4 scenes with GSAP ScrollTrigger)
- Lifestyle features
- Technique: GSAP timelines, scale, parallax, clip-path, opacity choreography

**ZONE B — Refined (Engagement)**
- Section transitions
- Product hover states
- Category interactions
- Technique: CSS transitions, subtle transforms

**ZONE C — Subtle (Commerce)**
- Product cards
- Navigation
- Buttons
- Technique: Fast CSS transitions (200-300ms)

**ZONE D — Calm (Conversion)**
- Cart
- Checkout
- Forms
- Payment
- Technique: Minimal animation, instant feedback

### Motion Principles
- Desktop: maximum quality
- Mobile: lighter, performance-conscious
- `prefers-reduced-motion`: full respect, opacity-only fallbacks
- Never block interaction with animation

### GSAP Usage
```javascript
// Hero entrance
gsap.timeline()
  .from('.hero-eyebrow', { opacity: 0, y: 20, duration: 0.8 })
  .from('.hero-headline', { opacity: 0, y: 30, duration: 1 }, '-=0.4')

// Scroll parallax
ScrollTrigger.create({
  trigger: element,
  start: 'top top',
  end: 'bottom top',
  scrub: 1-1.5,
})
```

## Responsive Behavior

### Breakpoints
```
375px  (mobile small)
390px  (mobile standard)
430px  (mobile large)
768px  (tablet)
1024px (desktop small)
1440px (desktop standard)
```

### Grid Adaptations
- Product grid: 4 cols → 3 cols → 2 cols
- Content max-width: 1440px
- Container padding: 24px (mobile) → 64px (desktop)

### Mobile Priorities
- Touch targets ≥ 44px
- Simplified navigation (drawer)
- Reduced motion intensity
- Optimized image sizes
- Horizontal scrolling for categories

## Image Strategy

### Hero Image
**File:** `photorealistic-timber-house-interior-with-wooden-decor-furnishings.jpg`
- Priority: preload
- Sizes: 1920w (desktop), 1200w (tablet), 828w (mobile)
- Format: WebP/AVIF
- Quality: 90-95 (hero is premium)

### Product Images
- Sizes: 1200w, 828w, 640w, 384w
- Format: WebP
- Lazy loading below fold
- Aspect ratio: 4:3 maintained

### Optimization
- Next.js Image component
- Responsive sizes attribute
- Lazy loading (except hero)
- Modern formats (WebP/AVIF)

## Accessibility

### Requirements
- Semantic HTML5
- ARIA labels where needed
- Keyboard navigation (full support)
- Focus states (visible, 2px outline)
- Color contrast: WCAG AA minimum
- Alt text: descriptive, contextual
- Heading hierarchy: logical h1-h6
- Touch targets: ≥ 44px
- `prefers-reduced-motion` support

## Anti-Patterns (NEVER)

### Visual
- No neon borders (border-t-2 border-rose-500 style)
- No cheap drop shadows on every card
- No floating 3D shapes
- No glassmorphism overuse
- No AI gradient aesthetic
- No rustic/decorative fonts
- No fake depth effects

### UX
- No card walls (endless grids without rhythm)
- No boxes within boxes within boxes
- No aggressive zoom on hover
- No decorative animation blocking interaction
- No fake social proof
- No invented business claims

### Code
- No inline style values
- No random spacing outside scale
- No inconsistent border radius
- No accessibility shortcuts

## Quality Standards (Impeccable-Aligned)

### Surfaces Elevated
- Cards have proper elevation: bg-white, subtle border, no harsh wireframes
- Dark mode (if added): real anthracite surfaces, not transparent boxes on black

### Hierarchy Clear
- No flat walls of similar-weight text
- Metrics displayed in flowing sections with soft separators, not sub-boxes
- Price and key info: bold, large, unmissable

### Badges Refined
- Rounded pills with subtle fill
- No harsh neon top-borders
- Category/status with appropriate semantic color

### Actions Hierarchical
- Primary: charcoal bg, white text (Signal Orange #ee6018 reserved for high-stakes conversion)
- Secondary: subtle bg-mist, border, readable text
- Tertiary: ghost/text-only

### Typography Professional
- Inter (or similar modern sans) at proper weights
- No font-black abuse
- Monospace for technical data only

## Design Tokens (Tailwind Extension)

All tokens defined in `tailwind.config.ts`:
- Colors: ivory, charcoal, braise, forest, smoke, ash, hairline, mist
- Spacing: 4-180px scale
- Border radius: pill, card
- Typography: full scale with line-height and letter-spacing

## Component Library Location
- `/components` (presentational)
- `/components/motion` (GSAP-powered)
- `/lib` (utilities)
- `/data` (mock data structures)

## References
- Inspiration: Cowboy (restraint, editorial)
- Component quality: 21st.dev patterns (adapted to LeBoisDirect tokens)
- Quality system: Impeccable principles

# Gemak Website - Design Expert Memory

## Project Stack
- React + Vite + Tailwind CSS v4 (uses @theme directive, not tailwind.config.js)
- Framer Motion for animations
- Lucide React for icons
- React Router DOM for navigation

## Design System
- **Theme config**: `src/index.css` using `@theme {}` block
- **Colors**: gemak-green (#00C853), gemak-black (#0A0A0A), gemak-black-light (#1A1A2E), gemak-red (#D50000)
- **Fonts**: Display=Bebas Neue, Heading=Oswald, Body=DM Sans
- **Custom utilities**: text-gradient-green, bg-grid-pattern, bg-radial-green, glass-card, glass-card-green, neon-glow
- **Light/dark theme**: CSS variable based with `.hero-section` and `.dark-section` class overrides

## Component Patterns
- `AnimatedSection` (variants: fadeUp, fadeDown, fadeLeft, fadeRight, scale, rotate) in `src/components/AnimatedSection.jsx`
- `StaggerContainer` + `StaggerItem` for staggered reveal animations
- `PageSEO` for meta tags
- `siteInfo` from `src/data/siteData.js` for phone numbers, etc.

## Design Conventions
- Sections use py-24 md:py-32 for vertical padding
- max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 for content containers
- glass-card with rounded-2xl for card elements
- font-heading uppercase tracking-wider for small labels
- font-display for large headings
- Text opacity pattern: white/50 for body, white/40 for secondary, white/30 for tertiary
- Green accent pill badges with animate-pulse dot indicator
- Hero sections get `.hero-section` class for light mode variable override
- Border accents: border-gemak-green/20 for subtle green borders

## Image Assets (Security)
- `/29.jpeg` - Two security guards (hi-vis + tactical) standing by vehicles
- `/30.jpeg` - Gemak Security Shop storefront (CCTVs, guard equipment signage)
- `/31.jpeg` - Gemak Security Shop side window display (products, branding)
- `/32.jpeg` - Armed response officers with branded Gemak patrol vehicle
- `/33.jpeg` - Security personnel with equipment in parking area
- `/GEMAK SECURITY SERVICES LOGO.png` - Official security division logo

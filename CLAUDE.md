# The Blender — Codebase Rules for Claude

## Project Overview

**The Blender** (entertheblender.gr) is an organic hospitality project in Athens, Greece with three distinct experiences:
- **Basket** (#D4B5E8 lavender) — Picnic-style restaurant / café
- **Orchard** (#10B981 green) — Treehouse fruit rooms (accommodation)
- **Vineyard** (#FF69B4 pink) — Natural wine & cocktail bar

Address: Odisseos 14, Athens 104 37, Greece
Email: blender@entertheblender.gr
Phone: +30 210 522 3954

---

## Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router) |
| Runtime | React 19 |
| Styling | Tailwind CSS v4 + shadcn/ui |
| Animations | Framer Motion (`motion/react`) |
| Icons | `lucide-react` (primary), `@mui/icons-material` (available) |
| Fonts | Inter + Oswald (Google Fonts) |
| Database | Supabase (`@supabase/supabase-js`) |
| Build | Next.js / Turbopack |

---

## Project Structure

```
/Users/rebel/Desktop/entertheblender/
├── src/
│   ├── app/                        # Next.js App Router root
│   │   ├── layout.tsx              # Root layout: nav + footer (currently 'use client')
│   │   ├── page.tsx                # Home page
│   │   ├── not-found.tsx           # 404 page
│   │   ├── basket/page.tsx         # Restaurant menu (Basket)
│   │   ├── events/page.tsx         # Events listing
│   │   ├── contact/page.tsx        # Contact page
│   │   ├── book/page.tsx           # Booking page
│   │   ├── orchard/page.tsx        # Under construction
│   │   ├── vineyard/page.tsx       # Under construction
│   │   ├── homev2/page.tsx         # Alt home design
│   │   ├── admin/events/page.tsx   # Admin events panel
│   │   ├── components/
│   │   │   ├── ui/                 # shadcn/ui primitives (full set)
│   │   │   ├── figma/
│   │   │   │   └── ImageWithFallback.tsx  # img with error fallback
│   │   │   ├── FloatingContactButton.tsx  # Fixed bottom-right contact bubble
│   │   │   ├── Logo.tsx
│   │   │   └── LogoVariations.tsx
│   │   └── pages/                  # Non-route helper pages
│   │       ├── Stories.tsx
│   │       ├── UnderConstruction.tsx
│   │       └── EventsSubmenuShowcase.tsx
│   ├── styles/
│   │   ├── index.css               # Entry point (imports all below)
│   │   ├── theme.css               # CSS custom properties (shadcn tokens + dark mode)
│   │   ├── tailwind.css            # Tailwind v4 + tw-animate-css
│   │   └── fonts.css               # Google Fonts @import (Inter + Oswald)
│   └── imports/
│       └── 1.svg                   # Figma-exported SVG
├── public/
│   ├── logo.svg                    # The Blender logo
│   ├── hero-bg.jpg                 # Homepage hero background
│   └── hero-bg.png                 # (alternate)
├── package.json
├── next.config.ts
└── tsconfig.json
```

---

## Design Tokens (`src/styles/theme.css`)

Tokens are CSS custom properties in `:root`, bridged to Tailwind v4 via `@theme inline`.

### Color Palette

```css
/* Backgrounds */
--background: #ffffff
--muted: #ececf0
--accent: #e9ebef

/* Primary */
--primary: #030213         /* Near-black */
--secondary: oklch(0.95 0.0058 264.53)

/* Brand Accents (hardcoded, not in theme.css) */
#FF69B4   /* Vineyard / Savor — hot pink */
#10B981   /* Orchard / Stay — emerald */
#D4B5E8   /* Basket / Gather — lavender */
#7C3AED   /* Primary CTA — purple */

/* Semantic */
--destructive: #d4183d
--border: rgba(0, 0, 0, 0.1)
--radius: 0.625rem
```

### Typography

| Class | Font | Usage |
|-------|------|-------|
| `font-oswald` | Oswald | Headings, nav labels, uppercase display text |
| `font-inter` | Inter | Body copy, descriptions, fine print |
| `font-mono` | System mono | Blueprint/technical overlay labels on hero |

Common heading pattern:
```tsx
<h1 className="font-oswald text-5xl md:text-8xl uppercase tracking-tight">...</h1>
<p className="font-inter text-neutral-600 font-light leading-relaxed">...</p>
```

---

## Component Library

### shadcn/ui Components (`src/app/components/ui/`)

Full set installed. Key ones used in the project:
- `button`, `card`, `dialog`, `tabs`, `sheet`, `skeleton`
- `calendar`, `popover` (for booking)
- `sonner` (toast notifications)

Import pattern:
```tsx
import { Button } from '@/app/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/app/components/ui/tabs';
```

`cn()` utility is at `src/app/components/ui/utils.ts`:
```tsx
import { cn } from '@/app/components/ui/utils';
```

### Custom Components

**`FloatingContactButton`** — fixed bottom-right expandable contact menu (Email, WhatsApp, Phone, Instagram). Uses Framer Motion. Must be `'use client'`.

**`ImageWithFallback`** — plain `<img>` with SVG error fallback. Use this for external/Unsplash images where `next/image` isn't needed. Must be `'use client'` (uses `useState`).

---

## Styling Approach

- **Tailwind CSS v4** utility classes everywhere — no CSS modules, no styled-components
- **Responsive**: Standard Tailwind breakpoints (`md:`, `lg:`)
- **Dark mode**: Available via `.dark` class but not actively used (site is light mode)
- **Transitions**: Standard Tailwind transitions + Framer Motion for entrances

Common patterns:
```tsx
// Neutral palette layout
<div className="bg-neutral-50 text-neutral-900">
<div className="bg-neutral-900 text-white">  // dark sections

// Section containers
<section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">

// Uppercase labels
<span className="font-oswald text-xs uppercase tracking-widest text-neutral-500">

// Brand dot indicators
<span className="w-1.5 h-1.5 rounded-full bg-[#FF69B4]"></span>
```

---

## Asset Management

- **Static assets**: `/public/` directory, referenced as `/logo.svg`, `/hero-bg.jpg`
- **External images**: Unsplash CDN — need `images.remotePatterns` in `next.config.ts`
- **In components**: Use plain `<img>` or `<ImageWithFallback>` for external images; use `next/image` for LCP images in `/public/`

**`next.config.ts` must include:**
```ts
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
    ],
  },
};
```

---

## Icon System

**Primary**: `lucide-react` — all icons imported by name:
```tsx
import { Bed, UtensilsCrossed, ArrowRight, Facebook, Instagram, Mail, Phone, MessageCircle, Map, Construction } from 'lucide-react';
```

**Logo**: `/public/logo.svg` — referenced as `<img src="/logo.svg" />` in the nav.

No custom icon set or icon naming convention beyond lucide's naming.

---

## Next.js Conventions

### Client vs Server Components

- **`'use client'`** required for: any page/component using `useState`, `useEffect`, `usePathname`, Framer Motion, event handlers
- The root `layout.tsx` is currently `'use client'` (due to `usePathname` + `useEffect` for scroll-to-top). Ideally the nav scroll logic would be extracted to a client sub-component.
- Static content pages can be Server Components (no directive needed)

### Routing

App Router file-based routing:
| URL | File |
|-----|------|
| `/` | `src/app/page.tsx` |
| `/basket` | `src/app/basket/page.tsx` |
| `/events` | `src/app/events/page.tsx` |
| `/contact` | `src/app/contact/page.tsx` |
| `/book` | `src/app/book/page.tsx` |
| `/orchard` | `src/app/orchard/page.tsx` |
| `/vineyard` | `src/app/vineyard/page.tsx` |
| `/admin/events` | `src/app/admin/events/page.tsx` |

### Fonts

Currently loaded via `@import` in `src/styles/fonts.css`. For production, migrate to `next/font/google`:
```tsx
// In layout.tsx
import { Inter, Oswald } from 'next/font/google';
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const oswald = Oswald({ subsets: ['latin'], variable: '--font-oswald', weight: ['300','400','500','600'] });
```

---

## Figma → Next.js Migration Rules

When converting Figma Make (React + Vite) code to Next.js:

1. **`figma:asset/...`** → Replace with `/public/filename.png` or Unsplash URL. Download needed assets to `/public/`.

2. **`react-router` imports** → Replace:
   - `Link` from `'react-router'` → `Link` from `'next/link'` + `href=` prop
   - `useLocation` → `usePathname` from `'next/navigation'`
   - `<Outlet />` → `{children}` in layout

3. **`ImageWithFallback`** → Keep for external/Unsplash images. For `/public/` assets use `<img>` or `next/image`.

4. **`'use client'`** → Add to any page/component using hooks, motion, or event handlers.

5. **`useState` for tabs/menus** → Keep as-is, just ensure `'use client'` is present.

6. **`<RouterProvider>`** → Not needed; Next.js App Router handles this.

---

## Pages Status

| Page | Status | Notes |
|------|--------|-------|
| `/` (Home) | Done | Uses `'use client'`, Framer Motion |
| `/basket` | Needs fix | Still has `react-router` imports |
| `/events` | Check needed | May have Figma imports |
| `/contact` | Check needed | |
| `/book` | Check needed | |
| `/orchard` | Stub | Under construction |
| `/vineyard` | Stub | Under construction |
| `/admin/events` | Check needed | |

---

## Brand Voice & Design Philosophy

- **Tone**: Raw, minimal, architectural. Avoid marketing fluff.
- **Design**: Blueprint/technical aesthetic on hero. Clean white/neutral palette elsewhere.
- **Typography hierarchy**: Oswald uppercase for display; Inter light for body.
- **Sections follow pattern**: Hero → Intro text → Content → Dark philosophy section → CTA
- **Three brand sections** always shown with their color dot identifiers.
- **Under construction pages**: Show `UnderConstruction` component, not a blank page.

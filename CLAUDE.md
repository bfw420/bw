# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 15.5.2 website for Hon Dr Brian Walker MLC - Member of the Legislative Council for Western Australia and General Practitioner in Claremont. The site serves dual purposes: political representation and medical practice information.

## Development Commands

```bash
# Development server with Turbopack
npm run dev

# Production build with Turbopack
npm run build

# Production server
npm start

# Linting
npm run lint
```

## Technology Stack

- **Framework**: Next.js 15.5.2 (App Router)
- **React**: 19.1.0
- **Styling**: Tailwind CSS v4 with custom theme
- **UI Components**: shadcn/ui (New York style)
- **Forms**: react-hook-form + zod validation
- **Icons**: lucide-react
- **Animations**: canvas-confetti, tw-animate-css
- **Analytics**: Google Analytics integration
- **Video**: react-youtube, YouTube RSS feed integration

## Architecture

### Page Structure

The site is a single-page application with sections:
- **Navigation**: Sticky header with mobile menu
- **Hero**: Legislative Council logo with gradient slideshow
- **Wellness Section**: YouTube video carousel from channel feed
- **Political Goals**: Campaign objectives
- **How to Help**: Volunteer and support options
- **Contact Form**: Dual-purpose form (political/medical) with webhook integration
- **Footer**: Social links, newsletter signup

### Key Features

1. **Dual Contact System**: Form routes to different email addresses based on contact type:
   - Political: `brian.walker.mlc@mp.wa.gov.au`
   - Medical: `claremont@nextpracticehealth.com`

2. **YouTube Integration**: `/api/youtube/route.ts` fetches from RSS feed, filters out shorts, returns 4 long-form videos with fallback data

3. **Contact Form Webhook**: `/api/contact/route.ts` converts POST to GET request with URL params and forwards to n8n webhook

4. **Custom Captcha**: Client-side math captcha to prevent spam

### Color Scheme

Primary brand colors defined in `globals.css`:
- Primary Green: `#00653b` (--color-primary)
- Accent Green: `#6cc24a` (--color-accent)

Both colors used throughout for political party branding (Legalise Cannabis WA Party).

### Component Organization

```
src/
├── app/
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx            # Home page composition
│   ├── globals.css         # Tailwind + theme variables
│   ├── api/
│   │   ├── contact/        # Form submission webhook proxy
│   │   └── youtube/        # RSS feed parser
│   ├── copyright/          # Copyright page
│   └── privacy/            # Privacy policy page
├── components/
│   ├── Navigation.tsx      # Sticky nav with mobile menu
│   ├── HeroSection.tsx     # Gradient slideshow hero
│   ├── WellnessSection.tsx # YouTube video carousel
│   ├── PoliticalGoalsSection.tsx
│   ├── HowToHelpSection.tsx
│   ├── ContactForm.tsx     # Main contact form
│   ├── Footer.tsx          # Social links & newsletter
│   ├── GoogleAnalytics.tsx # GA4 integration
│   └── ui/                 # shadcn components
└── lib/
    └── utils.ts            # Tailwind merge utility
```

## Important Implementation Details

### YouTube API Notes
- Uses RSS feed instead of YouTube Data API (no API key required)
- Filters shorts by title length, `#shorts` tag, and description
- Has fallback video data if RSS fetch fails
- Channel ID: `UCCIGBIf3b385BV5d48Y1U2A`

### Contact Form Flow
1. Client validation with zod schema
2. Captcha verification (client-side)
3. POST to `/api/contact`
4. API converts to GET with URL params
5. Forwarded to n8n webhook at `n8n.jaxius.net`
6. Success triggers confetti animation

### Image Configuration
- Remote patterns configured for `i.ytimg.com` (YouTube thumbnails)
- Public images in `/public/images/`
- SVG favicons for navigation

### Styling Conventions
- Use shadcn/ui components from `@/components/ui/`
- Custom theme colors via CSS variables
- Hover animations with `hover:-translate-y-1` pattern
- Gradient backgrounds: `from-[#00653b] to-[#6cc24a]`

### Footer Social Media Icons
- Custom SVG icon components for Patreon, Bluesky, and TikTok (lucide-react doesn't include these)
- PatreonIcon: Circle with "P" logo
- BlueskyIcon: Butterfly logo
- TikTokIcon: Musical note logo
- All icons sized at `w-5 h-5` with `fill="currentColor"` for color inheritance

### Client-Side Requirements
- Navigation menu state
- HeroSection slideshow
- ContactForm captcha generation
- WellnessSection carousel (embla-carousel-react)

All interactive components use `"use client"` directive.

## Configuration Files

- `next.config.ts`: Image remote patterns
- `components.json`: shadcn/ui configuration (New York style, RSC enabled)
- `tsconfig.json`: Path aliases (`@/*` → `src/*`)

## External Integrations

- **n8n Webhook**: `https://n8n.jaxius.net/webhook/6cffe9fc-d8f8-4fdd-8a0d-0b9f94ecadc5`
- **Google Analytics**: Measurement ID placeholder (`GA_MEASUREMENT_ID`)
- **YouTube Channel**: `UCCIGBIf3b385BV5d48Y1U2A`
- **Party Website**: `https://www.lcwaparty.org.au/`

### Social Media Links
- **Facebook**: `https://www.facebook.com/BrianWalkerMLC/`
- **Instagram**: `https://www.instagram.com/brianwalkermlc/`
- **Patreon**: `https://www.patreon.com/cw/DrBrianWalkerMLC`
- **Bluesky**: `https://bsky.app/profile/bfw.bsky.social`
- **X (Twitter)**: `https://x.com/BrianWalkerMLC`
- **TikTok**: `https://www.tiktok.com/@brianwalkermlcs`

## Development Notes

- Turbopack is enabled for faster builds and dev server
- Hydration warnings suppressed in root HTML element
- Custom link styling prevents blue browser defaults
- Focus states use primary brand color
- Form uses controlled components via react-hook-form

### Known Warnings
- **Hydration Mismatch**: Browser extensions (like Dashlane password manager) may add attributes (`data-dashlane-rid`, etc.) to form inputs, causing hydration warnings in development. This is not a code issue and doesn't affect functionality. Users can disable extensions on localhost if desired.

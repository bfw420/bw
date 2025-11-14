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
- **Analytics**: Google Analytics (G-R96M1RT9HC), Vercel Analytics
- **Video**: react-youtube, YouTube RSS feed integration

## Architecture

### Page Structure

The site is a single-page application with sections:
- **Navigation**: Sticky header with mobile menu
- **Hero**: "Your Doctor in Parliament" headline in modern frosted glass box (white/95 backdrop-blur-md), smaller Legislative Council logo (24x24/28x28), image slideshow without dark overlay showing speech_2, crowd, and ch10interview photos
- **Stats Section**: 5-stat infographic bar with icons and glassmorphism design (40+ Years GP, 5 Years Parliament, 11+ Bills, 5,000+ Subscribers, 7 Languages)
- **Wellness Section**: YouTube video carousel from channel feed
- **Political Goals**: Campaign objectives with large icons, single-word titles, detailed descriptions, and chamber.webp banner image
- **How to Help**: Newsletter signup with emotional copy, YouTube section with accountability messaging, subscriber counter and subscribe button, lcwamedia team photo in party section
- **Economic Report**: Featured report section with smaller brian_report.png image
- **Contact Form**: Dual-purpose form (political/medical) with webhook integration
- **Footer**: LCWA logo above name, enhanced social media links in grid layout, qualifications displayed close to name in accent green

### Key Features

1. **Dual Contact System**: Form routes to different email addresses based on contact type:
   - Political: `brian.walker.mlc@mp.wa.gov.au`
   - Medical: `claremont@nextpracticehealth.com`

2. **YouTube Integration**: `/api/youtube/route.ts` fetches from RSS feed, filters out shorts, returns 4 long-form videos with fallback data. Videos displayed in YouTube-style cards with thumbnail, channel icon, title, and metadata

3. **YouTube Subscriber Counter**: `/api/youtube/subscribers/route.ts` fetches live subscriber count via YouTube Data API v3, displays with animated tick-up counter in compact YouTube-styled card next to subscribe button with red YouTube play icon

4. **Contact Form Webhook**: `/api/contact/route.ts` converts POST to GET request with URL params and forwards to n8n webhook

5. **Custom Captcha**: Client-side math captcha to prevent spam

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
│   │   └── youtube/
│   │       ├── route.ts    # RSS feed parser for videos
│   │       └── subscribers/ # Subscriber count API
│   ├── copyright/          # Copyright page
│   └── privacy/            # Privacy policy page
├── components/
│   ├── Navigation.tsx      # Sticky nav with mobile menu
│   ├── HeroSection.tsx     # "Your Doctor in Parliament" hero with gradient slideshow
│   ├── StatsSection.tsx    # Stats infographic bar with glassmorphism
│   ├── WellnessSection.tsx # YouTube video carousel
│   ├── PoliticalGoalsSection.tsx
│   ├── HowToHelpSection.tsx # Newsletter & YouTube sections with emotional copy
│   ├── EconomicReportSection.tsx # Featured report
│   ├── ContactForm.tsx     # Main contact form
│   ├── Footer.tsx          # Social links, newsletter, qualifications
│   ├── GoogleAnalytics.tsx # GA4 integration
│   ├── SubscriberCounter.tsx # YouTube subscriber counter
│   └── ui/                 # shadcn components
└── lib/
    └── utils.ts            # Tailwind merge utility
```

## Important Implementation Details

### YouTube API Notes
- **Video Feed**: Uses RSS feed instead of YouTube Data API (no API key required)
  - Filters shorts by title length, `#shorts` tag, and description
  - Has fallback video data if RSS fetch fails
- **Subscriber Counter**: Uses YouTube Data API v3 (requires `YOUTUBE_API_KEY` environment variable)
  - Fetches live subscriber count with 1-hour cache
  - Displays animated tick-up counter above subscribe button
  - Gracefully hides if API key not configured or API fails
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
- **Public images in `/public/images/`**: 44 webp images including parliamentary photos, community events, media interviews, hemp advocacy, campaign team photos
- **Report images in `/public/images/report/`**: brian_report.png, mockup1.webp, mockup2.webp, stats1.webp
- SVG favicons for navigation
- **Key hero slider images**: speech_2.webp, crowd.webp, ch10interview.webp
- **Featured images**: lcwamedia.webp (party team), chamber.webp (legislative chamber), door.webp (portrait), inauguration.webp (ceremony)

### Styling Conventions
- Use shadcn/ui components from `@/components/ui/`
- Custom theme colors via CSS variables
- **IMPORTANT: ALL cards and buttons MUST have hover animations and transitions**
  - Cards: `hover:-translate-y-1` or `hover:-translate-y-2` with shadow changes
  - Buttons: `hover:scale-105` or `hover:scale-110`
  - Always include `transition-all duration-200` or `duration-300`
  - Icons should animate on hover (scale, color change, or background change)
- Gradient backgrounds: `from-[#00653b] to-[#6cc24a]`
- YouTube-themed elements use YouTube red (#cc0000, #ff0000) with white accents, rounded-sm corners
- Political Goals: 16x16 icons, single-word titles (xl), small descriptions (xs) below
- Subscribe button: YouTube red background, next to subscriber counter, Google/YouTube styling

### Footer Social Media Icons
- Custom SVG icon components for Patreon, Bluesky, and TikTok (lucide-react doesn't include these)
- PatreonIcon: Circle with "P" logo
- BlueskyIcon: Butterfly logo
- TikTokIcon: Musical note logo
- Footer displays icons in 4-column grid with 14x14 rounded boxes
- Large icons (w-7 h-7) with hover scale and color change to accent green
- Platform names displayed below icons in small text

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
- `.env.local.example`: Template for required environment variables

## Environment Variables

Required environment variables (create `.env.local` file):
- `YOUTUBE_API_KEY`: YouTube Data API v3 key for subscriber counter
  - Get from: https://console.cloud.google.com/apis/credentials
  - Enable YouTube Data API v3 in Google Cloud Console
  - Optional: subscriber counter will gracefully hide if not configured

## External Integrations

- **n8n Webhook**: `https://n8n.jaxius.net/webhook/6cffe9fc-d8f8-4fdd-8a0d-0b9f94ecadc5`
- **Google Analytics**: Measurement ID `G-R96M1RT9HC`
- **Vercel Analytics**: Automatically enabled in production
- **YouTube Channel**: `UCCIGBIf3b385BV5d48Y1U2A`
- **Party Website**: `https://www.lcwaparty.org.au/`

### Social Media Links
- **Facebook**: `https://www.facebook.com/BrianWalkerMLC/`
- **Instagram**: `https://www.instagram.com/brianwalkermlc/`
- **Patreon**: `https://www.patreon.com/cw/DrBrianWalkerMLC`
- **Bluesky**: `https://bsky.app/profile/bfw.bsky.social`
- **X (Twitter)**: `https://x.com/BrianWalkerMLC`
- **TikTok**: `https://www.tiktok.com/@brianwalkermlc`

## Development Notes

- Turbopack is enabled for faster builds and dev server
- Hydration warnings suppressed in root HTML element
- Custom link styling prevents blue browser defaults
- Focus states use primary brand color
- Form uses controlled components via react-hook-form

### Known Warnings
- **Hydration Mismatch**: Browser extensions (like Dashlane password manager) may add attributes (`data-dashlane-rid`, etc.) to form inputs, causing hydration warnings in development. This is not a code issue and doesn't affect functionality. Users can disable extensions on localhost if desired.

## Recent Updates

### Value Proposition Strategy Implementation (November 2025)
Implemented comprehensive content strategy focusing on emotional connection and social proof:

1. **Hero Section**:
   - Simplified headline to "Your Doctor in Parliament" (removed secondary headline)
   - Compact checkmark facts layout (flex-wrap, smaller gaps, text-sm/base)
   - Two prominent CTA buttons: "Read My Plan for WA" and "Join the Movement"
   - Full text retained: "Member of Legislative Council since 2021", "Practicing GP in Claremont", "Leader of the Legalise Cannabis WA Party"

2. **Stats Section**:
   - New StatsSection component with glassmorphism design
   - 4 stats in gradient background with hover effects
   - Positioned immediately after hero for maximum impact

3. **About Page**:
   - Added emotional "WHY I SERVE" section with personal narrative
   - Story-driven approach connecting GP experience to parliamentary service

4. **Newsletter Section**:
   - Rewritten with emotional urgency: "DON'T LET THE MEDIA SILENCE THIS MOVEMENT"
   - 4 specific benefits with arrow bullets
   - Social proof testimonial added
   - Button text: "Send Me the Real Story"

5. **YouTube Section**:
   - New headline: "WATCH ME HOLD POWER ACCOUNTABLE"
   - Content description box with 4 video types

6. **Metadata Enhancement**:
   - Expanded keywords from 7 to 17
   - Enhanced Open Graph and Twitter card tags
   - Added robots meta for optimal indexing
   - Locale specification for Australian targeting

7. **Footer**:
   - Qualifications (MB, ChB MRCGP, RACGP) moved closer to name
   - Changed from gray to accent green (#6cc24a) for visual hierarchy

### Image Integration & Design Refresh (November 2025)
Major visual enhancement with 44 professional images integrated throughout the site:

1. **Hero Section Redesign**:
   - Modern frosted glass box design (bg-white/95 backdrop-blur-md) replacing dark overlay
   - 3 rotating hero images: speech_2.webp (parliamentary address), crowd.webp (rally), ch10interview.webp (TV interview)
   - Smaller Legislative Council logo (24x24 mobile, 28x28 desktop)
   - Full-brightness images with excellent text readability

2. **Stats Section Enhancement**:
   - Added 5th stat: "7 Languages Spoken" with Languages icon
   - All stats now have contextual icons (Stethoscope, Building2, FileText, Users, Languages)
   - Removed background image for cleaner gradient design
   - Changed from 4-column to 5-column grid

3. **About Page**:
   - Hero banner: door.webp (professional portrait in chamber)
   - Inauguration photo: inauguration.webp (2021 swearing-in ceremony)
   - "In Action" gallery: 4x3 grid of 12 community/advocacy images (archerykids, cannabistalk, fieldlaugh, foodbank, hempbrick, holdingreport, veterans, youthparli, digging, rugby, spagnolointerview, abcbw)

4. **Political Goals Section**:
   - Banner image: chamber.webp showing WA Legislative Council
   - Overlay caption about daily work in parliament

5. **How to Help Section**:
   - Party team photo: lcwamedia.webp showing full campaign team with banners
   - Positioned above LCWA logo in "Join the Movement" section

6. **Economic Report Section**:
   - Smaller report image (max-w-sm) for better page balance
   - Report page now includes Navigation and Footer
   - Report visuals gallery: brian_report.png, mockup1.webp, mockup2.webp

7. **Downloads Page**:
   - Added office phone number: 08 9226 3550 (clickable tel: link)

8. **Footer**:
   - Small LCWA logo (16x16) added above "Dr Brian Walker MLC"

**Image Organization**:
- All 44 webp images in `/public/images/`
- Report materials in `/public/images/report/`
- Comprehensive documentation in `images/image_analysis.md`
- All images optimized with Next.js Image component, responsive sizing, and hover animations

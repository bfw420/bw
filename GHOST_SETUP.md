# Ghost CMS Blog Integration Setup

This document explains how to set up and configure the Ghost CMS blog integration for Dr Brian Walker's website.

## Overview

The blog integration fetches content from a Ghost CMS instance at `https://ghost.jaxius.net/` and displays it at `/news` on the website.

## Features

- **Featured Posts**: Displays up to 2 featured blog posts prominently
- **Regular Posts Grid**: Shows latest posts in a responsive grid layout
- **Individual Post Pages**: Each post has its own page with full content
- **SEO Optimization**: Automatic meta tags, Open Graph, and Twitter cards
- **Image Optimization**: Next.js Image component for optimal loading
- **Responsive Design**: Matches the website's green color scheme and styling
- **Share Functionality**: Native sharing or clipboard copy
- **Newsletter CTA**: Integrated calls-to-action for newsletter signup

## Local Development Setup

### 1. Create `.env.local` File

Create a `.env.local` file in the root directory with your Ghost credentials:

```bash
# Ghost CMS Configuration
GHOST_URL=https://ghost.jaxius.net
GHOST_CONTENT_API_KEY=be006347a11a126c2bbea20d72
```

### 2. Install Dependencies

Dependencies are already installed. If you need to reinstall:

```bash
npm install
```

### 3. Run Development Server

```bash
npm run dev
```

Visit `http://localhost:3000/news` to see the blog.

## Vercel Deployment Setup

### Adding Environment Variables to Vercel

#### Method 1: Via Vercel Dashboard (Recommended)

1. **Go to your project on Vercel**
   - Visit https://vercel.com
   - Select your project (bw / Brian Walker's website)

2. **Navigate to Settings**
   - Click on the "Settings" tab at the top

3. **Access Environment Variables**
   - In the left sidebar, click "Environment Variables"

4. **Add Ghost URL**
   - Click "Add New"
   - Name: `GHOST_URL`
   - Value: `https://ghost.jaxius.net`
   - Environment: Select all environments (Production, Preview, Development)
   - Click "Save"

5. **Add Ghost Content API Key**
   - Click "Add New" again
   - Name: `GHOST_CONTENT_API_KEY`
   - Value: `be006347a11a126c2bbea20d72`
   - Environment: Select all environments (Production, Preview, Development)
   - Click "Save"

6. **Redeploy**
   - Go to the "Deployments" tab
   - Click the three dots (⋯) on the latest deployment
   - Select "Redeploy"
   - This ensures the new environment variables are picked up

#### Method 2: Via Vercel CLI

If you have the Vercel CLI installed:

```bash
# Set production environment variables
vercel env add GHOST_URL production
# When prompted, enter: https://ghost.jaxius.net

vercel env add GHOST_CONTENT_API_KEY production
# When prompted, enter: be006347a11a126c2bbea20d72

# Repeat for preview and development environments
vercel env add GHOST_URL preview
vercel env add GHOST_CONTENT_API_KEY preview

vercel env add GHOST_URL development
vercel env add GHOST_CONTENT_API_KEY development

# Redeploy
vercel --prod
```

## File Structure

```
src/
├── app/
│   └── news/
│       ├── page.tsx                 # Main blog listing page
│       └── [slug]/
│           ├── page.tsx             # Individual blog post page
│           └── not-found.tsx        # 404 page for missing posts
├── lib/
│   └── ghost.ts                     # Ghost API client and utilities
```

## Ghost API Functions

The `src/lib/ghost.ts` file provides three main functions:

### `getPosts(limit, page)`
Fetches published posts with pagination.

```typescript
const posts = await getPosts(12, 1); // Get 12 posts from page 1
```

### `getPostBySlug(slug)`
Fetches a single post by its URL slug.

```typescript
const post = await getPostBySlug('my-blog-post');
```

### `getFeaturedPosts(limit)`
Fetches only featured posts.

```typescript
const featured = await getFeaturedPosts(3); // Get 3 featured posts
```

## Styling

The blog pages use the same design system as the rest of the website:

- **Primary Green**: `#00653b` - Used for headings, buttons, links
- **Accent Green**: `#6cc24a` - Used for gradients and hover states
- **Card Hover Effects**: All cards have `hover:-translate-y-1` or `hover:-translate-y-2` with shadow transitions
- **Button Hover**: `hover:scale-105` with smooth transitions
- **Typography**: Matches the website's font hierarchy and spacing

## Customization

### Changing Number of Posts

Edit `src/app/news/page.tsx`:

```typescript
const [featuredPosts, regularPosts] = await Promise.all([
  getFeaturedPosts(2),    // Change this number for featured posts
  getPosts(12)            // Change this number for regular posts
]);
```

### Modifying Post Card Design

Edit the card components in `src/app/news/page.tsx` (lines ~70-140 for featured, ~150-220 for regular posts).

### Customizing Individual Post Layout

Edit `src/app/news/[slug]/page.tsx` to modify the post detail page layout.

## Ghost CMS Configuration

### Getting Your Content API Key

If you need to get or regenerate your Content API Key:

1. Log into Ghost Admin at `https://ghost.jaxius.net/ghost`
2. Go to Settings (gear icon) → Integrations
3. Click "Add custom integration" or select existing integration
4. Copy the "Content API Key"
5. Update your environment variables with the new key

### Content API URL Structure

Ghost Content API endpoint: `https://ghost.jaxius.net/ghost/api/content/`

The API is read-only and doesn't require authentication beyond the API key.

## Troubleshooting

### No Posts Showing

1. **Check Environment Variables**
   - Ensure `GHOST_URL` and `GHOST_CONTENT_API_KEY` are set correctly
   - Verify they're available in all environments (production, preview, development)

2. **Check Ghost Instance**
   - Visit `https://ghost.jaxius.net/` to ensure it's accessible
   - Log into Ghost Admin and verify posts are published (not drafts)

3. **Check Console Logs**
   - Open browser DevTools → Console
   - Look for any Ghost API errors

### Images Not Loading

1. **Verify next.config.ts**
   - Ensure `ghost.jaxius.net` is in `remotePatterns` (already configured)

2. **Check Ghost Image URLs**
   - View page source and check if image URLs are correct
   - Images should start with `https://ghost.jaxius.net/`

### 404 on Individual Posts

1. **Check Post Slug**
   - Verify the post exists in Ghost
   - Check the URL slug matches the post slug in Ghost

2. **Clear Build Cache**
   ```bash
   rm -rf .next
   npm run build
   ```

## Navigation Integration

To add the News/Blog link to the main navigation:

Edit `src/components/Navigation.tsx` and add:

```typescript
<Link
  href="/news"
  className="text-gray-600 hover:text-[#00653b] font-medium transition-colors"
>
  News
</Link>
```

## Additional Resources

- [Ghost Content API Documentation](https://ghost.org/docs/content-api/)
- [Next.js Image Optimization](https://nextjs.org/docs/app/building-your-application/optimizing/images)
- [Vercel Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)

## Support

For issues or questions:
- Ghost API: https://ghost.org/docs/
- Next.js: https://nextjs.org/docs
- Vercel: https://vercel.com/docs

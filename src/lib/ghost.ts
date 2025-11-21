import GhostContentAPI from '@tryghost/content-api';

// Initialize Ghost API client
const api = new GhostContentAPI({
  url: process.env.GHOST_URL || 'https://ghost.jaxius.net',
  key: process.env.GHOST_CONTENT_API_KEY || '',
  version: 'v5.0'
});

export interface GhostPost {
  id: string;
  uuid: string;
  title: string;
  slug: string;
  html: string;
  excerpt: string;
  feature_image: string | null;
  featured: boolean;
  published_at: string;
  updated_at: string;
  created_at: string;
  url: string;
  reading_time: number;
  tags?: Array<{
    id: string;
    name: string;
    slug: string;
  }>;
  primary_tag?: {
    id: string;
    name: string;
    slug: string;
  };
  authors?: Array<{
    id: string;
    name: string;
    slug: string;
    profile_image: string | null;
  }>;
  primary_author?: {
    id: string;
    name: string;
    slug: string;
    profile_image: string | null;
  };
}

export interface GhostPostsOrPages {
  posts: GhostPost[];
  meta: {
    pagination: {
      page: number;
      limit: number;
      pages: number;
      total: number;
      next: number | null;
      prev: number | null;
    };
  };
}

/**
 * Fetch all published posts from Ghost CMS
 * @param limit Number of posts to fetch (default: 10)
 * @param page Page number for pagination (default: 1)
 * @returns Array of Ghost posts
 */
export async function getPosts(limit = 10, page = 1): Promise<GhostPost[]> {
  try {
    const posts = await api.posts.browse({
      limit,
      page,
      include: ['tags', 'authors'],
      filter: 'visibility:public',
      order: 'published_at DESC'
    });
    return posts as GhostPost[];
  } catch (error) {
    console.error('Error fetching Ghost posts:', error);
    return [];
  }
}

/**
 * Fetch a single post by slug
 * @param slug Post slug
 * @returns Ghost post or null if not found
 */
export async function getPostBySlug(slug: string): Promise<GhostPost | null> {
  try {
    const post = await api.posts.read(
      { slug },
      { include: ['tags', 'authors'] }
    );
    return post as GhostPost;
  } catch (error) {
    console.error(`Error fetching Ghost post with slug "${slug}":`, error);
    return null;
  }
}

/**
 * Fetch featured posts
 * @param limit Number of posts to fetch (default: 3)
 * @returns Array of featured Ghost posts
 */
export async function getFeaturedPosts(limit = 3): Promise<GhostPost[]> {
  try {
    const posts = await api.posts.browse({
      limit,
      include: ['tags', 'authors'],
      filter: 'featured:true+visibility:public',
      order: 'published_at DESC'
    });
    return posts as GhostPost[];
  } catch (error) {
    console.error('Error fetching featured Ghost posts:', error);
    return [];
  }
}

export default api;

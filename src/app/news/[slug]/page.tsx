import { getPostBySlug, getPosts } from '@/lib/ghost';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { CalendarDays, Clock, Tag, ArrowLeft } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ShareButton from '@/components/ShareButton';
import NewsletterSignup from '@/components/NewsletterSignup';

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Generate static params for all posts (for static site generation)
export async function generateStaticParams() {
  const posts = await getPosts(100); // Fetch more posts for static generation
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: 'Post Not Found | Dr Brian Walker MLC',
    };
  }

  return {
    title: `${post.title} | Dr Brian Walker MLC`,
    description: post.excerpt,
    keywords: post.tags?.map(tag => tag.name).join(', '),
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: post.feature_image ? [post.feature_image] : [],
      type: 'article',
      publishedTime: post.published_at,
      authors: post.authors?.map(author => author.name),
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: post.feature_image ? [post.feature_image] : [],
    },
  };
}

function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-AU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-gradient-to-b from-white to-gray-50">
        {/* Back Button */}
        <div className="container mx-auto px-4 pt-8">
          <Link
            href="/news"
            className="inline-flex items-center gap-2 text-[#00653b] hover:text-[#6cc24a] transition-colors font-semibold group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span>Back to News</span>
          </Link>
        </div>

        {/* Article Header */}
        <article className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {post.tags.map((tag) => (
                  <Link
                    key={tag.id}
                    href={`/news?tag=${encodeURIComponent(tag.name)}`}
                    className="inline-flex items-center gap-1 bg-[#6cc24a] text-white text-xs font-semibold px-3 py-1 rounded-full hover:scale-110 transition-transform cursor-pointer"
                  >
                    <Tag className="w-3 h-3" />
                    {tag.name}
                  </Link>
                ))}
              </div>
            )}

            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              {post.title}
            </h1>

            {/* Excerpt */}
            {post.excerpt && (
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                {post.excerpt}
              </p>
            )}

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-6 mb-8 pb-8 border-b border-gray-200">
              {post.primary_author && (
                <div className="flex items-center gap-3">
                  {post.primary_author.profile_image && (
                    <div className="relative w-12 h-12 rounded-full overflow-hidden">
                      <Image
                        src={post.primary_author.profile_image}
                        alt={post.primary_author.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div>
                    <p className="font-semibold text-gray-900">
                      {post.primary_author.name}
                    </p>
                  </div>
                </div>
              )}
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <CalendarDays className="w-4 h-4" />
                  <span>{formatDate(post.published_at)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{post.reading_time} min read</span>
                </div>
              </div>
            </div>

            {/* Feature Image */}
            {post.feature_image && (
              <div className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] mb-12 rounded-lg overflow-hidden shadow-xl">
                <Image
                  src={post.feature_image}
                  alt={post.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            )}

            {/* Article Content */}
            <div
              className="ghost-content text-gray-700 leading-relaxed mb-12"
              dangerouslySetInnerHTML={{ __html: post.html }}
            />

            {/* Share Section */}
            <div className="border-t border-gray-200 pt-8 mb-12">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-gray-900">Share this article</h3>
                <ShareButton title={post.title} excerpt={post.excerpt} />
              </div>
            </div>

            {/* Newsletter Signup Section */}
            <div className="bg-gradient-to-r from-[#00653b] to-[#6cc24a] text-white rounded-lg p-8 shadow-xl">
              <div className="max-w-2xl mx-auto">
                <h3 className="text-2xl md:text-3xl font-bold mb-4 text-center">
                  Stay Updated
                </h3>
                <p className="text-lg mb-6 text-white/90 text-center">
                  Get the latest news and parliamentary updates delivered to your inbox
                </p>
                <NewsletterSignup source="blog-post" />
              </div>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}

import { getPosts, getFeaturedPosts } from '@/lib/ghost';
import Image from 'next/image';
import Link from 'next/link';
import { CalendarDays, Clock, Tag, ArrowRight } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'News & Updates | Dr Brian Walker MLC',
  description: 'Latest news, parliamentary updates, and advocacy work from Dr Brian Walker MLC - Your Doctor in Parliament',
  keywords: ['Brian Walker', 'news', 'parliamentary updates', 'Legalise Cannabis WA', 'Western Australia politics', 'healthcare reform'],
};

function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-AU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
}

export default async function NewsPage() {
  const [featuredPosts, regularPosts] = await Promise.all([
    getFeaturedPosts(2),
    getPosts(12)
  ]);

  // Filter out featured posts from regular posts
  const featuredIds = new Set(featuredPosts.map(post => post.id));
  const nonFeaturedPosts = regularPosts.filter(post => !featuredIds.has(post.id));

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-gradient-to-b from-white to-gray-50">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-[#00653b] to-[#6cc24a] text-white py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                News & Updates
              </h1>
              <p className="text-xl md:text-2xl text-white/90">
                Stay informed on parliamentary work, healthcare advocacy, and policy reforms
              </p>
            </div>
          </div>
        </section>

        {/* Featured Posts */}
        {featuredPosts.length > 0 && (
          <section className="py-16 container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-[#00653b] mb-8">
                Featured Stories
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                {featuredPosts.map((post) => (
                  <Link
                    key={post.id}
                    href={`/news/${post.slug}`}
                    className="group block"
                  >
                    <article className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 h-full">
                      {post.feature_image && (
                        <div className="relative h-64 overflow-hidden">
                          <Image
                            src={post.feature_image}
                            alt={post.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      )}
                      <div className="p-6">
                        {post.primary_tag && (
                          <div className="flex items-center gap-2 mb-3">
                            <span className="bg-gradient-to-r from-[#00653b] to-[#6cc24a] text-white text-xs font-semibold px-3 py-1 rounded-full">
                              {post.primary_tag.name}
                            </span>
                          </div>
                        )}
                        <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-[#00653b] transition-colors">
                          {post.title}
                        </h3>
                        <p className="text-gray-600 mb-4 line-clamp-3">
                          {post.excerpt}
                        </p>
                        <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                          <div className="flex items-center gap-1">
                            <CalendarDays className="w-4 h-4" />
                            <span>{formatDate(post.published_at)}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            <span>{post.reading_time} min read</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-[#00653b] font-semibold">
                          <span>Read More</span>
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Regular Posts Grid */}
        <section className="py-16 container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-[#00653b] mb-8">
              Latest Updates
            </h2>
            {nonFeaturedPosts.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {nonFeaturedPosts.map((post) => (
                  <Link
                    key={post.id}
                    href={`/news/${post.slug}`}
                    className="group block"
                  >
                    <article className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full flex flex-col">
                      {post.feature_image && (
                        <div className="relative h-48 overflow-hidden">
                          <Image
                            src={post.feature_image}
                            alt={post.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      )}
                      <div className="p-5 flex-1 flex flex-col">
                        {post.primary_tag && (
                          <div className="flex items-center gap-2 mb-2">
                            <Tag className="w-3 h-3 text-[#6cc24a]" />
                            <span className="text-[#6cc24a] text-xs font-semibold uppercase">
                              {post.primary_tag.name}
                            </span>
                          </div>
                        )}
                        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#00653b] transition-colors line-clamp-2">
                          {post.title}
                        </h3>
                        <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-1">
                          {post.excerpt}
                        </p>
                        <div className="flex items-center gap-3 text-xs text-gray-500">
                          <div className="flex items-center gap-1">
                            <CalendarDays className="w-3 h-3" />
                            <span>{formatDate(post.published_at)}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            <span>{post.reading_time} min</span>
                          </div>
                        </div>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-600 text-lg">
                  No posts available at the moment. Check back soon for updates!
                </p>
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-[#00653b] to-[#6cc24a] text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Stay Informed
              </h2>
              <p className="text-xl mb-8 text-white/90">
                Get the latest updates directly in your inbox. Join thousands of Western Australians receiving real news from your Doctor in Parliament.
              </p>
              <Link
                href="/#help"
                className="inline-block bg-white text-[#00653b] px-8 py-4 rounded-lg font-bold text-lg hover:scale-105 transition-transform duration-200 shadow-lg"
              >
                Subscribe to Newsletter
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

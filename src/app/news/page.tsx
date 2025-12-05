import { Suspense } from 'react';
import { getPosts, getFeaturedPosts } from '@/lib/ghost';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import NewsFilter from '@/components/NewsFilter';
import Link from 'next/link';

export const revalidate = 60;

export const metadata = {
  title: 'News & Updates | Dr Brian Walker MLC',
  description: 'Latest news, parliamentary updates, and advocacy work from Dr Brian Walker MLC - Your Doctor in Parliament',
  keywords: ['Brian Walker', 'news', 'parliamentary updates', 'Legalise Cannabis WA', 'Western Australia politics', 'healthcare reform'],
};

export default async function NewsPage() {
  const [featuredPosts, regularPosts] = await Promise.all([
    getFeaturedPosts(2),
    getPosts(100) // Fetch more posts for filtering
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
                Stay informed on my parliamentary work, healthcare advocacy, and policy reforms
              </p>
            </div>
          </div>
        </section>

        {/* News Filter Component with Search and Tags */}
        <Suspense fallback={<div className="container mx-auto px-4 py-16"><p className="text-center text-gray-600">Loading posts...</p></div>}>
          <NewsFilter
            featuredPosts={featuredPosts}
            regularPosts={nonFeaturedPosts}
          />
        </Suspense>

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

import Link from 'next/link';
import { ArrowLeft, Home } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

export default function NotFound() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-gradient-to-b from-white to-gray-50 flex items-center justify-center py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-6xl md:text-8xl font-bold text-[#00653b] mb-6">
              404
            </h1>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Post Not Found
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Sorry, we couldn't find the blog post you're looking for. It may have been moved or deleted.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/news"
                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#00653b] to-[#6cc24a] text-white px-8 py-4 rounded-lg font-bold text-lg hover:scale-105 transition-transform duration-200 shadow-lg"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Back to News</span>
              </Link>
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 bg-white text-[#00653b] border-2 border-[#00653b] px-8 py-4 rounded-lg font-bold text-lg hover:scale-105 transition-transform duration-200 shadow-lg"
              >
                <Home className="w-5 h-5" />
                <span>Go Home</span>
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

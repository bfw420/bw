'use client';

import { useState, useMemo, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { CalendarDays, Clock, Tag, ArrowRight, Search, X, ChevronDown, ChevronUp } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { GhostPost } from '@/lib/ghost';
import { useSearchParams } from 'next/navigation';

interface NewsFilterProps {
  featuredPosts: GhostPost[];
  regularPosts: GhostPost[];
}

function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-AU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
}

export default function NewsFilter({ featuredPosts, regularPosts }: NewsFilterProps) {
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [showAllTags, setShowAllTags] = useState(false);
  const [visiblePostsCount, setVisiblePostsCount] = useState(15);

  // Set tag from URL parameter on mount
  useEffect(() => {
    const tagFromUrl = searchParams.get('tag');
    if (tagFromUrl) {
      setSelectedTag(tagFromUrl);
    }
  }, [searchParams]);

  // Get all unique tags from posts and sort by frequency
  const sortedTags = useMemo(() => {
    const tagCounts = new Map<string, number>();

    [...featuredPosts, ...regularPosts].forEach(post => {
      post.tags?.forEach(tag => {
        tagCounts.set(tag.name, (tagCounts.get(tag.name) || 0) + 1);
      });
    });

    return Array.from(tagCounts.entries())
      .sort((a, b) => b[1] - a[1]) // Sort by count descending
      .map(([name]) => name);
  }, [featuredPosts, regularPosts]);

  const displayedTags = showAllTags ? sortedTags : sortedTags.slice(0, 10);

  // Filter featured posts
  const filteredFeatured = useMemo(() => {
    return featuredPosts.filter(post => {
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch = searchQuery === '' ||
        post.title.toLowerCase().includes(searchLower) ||
        post.excerpt.toLowerCase().includes(searchLower) ||
        (post.html && post.html.toLowerCase().includes(searchLower));

      const matchesTag = !selectedTag ||
        post.tags?.some(tag => tag.name === selectedTag);

      return matchesSearch && matchesTag;
    });
  }, [featuredPosts, searchQuery, selectedTag]);

  // Filter regular posts
  const filteredRegular = useMemo(() => {
    return regularPosts.filter(post => {
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch = searchQuery === '' ||
        post.title.toLowerCase().includes(searchLower) ||
        post.excerpt.toLowerCase().includes(searchLower) ||
        (post.html && post.html.toLowerCase().includes(searchLower));

      const matchesTag = !selectedTag ||
        post.tags?.some(tag => tag.name === selectedTag);

      return matchesSearch && matchesTag;
    });
  }, [regularPosts, searchQuery, selectedTag]);

  const visibleRegularPosts = filteredRegular.slice(0, visiblePostsCount);

  const handleTagClick = (tagName: string) => {
    if (selectedTag === tagName) {
      setSelectedTag(null); // Deselect if clicking the same tag
    } else {
      setSelectedTag(tagName);
    }
    setVisiblePostsCount(15); // Reset pagination when filtering
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedTag(null);
    setVisiblePostsCount(15);
  };

  const handleLoadMore = () => {
    setVisiblePostsCount(prev => prev + 15);
  };

  return (
    <>
      {/* Search and Filter Section */}
      <div className="max-w-6xl mx-auto mb-12 pt-16">
        {/* Search Bar */}
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            type="text"
            placeholder="Search posts by title, content, or topic..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setVisiblePostsCount(15); // Reset pagination on search
            }}
            className="pl-12 pr-12 h-14 text-lg border-gray-300 focus:border-[#00653b] focus:ring-[#00653b]"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Tags Filter */}
        {sortedTags.length > 0 && (
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-3">
              <Tag className="w-5 h-5 text-[#00653b]" />
              <h3 className="font-semibold text-gray-900">Filter by topic:</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {displayedTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => handleTagClick(tag)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${selectedTag === tag
                    ? 'bg-gradient-to-r from-[#00653b] to-[#6cc24a] text-white shadow-md scale-105'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-105'
                    }`}
                >
                  {tag}
                </button>
              ))}
              {sortedTags.length > 10 && (
                <button
                  onClick={() => setShowAllTags(!showAllTags)}
                  className="px-4 py-2 rounded-full text-sm font-medium bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-[#00653b] transition-colors flex items-center gap-1"
                >
                  {showAllTags ? (
                    <>
                      Show Less <ChevronUp className="w-4 h-4" />
                    </>
                  ) : (
                    <>
                      View More <ChevronDown className="w-4 h-4" />
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        )}

        {/* Active Filters */}
        {(searchQuery || selectedTag) && (
          <div className="flex items-center gap-3 mb-4">
            <span className="text-sm text-gray-600">Active filters:</span>
            {searchQuery && (
              <span className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                Search: &quot;{searchQuery}&quot;
                <button onClick={() => setSearchQuery('')} className="hover:text-blue-900">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {selectedTag && (
              <span className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                Tag: {selectedTag}
                <button onClick={() => setSelectedTag(null)} className="hover:text-green-900">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            <button
              onClick={clearFilters}
              className="text-sm text-gray-600 hover:text-[#00653b] underline ml-2"
            >
              Clear all
            </button>
          </div>
        )}

        {/* Results count */}
        <p className="text-sm text-gray-600">
          Showing {filteredFeatured.length + filteredRegular.length} posts
        </p>
      </div>

      {/* Featured Posts */}
      {filteredFeatured.length > 0 && (
        <section className="py-8 container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-[#00653b] mb-8">
              Featured Stories
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {filteredFeatured.map((post) => (
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
                      {post.tags && post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-3">
                          {post.tags.map((tag) => (
                            <span
                              key={tag.id}
                              onClick={(e) => {
                                e.preventDefault();
                                handleTagClick(tag.name);
                              }}
                              className="bg-gradient-to-r from-[#00653b] to-[#6cc24a] text-white text-xs font-semibold px-3 py-1 rounded-full hover:scale-110 transition-transform cursor-pointer"
                            >
                              {tag.name}
                            </span>
                          ))}
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
      <section className="py-8 container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Removed "All Posts" headline as requested */}
          {visibleRegularPosts.length > 0 ? (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {visibleRegularPosts.map((post) => (
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
                        {post.tags && post.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2 mb-2">
                            {post.tags.slice(0, 2).map((tag) => (
                              <span
                                key={tag.id}
                                onClick={(e) => {
                                  e.preventDefault();
                                  handleTagClick(tag.name);
                                }}
                                className="inline-flex items-center gap-1 text-[#6cc24a] text-xs font-semibold uppercase hover:text-[#00653b] transition-colors cursor-pointer"
                              >
                                <Tag className="w-3 h-3" />
                                {tag.name}
                              </span>
                            ))}
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

              {/* Load More Button */}
              {visiblePostsCount < filteredRegular.length && (
                <div className="mt-12 text-center">
                  <button
                    onClick={handleLoadMore}
                    className="bg-white border-2 border-[#00653b] text-[#00653b] px-8 py-3 rounded-lg font-bold text-lg hover:bg-[#00653b] hover:text-white transition-all duration-200 shadow-md hover:shadow-lg"
                  >
                    Load More Posts
                  </button>
                  <p className="mt-2 text-sm text-gray-500">
                    Showing {Math.min(visiblePostsCount, filteredRegular.length)} of {filteredRegular.length} posts
                  </p>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <p className="text-gray-600 text-lg mb-4">
                No posts found matching your filters.
              </p>
              <button
                onClick={clearFilters}
                className="text-[#00653b] font-semibold hover:text-[#6cc24a] transition-colors underline"
              >
                Clear filters to see all posts
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}


"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import confetti from "canvas-confetti";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import SubscriberCounter from "@/components/SubscriberCounter";
import {
  Mail,
  Loader2,
  UserPlus,
  Play
} from "lucide-react";

interface YouTubeVideo {
  id: string;
  title: string;
  url: string;
  thumbnail: string;
  publishedAt: string;
  description: string;
}

export default function HowToHelpSection() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [videosLoading, setVideosLoading] = useState(true);
  const [videosError, setVideosError] = useState<string | null>(null);

  // Fetch YouTube videos on component mount
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setVideosLoading(true);
        const response = await fetch('/api/youtube');
        const data = await response.json();
        
        if (data.success) {
          setVideos(data.videos);
        } else {
          // Use fallback videos if API fails
          setVideos(data.videos);
          setVideosError(data.error || 'Failed to load latest videos');
        }
      } catch (error) {
        console.error('Error fetching YouTube videos:', error);
        setVideosError('Failed to load videos');
        // Set empty array if complete failure
        setVideos([]);
      } finally {
        setVideosLoading(false);
      }
    };

    fetchVideos();
  }, []);

  // Format date for display
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      const now = new Date();
      const diffTime = Math.abs(now.getTime() - date.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays === 1) return '1 day ago';
      if (diffDays < 7) return `${diffDays} days ago`;
      if (diffDays < 14) return '1 week ago';
      if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
      if (diffDays < 60) return '1 month ago';
      return `${Math.floor(diffDays / 30)} months ago`;
    } catch {
      return 'Recently';
    }
  };

  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const handleNewsletterSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setNotification(null);

    try {
      // Send to our newsletter API route which forwards to the webhook
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          subscriptionType: "newsletter",
          source: "website",
          subscribedAt: new Date().toISOString()
        }),
      });

      const result = await response.json();
      console.log('Newsletter API response:', result);

      if (response.ok && result.success) {
        triggerConfetti();
        setNotification({
          type: 'success',
          message: "🎉 You're subscribed! Check your inbox for updates."
        });
        setEmail("");
      } else {
        throw new Error(result.message || `API failed with status: ${response.status}`);
      }
    } catch (error) {
      console.error("Newsletter signup error:", error);
      setNotification({
        type: 'error',
        message: "Sorry, there was an error. Please try again later."
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="help" className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[#00653b] mb-6">
            How to Help
          </h2>
          <p className="text-xl text-[#6cc24a] font-bold mb-4">
            Legacy media is silencing my voice!
          </p>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Here&apos;s how you can help amplify our message and create real change
          </p>
        </div>

        {/* Newsletter Section */}
        <div className="mb-20">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-[#00653b] to-[#6cc24a] rounded-3xl overflow-hidden shadow-2xl">
              <div className="px-8 py-12 text-white">
                <Mail className="w-16 h-16 mx-auto mb-6 opacity-90" />
                <h3 className="text-3xl md:text-4xl font-bold mb-6 text-center">Stay Informed with My Newsletter</h3>

                <p className="text-center text-lg font-medium mb-6 max-w-2xl mx-auto">
                  No fluff. No spam. Just the truth about progressive policy in WA.
                </p>

                <form onSubmit={handleNewsletterSignup} className="max-w-2xl mx-auto mb-6">
                  <div className="flex flex-col sm:flex-row gap-4 p-2 bg-white/10 backdrop-blur-sm rounded-2xl">
                    <Input
                      type="email"
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="flex-1 h-14 text-lg px-6 bg-white text-gray-900 border-0 rounded-xl focus:ring-2 focus:ring-white/30"
                    />
                    <Button
                      type="submit"
                      className="h-14 px-8 text-lg font-bold rounded-xl whitespace-nowrap relative overflow-hidden"
                      disabled={isSubmitting}
                      style={{
                        background: 'white',
                        color: '#00653b',
                        animation: isSubmitting
                          ? 'none'
                          : 'breathe 2s ease-in-out infinite, glow-pulse 2s ease-in-out infinite',
                        boxShadow: isSubmitting
                          ? '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                          : '0 0 0 3px rgba(108, 194, 74, 0.3), 0 10px 25px -5px rgba(0, 0, 0, 0.2)',
                        transition: 'all 0.3s ease-out',
                        border: '2px solid rgba(108, 194, 74, 0.5)'
                      }}
                      onMouseEnter={(e) => {
                        if (!isSubmitting) {
                          e.currentTarget.style.transform = 'scale(1.1) translateY(-4px)';
                          e.currentTarget.style.background = '#6cc24a';
                          e.currentTarget.style.color = 'white';
                          e.currentTarget.style.borderColor = '#6cc24a';
                          e.currentTarget.style.boxShadow = '0 0 0 4px rgba(108, 194, 74, 0.4), 0 0 60px rgba(108, 194, 74, 0.8), 0 25px 35px -5px rgba(0, 0, 0, 0.4)';
                        }
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'scale(1) translateY(0)';
                        e.currentTarget.style.background = 'white';
                        e.currentTarget.style.color = '#00653b';
                        e.currentTarget.style.borderColor = 'rgba(108, 194, 74, 0.5)';
                        e.currentTarget.style.boxShadow = '0 0 0 3px rgba(108, 194, 74, 0.3), 0 10px 25px -5px rgba(0, 0, 0, 0.2)';
                      }}
                    >
                      {/* Shimmer effect overlay */}
                      {!isSubmitting && (
                        <span
                          className="absolute inset-0"
                          style={{
                            background: 'linear-gradient(90deg, transparent, rgba(108, 194, 74, 0.3), transparent)',
                            animation: 'shimmer 3s infinite',
                            transform: 'translateX(-100%)',
                            pointerEvents: 'none'
                          }}
                        />
                      )}
                      {isSubmitting ? "Subscribing..." : "Send Me the Real Story"}
                    </Button>
                    <style jsx>{`
                      @keyframes breathe {
                        0%, 100% { transform: scale(1); }
                        50% { transform: scale(1.02); }
                      }
                      @keyframes glow-pulse {
                        0%, 100% {
                          box-shadow: 0 0 0 3px rgba(108, 194, 74, 0.3), 0 10px 25px -5px rgba(0, 0, 0, 0.2);
                        }
                        50% {
                          box-shadow: 0 0 0 5px rgba(108, 194, 74, 0.5), 0 0 40px rgba(108, 194, 74, 0.4), 0 10px 25px -5px rgba(0, 0, 0, 0.2);
                        }
                      }
                      @keyframes shimmer {
                        0% { transform: translateX(-100%); }
                        100% { transform: translateX(200%); }
                      }
                    `}</style>
                  </div>
                </form>

                {/* Notification */}
                {notification && (
                  <div
                    className={`mt-4 p-4 rounded-lg text-center font-medium ${
                      notification.type === 'success'
                        ? 'bg-white/20 text-white border border-white/30'
                        : 'bg-red-500/20 text-white border border-red-300/30'
                    }`}
                  >
                    {notification.message}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* YouTube Section */}
        <div className="mb-16">
          <div className="bg-gradient-to-br from-red-50 to-red-100/50 rounded-2xl p-6 md:p-8 border border-red-200/50 shadow-lg">
            <div className="text-center mb-8">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                Subscribe to My YouTube Channel
              </h3>
              <p className="text-base text-gray-700 mb-6">
                New videos every week!
              </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <SubscriberCounter />
              <a
                href="https://www.youtube.com/channel/UCCIGBIf3b385BV5d48Y1U2A?sub_confirmation=1"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#cc0000] text-white px-6 py-3 rounded-sm font-semibold text-sm uppercase tracking-wide shadow-lg"
                style={{ transition: 'all 0.2s ease-out' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.05)';
                  e.currentTarget.style.backgroundColor = '#ff0000';
                  e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.backgroundColor = '#cc0000';
                  e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)';
                }}
              >
                <UserPlus className="w-5 h-5" />
                <span>Subscribe</span>
              </a>
            </div>
          </div>
          
          {videosError && (
            <div className="text-center mb-8">
              <p className="text-amber-600 bg-amber-50 p-4 rounded-xl inline-block">
                {videosError}
              </p>
            </div>
          )}
          
          {videosLoading ? (
            <div className="flex justify-center items-center py-16">
              <Loader2 className="w-10 h-10 animate-spin text-[#00653b]" />
              <span className="ml-3 text-xl text-gray-600">Loading latest videos...</span>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {videos.map((video: YouTubeVideo) => (
                <a
                  key={video.id}
                  href={video.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group cursor-pointer block"
                  style={{ transition: 'all 0.2s ease-out' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <div className="transition-all duration-200">
                    {/* Thumbnail */}
                    <div className="relative overflow-hidden rounded-xl bg-gray-200 mb-3">
                      <div className="aspect-video">
                        <Image
                          src={video.thumbnail}
                          alt={video.title}
                          width={320}
                          height={180}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      {/* Duration badge overlay - YouTube style */}
                      <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs font-semibold px-1.5 py-0.5 rounded">
                        Video
                      </div>
                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-200"></div>
                    </div>

                    {/* Video Info */}
                    <div className="flex gap-3">
                      {/* Channel icon placeholder - YouTube style */}
                      <div className="flex-shrink-0 w-9 h-9 bg-[#cc0000] rounded-full flex items-center justify-center">
                        <Play className="w-4 h-4 text-white fill-white ml-0.5" />
                      </div>

                      {/* Title and metadata */}
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-sm text-gray-900 line-clamp-2 leading-tight mb-1 group-hover:text-gray-600 transition-colors">
                          {video.title}
                        </h4>
                        <p className="text-xs text-gray-600">
                          Dr Brian Walker MLC
                        </p>
                        <p className="text-xs text-gray-600">
                          {formatDate(video.publishedAt)}
                        </p>
                      </div>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          )}
          
          {!videosLoading && videos.length === 0 && (
            <div className="text-center py-16">
              <p className="text-xl text-gray-500 mb-6">No videos available at the moment.</p>
              <Button
                asChild
                className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-full font-bold hover:scale-105 transition-all duration-200 shadow-lg"
              >
                <a
                  href="https://www.youtube.com/channel/UCCIGBIf3b385BV5d48Y1U2A"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Visit YouTube Channel
                </a>
              </Button>
            </div>
          )}
          </div>
        </div>

        {/* Party Section */}
        <div className="bg-gradient-to-br from-[#00653b]/10 via-[#6cc24a]/5 to-[#00653b]/10 rounded-2xl p-6 md:p-8 border-2 border-[#00653b]/20 shadow-xl">
          {/* Party Team Photo */}
          <div className="mb-6 relative w-full h-80 md:h-96 lg:h-[32rem] rounded-xl overflow-hidden shadow-lg hover:-translate-y-1 transition-all duration-300">
            <Image
              src="/images/lcwamedia.webp"
              alt="Legalise Cannabis WA Party Team"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 800px"
            />
          </div>

          <div className="text-center">
            <div className="w-32 h-32 md:w-40 md:h-40 mx-auto mb-5">
              <Image
                src="/images/LCWA.png"
                alt="Legalise Cannabis WA Party"
                width={160}
                height={160}
                className="object-contain w-full h-full"
              />
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Join the Movement
            </h3>
            <p className="text-base text-gray-700 mb-6 max-w-2xl mx-auto">
              I am Leader of the Legalise Cannabis WA Party. Let&apos;s overgrow the government together.
            </p>

            <div className="flex flex-wrap justify-center gap-3">
              <Button
                asChild
                className="bg-[#00653b] text-white px-6 py-2.5 rounded-full font-bold shadow-lg"
                style={{ transition: 'all 0.2s ease-out' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.05)';
                  e.currentTarget.style.backgroundColor = 'rgba(0, 101, 59, 0.9)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.backgroundColor = '#00653b';
                }}
              >
                <a
                  href="https://www.lcwaparty.org.au/?utm_source=brianwalker&utm_medium=website&utm_campaign=join"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Join the Party
                </a>
              </Button>

              <Button
                asChild
                className="bg-[#6cc24a] text-white px-6 py-2.5 rounded-full font-bold shadow-lg"
                style={{ transition: 'all 0.2s ease-out' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.05)';
                  e.currentTarget.style.backgroundColor = 'rgba(108, 194, 74, 0.9)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.backgroundColor = '#6cc24a';
                }}
              >
                <a
                  href="https://www.lcwaparty.org.au/donate?utm_source=brianwalker&utm_medium=website&utm_campaign=donate"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Donate Now
                </a>
              </Button>

              <Button
                asChild
                className="bg-gray-700 text-white px-6 py-2.5 rounded-full font-bold shadow-lg"
                style={{ transition: 'all 0.2s ease-out' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.05)';
                  e.currentTarget.style.backgroundColor = 'rgb(31, 41, 55)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.backgroundColor = 'rgb(55, 65, 81)';
                }}
              >
                <a
                  href="https://www.lcwaparty.org.au/volunteer?utm_source=brianwalker&utm_medium=website&utm_campaign=volunteer"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Volunteer
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
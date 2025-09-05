"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  Mail,
  Loader2,
  UserPlus
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

  const handleNewsletterSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // In real implementation, this would call your newsletter API
    console.log("Newsletter signup:", email);
    alert("Thank you for subscribing to the newsletter!");
    setEmail("");
    setIsSubmitting(false);
  };

  return (
    <section id="help" className="py-16 bg-gradient-to-br from-[#6cc24a]/5 to-[#00653b]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#00653b] mb-4">
            How to Help
          </h2>
          <p className="text-xl text-[#6cc24a] font-bold mb-2">
            Legacy media is silencing my voice!
          </p>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Here&apos;s how you can help amplify our message and create real change
          </p>
        </div>

        {/* Newsletter Signup */}
        <div className="max-w-2xl mx-auto mb-12 text-center">
          <div className="bg-gradient-to-br from-[#00653b]/5 to-[#6cc24a]/5 p-8 rounded-2xl border border-[#00653b]/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <Mail className="w-12 h-12 text-[#00653b] mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-[#00653b] mb-2">Stay Informed</h3>
            <p className="text-gray-700 mb-6">Get the latest updates directly from Dr Brian Walker</p>
            <form onSubmit={handleNewsletterSignup} className="flex flex-col sm:flex-row gap-4">
              <Input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 h-14 text-lg px-6 rounded-full border-2 border-[#00653b]/20 focus:border-[#00653b]"
              />
              <Button
                type="submit"
                className="h-14 px-8 bg-[#00653b] hover:bg-[#00653b]/90 text-lg font-semibold rounded-full whitespace-nowrap"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Subscribing..." : "Subscribe"}
              </Button>
            </form>
          </div>
        </div>

        {/* YouTube Videos Section */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">
            Latest Videos
          </h3>
          
          {/* Follow Me Button */}
          <div className="text-center mb-6">
            <Button
              asChild
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-full font-medium"
            >
              <a
                href="https://www.youtube.com/channel/UCCIGBIf3b385BV5d48Y1U2A?sub_confirmation=1"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <UserPlus className="w-4 h-4" />
                Follow Me on YouTube
              </a>
            </Button>
          </div>
          
          {videosError && (
            <div className="text-center mb-4">
              <p className="text-sm text-amber-600 bg-amber-50 p-3 rounded-lg inline-block">
                {videosError}
              </p>
            </div>
          )}
          
          {videosLoading ? (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-[#00653b]" />
              <span className="ml-2 text-gray-600">Loading latest videos...</span>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {videos.map((video: YouTubeVideo) => (
                <div key={video.id} className="group cursor-pointer">
                  <a href={video.url} target="_blank" rel="noopener noreferrer">
                    <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                      <div className="relative">
                        <div className="aspect-video bg-gray-200 overflow-hidden">
                          <Image
                            src={video.thumbnail}
                            alt={video.title}
                            width={320}
                            height={180}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                            onError={() => {
                              // Fallback handled by Next.js Image component
                            }}
                          />
                        </div>
                      </div>
                      <div className="p-3">
                        <h4 className="font-medium text-sm text-gray-900 mb-1 line-clamp-1 group-hover:text-red-600 transition-colors">
                          {video.title}
                        </h4>
                        <p className="text-xs text-gray-600">
                          {formatDate(video.publishedAt)}
                        </p>
                      </div>
                    </div>
                  </a>
                </div>
              ))}
            </div>
          )}
          
          {!videosLoading && videos.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No videos available at the moment.</p>
              <Button
                asChild
                className="mt-4 bg-red-600 hover:bg-red-700"
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

        {/* LCWA Party Section */}
        <div className="bg-gradient-to-br from-[#00653b]/10 to-[#6cc24a]/10 rounded-lg p-8 border-2 border-[#00653b]/30">
          <div className="text-center mb-8">
            <div className="w-64 h-64 mx-auto mb-6">
              <Image
                src="/images/LCWA.png"
                alt="Legalise Cannabis WA Party"
                width={256}
                height={256}
                className="object-contain"
              />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              I am the leader of the Legalise Cannabis WA Party
            </h3>
            <p className="text-lg text-gray-600 mb-6">
              Join us in creating progressive change for Western Australia
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            <Button
              asChild
              className="bg-[#00653b] hover:bg-[#00653b]/90"
            >
              <a
                href="https://www.lcwaparty.org.au/?utm_source=brianwalker&utm_medium=website&utm_campaign=join"
                target="_blank"
                rel="noopener noreferrer"
              >
                Join
              </a>
            </Button>

            <Button
              asChild
              className="bg-[#00653b] hover:bg-[#00653b]/90"
            >
              <a
                href="https://www.lcwaparty.org.au/donate?utm_source=brianwalker&utm_medium=website&utm_campaign=donate"
                target="_blank"
                rel="noopener noreferrer"
              >
                Donate
              </a>
            </Button>

            <Button
              asChild
              className="bg-[#00653b] hover:bg-[#00653b]/90"
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
    </section>
  );
}
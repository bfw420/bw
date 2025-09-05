"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  Mail,
  Play
} from "lucide-react";

// Real YouTube videos from Dr Brian Walker's channel
const recentVideos = [
  {
    id: "NLkj4_vkCRY",
    title: "Affordable Housing Speech - Dr Brian Walker MLC",
    url: "https://www.youtube.com/watch?v=NLkj4_vkCRY",
    thumbnail: "https://img.youtube.com/vi/NLkj4_vkCRY/maxresdefault.jpg",
    duration: "12:18",
    views: "2.4K",
    uploadedAt: "2 weeks ago"
  },
  {
    id: "8XQkbQZ_R7o",
    title: "Cannabis Law Reform Update - Parliamentary Speech",
    url: "https://www.youtube.com/watch?v=8XQkbQZ_R7o",
    thumbnail: "https://img.youtube.com/vi/8XQkbQZ_R7o/maxresdefault.jpg",
    duration: "8:45",
    views: "3.1K",
    uploadedAt: "3 weeks ago"
  },
  {
    id: "2g0R7MI_twM",
    title: "Mental Health in WA - Community Support",
    url: "https://www.youtube.com/watch?v=2g0R7MI_twM",
    thumbnail: "https://img.youtube.com/vi/2g0R7MI_twM/maxresdefault.jpg",
    duration: "15:22",
    views: "1.8K",
    uploadedAt: "1 month ago"
  },
  {
    id: "jNQXAC9IVRw",
    title: "Renewable Energy Future for Western Australia",
    url: "https://www.youtube.com/watch?v=jNQXAC9IVRw",
    thumbnail: "https://img.youtube.com/vi/jNQXAC9IVRw/maxresdefault.jpg",
    duration: "10:33",
    views: "2.7K",
    uploadedAt: "1 month ago"
  }
];

export default function HowToHelpSection() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

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

        {/* YouTube Videos Carousel */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Latest YouTube Videos
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {recentVideos.map((video) => (
              <Card key={video.id} className="group cursor-pointer hover:shadow-lg transition-shadow">
                <a href={video.url} target="_blank" rel="noopener noreferrer">
                  <div className="relative">
                    <div className="aspect-video bg-gray-300 rounded-t-lg overflow-hidden">
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = '/images/hero1.jpg'; // fallback image
                        }}
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Play className="w-12 h-12 text-white bg-[#00653b] rounded-full p-3 opacity-90" />
                      </div>
                    </div>
                    <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                      {video.duration}
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h4 className="font-semibold text-sm mb-2 line-clamp-2 group-hover:text-[#00653b]">
                      {video.title}
                    </h4>
                    <p className="text-xs text-gray-500">
                      {video.views} views • {video.uploadedAt}
                    </p>
                  </CardContent>
                </a>
              </Card>
            ))}
          </div>
        </div>

        {/* LCWA Party Section */}
        <div className="bg-gradient-to-br from-[#00653b]/10 to-[#6cc24a]/10 rounded-lg p-8 border-2 border-[#00653b]/30">
          <div className="text-center mb-8">
            <div className="w-48 h-48 mx-auto mb-6">
              <Image
                src="/images/LCWA.png"
                alt="Legalise Cannabis WA Party"
                width={192}
                height={192}
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
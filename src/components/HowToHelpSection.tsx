"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Mail, 
  Youtube, 
  Users, 
  Heart, 
  Handshake,
  ExternalLink,
  Play 
} from "lucide-react";

// Mock YouTube videos - in real implementation, this would come from YouTube API
const recentVideos = [
  {
    id: "1",
    title: "Cannabis Law Reform in WA - Latest Update",
    thumbnail: "/images/video-thumb-1.jpg",
    duration: "8:45",
    views: "12.3K",
    uploadedAt: "2 days ago"
  },
  {
    id: "2", 
    title: "Mental Health Services in Western Australia",
    thumbnail: "/images/video-thumb-2.jpg",
    duration: "15:22",
    views: "8.7K",
    uploadedAt: "1 week ago"
  },
  {
    id: "3",
    title: "Affordable Housing Crisis - Parliamentary Speech",
    thumbnail: "/images/video-thumb-3.jpg",
    duration: "12:18",
    views: "15.1K",
    uploadedAt: "2 weeks ago"
  },
  {
    id: "4",
    title: "Renewable Energy Future for WA",
    thumbnail: "/images/video-thumb-4.jpg",
    duration: "10:33",
    views: "9.2K",
    uploadedAt: "3 weeks ago"
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
    <section id="help" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            How to Help
          </h2>
          <p className="text-xl text-red-600 font-semibold mb-2">
            Legacy media is silencing my voice!
          </p>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Here&apos;s how you can help amplify our message and create real change
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Newsletter Signup */}
          <Card className="border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Mail className="w-6 h-6 text-primary" />
                Stay Informed
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Get the latest news and updates directly from Dr Brian Walker. 
                Be the first to know about new policies, parliamentary updates, and community events.
              </p>
              <form onSubmit={handleNewsletterSignup} className="space-y-4">
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full"
                />
                <Button 
                  type="submit" 
                  className="w-full bg-primary hover:bg-primary/90"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Subscribing..." : "Subscribe to Newsletter"}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* YouTube Subscription */}
          <Card className="border-red-500/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Youtube className="w-6 h-6 text-red-600" />
                Watch & Subscribe
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Subscribe to my YouTube channel for parliamentary speeches, policy explanations, 
                and behind-the-scenes content from the Legislative Council.
              </p>
              <Button 
                asChild
                className="w-full bg-red-600 hover:bg-red-700"
              >
                <a 
                  href="https://www.youtube.com/channel/UCCIGBIf3b385BV5d48Y1U2A" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <Youtube className="w-4 h-4" />
                  Subscribe on YouTube
                  <ExternalLink className="w-4 h-4" />
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* YouTube Videos Carousel */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Latest YouTube Videos
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {recentVideos.map((video) => (
              <Card key={video.id} className="group cursor-pointer hover:shadow-lg transition-shadow">
                <div className="relative">
                  <div className="aspect-video bg-gray-300 rounded-t-lg flex items-center justify-center">
                    <Play className="w-12 h-12 text-white bg-red-600 rounded-full p-3" />
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                    {video.duration}
                  </div>
                </div>
                <CardContent className="p-4">
                  <h4 className="font-semibold text-sm mb-2 line-clamp-2 group-hover:text-primary">
                    {video.title}
                  </h4>
                  <p className="text-xs text-gray-500">
                    {video.views} views • {video.uploadedAt}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* LCWA Party Section */}
        <div className="bg-primary/5 rounded-lg p-8 border border-primary/20">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              I am the leader of the Legalise Cannabis WA Party
            </h3>
            <p className="text-lg text-gray-600 mb-6">
              Join us in creating progressive change for Western Australia
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="text-center">
              <CardHeader>
                <Users className="w-8 h-8 text-primary mx-auto mb-2" />
                <CardTitle className="text-lg">Join Us</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  Become a member and help shape policy
                </p>
                <Button 
                  asChild 
                  variant="outline" 
                  className="w-full border-primary text-primary hover:bg-primary hover:text-white"
                >
                  <a 
                    href="https://www.lcwaparty.org.au/?utm_source=brianwalker&utm_medium=website&utm_campaign=join" 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    Join the Party
                  </a>
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Heart className="w-8 h-8 text-primary mx-auto mb-2" />
                <CardTitle className="text-lg">Donate</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  Support our campaigns and initiatives
                </p>
                <Button 
                  asChild 
                  className="w-full bg-primary hover:bg-primary/90"
                >
                  <a 
                    href="https://www.lcwaparty.org.au/donate?utm_source=brianwalker&utm_medium=website&utm_campaign=donate" 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    Make a Donation
                  </a>
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Handshake className="w-8 h-8 text-primary mx-auto mb-2" />
                <CardTitle className="text-lg">Volunteer</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  Get involved in community activities
                </p>
                <Button 
                  asChild 
                  variant="outline" 
                  className="w-full border-primary text-primary hover:bg-primary hover:text-white"
                >
                  <a 
                    href="https://www.lcwaparty.org.au/volunteer?utm_source=brianwalker&utm_medium=website&utm_campaign=volunteer" 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    Volunteer
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
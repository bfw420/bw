import type { Metadata } from "next";
import Image from "next/image";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import NewsletterSignup from "@/components/NewsletterSignup";

export const metadata: Metadata = {
  title: "Newsletter | Dr Brian Walker",
  description: "Subscribe to Dr Brian Walker's newsletter for policy updates, parliamentary reports, and progressive insights.",
  openGraph: {
    images: ["/images/shades.webp"],
  },
};

export default function NewsletterPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      <main className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Header & Signup Form */}
          <div className="text-center mb-16 bg-gradient-to-br from-[#00653b] to-[#6cc24a] rounded-3xl p-8 md:p-12 shadow-xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Join the Conversation
            </h1>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Get the latest policy updates, parliamentary reports, and progressive insights delivered straight to your inbox.
            </p>

            <div className="max-w-xl mx-auto">
              <p className="text-white/80 font-medium mb-4">
                Join 5000+ Western Australians
              </p>
              <NewsletterSignup className="w-full" />
            </div>
          </div>

          {/* Image */}
          <div className="relative w-full aspect-[16/9] mb-16 rounded-2xl overflow-hidden shadow-xl">
            <Image
              src="/images/shades.webp"
              alt="Dr Brian Walker"
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Promotional Text */}
          <div className="bg-gradient-to-br from-[#00653b]/5 to-[#6cc24a]/5 rounded-3xl p-8 md:p-12 border border-[#00653b]/10">
            <h2 className="text-3xl font-bold text-[#00653b] mb-8 text-center">
              What You&apos;ll Get
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-lg text-gray-700">
              <div className="flex items-start gap-4">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#00653b]/10 flex items-center justify-center text-[#00653b] font-bold mt-1">✓</span>
                <span>Monthly policy updates and legislative priorities</span>
              </div>
              <div className="flex items-start gap-4">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#00653b]/10 flex items-center justify-center text-[#00653b] font-bold mt-1">✓</span>
                <span>Parliamentary session recaps and voting records</span>
              </div>
              <div className="flex items-start gap-4">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#00653b]/10 flex items-center justify-center text-[#00653b] font-bold mt-1">✓</span>
                <span>Cannabis reform progress and economic analysis</span>
              </div>
              <div className="flex items-start gap-4">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#00653b]/10 flex items-center justify-center text-[#00653b] font-bold mt-1">✓</span>
                <span>Healthcare policy insights from a practicing GP</span>
              </div>
              <div className="flex items-start gap-4">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#00653b]/10 flex items-center justify-center text-[#00653b] font-bold mt-1">✓</span>
                <span>Community event announcements and town halls</span>
              </div>
              <div className="flex items-start gap-4">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#00653b]/10 flex items-center justify-center text-[#00653b] font-bold mt-1">✓</span>
                <span>Behind-the-scenes looks at parliamentary work</span>
              </div>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}

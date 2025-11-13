import type { Metadata } from "next";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Newspaper, Calendar, FileText } from "lucide-react";

export const metadata: Metadata = {
  title: "Media Releases | Dr Brian Walker MLC",
  description: "Latest media releases and news from Hon Dr Brian Walker MLC, Member of the Legislative Council for Western Australia.",
};

export default function MediaPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      <main className="py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-block p-4 bg-[#00653b]/10 rounded-full mb-6">
              <Newspaper className="w-12 h-12 text-[#00653b]" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-[#00653b] mb-4">
              Media Releases
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Latest news and press releases from Dr Brian Walker MLC
            </p>
          </div>

          {/* Coming Soon Notice */}
          <div className="bg-gradient-to-br from-[#00653b]/5 to-[#6cc24a]/5 rounded-2xl p-12 border-2 border-[#00653b]/20 text-center">
            <div className="inline-block p-4 bg-white rounded-full mb-6 shadow-sm">
              <FileText className="w-10 h-10 text-[#6cc24a]" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Media Releases Coming Soon
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              This page will soon feature the latest media releases, press statements,
              and news from Dr Brian Walker&apos;s parliamentary work and community advocacy.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto mt-12">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <Calendar className="w-8 h-8 text-[#00653b] mb-3" />
                <h3 className="font-bold text-lg text-gray-900 mb-2">Stay Updated</h3>
                <p className="text-gray-600 text-sm">
                  Subscribe to the newsletter to receive media releases and updates directly.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <Newspaper className="w-8 h-8 text-[#6cc24a] mb-3" />
                <h3 className="font-bold text-lg text-gray-900 mb-2">Follow on Social Media</h3>
                <p className="text-gray-600 text-sm">
                  Get the latest updates on Facebook, Instagram, YouTube, and other platforms.
                </p>
              </div>
            </div>
          </div>

          {/* Media Inquiries */}
          <div className="mt-12 bg-white rounded-2xl p-8 border-2 border-[#00653b]/20 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">
              Media Inquiries
            </h2>
            <p className="text-gray-600 text-center mb-6">
              For media inquiries, interview requests, or additional information, please contact:
            </p>
            <div className="text-center">
              <a
                href="mailto:brian.walker.mlc@mp.wa.gov.au"
                className="inline-block text-[#00653b] hover:text-[#6cc24a] font-semibold text-lg transition-colors"
              >
                brian.walker.mlc@mp.wa.gov.au
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

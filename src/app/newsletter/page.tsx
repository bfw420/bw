"use client";

import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Mail, Calendar, Archive, Search, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NewsletterPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      <main className="py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-block p-4 bg-[#00653b]/10 rounded-full mb-6">
              <Mail className="w-12 h-12 text-[#00653b]" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-[#00653b] mb-4">
              Newsletter Archive
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Read past editions of my newsletter covering policy updates, parliamentary sessions, and progressive change in WA
            </p>
          </div>

          {/* Coming Soon Notice */}
          <div className="bg-gradient-to-br from-[#00653b]/5 to-[#6cc24a]/5 rounded-2xl p-12 border-2 border-[#00653b]/20 text-center mb-12">
            <div className="inline-block p-4 bg-white rounded-full mb-6 shadow-sm">
              <Archive className="w-10 h-10 text-[#6cc24a]" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Archive Coming Soon
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              This page will soon feature a searchable archive of all past newsletters, making it easy to
              find policy updates, voting records, and insights from Dr Brian Walker.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-12">
              <div
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 cursor-pointer"
                style={{ transition: 'all 0.2s ease-out' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)';
                  e.currentTarget.style.borderColor = 'rgba(0, 101, 59, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)';
                  e.currentTarget.style.borderColor = 'rgba(229, 231, 235, 1)';
                }}
              >
                <Search className="w-8 h-8 text-[#00653b] mb-3 mx-auto" />
                <h3 className="font-bold text-lg text-gray-900 mb-2">Search by Topic</h3>
                <p className="text-gray-600 text-sm">
                  Find newsletters about specific policies or issues
                </p>
              </div>

              <div
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 cursor-pointer"
                style={{ transition: 'all 0.2s ease-out' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)';
                  e.currentTarget.style.borderColor = 'rgba(108, 194, 74, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)';
                  e.currentTarget.style.borderColor = 'rgba(229, 231, 235, 1)';
                }}
              >
                <Calendar className="w-8 h-8 text-[#6cc24a] mb-3 mx-auto" />
                <h3 className="font-bold text-lg text-gray-900 mb-2">Browse by Date</h3>
                <p className="text-gray-600 text-sm">
                  View newsletters chronologically by month/year
                </p>
              </div>

              <div
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 cursor-pointer"
                style={{ transition: 'all 0.2s ease-out' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)';
                  e.currentTarget.style.borderColor = 'rgba(0, 101, 59, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)';
                  e.currentTarget.style.borderColor = 'rgba(229, 231, 235, 1)';
                }}
              >
                <FileText className="w-8 h-8 text-[#00653b] mb-3 mx-auto" />
                <h3 className="font-bold text-lg text-gray-900 mb-2">Download PDFs</h3>
                <p className="text-gray-600 text-sm">
                  Save newsletters for offline reading
                </p>
              </div>
            </div>
          </div>

          {/* Subscribe Section */}
          <div className="bg-white rounded-2xl p-8 border-2 border-[#00653b]/20 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">
              Don&apos;t Miss Future Newsletters
            </h2>
            <p className="text-gray-600 text-center mb-6">
              Get the latest policy updates, parliamentary reports, and progressive insights delivered to your inbox every month.
            </p>
            <div className="text-center">
              <Button
                asChild
                className="bg-[#00653b] hover:bg-[#00653b]/90 text-white px-8 py-3 rounded-full font-semibold transition-all duration-200 hover:scale-105 shadow-md"
              >
                <Link href="/#help">
                  Subscribe to Newsletter →
                </Link>
              </Button>
            </div>
          </div>

          {/* What to Expect */}
          <div className="mt-12 bg-gradient-to-r from-[#00653b]/5 to-[#6cc24a]/5 rounded-2xl p-8 border border-[#00653b]/20">
            <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">
              What You&apos;ll Find in My Newsletters
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto text-gray-700">
              <div className="flex items-start gap-3">
                <span className="text-[#00653b] font-bold">✓</span>
                <span>Monthly policy updates and legislative priorities</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-[#00653b] font-bold">✓</span>
                <span>Parliamentary session recaps and voting records</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-[#00653b] font-bold">✓</span>
                <span>Cannabis reform progress and economic analysis</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-[#00653b] font-bold">✓</span>
                <span>Healthcare policy insights from a practicing GP</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-[#00653b] font-bold">✓</span>
                <span>Community event announcements and town halls</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-[#00653b] font-bold">✓</span>
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

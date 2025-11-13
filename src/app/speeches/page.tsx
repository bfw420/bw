import type { Metadata } from "next";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { MessageSquare, BookOpen, FileText, Search } from "lucide-react";

export const metadata: Metadata = {
  title: "Parliamentary Speeches | Dr Brian Walker MLC",
  description: "Browse recent Hansard speeches and parliamentary contributions from Hon Dr Brian Walker MLC.",
};

export default function SpeechesPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      <main className="py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-block p-4 bg-[#00653b]/10 rounded-full mb-6">
              <MessageSquare className="w-12 h-12 text-[#00653b]" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-[#00653b] mb-4">
              Parliamentary Speeches
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore recent Hansard speeches and contributions to parliamentary debates
            </p>
          </div>

          {/* Coming Soon Notice */}
          <div className="bg-gradient-to-br from-[#00653b]/5 to-[#6cc24a]/5 rounded-2xl p-12 border-2 border-[#00653b]/20 text-center">
            <div className="inline-block p-4 bg-white rounded-full mb-6 shadow-sm">
              <BookOpen className="w-10 h-10 text-[#6cc24a]" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Speech Dashboard Coming Soon
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              This page will soon feature a comprehensive dashboard to explore Dr Brian Walker&apos;s
              parliamentary speeches, Hansard records, and contributions to legislative debates.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-12">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <Search className="w-8 h-8 text-[#00653b] mb-3 mx-auto" />
                <h3 className="font-bold text-lg text-gray-900 mb-2">Search & Filter</h3>
                <p className="text-gray-600 text-sm">
                  Browse speeches by topic, date, or keyword
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <FileText className="w-8 h-8 text-[#6cc24a] mb-3 mx-auto" />
                <h3 className="font-bold text-lg text-gray-900 mb-2">Full Transcripts</h3>
                <p className="text-gray-600 text-sm">
                  Read complete Hansard transcripts
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <MessageSquare className="w-8 h-8 text-[#00653b] mb-3 mx-auto" />
                <h3 className="font-bold text-lg text-gray-900 mb-2">Key Issues</h3>
                <p className="text-gray-600 text-sm">
                  Track speeches on important topics
                </p>
              </div>
            </div>
          </div>

          {/* Parliamentary Resources */}
          <div className="mt-12 bg-white rounded-2xl p-8 border-2 border-[#00653b]/20 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">
              Parliamentary Resources
            </h2>
            <p className="text-gray-600 text-center mb-6">
              In the meantime, you can view Dr Brian Walker&apos;s parliamentary contributions through
              the official WA Parliament website:
            </p>
            <div className="text-center">
              <a
                href="https://www.parliament.wa.gov.au/parliament/memblist.nsf/WAllMembersFlat/Walker,%20Brian%20Francis?opendocument"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-[#00653b] hover:bg-[#00653b]/90 text-white px-6 py-3 rounded-full font-semibold transition-all duration-200 hover:scale-105 shadow-md"
              >
                View Parliamentary Profile →
              </a>
            </div>
          </div>

          {/* Subscribe for Updates */}
          <div className="mt-12 text-center bg-gradient-to-r from-[#00653b]/5 to-[#6cc24a]/5 rounded-2xl p-8 border border-[#00653b]/20">
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Stay Informed
            </h3>
            <p className="text-gray-600 mb-6">
              Subscribe to the newsletter to be notified when the speech dashboard launches
              and to receive updates on Dr Walker&apos;s parliamentary work.
            </p>
            <a
              href="/#help"
              className="inline-block text-[#00653b] hover:text-[#6cc24a] font-semibold transition-colors"
            >
              Subscribe to Newsletter →
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

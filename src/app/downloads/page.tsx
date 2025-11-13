import type { Metadata } from "next";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Download, Image as ImageIcon, FileText, Folder } from "lucide-react";

export const metadata: Metadata = {
  title: "Downloads | Dr Brian Walker MLC",
  description: "Download media resources including headshots, logos, and biographical information for Dr Brian Walker MLC.",
};

export default function DownloadsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      <main className="py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-block p-4 bg-[#00653b]/10 rounded-full mb-6">
              <Download className="w-12 h-12 text-[#00653b]" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-[#00653b] mb-4">
              Media Resources
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Download high-resolution photos, logos, and biographical information for media, corporate, and journalistic use.
            </p>
          </div>

          {/* Main Download Section */}
          <div className="bg-gradient-to-br from-[#00653b]/5 to-[#6cc24a]/5 rounded-2xl p-12 border-2 border-[#00653b]/20 text-center mb-12">
            <div className="inline-block p-4 bg-white rounded-full mb-6 shadow-sm">
              <Folder className="w-12 h-12 text-[#6cc24a]" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Download Media Kit
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Access our complete media kit including professional headshots, official logos,
              biographical information, and other resources for media and promotional use.
            </p>

            <Button
              asChild
              size="lg"
              className="bg-[#00653b] hover:bg-[#00653b]/90 text-white px-8 py-4 rounded-full font-bold text-lg transition-all duration-200 hover:scale-105 shadow-lg"
            >
              <a
                href="https://www.dropbox.com/scl/fo/7j9xq5hxvohcpu8g1mbzi/AG2o5VpA3IgfOxJruBUU_78?rlkey=29c0gkry7t6wniezpqwtngxhr&dl=0"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Download className="w-5 h-5 mr-2" />
                Access Media Kit on Dropbox
              </a>
            </Button>
          </div>

          {/* What's Included */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              What&apos;s Included
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-[#00653b]/10 hover:border-[#00653b]/30 hover:shadow-xl hover:-translate-y-1 transition-all duration-200 cursor-pointer">
                <div className="flex flex-col items-center text-center">
                  <div className="p-3 bg-[#00653b]/10 rounded-lg mb-4">
                    <ImageIcon className="w-8 h-8 text-[#00653b]" />
                  </div>
                  <h3 className="font-bold text-xl text-gray-900 mb-2">Professional Headshots</h3>
                  <p className="text-gray-600">
                    High-resolution professional photographs suitable for print and digital media.
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-[#00653b]/10 hover:border-[#00653b]/30 hover:shadow-xl hover:-translate-y-1 transition-all duration-200 cursor-pointer">
                <div className="flex flex-col items-center text-center">
                  <div className="p-3 bg-[#6cc24a]/10 rounded-lg mb-4">
                    <ImageIcon className="w-8 h-8 text-[#6cc24a]" />
                  </div>
                  <h3 className="font-bold text-xl text-gray-900 mb-2">Official Logos</h3>
                  <p className="text-gray-600">
                    Official logos and branding materials in various formats and sizes.
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-[#00653b]/10 hover:border-[#00653b]/30 hover:shadow-xl hover:-translate-y-1 transition-all duration-200 cursor-pointer">
                <div className="flex flex-col items-center text-center">
                  <div className="p-3 bg-[#00653b]/10 rounded-lg mb-4">
                    <FileText className="w-8 h-8 text-[#00653b]" />
                  </div>
                  <h3 className="font-bold text-xl text-gray-900 mb-2">Biography</h3>
                  <p className="text-gray-600">
                    Detailed biographical information for media releases and publications.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Usage Guidelines */}
          <div className="bg-white rounded-2xl p-8 border-2 border-[#00653b]/20 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Usage Guidelines
            </h2>
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-600 mb-4">
                These resources are provided for media, corporate, and journalistic purposes.
                When using these materials, please:
              </p>
              <ul className="text-gray-600 space-y-2">
                <li>Maintain the integrity and context of the images and information</li>
                <li>Credit appropriately as &quot;Dr Brian Walker MLC&quot; or &quot;Hon Dr Brian Walker MLC&quot;</li>
                <li>Do not alter or manipulate images without permission</li>
                <li>Contact us if you need specific formats or have questions about usage</li>
              </ul>
              <p className="text-gray-600 mt-6">
                For additional resources or specific requests, please contact:{" "}
                <a
                  href="mailto:brian.walker.mlc@mp.wa.gov.au"
                  className="text-[#00653b] hover:text-[#6cc24a] font-semibold transition-colors"
                >
                  brian.walker.mlc@mp.wa.gov.au
                </a>
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

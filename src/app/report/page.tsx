"use client";

import Image from 'next/image';
import { FileDown, BookOpen, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

export default function ReportPage() {
  const pdfUrl = 'https://www.dropbox.com/s/nco9utrm1h5a5yq/An%20Economic%20Case%20to%20Legalise%20Cannabis%20in%20Western%20Australia%202023.pdf?dl=1';

  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#00653b] via-[#00653b] to-[#6cc24a] text-white py-20 md:py-32">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium mb-4">
              <BookOpen className="w-4 h-4" />
              <span>Academic Research Report 2023</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              The Missing Budget Paper
            </h1>

            <p className="text-xl md:text-2xl font-light text-white/90">
              An Economic Case to Legalise Cannabis in Western Australia
            </p>

            <div className="pt-6 space-y-2">
              <p className="text-lg font-medium">
                By Dr Farhad Mohammad
              </p>
              <p className="text-white/80">
                UWA Business School
              </p>
              <p className="text-sm text-white/70 pt-2">
                With an introduction from Hon. Dr Brian Walker MLC
              </p>
            </div>

            <div className="pt-8">
              <Button
                asChild
                size="lg"
                className="bg-white text-[#00653b] font-semibold text-lg px-8 py-6 shadow-xl"
                style={{ transition: 'all 0.2s ease-out' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
                  e.currentTarget.style.boxShadow = '0 25px 50px -12px rgba(0, 0, 0, 0.25)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.backgroundColor = 'white';
                  e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)';
                }}
              >
                <a href={pdfUrl} target="_blank" rel="noopener noreferrer">
                  <FileDown className="w-5 h-5 mr-2" />
                  Download Full Report (Free)
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Key Statistics Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
            <div
              className="text-center p-6 bg-white rounded-lg shadow-md cursor-pointer"
              style={{ transition: 'all 0.2s ease-out' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
              }}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#00653b] to-[#6cc24a] rounded-full mb-4">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-[#00653b] mb-2">$1.25B</h3>
              <p className="text-gray-600">Additional Government Revenue</p>
              <p className="text-sm text-gray-500 mt-1">(2023-28 forward estimates)</p>
            </div>

            <div
              className="text-center p-6 bg-white rounded-lg shadow-md cursor-pointer"
              style={{ transition: 'all 0.2s ease-out' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
              }}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#00653b] to-[#6cc24a] rounded-full mb-4">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-[#00653b] mb-2">First</h3>
              <p className="text-gray-600">Comprehensive WA Study</p>
              <p className="text-sm text-gray-500 mt-1">Academic economic analysis</p>
            </div>

            <div
              className="text-center p-6 bg-white rounded-lg shadow-md cursor-pointer"
              style={{ transition: 'all 0.2s ease-out' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
              }}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#00653b] to-[#6cc24a] rounded-full mb-4">
                <FileDown className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-[#00653b] mb-2">Free</h3>
              <p className="text-gray-600">Open Access Report</p>
              <p className="text-sm text-gray-500 mt-1">Download without restrictions</p>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="mb-12 text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Introduction by Hon Dr Brian Walker MLC
              </h2>
              <p className="text-lg text-gray-600">
                Leader of the Legalise Cannabis Western Australia Party
              </p>
              <p className="text-sm text-gray-500">MB, ChB, FRACGP</p>
            </div>

            <div className="prose prose-lg max-w-none space-y-6 text-gray-700 leading-relaxed">
              <p>
                Nine decades of negative propaganda pushing the narrative that cannabis is bad for health and morality has prevented rational scientific evaluation of what is essentially a healthy healing herb that can, like much of nature, be abused. In pushing for truth in the matter we need hard facts. On the one hand we have excellent science behind the endocannabinoid system and the effects on health, but on the other hand the political establishment demands a financial rationale before it will seriously consider legalisation.
              </p>

              <p>
                I am delighted to present this academic research into the actual monetary value that cannabis represents. While recreational and medicinal cannabis represents only about 5% of the total estimated revenue potentially derived from hemp, the figures are nevertheless compelling.
              </p>

              <p>
                This work is the first such authoritative evaluation that reports on the economic case for legalising cannabis in Western Australia. The Legalise Cannabis Party of WA commissioned Dr Mohammad Farhad of the University of WA Business School to investigate and report on the current cannabis economy, and he has produced a treasure trove of facts and figures that shed light on the potential benefits of cannabis reform.
              </p>

              <p>
                The report assesses the potential economic consequences for Western Australia should we permit adult-use recreational cannabis in a legal and well-regulated system. It turns out that legalising cannabis would have direct positive budgetary implications from increasing income from a range of measures including revenue generation and reduced expenditure on enforcing prohibition. However, the experience of other jurisdictions which have already legalised cannabis suggests that additional benefits would be likely to follow, including new employment opportunities within Western Australia not only in cultivation and processing, but in retail and tourism, implying an increase in state GDP.
              </p>

              <p>
                The associated gains from legalisation open the way for a substantial funding increase in priority sectors such as health and education. With an estimated $1.25b in additional government revenue over the forward estimates (2023-28, based on a modest 25% taxation model, and 1.5% annual growth), the real question is why haven&apos;t Treasury taken a serious look at this already?
              </p>

              <p>
                The government&apos;s reluctance might stem from fears around the potential societal and health risks associated with relaxed cannabis legislation, and decades of negative messaging; the report acknowledges those concerns. It goes on to provide insights into estimating the size of both the black market and the legal market for cannabis, while considering changes in price and consumption. Furthermore, it explores potential licensing and tax revenue from alternative tax regimes while considering likely savings from the costs of criminal justice system.
              </p>

              <p>
                This is the first, comprehensive economic analysis to take into account all aspects of cannabis reform from a financial perspective, and the importance of the report for us in Western Australia is clear: additional tax revenue and savings enabling enhanced government funding for other priority sectors, enhanced management of societal deprivation and distress from a financial perspective, all of which sit neatly alongside the proven benefits of cannabis as a prescription medicine, with wide-ranging effects on the wellness of the population.
              </p>

              <p>
                It is my sincere hope that these findings will inform discussions about cannabis regulatory reform, not only in Western Australia, but also in other jurisdictions, be they in Australia or further afield, considering similar reforms. The evidence brought forth in this study will benefit policymaking and will contribute towards creating a better future for all, and we welcome the response of government in reviewing the data, which should lead to a broader economic debate, and to WA legislators taking the next steps to free cannabis from the many restrictions imposed of the outdated and incorrect assumptions from a century of needless, and economically harmful prohibition.
              </p>

              <p className="font-semibold text-gray-900">
                The time for change is now, and the economic benefits of that change are clear for all to see in the following pages.
              </p>

              <div className="mt-8 pt-8 border-t border-gray-200">
                <p className="font-semibold text-gray-900">Hon. Dr Brian Walker MLC</p>
                <p className="text-gray-600">Leader of the Legalise Cannabis Western Australia Party</p>
                <p className="text-gray-600">MB, ChB, FRACGP</p>
              </div>
            </div>

            {/* Download CTA */}
            <div className="mt-12 text-center p-8 bg-gradient-to-br from-[#00653b] to-[#6cc24a] rounded-xl shadow-xl">
              <h3 className="text-2xl font-bold text-white mb-4">
                Ready to Read the Full Report?
              </h3>
              <p className="text-white/90 mb-6">
                Download the complete economic analysis including detailed methodology, data, and projections.
              </p>
              <Button
                asChild
                size="lg"
                className="bg-white text-[#00653b] font-semibold text-lg px-8 py-6 shadow-lg"
                style={{ transition: 'all 0.2s ease-out' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
                  e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.backgroundColor = 'white';
                  e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)';
                }}
              >
                <a href={pdfUrl} target="_blank" rel="noopener noreferrer">
                  <FileDown className="w-5 h-5 mr-2" />
                  Download PDF Report
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Report Images Gallery */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
              Report Visuals
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="rounded-2xl overflow-hidden shadow-xl hover:-translate-y-2 transition-all duration-300">
                <Image
                  src="/images/report/brian_report.png"
                  alt="Economic Case Report Cover"
                  width={600}
                  height={800}
                  className="w-full h-auto object-cover"
                />
              </div>
              <div className="rounded-2xl overflow-hidden shadow-xl hover:-translate-y-2 transition-all duration-300">
                <Image
                  src="/images/report/mockup1.webp"
                  alt="Report Mockup 1"
                  width={600}
                  height={800}
                  className="w-full h-auto object-cover"
                />
              </div>
              <div className="rounded-2xl overflow-hidden shadow-xl hover:-translate-y-2 transition-all duration-300">
                <Image
                  src="/images/report/mockup2.webp"
                  alt="Report Mockup 2"
                  width={600}
                  height={800}
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Back to Home */}
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <Link
            href="/"
            className="inline-flex items-center text-[#00653b] hover:text-[#6cc24a] font-medium transition-all duration-200 hover:scale-105"
          >
            ← Back to Home
          </Link>
        </div>
      </section>
      </main>
      <Footer />
    </div>
  );
}

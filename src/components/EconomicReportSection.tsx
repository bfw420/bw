"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { FileText, TrendingUp, DollarSign } from "lucide-react";

export default function EconomicReportSection() {
  return (
    <section id="economic-report" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-[#00653b]/5 via-white to-[#6cc24a]/5 rounded-3xl p-8 md:p-10 border-2 border-[#00653b]/10 shadow-xl">
          <div className="text-center mb-8">
            <div className="inline-block p-3 bg-[#00653b]/10 rounded-full mb-4">
              <FileText className="w-8 h-8 text-[#00653b]" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
              The Economic Case for Cannabis Reform
            </h2>
            <p className="text-base md:text-lg text-gray-700 max-w-3xl mx-auto">
              A comprehensive academic report commissioned by the Legalise Cannabis WA Party.
            </p>
          </div>

          {/* Two Column Layout: Image Left, Cards Right */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {/* Report Image */}
            <div className="flex justify-center md:justify-start items-center">
              <div className="relative w-full max-w-xs aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl hover:-translate-y-2 transition-all duration-300">
                <Image
                  src="/images/report/brian_report.png"
                  alt="An Economic Case to Legalise Cannabis in Western Australia Report"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 320px"
                />
              </div>
            </div>

            {/* Cards Stacked Vertically */}
            <div className="flex flex-col justify-center gap-4">
              <div
                className="group bg-white rounded-xl p-4 shadow-md border border-[#00653b]/20 cursor-pointer"
                style={{ transition: 'all 0.3s ease-out' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)';
                  e.currentTarget.style.borderColor = '#00653b';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
                  e.currentTarget.style.borderColor = 'rgba(0, 101, 59, 0.2)';
                }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-[#6cc24a]/10 rounded-lg group-hover:bg-[#6cc24a] transition-all duration-300">
                    <DollarSign className="w-5 h-5 text-[#6cc24a] group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h3 className="font-bold text-base text-gray-900 group-hover:text-[#00653b] transition-colors duration-300">Economic Impact</h3>
                </div>
                <p className="text-sm text-gray-600">
                  Revenue potential, job creation, and economic stimulus for WA.
                </p>
              </div>

              <div
                className="group bg-white rounded-xl p-4 shadow-md border border-[#00653b]/20 cursor-pointer"
                style={{ transition: 'all 0.3s ease-out' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)';
                  e.currentTarget.style.borderColor = '#00653b';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
                  e.currentTarget.style.borderColor = 'rgba(0, 101, 59, 0.2)';
                }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-[#6cc24a]/10 rounded-lg group-hover:bg-[#6cc24a] transition-all duration-300">
                    <TrendingUp className="w-5 h-5 text-[#6cc24a] group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h3 className="font-bold text-base text-gray-900 group-hover:text-[#00653b] transition-colors duration-300">Market Analysis</h3>
                </div>
                <p className="text-sm text-gray-600">
                  UWA Business School research on current market conditions.
                </p>
              </div>

              <div
                className="group bg-white rounded-xl p-4 shadow-md border border-[#00653b]/20 cursor-pointer"
                style={{ transition: 'all 0.3s ease-out' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)';
                  e.currentTarget.style.borderColor = '#00653b';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
                  e.currentTarget.style.borderColor = 'rgba(0, 101, 59, 0.2)';
                }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-[#6cc24a]/10 rounded-lg group-hover:bg-[#6cc24a] transition-all duration-300">
                    <FileText className="w-5 h-5 text-[#6cc24a] group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h3 className="font-bold text-base text-gray-900 group-hover:text-[#00653b] transition-colors duration-300">Evidence-Based</h3>
                </div>
                <p className="text-sm text-gray-600">
                  Academic evaluation backed by comprehensive data.
                </p>
              </div>
            </div>
          </div>

          {/* Button Below */}
          <div className="text-center">
            <Button
              asChild
              size="lg"
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
              <Link href="/report">
                Read the Full Report
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

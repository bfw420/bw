"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FileText, TrendingUp, DollarSign } from "lucide-react";

export default function EconomicReportSection() {
  return (
    <section id="economic-report" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-[#00653b]/5 via-white to-[#6cc24a]/5 rounded-3xl p-8 md:p-12 border-2 border-[#00653b]/10 shadow-xl">
          <div className="text-center mb-8">
            <div className="inline-block p-4 bg-[#00653b]/10 rounded-full mb-6">
              <FileText className="w-12 h-12 text-[#00653b]" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              The Economic Case for Cannabis Reform
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              A comprehensive academic report commissioned by the Legalise Cannabis WA Party reveals the significant economic benefits of cannabis legalisation for Western Australia.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div
              className="group bg-white rounded-2xl p-6 shadow-md border border-[#00653b]/20 cursor-pointer"
              style={{ transition: 'all 0.3s ease-out' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)';
                e.currentTarget.style.borderColor = '#00653b';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
                e.currentTarget.style.borderColor = 'rgba(0, 101, 59, 0.2)';
              }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-[#6cc24a]/10 rounded-lg group-hover:bg-[#6cc24a] transition-all duration-300">
                  <DollarSign className="w-6 h-6 text-[#6cc24a] group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="font-bold text-lg text-gray-900 group-hover:text-[#00653b] transition-colors duration-300">Economic Impact</h3>
              </div>
              <p className="text-gray-600">
                Detailed analysis of revenue potential, job creation, and economic stimulus for WA.
              </p>
            </div>

            <div
              className="group bg-white rounded-2xl p-6 shadow-md border border-[#00653b]/20 cursor-pointer"
              style={{ transition: 'all 0.3s ease-out' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)';
                e.currentTarget.style.borderColor = '#00653b';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
                e.currentTarget.style.borderColor = 'rgba(0, 101, 59, 0.2)';
              }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-[#6cc24a]/10 rounded-lg group-hover:bg-[#6cc24a] transition-all duration-300">
                  <TrendingUp className="w-6 h-6 text-[#6cc24a] group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="font-bold text-lg text-gray-900 group-hover:text-[#00653b] transition-colors duration-300">Market Analysis</h3>
              </div>
              <p className="text-gray-600">
                Expert research from UWA Business School examining current market conditions.
              </p>
            </div>

            <div
              className="group bg-white rounded-2xl p-6 shadow-md border border-[#00653b]/20 cursor-pointer"
              style={{ transition: 'all 0.3s ease-out' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)';
                e.currentTarget.style.borderColor = '#00653b';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
                e.currentTarget.style.borderColor = 'rgba(0, 101, 59, 0.2)';
              }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-[#6cc24a]/10 rounded-lg group-hover:bg-[#6cc24a] transition-all duration-300">
                  <FileText className="w-6 h-6 text-[#6cc24a] group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="font-bold text-lg text-gray-900 group-hover:text-[#00653b] transition-colors duration-300">Evidence-Based</h3>
              </div>
              <p className="text-gray-600">
                Authoritative academic evaluation backed by comprehensive data and research.
              </p>
            </div>
          </div>

          <div className="text-center">
            <Button
              asChild
              size="lg"
              className="bg-[#00653b] text-white px-8 py-3 rounded-full font-bold text-lg shadow-lg"
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

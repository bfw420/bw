"use client";

import { Stethoscope, Building2, Users, Languages } from "lucide-react";

export default function StatsSection() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {/* Stat 1 */}
          <div className="text-center">
            <div className="bg-gradient-to-br from-[#00653b]/5 to-[#6cc24a]/5 border border-[#00653b]/10 rounded-2xl p-4 md:p-5 hover:border-[#00653b] hover:shadow-lg transition-all duration-300 hover:scale-105 h-full">
              <div className="flex justify-center mb-2">
                <Stethoscope className="w-7 h-7 md:w-8 md:h-8 text-[#00653b]" />
              </div>
              <div className="text-3xl md:text-4xl font-bold text-[#00653b] mb-1">
                46
              </div>
              <div className="text-xs md:text-sm text-gray-700 font-medium">
                Years as GP
              </div>
            </div>
          </div>

          {/* Stat 2 */}
          <div className="text-center">
            <div className="bg-gradient-to-br from-[#00653b]/5 to-[#6cc24a]/5 border border-[#00653b]/10 rounded-2xl p-4 md:p-5 hover:border-[#00653b] hover:shadow-lg transition-all duration-300 hover:scale-105 h-full">
              <div className="flex justify-center mb-2">
                <Building2 className="w-7 h-7 md:w-8 md:h-8 text-[#00653b]" />
              </div>
              <div className="text-3xl md:text-4xl font-bold text-[#00653b] mb-1">
                4
              </div>
              <div className="text-xs md:text-sm text-gray-700 font-medium">
                Years in WA Parliament
              </div>
            </div>
          </div>

          {/* Stat 3 */}
          <div className="text-center">
            <div className="bg-gradient-to-br from-[#00653b]/5 to-[#6cc24a]/5 border border-[#00653b]/10 rounded-2xl p-4 md:p-5 hover:border-[#00653b] hover:shadow-lg transition-all duration-300 hover:scale-105 h-full">
              <div className="flex justify-center mb-2">
                <Languages className="w-7 h-7 md:w-8 md:h-8 text-[#00653b]" />
              </div>
              <div className="text-3xl md:text-4xl font-bold text-[#00653b] mb-1">
                5
              </div>
              <div className="text-xs md:text-sm text-gray-700 font-medium">
                Fluent Languages
              </div>
            </div>
          </div>

          {/* Stat 4 */}
          <div className="text-center">
            <div className="bg-gradient-to-br from-[#00653b]/5 to-[#6cc24a]/5 border border-[#00653b]/10 rounded-2xl p-4 md:p-5 hover:border-[#00653b] hover:shadow-lg transition-all duration-300 hover:scale-105 h-full">
              <div className="flex justify-center mb-2">
                <Users className="w-7 h-7 md:w-8 md:h-8 text-[#00653b]" />
              </div>
              <div className="text-3xl md:text-4xl font-bold text-[#00653b] mb-1">
                5,000+
              </div>
              <div className="text-xs md:text-sm text-gray-700 font-medium">
                Newsletter Subscribers
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { Stethoscope, Building2, FileText, Users, Languages } from "lucide-react";

export default function StatsSection() {
  return (
    <section className="py-16 bg-gradient-to-r from-[#00653b] to-[#6cc24a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 md:gap-8">
          {/* Stat 1 */}
          <div className="text-center">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 md:p-8 hover:bg-white/20 transition-all duration-300 hover:scale-105">
              <div className="flex justify-center mb-3">
                <Stethoscope className="w-8 h-8 md:w-10 md:h-10 text-white/90" />
              </div>
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                40+
              </div>
              <div className="text-sm md:text-base text-white/90 font-medium">
                Years as GP
              </div>
            </div>
          </div>

          {/* Stat 2 */}
          <div className="text-center">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 md:p-8 hover:bg-white/20 transition-all duration-300 hover:scale-105">
              <div className="flex justify-center mb-3">
                <Building2 className="w-8 h-8 md:w-10 md:h-10 text-white/90" />
              </div>
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                5
              </div>
              <div className="text-sm md:text-base text-white/90 font-medium">
                Years in WA Parliament
              </div>
            </div>
          </div>

          {/* Stat 3 */}
          <div className="text-center">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 md:p-8 hover:bg-white/20 transition-all duration-300 hover:scale-105">
              <div className="flex justify-center mb-3">
                <FileText className="w-8 h-8 md:w-10 md:h-10 text-white/90" />
              </div>
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                11+
              </div>
              <div className="text-sm md:text-base text-white/90 font-medium">
                Bills Tabled
              </div>
            </div>
          </div>

          {/* Stat 4 */}
          <div className="text-center">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 md:p-8 hover:bg-white/20 transition-all duration-300 hover:scale-105">
              <div className="flex justify-center mb-3">
                <Users className="w-8 h-8 md:w-10 md:h-10 text-white/90" />
              </div>
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                5,000+
              </div>
              <div className="text-sm md:text-base text-white/90 font-medium">
                Newsletter Subscribers
              </div>
            </div>
          </div>

          {/* Stat 5 */}
          <div className="text-center">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 md:p-8 hover:bg-white/20 transition-all duration-300 hover:scale-105">
              <div className="flex justify-center mb-3">
                <Languages className="w-8 h-8 md:w-10 md:h-10 text-white/90" />
              </div>
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                7
              </div>
              <div className="text-sm md:text-base text-white/90 font-medium">
                Languages Spoken
              </div>
            </div>
          </div>
        </div>

        {/* Optional tagline */}
        <div className="text-center mt-8">
          <p className="text-white/90 text-lg md:text-xl font-medium">
            Experience. Dedication. Results.
          </p>
        </div>
      </div>
    </section>
  );
}

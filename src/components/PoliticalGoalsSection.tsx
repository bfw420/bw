"use client";

import Image from "next/image";
import {
  Leaf,
  Wheat,
  Home,
  Cross,
  Brain,
  GraduationCap,
  Scale,
  Users,
  Recycle
} from "lucide-react";

const politicalGoals = [
  {
    word: "Cannabis",
    description: "Legalise and regulate cannabis for state revenue",
    icon: Leaf
  },
  {
    word: "Hemp",
    description: "Develop hemp as a sustainable multi-billion-dollar industry",
    icon: Wheat
  },
  {
    word: "Housing",
    description: "Build affordable housing and prevent homelessness",
    icon: Home
  },
  {
    word: "Healthcare",
    description: "Ensure universal healthcare access and equity",
    icon: Cross
  },
  {
    word: "Mental Health",
    description: "Expand community-based mental health support",
    icon: Brain
  },
  {
    word: "Jobs",
    description: "Reskill workforce for emerging industries",
    icon: GraduationCap
  },
  {
    word: "Justice",
    description: "Establish restorative justice instead of punishment",
    icon: Scale
  },
  {
    word: "Indigenous Rights",
    description: "Strengthen Indigenous rights, health, and opportunities",
    icon: Users
  },
  {
    word: "Environment",
    description: "Commit to zero waste by 2040 and Net Zero by 2050",
    icon: Recycle
  }
];

export default function PoliticalGoalsSection() {
  return (
    <section id="goals" className="py-16 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#00653b] mb-3">
            My Political Goals
          </h2>
          <p className="text-base text-gray-700 max-w-2xl mx-auto">
            Key policy areas I&apos;m working on for Western Australia
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {politicalGoals.map((goal, index) => {
            const IconComponent = goal.icon;
            return (
              <div
                key={index}
                className="group relative p-6 bg-white rounded-xl border-2 border-[#00653b]/10 shadow-md cursor-pointer overflow-hidden"
                style={{ transition: 'all 0.3s ease-out' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)';
                  e.currentTarget.style.borderColor = '#00653b';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
                  e.currentTarget.style.borderColor = 'rgba(0, 101, 59, 0.1)';
                }}
              >
                {/* Background Image on Hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-300">
                  <Image
                    src="/images/crowd.webp"
                    alt=""
                    fill
                    className="object-cover"
                    sizes="400px"
                  />
                </div>

                <div className="relative text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#00653b]/10 to-[#6cc24a]/10 rounded-xl mb-4 group-hover:from-[#00653b] group-hover:to-[#6cc24a] transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg">
                    <IconComponent className="w-8 h-8 text-[#00653b] group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#00653b] transition-colors duration-300">
                    {goal.word}
                  </h3>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    {goal.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-10">
          <p className="text-base text-gray-700 max-w-3xl mx-auto">
            These goals represent my commitment to evidence-based policy that puts people and planet first.
          </p>
        </div>

        {/* Banner Image - Community Rally */}
        <div className="mt-16 relative w-full h-80 md:h-96 lg:h-[32rem] rounded-3xl overflow-hidden shadow-2xl hover:-translate-y-1 transition-all duration-300">
          <Image
            src="/images/crowd.webp"
            alt="Dr Brian Walker MLC at community rally"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 1280px"
          />
        </div>
      </div>
    </section>
  );
}
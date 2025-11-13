"use client";

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
    word: "Indigenous",
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
    <section id="goals" className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[#00653b] mb-4">
            My Political Goals
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Key policy areas I&apos;m working on for Western Australia
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {politicalGoals.map((goal, index) => {
            const IconComponent = goal.icon;
            return (
              <div
                key={index}
                className="group p-8 bg-white rounded-2xl border-2 border-[#00653b]/10 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:border-[#00653b] cursor-pointer"
              >
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[#00653b]/10 to-[#6cc24a]/10 rounded-2xl mb-6 group-hover:from-[#00653b] group-hover:to-[#6cc24a] transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl">
                    <IconComponent className="w-10 h-10 text-[#00653b] group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-[#00653b] transition-colors duration-300">
                    {goal.word}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {goal.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <p className="text-lg text-gray-700 max-w-3xl mx-auto font-medium">
            These goals represent my commitment to evidence-based policy that puts people and planet first.
          </p>
        </div>
      </div>
    </section>
  );
}
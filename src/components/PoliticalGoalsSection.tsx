import {
  Leaf,
  Wheat,
  Home,
  Heart,
  Brain,
  GraduationCap,
  Scale,
  Users,
  Recycle
} from "lucide-react";

const politicalGoals = [
  {
    title: "Legalise and regulate cannabis for state revenue",
    icon: Leaf
  },
  {
    title: "Develop hemp as a sustainable multi-billion-dollar industry",
    icon: Wheat
  },
  {
    title: "Build affordable housing and prevent homelessness",
    icon: Home
  },
  {
    title: "Ensure universal healthcare access and equity",
    icon: Heart
  },
  {
    title: "Expand community-based mental health support",
    icon: Brain
  },
  {
    title: "Reskill workforce for emerging industries",
    icon: GraduationCap
  },
  {
    title: "Establish restorative justice instead of punishment",
    icon: Scale
  },
  {
    title: "Strengthen Indigenous rights, health, and opportunities",
    icon: Users
  },
  {
    title: "Commit to zero waste by 2040 and Net Zero by 2050",
    icon: Recycle
  }
];

export default function PoliticalGoalsSection() {
  return (
    <section id="goals" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-[#00653b] mb-3">
            My Political Goals
          </h2>
          <p className="text-base text-gray-700 max-w-2xl mx-auto">
            Key policy areas I&apos;m working on for Western Australia
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {politicalGoals.map((goal, index) => {
            const IconComponent = goal.icon;
            return (
              <div key={index} className="p-4 bg-white rounded-lg border border-[#00653b]/10 hover:border-[#00653b]/30 transition-colors duration-300 group">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-[#00653b]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <IconComponent className="w-6 h-6 text-[#00653b]" />
                  </div>
                  <p className="text-sm font-medium text-gray-900 leading-tight">
                    {goal.title}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-8">
          <p className="text-base text-gray-700 max-w-3xl mx-auto">
            These goals represent my commitment to evidence-based policy that puts people and planet first.
          </p>
        </div>
      </div>
    </section>
  );
}
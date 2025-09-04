import { Card, CardHeader, CardTitle } from "@/components/ui/card";
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
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            My Political Goals
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            These are the key policy areas I&apos;m working on to create a better future for Western Australia
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {politicalGoals.map((goal, index) => {
            const IconComponent = goal.icon;
            return (
              <Card key={index} className="h-full hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border-l-4 border-l-primary group">
                <CardHeader className="pb-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-20 h-20 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors duration-300">
                      <IconComponent className="w-12 h-12 text-primary group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <CardTitle className="text-lg font-semibold text-gray-900 leading-tight group-hover:text-primary transition-colors duration-300">
                      {goal.title}
                    </CardTitle>
                  </div>
                </CardHeader>
              </Card>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <p className="text-lg text-gray-700 max-w-4xl mx-auto mb-6">
            These goals represent my commitment to evidence-based policy that puts people and planet first.
            As both a doctor and politician, I believe in practical solutions that improve lives.
          </p>
          <div className="bg-primary/5 rounded-lg p-6 max-w-3xl mx-auto border border-primary/20">
            <p className="text-primary font-semibold text-lg mb-2">
              Ready to make change happen?
            </p>
            <p className="text-gray-700">
              Join the Legalise Cannabis WA Party and help us build a progressive, sustainable future for our state.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Leaf, 
  Wheat, 
  Home, 
  Heart, 
  Brain, 
  GraduationCap, 
  Scale, 
  Users, 
  Recycle, 
  Zap, 
  Eye, 
  Globe 
} from "lucide-react";

const politicalGoals = [
  {
    title: "Legalise and regulate cannabis for state revenue",
    icon: Leaf,
    description: "Create a regulated cannabis market that generates revenue and reduces crime."
  },
  {
    title: "Develop hemp as a sustainable multi-billion-dollar industry",
    icon: Wheat,
    description: "Unlock hemp's potential for textiles, building materials, and food production."
  },
  {
    title: "Build affordable housing and prevent homelessness",
    icon: Home,
    description: "Ensure every Western Australian has access to safe, affordable housing."
  },
  {
    title: "Ensure universal healthcare access and equity",
    icon: Heart,
    description: "Healthcare is a human right, not a privilege based on wealth."
  },
  {
    title: "Expand community-based mental health support",
    icon: Brain,
    description: "Invest in mental health services within our communities."
  },
  {
    title: "Reskill workforce for emerging industries",
    icon: GraduationCap,
    description: "Prepare workers for the jobs of tomorrow through education and training."
  },
  {
    title: "Establish restorative justice instead of punishment",
    icon: Scale,
    description: "Focus on rehabilitation and healing rather than retribution."
  },
  {
    title: "Strengthen Indigenous rights, health, and opportunities",
    icon: Users,
    description: "Support Aboriginal and Torres Strait Islander communities with respect and dignity."
  },
  {
    title: "Commit to zero waste by 2040 and Net Zero by 2050",
    icon: Recycle,
    description: "Take urgent action on climate change and environmental sustainability."
  },
  {
    title: "Invest heavily in renewable energy",
    icon: Zap,
    description: "Transition to clean energy sources for a sustainable future."
  },
  {
    title: "Reform political donations and lobbying transparency",
    icon: Eye,
    description: "Increase transparency and accountability in government decision-making."
  },
  {
    title: "Reduce dependency on US foreign policy",
    icon: Globe,
    description: "Develop independent foreign policy that serves Australian interests."
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
            These are the key policy areas I'm working on to create a better future for Western Australia
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {politicalGoals.map((goal, index) => {
            const IconComponent = goal.icon;
            return (
              <Card key={index} className="h-full hover:shadow-lg transition-shadow duration-300 border-l-4 border-l-primary">
                <CardHeader className="pb-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <IconComponent className="w-6 h-6 text-primary" />
                    </div>
                    <CardTitle className="text-lg font-semibold text-gray-900 leading-tight">
                      {goal.title}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {goal.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <p className="text-lg text-gray-700 max-w-4xl mx-auto mb-6">
            These goals represent my commitment to evidence-based policy that puts people and planet first. 
            As both a doctor and politician, I believe in practical solutions that improve lives.
          </p>
          <div className="bg-accent/10 rounded-lg p-6 max-w-3xl mx-auto">
            <p className="text-accent font-semibold text-lg mb-2">
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
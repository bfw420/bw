import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Heart, 
  Brain, 
  Users, 
  Sparkles, 
  DollarSign 
} from "lucide-react";

const wellnessPillars = [
  {
    title: "Physical Wellness",
    icon: Heart,
    description: "Maintaining a healthy body through exercise, nutrition, and medical care."
  },
  {
    title: "Mental Wellness", 
    icon: Brain,
    description: "Promoting mental health, emotional balance, and cognitive well-being."
  },
  {
    title: "Social Wellness",
    icon: Users,
    description: "Building strong relationships and community connections."
  },
  {
    title: "Spiritual Wellness",
    icon: Sparkles,
    description: "Finding purpose, meaning, and connection to something greater."
  },
  {
    title: "Financial Wellness",
    icon: DollarSign,
    description: "Achieving financial security and economic stability for all."
  }
];

export default function WellnessSection() {
  return (
    <section id="wellness" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            My Moral Code
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            I care about the 5 pillars of wellness that form the foundation of a healthy society
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {wellnessPillars.map((pillar, index) => {
            const IconComponent = pillar.icon;
            return (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="pb-4">
                  <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <IconComponent className="w-8 h-8 text-primary" />
                  </div>
                  <CardTitle className="text-lg font-semibold text-gray-900">
                    {pillar.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {pillar.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <p className="text-lg text-gray-700 max-w-4xl mx-auto">
            These five pillars guide my approach to policy-making and my commitment to creating 
            a society where every person can thrive in all aspects of their life.
          </p>
        </div>
      </div>
    </section>
  );
}
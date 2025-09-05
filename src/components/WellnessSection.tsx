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
    <section id="wellness" className="py-16 bg-gradient-to-br from-[#00653b]/5 to-[#6cc24a]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#00653b] mb-4">
            My Moral Code
          </h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            I care about the 5 pillars of wellness that form the foundation of a healthy society
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {wellnessPillars.map((pillar, index) => {
            const IconComponent = pillar.icon;
            return (
              <Card key={index} className="text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                <CardHeader className="pb-4">
                  <div className="w-24 h-24 mx-auto bg-[#00653b]/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-[#00653b]/20 transition-colors duration-300">
                    <IconComponent className="w-12 h-12 text-[#00653b] group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <CardTitle className="text-lg font-semibold text-gray-900 group-hover:text-[#00653b] transition-colors duration-300">
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
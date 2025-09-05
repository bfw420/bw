"use client";

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
              <div
                key={index}
                className="p-4 bg-white rounded-lg border border-[#00653b]/10 shadow-sm cursor-pointer"
                style={{
                  transition: 'all 0.2s ease-out'
                }}
                onMouseEnter={(e) => {
                  const card = e.currentTarget;
                  const iconContainer = card.querySelector('.goal-icon-container') as HTMLElement;
                  const iconElement = card.querySelector('.goal-icon-element') as HTMLElement;
                  const titleText = card.querySelector('.goal-title-text') as HTMLElement;
                  
                  // Animate card
                  card.style.transform = 'translateY(-8px) scale(1.02)';
                  card.style.boxShadow = '0 20px 40px -12px rgba(0, 0, 0, 0.2)';
                  card.style.borderColor = '#00653b';
                  card.style.background = 'linear-gradient(to right, white, rgba(0, 101, 59, 0.03))';
                  
                  // Animate icon container
                  if (iconContainer) {
                    iconContainer.style.backgroundColor = '#00653b';
                    iconContainer.style.transform = 'scale(1.15)';
                    iconContainer.style.boxShadow = '0 8px 20px rgba(0, 101, 59, 0.25)';
                  }
                  
                  // Animate icon
                  if (iconElement) {
                    iconElement.style.color = 'white';
                    iconElement.style.transform = 'scale(1.1)';
                  }
                  
                  // Animate title
                  if (titleText) {
                    titleText.style.color = '#00653b';
                    titleText.style.fontWeight = 'bold';
                  }
                }}
                onMouseLeave={(e) => {
                  const card = e.currentTarget;
                  const iconContainer = card.querySelector('.goal-icon-container') as HTMLElement;
                  const iconElement = card.querySelector('.goal-icon-element') as HTMLElement;
                  const titleText = card.querySelector('.goal-title-text') as HTMLElement;
                  
                  // Reset card
                  card.style.transform = 'translateY(0) scale(1)';
                  card.style.boxShadow = '0 1px 3px 0 rgba(0, 0, 0, 0.1)';
                  card.style.borderColor = 'rgba(0, 101, 59, 0.1)';
                  card.style.background = 'white';
                  
                  // Reset icon container
                  if (iconContainer) {
                    iconContainer.style.backgroundColor = 'rgba(0, 101, 59, 0.1)';
                    iconContainer.style.transform = 'scale(1)';
                    iconContainer.style.boxShadow = 'none';
                  }
                  
                  // Reset icon
                  if (iconElement) {
                    iconElement.style.color = '#00653b';
                    iconElement.style.transform = 'scale(1)';
                  }
                  
                  // Reset title
                  if (titleText) {
                    titleText.style.color = '#111827';
                    titleText.style.fontWeight = '500';
                  }
                }}
              >
                <div className="flex items-center space-x-3">
                  <div
                    className="goal-icon-container w-12 h-12 bg-[#00653b]/10 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{
                      transition: 'all 0.2s ease-out'
                    }}
                  >
                    <IconComponent
                      className="goal-icon-element w-6 h-6 text-[#00653b]"
                      style={{
                        transition: 'all 0.2s ease-out'
                      }}
                    />
                  </div>
                  <p
                    className="goal-title-text text-sm font-medium text-gray-900 leading-tight"
                    style={{
                      transition: 'all 0.2s ease-out'
                    }}
                  >
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
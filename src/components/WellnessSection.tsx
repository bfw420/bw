"use client";

import {
  Cross,
  Brain,
  Users,
  Sparkles,
  DollarSign
} from "lucide-react";

const wellnessPillars = [
  {
    title: "Physical Wellness",
    icon: Cross,
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
          <h2 className="text-2xl md:text-3xl font-bold text-[#00653b] mb-4">
            I stand for wellness
          </h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            The 5 pillars of wellness that form the foundation of a healthy society:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {wellnessPillars.map((pillar, index) => {
            const IconComponent = pillar.icon;
            return (
              <div
                key={index}
                className="text-center bg-white rounded-lg border border-gray-200 shadow-sm cursor-pointer"
                style={{
                  transition: 'all 0.2s ease-out'
                }}
                onMouseEnter={(e) => {
                  const card = e.currentTarget;
                  const iconContainer = card.querySelector('.icon-container') as HTMLElement;
                  const iconElement = card.querySelector('.icon-element') as HTMLElement;
                  const titleText = card.querySelector('.title-text') as HTMLElement;
                  
                  // Animate card
                  card.style.transform = 'translateY(-12px) scale(1.05)';
                  card.style.boxShadow = '0 25px 50px -12px rgba(0, 0, 0, 0.25)';
                  card.style.borderColor = '#00653b';
                  
                  // Animate icon container
                  if (iconContainer) {
                    iconContainer.style.backgroundColor = '#00653b';
                    iconContainer.style.transform = 'scale(1.25)';
                    iconContainer.style.boxShadow = '0 10px 25px rgba(0, 101, 59, 0.3)';
                  }
                  
                  // Animate icon
                  if (iconElement) {
                    iconElement.style.color = 'white';
                    iconElement.style.transform = 'scale(1.1)';
                  }
                  
                  // Animate title
                  if (titleText) {
                    titleText.style.color = '#00653b';
                  }
                }}
                onMouseLeave={(e) => {
                  const card = e.currentTarget;
                  const iconContainer = card.querySelector('.icon-container') as HTMLElement;
                  const iconElement = card.querySelector('.icon-element') as HTMLElement;
                  const titleText = card.querySelector('.title-text') as HTMLElement;
                  
                  // Reset card
                  card.style.transform = 'translateY(0) scale(1)';
                  card.style.boxShadow = '0 1px 3px 0 rgba(0, 0, 0, 0.1)';
                  card.style.borderColor = '#e5e7eb';
                  
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
                  }
                }}
              >
                <div className="p-6 pb-4">
                  <div
                    className="icon-container w-24 h-24 mx-auto bg-[#00653b]/10 rounded-full flex items-center justify-center mb-4"
                    style={{
                      transition: 'all 0.2s ease-out'
                    }}
                  >
                    <IconComponent
                      className="icon-element w-12 h-12 text-[#00653b]"
                      style={{
                        transition: 'all 0.2s ease-out'
                      }}
                    />
                  </div>
                  <h3 className="title-text text-lg font-semibold text-gray-900" style={{
                    transition: 'color 0.2s ease-out'
                  }}>
                    {pillar.title}
                  </h3>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <p className="text-lg text-gray-700 max-w-4xl mx-auto">
            As a doctor and a politician, I&apos;m trying to make this world a better place for our grandchildren - Join me.
          </p>
        </div>
      </div>
    </section>
  );
}
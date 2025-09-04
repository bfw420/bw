"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const heroGradients = [
  "bg-gradient-to-br from-primary to-accent",
  "bg-gradient-to-br from-accent to-primary",
  "bg-gradient-to-r from-primary via-accent to-primary",
  "bg-gradient-to-l from-accent via-primary to-accent",
  "bg-gradient-to-tr from-primary/90 to-accent/90"
];

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroGradients.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroGradients.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroGradients.length) % heroGradients.length);
  };

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Slideshow */}
      <div className="absolute inset-0 z-0">
        {heroGradients.map((gradient, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            } ${gradient}`}
          />
        ))}
        {/* Subtle overlay for text readability */}
        <div className="absolute inset-0 bg-black/20"></div>
      </div>

      {/* Navigation Arrows */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-4 z-20 text-white hover:bg-white/20"
        onClick={prevSlide}
        aria-label="Previous image"
      >
        <ChevronLeft className="h-8 w-8" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-4 z-20 text-white hover:bg-white/20"
        onClick={nextSlide}
        aria-label="Next image"
      >
        <ChevronRight className="h-8 w-8" />
      </Button>

      {/* Minimal Centered Content - Just Logo */}
      <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
        {/* Legislative Council Logo */}
        <div className="mb-8">
          <div className="w-48 h-48 mx-auto mb-6">
            <Image
              src="/images/CouncilLogo.png"
              alt="WA Legislative Council"
              width={192}
              height={192}
              className="mx-auto"
            />
          </div>
        </div>

        {/* Title and Subtitles */}
        <h1 className="text-5xl md:text-7xl font-bold mb-4">
          Hon Dr Brian Walker MLC
        </h1>
        
        <h2 className="text-2xl md:text-3xl mb-2 text-gray-200">
          Member of the Legislative Council for Western Australia
        </h2>
        
        <h3 className="text-xl md:text-2xl mb-2 text-gray-200">
          General Practitioner in Claremont
        </h3>
        
        <h4 className="text-lg md:text-xl mb-6 text-gray-300">
          MB, ChB MRCGP, RACGP
        </h4>
        
        <p className="text-xl md:text-2xl mb-8 text-gray-100 max-w-3xl mx-auto leading-relaxed">
          I'm a doctor and a politician trying to make this world a better place for our grandchildren - Join me.
        </p>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
        {heroGradients.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentSlide ? "bg-white" : "bg-white/50"
            }`}
            onClick={() => setCurrentSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
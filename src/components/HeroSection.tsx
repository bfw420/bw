"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const heroGradients = [
  "bg-gradient-to-br from-[#00653b] to-[#6cc24a]",
  "bg-gradient-to-br from-[#6cc24a] to-[#00653b]",
  "bg-gradient-to-r from-[#00653b] via-[#6cc24a] to-[#00653b]",
  "bg-gradient-to-l from-[#6cc24a] via-[#00653b] to-[#6cc24a]",
  "bg-gradient-to-tr from-[#00653b]/90 to-[#6cc24a]/90"
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
        className="absolute left-4 z-20 text-white hover:bg-white/20 hover:scale-110 transition-all duration-200"
        onClick={prevSlide}
        aria-label="Previous image"
      >
        <ChevronLeft className="h-8 w-8" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-4 z-20 text-white hover:bg-white/20 hover:scale-110 transition-all duration-200"
        onClick={nextSlide}
        aria-label="Next image"
      >
        <ChevronRight className="h-8 w-8" />
      </Button>

      {/* Hero Content */}
      <div className="relative z-10 text-center text-white max-w-5xl mx-auto px-4">
        {/* Legislative Council Logo */}
        <div className="mb-8">
          <div className="w-40 h-40 md:w-48 md:h-48 mx-auto mb-6">
            <Image
              src="/images/CouncilLogo.png"
              alt="WA Legislative Council"
              width={192}
              height={192}
              className="mx-auto"
            />
          </div>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
          Your Doctor in Parliament
        </h1>

        <p className="text-lg md:text-xl lg:text-2xl mb-8 text-gray-100">
          Evidence-based policy, not politics as usual.
        </p>

        {/* Key Facts with Checkmarks */}
        <div className="flex flex-wrap justify-center items-center gap-3 md:gap-4 mb-6 text-sm md:text-base max-w-3xl mx-auto">
          <div className="flex items-center gap-1.5">
            <span className="text-[#6cc24a] text-lg">✓</span>
            <span>Member of Legislative Council since 2021</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-[#6cc24a] text-lg">✓</span>
            <span>Practicing GP in Claremont</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-[#6cc24a] text-lg">✓</span>
            <span>Leader of the Legalise Cannabis WA Party</span>
          </div>
        </div>

        {/* Call to Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            asChild
            size="lg"
            className="bg-white text-[#00653b] hover:bg-gray-100 px-8 py-6 text-lg font-bold rounded-full shadow-xl transition-all duration-200 hover:scale-105"
          >
            <a href="/about">Read My Plan for WA</a>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-[#00653b] px-8 py-6 text-lg font-bold rounded-full shadow-xl transition-all duration-200 hover:scale-105"
          >
            <a href="https://www.lcwaparty.org.au/join" target="_blank" rel="noopener noreferrer">Join the Movement</a>
          </Button>
        </div>
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
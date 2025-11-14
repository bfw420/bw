"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const heroImages = [
  "/images/speech_2.webp",
  "/images/crowd.webp",
  "/images/ch10interview.webp"
];

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroImages.length) % heroImages.length);
  };

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Slideshow */}
      <div className="absolute inset-0 z-0">
        {heroImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={image}
              alt={`Hero slide ${index + 1}`}
              fill
              priority={index === 0}
              className="object-cover"
              sizes="100vw"
            />
          </div>
        ))}
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
      <div className="relative z-10 text-center max-w-5xl mx-auto px-4">
        {/* Modern Blur Box Container */}
        <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl p-8 md:p-12 border border-white/20">
          {/* Legislative Council Logo - Smaller */}
          <div className="mb-6">
            <div className="w-24 h-24 md:w-28 md:h-28 mx-auto">
              <Image
                src="/images/CouncilLogo.png"
                alt="WA Legislative Council"
                width={112}
                height={112}
                className="mx-auto"
              />
            </div>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight text-[#00653b]">
            Your Doctor in Parliament
          </h1>

          <p className="text-lg md:text-xl lg:text-2xl mb-6 text-gray-700">
            Evidence-based policy, not politics as usual.
          </p>

          {/* Key Facts with Checkmarks */}
          <div className="flex flex-wrap justify-center items-center gap-3 md:gap-4 mb-8 text-sm md:text-base max-w-3xl mx-auto">
            <div className="flex items-center gap-1.5">
              <span className="text-[#6cc24a] text-lg font-bold">✓</span>
              <span className="text-gray-800">Member of Legislative Council since 2021</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-[#6cc24a] text-lg font-bold">✓</span>
              <span className="text-gray-800">Practicing GP in Claremont</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-[#6cc24a] text-lg font-bold">✓</span>
              <span className="text-gray-800">Leader of the Legalise Cannabis WA Party</span>
            </div>
          </div>

          {/* Call to Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              asChild
              size="lg"
              className="bg-[#00653b] text-white hover:bg-[#00653b]/90 px-8 py-6 text-lg font-bold rounded-full shadow-xl transition-all duration-200 hover:scale-105"
            >
              <a href="/about">Read My Plan for WA</a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="bg-transparent border-2 border-[#00653b] text-[#00653b] hover:bg-[#00653b] hover:text-white px-8 py-6 text-lg font-bold rounded-full shadow-xl transition-all duration-200 hover:scale-105"
            >
              <a href="https://www.lcwaparty.org.au/join" target="_blank" rel="noopener noreferrer">Join the Movement</a>
            </Button>
          </div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
        {heroImages.map((_, index) => (
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
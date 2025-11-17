"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const heroImages = [
  "/images/slider_doctor.webp",
  "/images/slider_parli.webp"
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

      {/* Hero Content - Left Aligned */}
      <div className="relative z-10 text-left max-w-7xl mx-auto px-4 md:px-8 lg:px-12 w-full -mt-12 md:-mt-16">
        <div className="max-w-2xl">
          {/* Legislative Council Logo - Smaller */}
          <div className="mb-5">
            <div className="w-20 h-20 md:w-24 md:h-24">
              <Image
                src="/images/CouncilLogo.png"
                alt="WA Legislative Council"
                width={96}
                height={96}
              />
            </div>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight text-white drop-shadow-lg">
            Your Doctor in Parliament
          </h1>

          <p className="text-lg md:text-xl lg:text-2xl mb-6 text-white/95 drop-shadow-md">
            Evidence-based policy, not politics as usual.
          </p>

          {/* Key Facts with Checkmarks */}
          <div className="flex flex-col gap-3 mb-8 text-sm md:text-base">
            <div className="flex items-center gap-2">
              <span className="text-[#6cc24a] text-xl font-bold drop-shadow">✓</span>
              <span className="text-white drop-shadow-md">Member of Legislative Council since 2021</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[#6cc24a] text-xl font-bold drop-shadow">✓</span>
              <span className="text-white drop-shadow-md">Practicing GP in Claremont</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[#6cc24a] text-xl font-bold drop-shadow">✓</span>
              <span className="text-white drop-shadow-md">Leader of the Legalise Cannabis WA Party</span>
            </div>
          </div>

          {/* Call to Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              asChild
              size="lg"
              className="bg-white text-[#00653b] hover:bg-white/90 px-8 py-6 text-lg font-bold rounded-full shadow-xl transition-all duration-200 hover:scale-105"
            >
              <Link href="/#help">Join Newsletter</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-[#00653b] px-8 py-6 text-lg font-bold rounded-full shadow-xl transition-all duration-200 hover:scale-105"
            >
              <a href="https://lcwaparty.org.au/join" target="_blank" rel="noopener noreferrer">Volunteer</a>
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
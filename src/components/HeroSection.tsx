"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const desktopImages = [
  "/images/slider_doctor.webp",
  "/images/slider_parli.webp"
];

const mobileImages = [
  "/images/doctorsmiley.webp",
  "/images/speech_2.webp"
];

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const heroImages = isMobile ? mobileImages : desktopImages;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroImages.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroImages.length) % heroImages.length);
  };

  // Hero content component (reused for both layouts)
  const HeroContent = ({ className = "" }: { className?: string }) => (
    <div className={className}>
      {/* Legislative Council Logo */}
      <div className="mb-5 flex justify-center lg:justify-start">
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
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight text-white drop-shadow-lg whitespace-nowrap">
        Your Doctor in Parliament
      </h1>

      <p className="text-lg md:text-xl lg:text-2xl mb-6 text-white/95 drop-shadow-md">
        Truth. Freedom. Justice.
      </p>

      {/* Key Facts with Checkmarks */}
      <div className="flex flex-col gap-3 mb-8 text-sm md:text-base items-center lg:items-start">
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
      <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
        <Button
          asChild
          size="lg"
          className="bg-white text-[#00653b] px-8 py-6 text-lg font-bold rounded-full shadow-xl"
          style={{ transition: 'all 0.3s ease-out' }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.1) translateY(-4px)';
            e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.2)';
            e.currentTarget.style.backgroundColor = '#f0f0f0';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1) translateY(0)';
            e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)';
            e.currentTarget.style.backgroundColor = 'white';
          }}
        >
          <Link href="/#help">Join Newsletter</Link>
        </Button>
        <Button
          asChild
          size="lg"
          variant="outline"
          className="bg-transparent border-2 border-white text-white px-8 py-6 text-lg font-bold rounded-full shadow-xl"
          style={{ transition: 'all 0.3s ease-out' }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.1) translateY(-4px)';
            e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.2)';
            e.currentTarget.style.backgroundColor = 'white';
            e.currentTarget.style.color = '#00653b';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1) translateY(0)';
            e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)';
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.color = 'white';
          }}
        >
          <a href="https://lcwaparty.org.au/join" target="_blank" rel="noopener noreferrer">Volunteer</a>
        </Button>
      </div>
    </div>
  );

  // Mobile Layout: Text on gradient, slider below
  if (isMobile) {
    return (
      <section className="lg:hidden">
        {/* Text Section with Green Gradient */}
        <div className="bg-gradient-to-br from-[#00653b] to-[#6cc24a] py-12 px-4 text-center">
          <div className="max-w-7xl mx-auto">
            <HeroContent className="max-w-2xl mx-auto" />
          </div>
        </div>

        {/* Slider Section */}
        <div className="relative h-[60vh] overflow-hidden">
          {/* Background Slideshow */}
          <div className="absolute inset-0">
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
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 text-white hover:bg-white/20 hover:scale-110 transition-all duration-200"
            onClick={prevSlide}
            aria-label="Previous image"
          >
            <ChevronLeft className="h-8 w-8" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 text-white hover:bg-white/20 hover:scale-110 transition-all duration-200"
            onClick={nextSlide}
            aria-label="Next image"
          >
            <ChevronRight className="h-8 w-8" />
          </Button>

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
        </div>
      </section>
    );
  }

  // Desktop Layout: Text overlay on slider
  return (
    <section className="hidden lg:block relative h-screen overflow-hidden">
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
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 text-white hover:bg-white/20 hover:scale-110 transition-all duration-200"
        onClick={prevSlide}
        aria-label="Previous image"
      >
        <ChevronLeft className="h-8 w-8" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 text-white hover:bg-white/20 hover:scale-110 transition-all duration-200"
        onClick={nextSlide}
        aria-label="Next image"
      >
        <ChevronRight className="h-8 w-8" />
      </Button>

      {/* Hero Content - Left Aligned */}
      <div className="absolute inset-0 flex items-center z-10">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 w-full">
          <HeroContent className="max-w-2xl" />
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

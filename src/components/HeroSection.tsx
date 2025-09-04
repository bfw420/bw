"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const heroImages = [
  "/images/hero1.svg",
  "/images/hero2.svg",
  "/images/hero3.svg",
  "/images/hero4.svg",
  "/images/hero5.svg"
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
              alt={`Hero image ${index + 1}`}
              fill
              className="object-cover"
              priority={index === 0}
            />
          </div>
        ))}
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40"></div>
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

      {/* Centered Content */}
      <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
        {/* Legislative Council Logo Placeholder */}
        <div className="mb-8">
          <div className="w-32 h-32 mx-auto bg-white/20 rounded-full flex items-center justify-center mb-4">
            <span className="text-white text-sm font-medium">WA Legislative Council</span>
          </div>
        </div>

        {/* Main Content */}
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Hon Dr Brian Walker MLC
        </h1>
        
        <h2 className="text-xl md:text-2xl mb-2 text-gray-200">
          Member of the Legislative Council for Western Australia
        </h2>
        
        <h3 className="text-lg md:text-xl mb-2 text-gray-200">
          General Practitioner in Claremont
        </h3>
        
        <h4 className="text-md md:text-lg mb-6 text-gray-300">
          MB, ChB MRCGP, RACGP
        </h4>
        
        <p className="text-lg md:text-xl mb-8 text-gray-100 max-w-3xl mx-auto leading-relaxed">
          I'm a doctor and a politician trying to make this world a better place for our grandchildren - Join me.
        </p>

        {/* Call to Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            asChild 
            size="lg" 
            className="bg-primary hover:bg-primary/90 text-white px-8 py-3 text-lg"
          >
            <a href="https://www.lcwaparty.org.au/" target="_blank" rel="noopener noreferrer">
              Join Legalise Cannabis WA
            </a>
          </Button>
          <Button 
            variant="outline" 
            size="lg" 
            className="bg-white/20 border-white text-white hover:bg-white hover:text-primary px-8 py-3 text-lg"
            asChild
          >
            <a href="#contact">
              Get In Touch
            </a>
          </Button>
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
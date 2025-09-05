"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-xl font-bold text-[#00653b]">
              Dr Brian Walker MLC
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link href="#about" className="text-gray-600 hover:text-[#00653b] px-3 py-2 text-sm font-medium">
                About
              </Link>
              <Link href="#wellness" className="text-gray-600 hover:text-[#00653b] px-3 py-2 text-sm font-medium">
                Wellness
              </Link>
              <Link href="#goals" className="text-gray-600 hover:text-[#00653b] px-3 py-2 text-sm font-medium">
                Political Goals
              </Link>
              <Link href="#help" className="text-gray-600 hover:text-[#00653b] px-3 py-2 text-sm font-medium">
                How to Help
              </Link>
              <Link href="https://www.lcwaparty.org.au/" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-[#00653b] px-3 py-2 text-sm font-medium">
                Party
              </Link>
              <Button asChild className="bg-[#00653b] hover:bg-[#00653b]/90 text-white">
                <Link href="#contact">
                  Contact
                </Link>
              </Button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
              <Link
                href="#about"
                className="text-gray-600 hover:text-[#00653b] block px-3 py-2 text-base font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link
                href="#wellness"
                className="text-gray-600 hover:text-[#00653b] block px-3 py-2 text-base font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Wellness
              </Link>
              <Link
                href="#goals"
                className="text-gray-600 hover:text-[#00653b] block px-3 py-2 text-base font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Political Goals
              </Link>
              <Link
                href="#help"
                className="text-gray-600 hover:text-[#00653b] block px-3 py-2 text-base font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                How to Help
              </Link>
              <Link
                href="https://www.lcwaparty.org.au/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-[#00653b] block px-3 py-2 text-base font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Party
              </Link>
              <div className="px-3 py-2">
                <Button asChild className="w-full bg-[#00653b] hover:bg-[#00653b]/90 text-white">
                  <Link href="#contact">
                    Contact
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
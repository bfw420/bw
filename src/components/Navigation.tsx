"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
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
            <Link
              href="/"
              className="flex items-center gap-3 text-xl font-bold text-[#00653b]"
              style={{ transition: 'all 0.3s ease-out' }}
              onMouseEnter={(e) => {
                const logo = e.currentTarget.querySelector('.logo-image') as HTMLElement;
                const text = e.currentTarget.querySelector('.logo-text') as HTMLElement;
                if (logo) {
                  logo.style.transform = 'scale(1.1) rotate(5deg)';
                  logo.style.filter = 'brightness(1.2)';
                }
                if (text) {
                  text.style.color = '#6cc24a';
                  text.style.textShadow = '0 0 20px rgba(108, 194, 74, 0.5)';
                }
              }}
              onMouseLeave={(e) => {
                const logo = e.currentTarget.querySelector('.logo-image') as HTMLElement;
                const text = e.currentTarget.querySelector('.logo-text') as HTMLElement;
                if (logo) {
                  logo.style.transform = 'scale(1) rotate(0deg)';
                  logo.style.filter = 'brightness(1)';
                }
                if (text) {
                  text.style.color = '#00653b';
                  text.style.textShadow = 'none';
                }
              }}
            >
              <Image
                src="/favicon-nav.svg"
                alt="Dr Brian Walker MLC"
                width={32}
                height={32}
                className="w-8 h-8 logo-image"
                style={{ transition: 'all 0.3s ease-out' }}
              />
              <span className="logo-text" style={{ transition: 'all 0.3s ease-out' }}>Dr Brian Walker MLC</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link
                href="/about"
                className="text-gray-600 px-3 py-2 text-sm font-medium relative"
                style={{ transition: 'all 0.2s ease-out' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#00653b';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'rgb(75, 85, 99)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                About
              </Link>
              <Link
                href="/report"
                className="text-gray-600 px-3 py-2 text-sm font-medium relative"
                style={{ transition: 'all 0.2s ease-out' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#00653b';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'rgb(75, 85, 99)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                Economic Report
              </Link>
              <Link
                href="#goals"
                className="text-gray-600 px-3 py-2 text-sm font-medium relative"
                style={{ transition: 'all 0.2s ease-out' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#00653b';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'rgb(75, 85, 99)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                Political Goals
              </Link>
              <Link
                href="#help"
                className="text-gray-600 px-3 py-2 text-sm font-medium relative"
                style={{ transition: 'all 0.2s ease-out' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#00653b';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'rgb(75, 85, 99)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                How to Help
              </Link>
              <Link
                href="https://www.lcwaparty.org.au/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 px-3 py-2 text-sm font-medium relative"
                style={{ transition: 'all 0.2s ease-out' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#00653b';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'rgb(75, 85, 99)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                Party
              </Link>
              <Button
                asChild
                className="bg-[#00653b] text-white"
                style={{ transition: 'all 0.2s ease-out' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.05)';
                  e.currentTarget.style.backgroundColor = 'rgba(0, 101, 59, 0.9)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.backgroundColor = '#00653b';
                }}
              >
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
                href="/about"
                className="text-gray-600 block px-3 py-2 text-base font-medium"
                style={{ transition: 'all 0.2s ease-out' }}
                onClick={() => setIsMenuOpen(false)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#00653b';
                  e.currentTarget.style.paddingLeft = '1rem';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'rgb(75, 85, 99)';
                  e.currentTarget.style.paddingLeft = '0.75rem';
                }}
              >
                About
              </Link>
              <Link
                href="/report"
                className="text-gray-600 block px-3 py-2 text-base font-medium"
                style={{ transition: 'all 0.2s ease-out' }}
                onClick={() => setIsMenuOpen(false)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#00653b';
                  e.currentTarget.style.paddingLeft = '1rem';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'rgb(75, 85, 99)';
                  e.currentTarget.style.paddingLeft = '0.75rem';
                }}
              >
                Economic Report
              </Link>
              <Link
                href="#goals"
                className="text-gray-600 block px-3 py-2 text-base font-medium"
                style={{ transition: 'all 0.2s ease-out' }}
                onClick={() => setIsMenuOpen(false)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#00653b';
                  e.currentTarget.style.paddingLeft = '1rem';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'rgb(75, 85, 99)';
                  e.currentTarget.style.paddingLeft = '0.75rem';
                }}
              >
                Political Goals
              </Link>
              <Link
                href="#help"
                className="text-gray-600 block px-3 py-2 text-base font-medium"
                style={{ transition: 'all 0.2s ease-out' }}
                onClick={() => setIsMenuOpen(false)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#00653b';
                  e.currentTarget.style.paddingLeft = '1rem';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'rgb(75, 85, 99)';
                  e.currentTarget.style.paddingLeft = '0.75rem';
                }}
              >
                How to Help
              </Link>
              <Link
                href="https://www.lcwaparty.org.au/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 block px-3 py-2 text-base font-medium"
                style={{ transition: 'all 0.2s ease-out' }}
                onClick={() => setIsMenuOpen(false)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#00653b';
                  e.currentTarget.style.paddingLeft = '1rem';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'rgb(75, 85, 99)';
                  e.currentTarget.style.paddingLeft = '0.75rem';
                }}
              >
                Party
              </Link>
              <div className="px-3 py-2">
                <Button
                  asChild
                  className="w-full bg-[#00653b] text-white"
                  style={{ transition: 'all 0.2s ease-out' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.05)';
                    e.currentTarget.style.backgroundColor = 'rgba(0, 101, 59, 0.9)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.backgroundColor = '#00653b';
                  }}
                >
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
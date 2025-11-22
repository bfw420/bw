"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

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
                className={`px-3 py-2 text-sm font-medium relative ${
                  isActive('/about')
                    ? 'text-[#00653b] font-bold'
                    : 'text-gray-600'
                }`}
                style={{
                  transition: 'all 0.2s ease-out',
                  ...(isActive('/about') && {
                    borderBottom: '2px solid #00653b'
                  })
                }}
                onMouseEnter={(e) => {
                  if (!isActive('/about')) {
                    e.currentTarget.style.color = '#00653b';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive('/about')) {
                    e.currentTarget.style.color = 'rgb(75, 85, 99)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }
                }}
              >
                About
              </Link>
              <Link
                href="/report"
                className={`px-3 py-2 text-sm font-medium relative ${
                  isActive('/report')
                    ? 'text-[#00653b] font-bold'
                    : 'text-gray-600'
                }`}
                style={{
                  transition: 'all 0.2s ease-out',
                  ...(isActive('/report') && {
                    borderBottom: '2px solid #00653b'
                  })
                }}
                onMouseEnter={(e) => {
                  if (!isActive('/report')) {
                    e.currentTarget.style.color = '#00653b';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive('/report')) {
                    e.currentTarget.style.color = 'rgb(75, 85, 99)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }
                }}
              >
                Economic Report
              </Link>
              <Link
                href="/media"
                className={`px-3 py-2 text-sm font-medium relative ${
                  isActive('/media')
                    ? 'text-[#00653b] font-bold'
                    : 'text-gray-600'
                }`}
                style={{
                  transition: 'all 0.2s ease-out',
                  ...(isActive('/media') && {
                    borderBottom: '2px solid #00653b'
                  })
                }}
                onMouseEnter={(e) => {
                  if (!isActive('/media')) {
                    e.currentTarget.style.color = '#00653b';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive('/media')) {
                    e.currentTarget.style.color = 'rgb(75, 85, 99)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }
                }}
              >
                Media
              </Link>
              <Link
                href="/speeches"
                className={`px-3 py-2 text-sm font-medium relative ${
                  isActive('/speeches')
                    ? 'text-[#00653b] font-bold'
                    : 'text-gray-600'
                }`}
                style={{
                  transition: 'all 0.2s ease-out',
                  ...(isActive('/speeches') && {
                    borderBottom: '2px solid #00653b'
                  })
                }}
                onMouseEnter={(e) => {
                  if (!isActive('/speeches')) {
                    e.currentTarget.style.color = '#00653b';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive('/speeches')) {
                    e.currentTarget.style.color = 'rgb(75, 85, 99)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }
                }}
              >
                Speeches
              </Link>
              <Link
                href="/news"
                className={`px-3 py-2 text-sm font-medium relative ${
                  isActive('/news') || pathname?.startsWith('/news/')
                    ? 'text-[#00653b] font-bold'
                    : 'text-gray-600'
                }`}
                style={{
                  transition: 'all 0.2s ease-out',
                  ...((isActive('/news') || pathname?.startsWith('/news/')) && {
                    borderBottom: '2px solid #00653b'
                  })
                }}
                onMouseEnter={(e) => {
                  if (!isActive('/news') && !pathname?.startsWith('/news/')) {
                    e.currentTarget.style.color = '#00653b';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive('/news') && !pathname?.startsWith('/news/')) {
                    e.currentTarget.style.color = 'rgb(75, 85, 99)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }
                }}
              >
                News
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
                className={`block px-3 py-2 text-base font-medium ${
                  isActive('/about')
                    ? 'text-[#00653b] font-bold bg-[#00653b]/10'
                    : 'text-gray-600'
                }`}
                style={{ transition: 'all 0.2s ease-out' }}
                onClick={() => setIsMenuOpen(false)}
                onMouseEnter={(e) => {
                  if (!isActive('/about')) {
                    e.currentTarget.style.color = '#00653b';
                    e.currentTarget.style.paddingLeft = '1rem';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive('/about')) {
                    e.currentTarget.style.color = 'rgb(75, 85, 99)';
                    e.currentTarget.style.paddingLeft = '0.75rem';
                  }
                }}
              >
                About
              </Link>
              <Link
                href="/report"
                className={`block px-3 py-2 text-base font-medium ${
                  isActive('/report')
                    ? 'text-[#00653b] font-bold bg-[#00653b]/10'
                    : 'text-gray-600'
                }`}
                style={{ transition: 'all 0.2s ease-out' }}
                onClick={() => setIsMenuOpen(false)}
                onMouseEnter={(e) => {
                  if (!isActive('/report')) {
                    e.currentTarget.style.color = '#00653b';
                    e.currentTarget.style.paddingLeft = '1rem';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive('/report')) {
                    e.currentTarget.style.color = 'rgb(75, 85, 99)';
                    e.currentTarget.style.paddingLeft = '0.75rem';
                  }
                }}
              >
                Economic Report
              </Link>
              <Link
                href="/media"
                className={`block px-3 py-2 text-base font-medium ${
                  isActive('/media')
                    ? 'text-[#00653b] font-bold bg-[#00653b]/5'
                    : 'text-gray-600'
                }`}
                style={{ transition: 'all 0.2s ease-out' }}
                onClick={() => setIsMenuOpen(false)}
                onMouseEnter={(e) => {
                  if (!isActive('/media')) {
                    e.currentTarget.style.color = '#00653b';
                    e.currentTarget.style.paddingLeft = '1rem';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive('/media')) {
                    e.currentTarget.style.color = 'rgb(75, 85, 99)';
                    e.currentTarget.style.paddingLeft = '0.75rem';
                  }
                }}
              >
                Media
              </Link>
              <Link
                href="/speeches"
                className={`block px-3 py-2 text-base font-medium ${
                  isActive('/speeches')
                    ? 'text-[#00653b] font-bold'
                    : 'text-gray-600'
                }`}
                style={{ transition: 'all 0.2s ease-out' }}
                onClick={() => setIsMenuOpen(false)}
                onMouseEnter={(e) => {
                  if (!isActive('/speeches')) {
                    e.currentTarget.style.color = '#00653b';
                    e.currentTarget.style.paddingLeft = '1rem';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive('/speeches')) {
                    e.currentTarget.style.color = 'rgb(75, 85, 99)';
                    e.currentTarget.style.paddingLeft = '0.75rem';
                  }
                }}
              >
                Speeches
              </Link>
              <Link
                href="/news"
                className={`block px-3 py-2 text-base font-medium ${
                  isActive('/news') || pathname?.startsWith('/news/')
                    ? 'text-[#00653b] font-bold bg-[#00653b]/10'
                    : 'text-gray-600'
                }`}
                style={{ transition: 'all 0.2s ease-out' }}
                onClick={() => setIsMenuOpen(false)}
                onMouseEnter={(e) => {
                  if (!isActive('/news') && !pathname?.startsWith('/news/')) {
                    e.currentTarget.style.color = '#00653b';
                    e.currentTarget.style.paddingLeft = '1rem';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive('/news') && !pathname?.startsWith('/news/')) {
                    e.currentTarget.style.color = 'rgb(75, 85, 99)';
                    e.currentTarget.style.paddingLeft = '0.75rem';
                  }
                }}
              >
                News
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
"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Facebook,
  Instagram,
  Youtube,
  Twitter
} from "lucide-react";

// Custom social media icons
const PatreonIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M15.386.524c-4.764 0-8.64 3.876-8.64 8.64 0 4.75 3.876 8.613 8.64 8.613 4.75 0 8.614-3.864 8.614-8.613C24 4.4 20.136.524 15.386.524M.003 23.537h4.22V.524H.003"/>
  </svg>
);

const BlueskyIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 10.8c-1.087-2.114-4.046-6.053-6.798-7.995C2.566.944 1.561 1.266.902 1.565.139 1.908 0 3.08 0 3.768c0 .69.378 5.65.624 6.479.815 2.736 3.713 3.66 6.383 3.364.136-.02.275-.038.409-.056-2.36.335-5.365 1.166-5.608 3.713-.24 2.548 2.016 3.27 5.06 3.27 3.043 0 4.727-1.065 5.132-2.286.405 1.221 2.09 2.286 5.132 2.286 3.045 0 5.3-.722 5.06-3.27-.243-2.547-3.247-3.378-5.608-3.713.134.018.273.036.409.056 2.67.296 5.568-.628 6.383-3.364.246-.829.624-5.79.624-6.479 0-.688-.139-1.86-.902-2.203-.659-.299-1.664-.621-4.3 1.24C16.046 4.747 13.087 8.686 12 10.8"/>
  </svg>
);

const TikTokIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1"/>
  </svg>
);

const socialLinks = [
  {
    name: "Facebook",
    url: "https://www.facebook.com/BrianWalkerMLC/",
    icon: Facebook
  },
  {
    name: "Instagram",
    url: "https://www.instagram.com/brianwalkermlc/",
    icon: Instagram
  },
  {
    name: "YouTube",
    url: "https://www.youtube.com/channel/UCCIGBIf3b385BV5d48Y1U2A",
    icon: Youtube
  },
  {
    name: "Patreon",
    url: "https://www.patreon.com/cw/DrBrianWalkerMLC",
    icon: PatreonIcon
  },
  {
    name: "Bluesky",
    url: "https://bsky.app/profile/bfw.bsky.social",
    icon: BlueskyIcon
  },
  {
    name: "X (Twitter)",
    url: "https://x.com/BrianWalkerMLC",
    icon: Twitter
  },
  {
    name: "TikTok",
    url: "https://www.tiktok.com/@brianwalkermlc",
    icon: TikTokIcon
  }
];

const footerLinks = [
  { name: "About", href: "/about" },
  { name: "Economic Report", href: "/report" },
  { name: "Political Goals", href: "#goals" },
  { name: "How to Help", href: "#help" },
  { name: "Contact", href: "#contact" },
  { name: "Party", href: "https://www.lcwaparty.org.au/" },
  { name: "Donate", href: "https://www.lcwaparty.org.au/donate" },
  { name: "Parliament", href: "https://www.parliament.wa.gov.au/parliament/memblist.nsf/WAllMembersFlat/Walker,%20Brian%20Francis?opendocument" },
  { name: "Media Releases", href: "/media" },
  { name: "Speeches", href: "/speeches" },
  { name: "Downloads", href: "/downloads" },
  { name: "Wikipedia", href: "https://en.wikipedia.org/wiki/Brian_Walker_(politician)" },
  { name: "Privacy Policy", href: "/privacy" },
  { name: "Copyright", href: "/copyright" },
];

export default function Footer() {
  return (
    <footer className="bg-[#00653b] text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand Section */}
          <div>
            {/* LCWA Logo */}
            <Link
              href="https://www.lcwaparty.org.au/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block w-56 hover:opacity-80 transition-opacity duration-200 mb-3"
            >
              <Image
                src="/images/LCWA_side.png"
                alt="Legalise Cannabis WA Party"
                width={224}
                height={224}
                className="object-contain w-full h-auto"
              />
            </Link>
            <div className="space-y-1">
              <h3 className="text-2xl font-bold text-white">
                Dr Brian Walker MLC
              </h3>
              <p className="text-xs text-[#6cc24a]/70 italic mb-3">
                MB, ChB MRCGP, RACGP
              </p>
            </div>
            <div className="space-y-1">
              <a
                href="https://www.parliament.wa.gov.au/Parliament/Memblist.nsf/Member+Lookup+LC+Current/Walker,+Hon+Dr+Brian?opendocument"
                target="_blank"
                rel="noopener noreferrer"
                className="block transition-colors footer-link"
                style={{ color: '#d1d5db' }}
                onMouseEnter={(e) => { e.currentTarget.style.color = '#6cc24a'; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = '#d1d5db'; }}
              >
                Member of the Legislative Council for WA
              </a>
              <a
                href="https://claremont.nextpracticehealth.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="block transition-colors footer-link"
                style={{ color: '#d1d5db' }}
                onMouseEnter={(e) => { e.currentTarget.style.color = '#6cc24a'; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = '#d1d5db'; }}
              >
                General Practitioner in Claremont
              </a>
              <a
                href="https://www.lcwaparty.org.au/"
                target="_blank"
                rel="noopener noreferrer"
                className="block transition-colors footer-link"
                style={{ color: '#d1d5db' }}
                onMouseEnter={(e) => { e.currentTarget.style.color = '#6cc24a'; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = '#d1d5db'; }}
              >
                Leader of the Legalise Cannabis WA Party
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Quick Links</h4>
            <nav className="grid grid-cols-2 gap-2">
              {footerLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-gray-300 transition-colors text-sm footer-link"
                  style={{
                    color: '#d1d5db'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#6cc24a';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = '#d1d5db';
                  }}
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Social Media */}
          <div className="space-y-6">
            <h4 className="text-xl font-bold text-white">Follow Me</h4>
            <div className="grid grid-cols-4 gap-3 md:gap-4">
              {socialLinks.map((social) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center gap-1 md:gap-2"
                    aria-label={`Follow on ${social.name}`}
                    style={{ transition: 'all 0.3s ease-out' }}
                    onMouseEnter={(e) => {
                      const icon = e.currentTarget.querySelector('.social-icon') as HTMLElement;
                      const text = e.currentTarget.querySelector('.social-text') as HTMLElement;
                      if (icon) {
                        icon.style.backgroundColor = '#6cc24a';
                        icon.style.transform = 'scale(1.1)';
                        icon.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)';
                      }
                      if (text) {
                        text.style.color = '#6cc24a';
                      }
                    }}
                    onMouseLeave={(e) => {
                      const icon = e.currentTarget.querySelector('.social-icon') as HTMLElement;
                      const text = e.currentTarget.querySelector('.social-text') as HTMLElement;
                      if (icon) {
                        icon.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                        icon.style.transform = 'scale(1)';
                        icon.style.boxShadow = 'none';
                      }
                      if (text) {
                        text.style.color = 'rgba(255, 255, 255, 0.7)';
                      }
                    }}
                  >
                    <div className="social-icon w-11 h-11 md:w-14 md:h-14 rounded-xl bg-white/10 flex items-center justify-center min-w-[44px] min-h-[44px]" style={{ transition: 'all 0.3s ease-out' }}>
                      <IconComponent className="w-6 h-6 md:w-7 md:h-7 text-white" />
                    </div>
                    <span className="social-text text-xs text-white/70 font-medium text-center" style={{ transition: 'all 0.3s ease-out' }}>
                      {social.name}
                    </span>
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/20 pt-8">
          {/* Authorization */}
          <div className="mb-4 text-center">
            <p className="text-xs text-gray-400 leading-relaxed">
              <strong>Authorised by:</strong> Dr Brian Walker, Legalise Cannabis WA Party,
              2 Parliament Place, West Perth, WA 6005
            </p>
          </div>

          {/* Disclaimer */}
          <div className="mb-4 text-center">
            <p className="text-xs text-gray-400 leading-relaxed">
              <strong>Disclaimer:</strong> The content provided by Dr Brian Walker, and any linked materials,
              are not intended and should not be construed as medical advice. If the reader or any other person
              has a medical concern, he or she should consult a licensed physician or appropriately-credentialed
              health care worker in your community in all matters relating to your health.
            </p>
          </div>

          {/* Acknowledgment */}
          <div className="mb-4 text-center">
            <p className="text-xs text-gray-400 leading-relaxed">
              The Office of the Hon Dr Brian Walker MLC acknowledge the Traditional Custodians of Country
              throughout Australia and their continuing connection to land, waters and community. We pay our
              respect to all Aboriginal and Torres Strait Islanders and their cultures; and to Elders past,
              present and emerging.
            </p>
          </div>

          {/* Copyright */}
          <div className="text-center pt-4 border-t border-white/20">
            <p className="text-sm text-gray-400">
              © {new Date().getFullYear()} Dr Brian Walker MLC. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
import Link from "next/link";
import { 
  Facebook, 
  Instagram, 
  Youtube, 
  Twitter, 
  ExternalLink 
} from "lucide-react";

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
    name: "Bluesky",
    url: "https://bsky.app/profile/bfw.bsky.social",
    icon: ExternalLink
  },
  {
    name: "X (Twitter)",
    url: "https://x.com/BrianWalkerMLC",
    icon: Twitter
  },
  {
    name: "TikTok",
    url: "https://www.tiktok.com/@brianwalkermlcs",
    icon: ExternalLink
  }
];

const footerLinks = [
  { name: "About", href: "#about" },
  { name: "Wellness", href: "#wellness" },
  { name: "Political Goals", href: "#goals" },
  { name: "How to Help", href: "#help" },
  { name: "Contact", href: "#contact" },
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
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white">
              Dr Brian Walker MLC
            </h3>
            <div className="text-white space-y-1">
              <a href="#about" className="block hover:text-[#6cc24a] transition-colors underline hover:no-underline">
                Member of the Legislative Council for WA
              </a>
              <a href="#about" className="block hover:text-[#6cc24a] transition-colors underline hover:no-underline">
                General Practitioner in Claremont
              </a>
              <a href="https://www.lcwaparty.org.au/" target="_blank" rel="noopener noreferrer" className="block hover:text-[#6cc24a] transition-colors underline hover:no-underline">
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
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Social Media */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Follow Me</h4>
            <div className="flex flex-wrap gap-4">
              {socialLinks.map((social) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
                    aria-label={`Follow on ${social.name}`}
                  >
                    <IconComponent className="w-5 h-5" />
                    <span className="text-sm">{social.name}</span>
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/20 pt-8">
          {/* Authorization */}
          <div className="mb-4">
            <p className="text-xs text-gray-400 leading-relaxed">
              <strong>Authorised by:</strong> Dr Brian Walker, Legalise Cannabis WA Party,
              2 Parliament Place, West Perth, WA 6005
            </p>
          </div>

          {/* Disclaimer */}
          <div className="mb-4">
            <p className="text-xs text-gray-400 leading-relaxed">
              <strong>Disclaimer:</strong> The content provided by Dr Brian Walker, and any linked materials,
              are not intended and should not be construed as medical advice. If the reader or any other person
              has a medical concern, he or she should consult a licensed physician or appropriately-credentialed
              health care worker in your community in all matters relating to your health.
            </p>
          </div>

          {/* Acknowledgment */}
          <div className="mb-4">
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
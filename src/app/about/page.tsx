"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Stethoscope, Users, GraduationCap, Heart, Leaf, X } from "lucide-react";

const galleryImages = [
  { src: "/images/abcbw.webp", alt: "ABC Radio Perth interview" },
  { src: "/images/cannabistalk.webp", alt: "Cannabis health presentation" },
  { src: "/images/fieldlaugh.webp", alt: "Hemp field visit" },
  { src: "/images/foodbank.webp", alt: "Food bank community service" },
  { src: "/images/hempbrick.webp", alt: "Hemp construction materials" },
  { src: "/images/veterans.webp", alt: "Veterans community engagement" },
  { src: "/images/youthparli.webp", alt: "Youth parliament program" },
  { src: "/images/archerykids.webp", alt: "Archery event with youth" },
  { src: "/images/digging.webp", alt: "Tree planting ceremony" },
  { src: "/images/rugby.webp", alt: "Community rugby league event" },
  { src: "/images/ch10interview.webp", alt: "Channel 10 television interview" },
  { src: "/images/crowd.webp", alt: "Community rally and public speaking" },
  { src: "/images/speech_2.webp", alt: "Parliamentary speech in Legislative Council" },
  { src: "/images/lcwamedia.webp", alt: "Legalise Cannabis WA Party team" },
  { src: "/images/doctorwork.webp", alt: "Medical consultation work" },
  { src: "/images/abc-corruption.webp", alt: "ABC corruption investigation interview" },
  { src: "/images/crowd3.webp", alt: "Community gathering and engagement" },
  { src: "/images/hemp-field.webp", alt: "Industrial hemp field visit" },
  { src: "/images/hempprocessing.webp", alt: "Hemp processing facility" },
  { src: "/images/inauguration.webp", alt: "Parliamentary inauguration ceremony" },
  { src: "/images/panel.webp", alt: "Panel discussion event" },
  { src: "/images/spagnolointerview.webp", alt: "Spagnolo interview" },
  { src: "/images/triointerview.webp", alt: "Trio interview session" },
  { src: "/images/Election-Mashup.webp", alt: "Election campaign highlights" },
];

// Fisher-Yates shuffle algorithm
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function AboutPage() {
  const [selectedImage, setSelectedImage] = useState<{ src: string, alt: string } | null>(null);
  const [shuffledImages, setShuffledImages] = useState(galleryImages);

  // Shuffle images only on client side after hydration
  useEffect(() => {
    setShuffledImages(shuffleArray(galleryImages));
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Image Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
            onClick={() => setSelectedImage(null)}
            aria-label="Close"
          >
            <X className="w-8 h-8" />
          </button>
          <div className="relative max-w-6xl max-h-[90vh] w-full h-full">
            <Image
              src={selectedImage.src}
              alt={selectedImage.alt}
              fill
              className="object-contain"
              sizes="90vw"
            />
          </div>
        </div>
      )}

      <main className="py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-[#00653b] mb-4">
              About Dr Brian Walker MLC
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              General Practitioner, Member of the Legislative Council, and Leader of the Legalise Cannabis WA Party
            </p>
          </div>

          {/* Hero Banner Image */}
          <div className="mb-16 relative w-full h-80 md:h-96 lg:h-[500px] rounded-3xl overflow-hidden shadow-2xl hover:-translate-y-1 transition-all duration-300">
            <Image
              src="/images/door.webp"
              alt="Dr Brian Walker MLC in the Western Australia Legislative Council"
              fill
              className="object-cover object-center"
              sizes="(max-width: 768px) 100vw, 1024px"
              priority
            />
            {/* <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div> */}
          </div>

          {/* WHY I SERVE Section */}
          <div className="prose prose-lg max-w-none mb-16">
            <div className="bg-gradient-to-br from-[#00653b]/5 to-[#6cc24a]/5 rounded-2xl p-8 md:p-12 border-2 border-[#00653b]/20 shadow-lg">
              <h2 className="text-3xl font-bold text-[#00653b] mb-6 text-center">
                WHY I SERVE
              </h2>

              <div className="text-gray-800 space-y-4 text-lg leading-relaxed">
                <p>
                  For my entire career as a GP, I saw the same story repeat:
                  <strong className="text-[#00653b]"> Good people suffering because of bad policy.</strong>
                </p>

                <p>
                  Patients denied pain relief because of outdated cannabis laws.
                  Families crushed by healthcare costs.
                  Communities ignored by politicians who don&apos;t listen.
                </p>

                <p>
                  I could keep treating symptoms, or I could fight to fix the system.
                </p>

                <p className="text-xl font-semibold text-[#00653b]">
                  So in 2021, I ran for Parliament.
                </p>

                <p>
                  Now I&apos;m your voice in the Legislative Council - still seeing patients
                  every week, still fighting for the healthcare and reforms WA deserves.
                </p>

                <p className="text-lg font-medium text-gray-900 border-l-4 border-[#6cc24a] pl-4 italic">
                  Because the best way to heal communities is to change the laws that hurt them.
                </p>
              </div>
            </div>
          </div>

          {/* Key Areas */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Key Areas of Focus
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div
                className="bg-white rounded-2xl p-6 shadow-lg border-2 border-[#00653b]/10 cursor-pointer"
                style={{ transition: 'all 0.2s ease-out' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)';
                  e.currentTarget.style.borderColor = 'rgba(0, 101, 59, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)';
                  e.currentTarget.style.borderColor = 'rgba(0, 101, 59, 0.1)';
                }}
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-[#00653b]/10 rounded-lg">
                    <Stethoscope className="w-6 h-6 text-[#00653b]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl text-gray-900 mb-2">Healthcare Reform</h3>
                    <p className="text-gray-600">
                      Improving access to quality healthcare, strengthening mental health services,
                      and ensuring evidence-based medical policy.
                    </p>
                  </div>
                </div>
              </div>

              <div
                className="bg-white rounded-2xl p-6 shadow-lg border-2 border-[#00653b]/10 cursor-pointer"
                style={{ transition: 'all 0.2s ease-out' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)';
                  e.currentTarget.style.borderColor = 'rgba(0, 101, 59, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)';
                  e.currentTarget.style.borderColor = 'rgba(0, 101, 59, 0.1)';
                }}
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-[#6cc24a]/10 rounded-lg">
                    <Leaf className="w-6 h-6 text-[#6cc24a]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl text-gray-900 mb-2">Drug Law Reform</h3>
                    <p className="text-gray-600">
                      Leading evidence-based cannabis reform and harm reduction approaches to
                      drug policy in Western Australia.
                    </p>
                  </div>
                </div>
              </div>

              <div
                className="bg-white rounded-2xl p-6 shadow-lg border-2 border-[#00653b]/10 cursor-pointer"
                style={{ transition: 'all 0.2s ease-out' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)';
                  e.currentTarget.style.borderColor = 'rgba(0, 101, 59, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)';
                  e.currentTarget.style.borderColor = 'rgba(0, 101, 59, 0.1)';
                }}
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-[#00653b]/10 rounded-lg">
                    <Heart className="w-6 h-6 text-[#00653b]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl text-gray-900 mb-2">Social Justice</h3>
                    <p className="text-gray-600">
                      Fighting for equality, human rights, and creating a fair society that
                      supports all members of the community.
                    </p>
                  </div>
                </div>
              </div>

              <div
                className="bg-white rounded-2xl p-6 shadow-lg border-2 border-[#00653b]/10 cursor-pointer"
                style={{ transition: 'all 0.2s ease-out' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)';
                  e.currentTarget.style.borderColor = 'rgba(0, 101, 59, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)';
                  e.currentTarget.style.borderColor = 'rgba(0, 101, 59, 0.1)';
                }}
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-[#6cc24a]/10 rounded-lg">
                    <GraduationCap className="w-6 h-6 text-[#6cc24a]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl text-gray-900 mb-2">Evidence-Based Policy</h3>
                    <p className="text-gray-600">
                      Championing policies grounded in scientific research, expert consultation,
                      and proven outcomes.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Parliamentary Work */}
          <div className="bg-gradient-to-br from-[#00653b]/5 to-[#6cc24a]/5 rounded-2xl p-8 md:p-12 border border-[#00653b]/20">
            {/* Inauguration Image */}
            <div className="mb-8 relative w-full h-64 md:h-80 rounded-2xl overflow-hidden shadow-xl hover:-translate-y-1 transition-all duration-300">
              <Image
                src="/images/inauguration.webp"
                alt="Dr Brian Walker MLC Parliamentary Inauguration Ceremony"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 1024px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <p className="text-lg md:text-xl font-semibold text-center">
                  Inaugural ceremony at the WA Legislative Council, 2021
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 mb-6">
              <div className="p-3 bg-white rounded-lg shadow-sm">
                <Users className="w-8 h-8 text-[#00653b]" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Parliamentary Service
                </h2>
                <p className="text-gray-600">
                  As a Member of the Legislative Council, Dr Walker serves the people of Western Australia
                  by scrutinising legislation, raising important issues in Parliament, and advocating for
                  evidence-based policy reform.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <a
                href="https://www.parliament.wa.gov.au/parliament/memblist.nsf/WAllMembersFlat/Walker,%20Brian%20Francis?opendocument"
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-1"
              >
                <p className="font-semibold text-[#00653b]">WA Parliament Profile →</p>
                <p className="text-sm text-gray-600 mt-1">Official parliamentary information</p>
              </a>

              <a
                href="https://en.wikipedia.org/wiki/Brian_Walker_(politician)"
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-1"
              >
                <p className="font-semibold text-[#00653b]">Wikipedia Entry →</p>
                <p className="text-sm text-gray-600 mt-1">Biographical information</p>
              </a>
            </div>
          </div>

          {/* Photo Gallery Section */}
          <div className="mt-20">
            <h2 className="text-3xl md:text-4xl font-bold text-[#00653b] mb-4 text-center">
              In Action
            </h2>
            <p className="text-lg text-gray-600 text-center mb-12 max-w-2xl mx-auto">
              Working in parliament, serving the community, and advocating for evidence-based policy. Click any image to view full size.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {shuffledImages.map((image, index) => (
                <div
                  key={index}
                  className="relative aspect-square rounded-xl overflow-hidden shadow-lg hover:-translate-y-1 hover:shadow-2xl transition-all duration-300 cursor-pointer group"
                  onClick={() => setSelectedImage(image)}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Downloads Button Section */}
          <div className="mt-16 text-center">
            <a
              href="/media"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-[#00653b] to-[#6cc24a] text-white font-semibold text-lg px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              🎬 View Media & Gallery
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

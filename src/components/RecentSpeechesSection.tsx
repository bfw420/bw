"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, Loader2 } from "lucide-react";

interface HansardRecord {
  id: number;
  date: string;
  emoji: string;
  subject: string;
  subjecturl: string;
  type: string;
  summary: string;
}

export default function RecentSpeechesSection() {
  const [speeches, setSpeeches] = useState<HansardRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSpeeches = async () => {
      try {
        const response = await fetch("/api/hansard");
        if (response.ok) {
          const data = await response.json();
          // Sort by date descending and take top 3
          const sorted = [...data].sort((a, b) =>
            new Date(b.date).getTime() - new Date(a.date).getTime()
          );
          setSpeeches(sorted.slice(0, 3));
        }
      } catch (error) {
        console.error("Error fetching recent speeches:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSpeeches();
  }, []);

  return (
    <section className="py-16 bg-gradient-to-br from-[#00653b]/5 to-[#6cc24a]/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#00653b] mb-4">
            My Recent Talks in Parliament
          </h2>
          <p className="text-lg text-gray-600">
            Latest speeches and contributions in the WA Legislative Council
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Chamber Image */}
          <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-xl">
            <Image
              src="/images/chamber_2.webp"
              alt="WA Legislative Council Chamber"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>

          {/* Recent Speeches */}
          <div className="space-y-4">
            {loading ? (
              <div className="flex justify-center items-center py-20">
                <Loader2 className="w-8 h-8 animate-spin text-[#00653b]" />
              </div>
            ) : (
              <>
                {speeches.map((speech) => (
                  <a
                    key={speech.id}
                    href={speech.subjecturl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block bg-white rounded-xl p-6 shadow-md border border-[#00653b]/20 transition-all duration-300"
                    style={{ transition: 'all 0.3s ease-out' }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-4px)';
                      e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)';
                      e.currentTarget.style.borderColor = '#00653b';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
                      e.currentTarget.style.borderColor = 'rgba(0, 101, 59, 0.2)';
                    }}
                  >
                    <div className="flex items-start gap-4">
                      <div className="text-3xl flex-shrink-0">{speech.emoji}</div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-bold text-[#00653b] mb-2 line-clamp-2">
                          {speech.subject}
                        </h3>
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-[#6cc24a]/10 text-[#00653b] border border-[#6cc24a]/20">
                          {speech.type}
                        </span>
                      </div>
                    </div>
                  </a>
                ))}

                {/* View All Button */}
                <div className="text-center pt-4">
                  <Button
                    asChild
                    size="lg"
                    className="bg-[#00653b] text-white px-8 py-6 rounded-full font-bold shadow-lg"
                    style={{ transition: 'all 0.3s ease-out' }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'scale(1.05) translateY(-2px)';
                      e.currentTarget.style.backgroundColor = '#6cc24a';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'scale(1) translateY(0)';
                      e.currentTarget.style.backgroundColor = '#00653b';
                    }}
                  >
                    <Link href="/speeches" className="flex items-center gap-2">
                      View All Speeches
                      <ArrowRight className="w-5 h-5" />
                    </Link>
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

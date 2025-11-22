"use client";

import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { HelpCircle, Search, ChevronDown, ChevronUp, Cannabis, Heart, Building2, Users } from "lucide-react";
import Link from "next/link";

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const faqData: FAQItem[] = [
  // Cannabis Reform
  {
    category: "Cannabis Reform",
    question: "What is your position on cannabis legalisation?",
    answer: "I advocate for evidence-based cannabis legalisation that prioritises health, safety, and economic opportunity. As both a medical doctor and parliamentarian, I believe prohibition causes more harm than the plant itself. My position supports regulated legalisation for adult use, expanded medicinal access, and developing a sustainable hemp industry that creates jobs and economic growth for Western Australia."
  },
  {
    category: "Cannabis Reform",
    question: "What is the Legalise Cannabis WA Party platform?",
    answer: "The Legalise Cannabis WA Party platform centres on ending cannabis prohibition and implementing evidence-based drug policy reform. Our key policies include: legalising cannabis for adult recreational use with sensible regulations, expanding medicinal cannabis access and affordability, developing industrial hemp agriculture, expunging criminal records for cannabis offences, harm reduction approaches to drug policy, and investing cannabis tax revenue into health, education, and community programs."
  },
  {
    category: "Cannabis Reform",
    question: "What is the economic case for cannabis reform?",
    answer: "Cannabis legalisation presents significant economic opportunities for WA. My economic analysis shows potential for thousands of new jobs in cultivation, processing, retail, and hemp industries. Tax revenue from regulated sales could fund essential services while reducing law enforcement and incarceration costs. Hemp agriculture offers farmers drought-resistant, sustainable crop alternatives. Additionally, legalisation would create opportunities in tourism, ancillary businesses, and research. The economic benefits far outweigh the costs of continued prohibition."
  },
  {
    category: "Cannabis Reform",
    question: "What bills have you introduced regarding cannabis?",
    answer: "I've introduced multiple bills in parliament focused on cannabis reform, including legislation to legalise personal cultivation, expand medicinal cannabis access, reduce criminal penalties, and establish frameworks for regulated adult use. I've also tabled motions calling for drug law reform, harm reduction strategies, and industrial hemp development. Each bill is grounded in medical evidence and international best practices from jurisdictions that have successfully implemented reform."
  },

  // Healthcare
  {
    category: "Healthcare",
    question: "What medical services do you still provide?",
    answer: "I continue practicing as a General Practitioner at Next Practice Health in Claremont alongside my parliamentary duties. I maintain my clinical practice to stay connected to frontline healthcare delivery and ensure my policy work remains grounded in real patient experiences. This dual role allows me to bring direct medical expertise to health policy discussions in parliament while continuing to serve patients in my community."
  },
  {
    category: "Healthcare",
    question: "How can I book a medical appointment?",
    answer: "To book a medical appointment, contact Next Practice Health directly at 08 9384 6644 or visit their website. The practice is located at 3 Airlie Street, Claremont WA 6010. Please note that my parliamentary commitments mean my clinical availability is more limited than traditional GP hours, but the practice has excellent doctors available for comprehensive care."
  },
  {
    category: "Healthcare",
    question: "What languages do you speak?",
    answer: "I speak five languages fluently: English, Afrikaans, French, Dutch, and German. This multilingual capability allows me to communicate with diverse communities across Western Australia and understand health and policy issues from multiple cultural perspectives. It's particularly valuable when engaging with multicultural communities and understanding international best practices in healthcare and drug policy reform."
  },
  {
    category: "Healthcare",
    question: "What is your background in medicine?",
    answer: "I've been a practicing General Practitioner for over 46 years. I completed my medical training with an MB ChB and hold fellowship qualifications including MRCGP (Member of the Royal College of General Practitioners) and FRACGP (Fellow of the Royal Australian College of General Practitioners). My extensive medical experience informs my evidence-based approach to health policy, drug reform, and legislative decision-making in parliament."
  },

  // Parliamentary Process
  {
    category: "Parliamentary Process",
    question: "How does the WA Legislative Council work?",
    answer: "The WA Legislative Council is the upper house of Western Australia's Parliament, serving as a house of review for legislation. It has 36 members elected from six regions using proportional representation. The Council reviews bills passed by the Legislative Assembly, conducts inquiries, debates policy, and holds the government accountable. As a member, I participate in debates, propose amendments, introduce private member's bills, serve on committees, and represent the interests of all Western Australians, particularly on issues related to health and drug policy reform."
  },
  {
    category: "Parliamentary Process",
    question: "How can I access your voting record?",
    answer: "My complete voting record is publicly available on the WA Parliament website. You can access detailed records of every vote I've cast, including divisions on bills, motions, and amendments. I also maintain transparency by regularly sharing my positions and votes through my newsletter, social media, and media releases. My voting record consistently reflects evidence-based policy, healthcare priorities, cannabis reform, and progressive social justice positions."
  },
  {
    category: "Parliamentary Process",
    question: "What bills have you introduced in parliament?",
    answer: "I've introduced 11+ bills during my time in parliament, focusing on cannabis reform, healthcare improvements, and progressive policy. These include bills for cannabis legalisation, medicinal cannabis access, drug law reform, harm reduction, and health service improvements. I've also tabled numerous motions on environmental sustainability, social justice, and economic development. Each piece of legislation is carefully researched and grounded in evidence-based policy and international best practices."
  },
  {
    category: "Parliamentary Process",
    question: "How can I submit a petition or raise a concern with parliament?",
    answer: "There are several ways to raise issues with parliament: 1) Submit a formal petition through the WA Parliament website - petitions with sufficient signatures must be tabled and considered; 2) Contact my office directly to discuss your concerns and how I might raise them in parliament; 3) Attend public parliamentary committee hearings on relevant issues; 4) Write to me about issues you'd like me to advocate for. I regularly raise constituent concerns through parliamentary questions, debates, and advocacy."
  },

  // Volunteering & Engagement
  {
    category: "Volunteering & Engagement",
    question: "How can I volunteer for your campaign?",
    answer: "I welcome volunteers who want to support evidence-based policy reform! You can volunteer through the Legalise Cannabis WA Party website at lcwaparty.org.au/join or contact my office directly. Volunteer opportunities include campaign events, community outreach, social media support, policy research, and grassroots organizing. Whether you have a few hours or can commit more time, there are meaningful ways to get involved in advancing progressive policy change in Western Australia."
  },
  {
    category: "Volunteering & Engagement",
    question: "How do I contact you about a constituent issue?",
    answer: "For constituent issues, contact my parliamentary office by email at brian.walker.mlc@mp.wa.gov.au or phone 08 9226 3550. My office is located at 2 Parliament Place, West Perth WA 6005. You can also use the contact form on this website. My team and I handle issues ranging from government services, health concerns, cannabis law matters, to general parliamentary inquiries. We aim to respond to all constituent matters promptly and thoroughly."
  },
  {
    category: "Volunteering & Engagement",
    question: "How often do you hold community forums?",
    answer: "I regularly hold community forums, town halls, and listening sessions throughout Western Australia to engage directly with constituents. These events cover topics like cannabis reform, healthcare, and general policy issues. Specific dates and locations are announced through my newsletter, social media, and website. I believe in accessible, grassroots democracy and value face-to-face conversations with the communities I serve. Subscribe to my newsletter to stay informed about upcoming community events."
  },
  {
    category: "Volunteering & Engagement",
    question: "How can I stay updated on your work?",
    answer: "The best way to stay informed is to subscribe to my newsletter through this website - you'll receive regular updates on parliamentary work, campaign activities, policy developments, and community events. You can also follow me on social media platforms including Facebook, YouTube, Instagram, TikTok, and X (Twitter). I regularly share parliamentary speeches, media appearances, policy announcements, and opportunities for community engagement across all these channels."
  },

  // General Questions
  {
    category: "General",
    question: "What are your key policy priorities?",
    answer: "My key policy priorities include: 1) Cannabis legalisation and drug law reform based on health and evidence, 2) Improving healthcare access and quality, 3) Environmental sustainability and climate action, 4) Social justice and reducing inequality, 5) Economic development through innovative industries like hemp and cannabis, 6) Evidence-based policy making across all areas, and 7) Accessible, transparent, and accountable government. All my work is guided by medical ethics, scientific evidence, and commitment to improving lives."
  },
  {
    category: "General",
    question: "How do you balance your medical practice with parliamentary duties?",
    answer: "Balancing clinical practice with parliament requires careful time management and commitment to both roles. I maintain a limited GP schedule at Next Practice Health while fulfilling my full parliamentary responsibilities. This dual role is valuable - my medical practice keeps me connected to frontline healthcare realities, while my parliamentary work allows me to influence policy at a systemic level. The combination makes me a more effective advocate for health policy reform and ensures my legislative work stays grounded in practical patient care experience."
  },
  {
    category: "General",
    question: "What inspired you to enter politics?",
    answer: "After 40+ years as a GP, I witnessed firsthand the failures of cannabis prohibition - patients suffering unnecessarily, lives destroyed by criminal records for a plant, and healthcare resources wasted on an ineffective war on drugs. I entered politics to advocate for evidence-based policy reform that prioritises health over punishment. As both a doctor and scientist, I felt a responsibility to bring medical expertise to policy discussions and fight for rational, compassionate approaches to drug policy and healthcare that could save lives and improve outcomes."
  },
  {
    category: "General",
    question: "How can I support your work in parliament?",
    answer: "You can support my work by: 1) Subscribing to my newsletter and staying informed, 2) Sharing my policy positions and media appearances on social media, 3) Volunteering with the Legalise Cannabis WA Party, 4) Contacting your local MPs to voice support for cannabis reform and evidence-based policy, 5) Attending community forums and events, 6) Voting for candidates who support progressive, evidence-based policies, and 7) Engaging in respectful dialogue about drug reform and health policy in your communities. Every voice matters in creating policy change."
  },
  {
    category: "General",
    question: "What committees do you serve on?",
    answer: "I serve on several parliamentary committees where I can contribute medical expertise and advocate for evidence-based policy. Committee work includes reviewing legislation, conducting inquiries, examining government operations, and making recommendations for policy improvements. This work allows me to influence policy development in areas like health, community services, law reform, and economic development. Committee participation is an essential part of parliamentary work and provides opportunities for detailed policy analysis."
  }
];

export default function FAQPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = ["All", "Cannabis Reform", "Healthcare", "Parliamentary Process", "Volunteering & Engagement", "General"];

  const categoryIcons: Record<string, typeof Cannabis> = {
    "Cannabis Reform": Cannabis,
    "Healthcare": Heart,
    "Parliamentary Process": Building2,
    "Volunteering & Engagement": Users,
    "General": HelpCircle
  };

  // Filter FAQs based on search and category
  const filteredFAQs = faqData.filter((faq) => {
    const matchesSearch =
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      <main className="py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-block p-4 bg-[#00653b]/10 rounded-full mb-6">
              <HelpCircle className="w-12 h-12 text-[#00653b]" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-[#00653b] mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Find answers to common questions about my work, policies, and how to get involved
            </p>
          </div>

          {/* Search Bar */}
          <div className="mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search questions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 h-14 text-lg border-2 border-gray-200 focus:border-[#00653b] rounded-xl"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div className="mb-12">
            <div className="flex flex-wrap gap-3 justify-center">
              {categories.map((category) => {
                const Icon = categoryIcons[category] || HelpCircle;
                return (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-200 ${
                      selectedCategory === category
                        ? 'bg-[#00653b] text-white shadow-lg scale-105'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {category !== "All" && <Icon className="w-4 h-4" />}
                    {category}
                  </button>
                );
              })}
            </div>
          </div>

          {/* FAQ Accordion */}
          <div className="space-y-4 mb-16">
            {filteredFAQs.length === 0 ? (
              <div className="text-center py-12 bg-gray-50 rounded-xl">
                <p className="text-gray-600 text-lg">No questions found matching your search.</p>
                <Button
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCategory("All");
                  }}
                  className="mt-4 bg-[#00653b] hover:bg-[#6cc24a] text-white"
                >
                  Clear Filters
                </Button>
              </div>
            ) : (
              filteredFAQs.map((faq, index) => {
                const isOpen = openIndex === index;
                return (
                  <div
                    key={index}
                    className="bg-white border-2 border-gray-200 rounded-xl overflow-hidden transition-all duration-200 hover:border-[#00653b]/30"
                  >
                    <button
                      onClick={() => setOpenIndex(isOpen ? null : index)}
                      className="w-full px-6 py-5 flex items-start justify-between gap-4 text-left hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="inline-block px-3 py-1 bg-[#00653b]/10 text-[#00653b] text-xs font-semibold rounded-full">
                            {faq.category}
                          </span>
                        </div>
                        <h3 className="text-lg font-bold text-gray-900">{faq.question}</h3>
                      </div>
                      <div className="flex-shrink-0 mt-1">
                        {isOpen ? (
                          <ChevronUp className="w-6 h-6 text-[#00653b]" />
                        ) : (
                          <ChevronDown className="w-6 h-6 text-gray-400" />
                        )}
                      </div>
                    </button>
                    {isOpen && (
                      <div className="px-6 pb-5 pt-2">
                        <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>

          {/* Still Have Questions Section */}
          <div className="bg-gradient-to-br from-[#00653b]/5 to-[#6cc24a]/5 rounded-2xl p-12 border-2 border-[#00653b]/20 text-center">
            <div className="inline-block p-4 bg-white rounded-full mb-6 shadow-sm">
              <HelpCircle className="w-10 h-10 text-[#6cc24a]" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Still Have Questions?
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Can&apos;t find the answer you&apos;re looking for? Get in touch and I&apos;ll be happy to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-[#00653b] hover:bg-[#6cc24a] text-white px-8 py-6 rounded-full font-bold text-lg transition-all duration-200 hover:scale-105"
              >
                <Link href="/#contact">Contact Me</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-2 border-[#00653b] text-[#00653b] hover:bg-[#00653b] hover:text-white px-8 py-6 rounded-full font-bold text-lg transition-all duration-200"
              >
                <Link href="/media">Media Resources</Link>
              </Button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

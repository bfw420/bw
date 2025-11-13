import type { Metadata } from "next";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Stethoscope, Users, GraduationCap, Heart, Leaf } from "lucide-react";

export const metadata: Metadata = {
  title: "About Dr Brian Walker MLC | Member of the Legislative Council",
  description: "Learn about Hon Dr Brian Walker MLC - General Practitioner, Member of the Legislative Council for Western Australia, and Leader of the Legalise Cannabis WA Party.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />

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

          {/* Bio Section */}
          <div className="prose prose-lg max-w-none mb-16">
            <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 md:p-12 border border-gray-200 shadow-sm">
              <p className="text-gray-700 leading-relaxed mb-6">
                Dr Brian Walker is a dedicated public servant who brings a unique combination of medical expertise
                and political leadership to the Western Australian Parliament. As a practicing General Practitioner
                in Claremont and Member of the Legislative Council, Brian works tirelessly to improve healthcare,
                social justice, and evidence-based policy making in Western Australia.
              </p>

              <p className="text-gray-700 leading-relaxed mb-6">
                As the Leader of the Legalise Cannabis WA Party, Brian champions progressive reform based on
                scientific evidence and compassionate approaches to drug policy. His work in Parliament focuses
                on healthcare reform, mental health services, harm reduction, and creating a more just and
                equitable society for all Western Australians.
              </p>

              <p className="text-gray-700 leading-relaxed">
                Brian&apos;s approach to politics is grounded in his medical background - treating each issue
                with careful diagnosis, evidence-based solutions, and a focus on harm reduction. He believes
                in the power of honest conversation, scientific research, and putting people before politics.
              </p>
            </div>
          </div>

          {/* Key Areas */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Key Areas of Focus
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-[#00653b]/10 hover:border-[#00653b]/30 transition-all duration-200">
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

              <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-[#00653b]/10 hover:border-[#00653b]/30 transition-all duration-200">
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

              <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-[#00653b]/10 hover:border-[#00653b]/30 transition-all duration-200">
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

              <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-[#00653b]/10 hover:border-[#00653b]/30 transition-all duration-200">
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
        </div>
      </main>

      <Footer />
    </div>
  );
}

"use client";

import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Newspaper, Calendar, FileText, Download, Image as ImageIcon, Folder, Mail, Phone, Copy, CheckCircle } from "lucide-react";
import { Turnstile } from '@marsidev/react-turnstile';
import confetti from 'canvas-confetti';

export default function MediaPage() {
  const [email, setEmail] = useState("");
  const [turnstileToken, setTurnstileToken] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setNotification(null);

    try {
      if (!turnstileToken) {
        setNotification({ type: 'error', message: 'Please complete the security check' });
        setIsSubmitting(false);
        return;
      }

      if (!email) {
        setNotification({ type: 'error', message: 'Please enter your email address' });
        setIsSubmitting(false);
        return;
      }

      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          subscriptionType: 'media-releases',
          source: 'media-page',
          subscribedAt: new Date().toISOString(),
          turnstileToken: turnstileToken,
        }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setNotification({
          type: 'success',
          message: "🎉 You're subscribed! You'll receive media releases directly to your inbox.",
        });
        setEmail("");
        setTurnstileToken('');

        // Trigger confetti
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#00653b', '#6cc24a', '#ffffff'],
        });
      } else {
        setNotification({
          type: 'error',
          message: result.message || 'Failed to subscribe. Please try again.',
        });
      }
    } catch (error) {
      console.error('Media releases signup error:', error);
      setNotification({
        type: 'error',
        message: 'An error occurred. Please try again later.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      <main className="py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-block p-4 bg-[#00653b]/10 rounded-full mb-6">
              <Newspaper className="w-12 h-12 text-[#00653b]" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-[#00653b] mb-4">
              Media Centre
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Press releases, media resources, and downloadable materials
            </p>
          </div>

          {/* Media Releases Section */}
          <div className="mb-16 bg-gradient-to-br from-[#00653b]/5 to-[#6cc24a]/5 rounded-2xl p-12 border-2 border-[#00653b]/20">
            <div className="inline-block p-4 bg-white rounded-full mb-6 shadow-sm">
              <FileText className="w-10 h-10 text-[#6cc24a]" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Media Releases Coming Soon
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl">
              This section will soon feature the latest media releases, press statements,
              and news from Dr Brian Walker&apos;s parliamentary work and community advocacy.
            </p>

            {/* Subscribe to Media Releases */}
            <div className="bg-white rounded-xl p-8 border border-[#00653b]/20">
              <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">
                Subscribe to Media Releases
              </h3>
              <p className="text-gray-600 mb-6 text-center">
                Get press releases and media updates delivered directly to your inbox
              </p>

              <form onSubmit={handleSubscribe} className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <Input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 h-14 text-lg px-6 border-2 border-gray-200 focus:border-[#00653b] rounded-xl"
                    disabled={isSubmitting}
                  />
                  <Button
                    type="submit"
                    disabled={isSubmitting || !turnstileToken}
                    className="h-14 px-8 text-lg font-bold bg-[#00653b] hover:bg-[#6cc24a] text-white rounded-xl transition-all duration-200 hover:scale-105"
                  >
                    {isSubmitting ? "Subscribing..." : "Subscribe"}
                  </Button>
                </div>

                {/* Turnstile */}
                <div className="flex justify-center">
                  <Turnstile
                    siteKey="0x4AAAAAACBfpoWtpO2-JGTD"
                    onSuccess={setTurnstileToken}
                    onError={() => setTurnstileToken('')}
                    onExpire={() => setTurnstileToken('')}
                    options={{ theme: 'light' }}
                  />
                </div>

                {/* Notification */}
                {notification && (
                  <div
                    className={`p-4 rounded-xl border-2 flex items-start gap-3 ${
                      notification.type === 'success'
                        ? 'bg-[#6cc24a]/10 border-[#6cc24a] text-[#00653b]'
                        : 'bg-red-50 border-red-300 text-red-800'
                    }`}
                  >
                    {notification.type === 'success' && <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />}
                    <p className="text-sm font-medium">{notification.message}</p>
                  </div>
                )}
              </form>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t-2 border-gray-200 my-16"></div>

          {/* Media Kit Section */}
          <div id="media-kit">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-[#00653b] mb-4">
                Media Kit
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Download high-resolution photos, logos, and biographical information for media, corporate, and journalistic use.
              </p>
            </div>

            {/* Main Download Section */}
            <div className="bg-gradient-to-br from-[#00653b]/5 to-[#6cc24a]/5 rounded-2xl p-12 border-2 border-[#00653b]/20 text-center mb-12">
              <div className="inline-block p-4 bg-white rounded-full mb-6 shadow-sm">
                <Folder className="w-12 h-12 text-[#6cc24a]" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                Download Media Kit
              </h3>
              <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                Access our complete media kit including professional headshots, official logos,
                biographical information, and other resources for media and promotional use.
              </p>

              <Button
                asChild
                size="lg"
                className="bg-[#00653b] hover:bg-[#00653b]/90 text-white px-8 py-4 rounded-full font-bold text-lg transition-all duration-200 hover:scale-105 shadow-lg"
              >
                <a
                  href="https://www.dropbox.com/scl/fo/7j9xq5hxvohcpu8g1mbzi/AG2o5VpA3IgfOxJruBUU_78?rlkey=29c0gkry7t6wniezpqwtngxhr&dl=0"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Download className="w-5 h-5 mr-2" />
                  Access Media Kit on Dropbox
                </a>
              </Button>
            </div>

            {/* What's Included */}
            <div className="mb-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
                What&apos;s Included
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                  <div className="flex flex-col items-center text-center">
                    <div className="p-3 bg-[#00653b]/10 rounded-lg mb-4">
                      <ImageIcon className="w-8 h-8 text-[#00653b]" />
                    </div>
                    <h4 className="font-bold text-xl text-gray-900 mb-2">Professional Headshots</h4>
                    <p className="text-gray-600">
                      High-resolution professional photographs suitable for print and digital media.
                    </p>
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
                  <div className="flex flex-col items-center text-center">
                    <div className="p-3 bg-[#6cc24a]/10 rounded-lg mb-4">
                      <ImageIcon className="w-8 h-8 text-[#6cc24a]" />
                    </div>
                    <h4 className="font-bold text-xl text-gray-900 mb-2">Official Logos</h4>
                    <p className="text-gray-600">
                      Official logos and branding materials in various formats and sizes.
                    </p>
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
                  <div className="flex flex-col items-center text-center">
                    <div className="p-3 bg-[#00653b]/10 rounded-lg mb-4">
                      <FileText className="w-8 h-8 text-[#00653b]" />
                    </div>
                    <h4 className="font-bold text-xl text-gray-900 mb-2">Biography</h4>
                    <p className="text-gray-600">
                      Detailed biographical information for media releases and publications.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bio Snippets */}
            <div className="mb-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">
                Biography Snippets
              </h3>
              <p className="text-gray-600 text-center mb-8 max-w-2xl mx-auto">
                Copy and paste these bio snippets for various media needs
              </p>

              <div className="space-y-6">
                {/* 50 Word Bio */}
                <div className="bg-gray-50 rounded-xl p-6 border-2 border-gray-200">
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="font-bold text-lg text-gray-900">50 Words</h4>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        navigator.clipboard.writeText("Hon Dr Brian Walker MLC is a Member of the Legislative Council for Western Australia and Leader of the Legalise Cannabis WA Party. With over 40 years as a General Practitioner, he combines medical expertise with evidence-based policy advocacy for healthcare reform, cannabis legalisation, and sustainable economic development.");
                        alert("Bio copied to clipboard!");
                      }}
                      className="flex items-center gap-2"
                    >
                      <Copy className="w-4 h-4" />
                      Copy
                    </Button>
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    Hon Dr Brian Walker MLC is a Member of the Legislative Council for Western Australia and Leader of the Legalise Cannabis WA Party. With over 40 years as a General Practitioner, he combines medical expertise with evidence-based policy advocacy for healthcare reform, cannabis legalisation, and sustainable economic development.
                  </p>
                </div>

                {/* 100 Word Bio */}
                <div className="bg-gray-50 rounded-xl p-6 border-2 border-gray-200">
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="font-bold text-lg text-gray-900">100 Words</h4>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        navigator.clipboard.writeText("Hon Dr Brian Walker MLC is a Member of the Legislative Council for Western Australia and Leader of the Legalise Cannabis WA Party. With over 40 years of experience as a General Practitioner in Claremont, Dr Walker brings unique medical and scientific expertise to parliament. Since his election in 2021, he has tabled 11+ bills advocating for evidence-based cannabis reform, healthcare improvements, and progressive policy. His work focuses on reducing harm from prohibition, improving access to medicinal cannabis, and creating economic opportunities through regulated cannabis legalisation. Dr Walker holds qualifications including MB ChB, MRCGP, and RACGP, and continues his medical practice while serving in parliament.");
                        alert("Bio copied to clipboard!");
                      }}
                      className="flex items-center gap-2"
                    >
                      <Copy className="w-4 h-4" />
                      Copy
                    </Button>
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    Hon Dr Brian Walker MLC is a Member of the Legislative Council for Western Australia and Leader of the Legalise Cannabis WA Party. With over 40 years of experience as a General Practitioner in Claremont, Dr Walker brings unique medical and scientific expertise to parliament. Since his election in 2021, he has tabled 11+ bills advocating for evidence-based cannabis reform, healthcare improvements, and progressive policy. His work focuses on reducing harm from prohibition, improving access to medicinal cannabis, and creating economic opportunities through regulated cannabis legalisation. Dr Walker holds qualifications including MB ChB, MRCGP, and RACGP, and continues his medical practice while serving in parliament.
                  </p>
                </div>

                {/* 200 Word Bio */}
                <div className="bg-gray-50 rounded-xl p-6 border-2 border-gray-200">
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="font-bold text-lg text-gray-900">200 Words</h4>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        navigator.clipboard.writeText("Hon Dr Brian Walker MLC is a Member of the Legislative Council for Western Australia and Leader of the Legalise Cannabis WA Party. With over 40 years of experience as a General Practitioner in Claremont, Dr Walker brings a unique combination of medical expertise and scientific rigour to the parliament.\n\nSince his election in 2021, Dr Walker has become a leading voice for evidence-based policy reform in Western Australia. He has tabled more than 11 bills in parliament, focusing on cannabis legalisation, healthcare improvements, harm reduction, and progressive social policy. His advocacy is grounded in medical science and a commitment to reducing the harm caused by cannabis prohibition while creating economic opportunities through regulated legalisation.\n\nDr Walker completed his medical training with an MB ChB and holds fellowship qualifications including MRCGP and RACGP. He continues to practice medicine at Next Practice Health in Claremont while serving in parliament, maintaining his connection to frontline healthcare delivery.\n\nAs Leader of the Legalise Cannabis WA Party, Dr Walker works to shift public policy towards compassionate, evidence-based approaches that prioritise health outcomes, individual freedom, and economic sustainability. His parliamentary work has made him a respected voice on issues ranging from medicinal cannabis access to broader healthcare reform and social justice.");
                        alert("Bio copied to clipboard!");
                      }}
                      className="flex items-center gap-2"
                    >
                      <Copy className="w-4 h-4" />
                      Copy
                    </Button>
                  </div>
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                    Hon Dr Brian Walker MLC is a Member of the Legislative Council for Western Australia and Leader of the Legalise Cannabis WA Party. With over 40 years of experience as a General Practitioner in Claremont, Dr Walker brings a unique combination of medical expertise and scientific rigour to the parliament.{"\n\n"}
                    Since his election in 2021, Dr Walker has become a leading voice for evidence-based policy reform in Western Australia. He has tabled more than 11 bills in parliament, focusing on cannabis legalisation, healthcare improvements, harm reduction, and progressive social policy. His advocacy is grounded in medical science and a commitment to reducing the harm caused by cannabis prohibition while creating economic opportunities through regulated legalisation.{"\n\n"}
                    Dr Walker completed his medical training with an MB ChB and holds fellowship qualifications including MRCGP and RACGP. He continues to practice medicine at Next Practice Health in Claremont while serving in parliament, maintaining his connection to frontline healthcare delivery.{"\n\n"}
                    As Leader of the Legalise Cannabis WA Party, Dr Walker works to shift public policy towards compassionate, evidence-based approaches that prioritise health outcomes, individual freedom, and economic sustainability. His parliamentary work has made him a respected voice on issues ranging from medicinal cannabis access to broader healthcare reform and social justice.
                  </p>
                </div>
              </div>
            </div>

            {/* Media Contact */}
            <div className="mb-12 bg-gradient-to-br from-[#00653b]/5 to-[#6cc24a]/5 rounded-2xl p-8 border-2 border-[#00653b]/20">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                Media Contact
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-[#00653b]/10 rounded-lg">
                      <Mail className="w-5 h-5 text-[#00653b]" />
                    </div>
                    <h4 className="font-bold text-gray-900">Email</h4>
                  </div>
                  <a
                    href="mailto:brian.walker.mlc@mp.wa.gov.au"
                    className="text-[#00653b] hover:text-[#6cc24a] font-medium transition-colors"
                  >
                    brian.walker.mlc@mp.wa.gov.au
                  </a>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-[#6cc24a]/10 rounded-lg">
                      <Phone className="w-5 h-5 text-[#6cc24a]" />
                    </div>
                    <h4 className="font-bold text-gray-900">Office</h4>
                  </div>
                  <p className="text-gray-700 font-medium mb-2">
                    <a href="tel:+61892263550" className="text-[#00653b] hover:text-[#6cc24a] transition-colors">
                      08 9226 3550
                    </a>
                  </p>
                  <p className="text-gray-700 font-medium">
                    2 Parliament Place, West Perth, WA 6005
                  </p>
                </div>
              </div>

              <div className="mt-6 text-center">
                <p className="text-gray-600 text-sm">
                  For urgent media inquiries, please email with &quot;URGENT MEDIA&quot; in the subject line
                </p>
              </div>
            </div>

            {/* Usage Guidelines */}
            <div className="bg-white rounded-2xl p-8 border-2 border-[#00653b]/20 shadow-sm">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Usage Guidelines
              </h3>
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-600 mb-4">
                  These resources are provided for media, corporate, and journalistic purposes.
                  When using these materials, please:
                </p>
                <ul className="text-gray-600 space-y-2">
                  <li>Maintain the integrity and context of the images and information</li>
                  <li>Credit appropriately as &quot;Dr Brian Walker MLC&quot; or &quot;Hon Dr Brian Walker MLC&quot;</li>
                  <li>Do not alter or manipulate images without permission</li>
                  <li>Contact us if you need specific formats or have questions about usage</li>
                </ul>
                <p className="text-gray-600 mt-6">
                  For additional resources or specific requests, please contact:{" "}
                  <a
                    href="mailto:brian.walker.mlc@mp.wa.gov.au"
                    className="text-[#00653b] hover:text-[#6cc24a] font-semibold transition-colors"
                  >
                    brian.walker.mlc@mp.wa.gov.au
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

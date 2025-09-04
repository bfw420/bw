import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Privacy Policy
            </h1>
            <p className="text-lg text-gray-600">
              Your privacy is important to us. This policy explains how we collect, use, and protect your information.
            </p>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Information We Collect</CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <p className="mb-4">
                When you interact with our website or contact Dr Brian Walker MLC, we may collect the following types of information:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Personal identification information (name, email address, phone number)</li>
                <li>Communication preferences and newsletter subscriptions</li>
                <li>Messages and inquiries sent through our contact forms</li>
                <li>Website usage data and analytics (via Google Analytics)</li>
                <li>Volunteer interest and participation information</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>How We Use Your Information</CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <p className="mb-4">
                We use the information we collect for the following purposes:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>To respond to your inquiries and provide requested information</li>
                <li>To send newsletters and updates about political activities (with your consent)</li>
                <li>To coordinate volunteer activities and community engagement</li>
                <li>To improve our website and services</li>
                <li>To comply with legal obligations and parliamentary requirements</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Information Sharing</CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <p className="mb-4">
                We do not sell, trade, or otherwise transfer your personal information to third parties, except in the following circumstances:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>With your explicit consent</li>
                <li>To trusted service providers who assist in website operations (subject to confidentiality agreements)</li>
                <li>When required by law or to protect rights, property, or safety</li>
                <li>For political campaign activities in accordance with electoral laws</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Data Security</CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <p className="mb-4">
                We implement appropriate security measures to protect your personal information against unauthorized access, 
                alteration, disclosure, or destruction. However, no method of transmission over the internet or electronic 
                storage is 100% secure.
              </p>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Cookies and Analytics</CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <p className="mb-4">
                Our website uses Google Analytics to understand how visitors interact with our site. This helps us improve 
                our content and user experience. You can opt out of Google Analytics tracking by installing the Google 
                Analytics opt-out browser add-on.
              </p>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Your Rights</CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <p className="mb-4">
                Under Australian privacy laws, you have the right to:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Request access to your personal information</li>
                <li>Request correction of inaccurate information</li>
                <li>Request deletion of your information (subject to legal requirements)</li>
                <li>Unsubscribe from newsletters and communications at any time</li>
                <li>Lodge a complaint with the Office of the Australian Information Commissioner</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Medical Practice Privacy</CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <p className="mb-4">
                Please note that this privacy policy covers Dr Brian Walker&apos;s political activities. For medical consultations
                and health-related matters, separate privacy policies apply in accordance with healthcare privacy regulations 
                and the Australian Privacy Principles for health services.
              </p>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <p className="mb-4">
                If you have any questions about this Privacy Policy or wish to exercise your privacy rights, please contact:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="font-semibold">Dr Brian Walker MLC</p>
                <p>2 Parliament Place, West Perth, WA 6005</p>
                <p>Email: brian.walker.mlc@mp.wa.gov.au</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Policy Updates</CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <p className="mb-4">
                This Privacy Policy may be updated from time to time to reflect changes in our practices or legal requirements. 
                The date of the last update will be indicated at the bottom of this policy.
              </p>
              <p className="text-sm text-gray-500 mt-6">
                Last updated: {new Date().toLocaleDateString('en-AU', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
}
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function CopyrightPage() {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Copyright Notice
            </h1>
            <p className="text-lg text-gray-600">
              Information about the copyright and intellectual property rights of this website and its content.
            </p>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Website Copyright</CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <p className="mb-4">
                © {new Date().getFullYear()} Dr Brian Walker MLC. All rights reserved.
              </p>
              <p className="mb-4">
                The content, design, graphics, text, images, and other materials on this website are protected by 
                Australian and international copyright laws. This includes but is not limited to:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Website design and layout</li>
                <li>Text content and articles</li>
                <li>Photographs and images</li>
                <li>Logos and branding materials</li>
                <li>Video and multimedia content</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Permitted Use</CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <p className="mb-4">
                You may access, download, and print materials from this website for the following purposes:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Personal, non-commercial use</li>
                <li>Educational purposes</li>
                <li>News reporting and journalism (with proper attribution)</li>
                <li>Political commentary and discussion</li>
              </ul>
              <p className="mb-4">
                Any use of materials from this website must include proper attribution to Dr Brian Walker MLC 
                and this website.
              </p>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Prohibited Use</CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <p className="mb-4">
                Without prior written permission, you may not:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Reproduce, distribute, or publicly display copyrighted materials for commercial purposes</li>
                <li>Modify, adapt, or create derivative works based on the content</li>
                <li>Use the content for misleading or defamatory purposes</li>
                <li>Remove or alter copyright notices or attributions</li>
                <li>Use automated systems to download or scrape content</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Parliamentary and Government Content</CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <p className="mb-4">
                Content related to parliamentary proceedings, government documents, and official communications 
                may be subject to different copyright arrangements under Australian law. Such content includes:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Parliamentary speeches and debates</li>
                <li>Committee reports and submissions</li>
                <li>Official government documents</li>
                <li>Hansard records</li>
              </ul>
              <p className="mb-4">
                These materials may be used in accordance with parliamentary copyright provisions and are 
                generally available for public use with proper attribution.
              </p>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Third-Party Content</CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <p className="mb-4">
                This website may contain content, links, or references to third-party materials including:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Social media posts and content</li>
                <li>News articles and media reports</li>
                <li>External websites and resources</li>
                <li>Photos or videos taken by others</li>
              </ul>
              <p className="mb-4">
                Such third-party content remains the property of its respective owners and is used under 
                fair dealing provisions or with permission where required.
              </p>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Legalise Cannabis WA Party Materials</CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <p className="mb-4">
                Materials related to the Legalise Cannabis WA Party, including logos, campaign materials, 
                and party documents, are subject to the party's intellectual property rights and may have 
                different usage terms.
              </p>
              <p className="mb-4">
                For use of Legalise Cannabis WA Party materials, please contact the party directly at 
                the official party website: www.lcwaparty.org.au
              </p>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Medical Practice Disclaimer</CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <p className="mb-4">
                Any medical or health-related content on this website is for informational purposes only 
                and is not intended as medical advice. Such content is protected by copyright and should 
                not be reproduced for commercial purposes.
              </p>
              <p className="mb-4">
                Medical practice-related materials may be subject to additional professional and regulatory 
                requirements under Australian healthcare laws.
              </p>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Copyright Infringement</CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <p className="mb-4">
                If you believe that your copyrighted work has been used on this website in a way that 
                constitutes copyright infringement, please contact us immediately with:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>A description of the copyrighted work</li>
                <li>The location of the infringing material on our website</li>
                <li>Your contact information</li>
                <li>A statement of good faith belief that the use is not authorized</li>
                <li>A statement of accuracy and authority to act on behalf of the copyright owner</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Permissions and Licensing</CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <p className="mb-4">
                For permission to use copyrighted materials beyond the permitted uses outlined above, 
                or for licensing inquiries, please contact:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="font-semibold">Dr Brian Walker MLC</p>
                <p>2 Parliament Place, West Perth, WA 6005</p>
                <p>Email: brian.walker.mlc@mp.wa.gov.au</p>
                <p className="text-sm text-gray-600 mt-2">
                  Please allow reasonable time for processing permission requests.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Changes to Copyright Notice</CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <p className="mb-4">
                This copyright notice may be updated from time to time to reflect changes in applicable 
                laws or our policies. Users are encouraged to review this page periodically.
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
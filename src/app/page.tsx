import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import WellnessSection from "@/components/WellnessSection";
import PoliticalGoalsSection from "@/components/PoliticalGoalsSection";
import HowToHelpSection from "@/components/HowToHelpSection";
import EconomicReportSection from "@/components/EconomicReportSection";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <HeroSection />
      <WellnessSection />
      <PoliticalGoalsSection />
      <HowToHelpSection />
      <EconomicReportSection />
      <ContactForm />
      <Footer />
    </div>
  );
}

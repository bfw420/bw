import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import WellnessSection from "@/components/WellnessSection";
import StatsSection from "@/components/StatsSection";
import PoliticalGoalsSection from "@/components/PoliticalGoalsSection";
import RecentSpeechesSection from "@/components/RecentSpeechesSection";
import HowToHelpSection from "@/components/HowToHelpSection";
import EconomicReportSection from "@/components/EconomicReportSection";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main id="main-content">
        <HeroSection />
        <StatsSection />
        <WellnessSection />
        <PoliticalGoalsSection />
        <RecentSpeechesSection />
        <HowToHelpSection />
        <EconomicReportSection />
        <ContactForm />
      </main>
      <Footer />
    </div>
  );
}

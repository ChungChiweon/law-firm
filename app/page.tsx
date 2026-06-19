import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { TrustSection } from "@/components/sections/TrustSection";
import { PracticeAreaSection } from "@/components/sections/PracticeAreaSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { LawyerProfileSection } from "@/components/sections/LawyerProfileSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { CtaSection } from "@/components/sections/CtaSection";

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <TrustSection />
        <PracticeAreaSection />
        <ProcessSection />
        <LawyerProfileSection />
        <FaqSection />
        <CtaSection />
      </main>
      <Footer />
    </>
  );
}

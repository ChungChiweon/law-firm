import { PublicLayout } from "@/components/layout/PublicLayout";
import { HeroSection } from "@/components/sections/HeroSection";
import { TrustSection } from "@/components/sections/TrustSection";
import { CaseStudiesSection } from "@/components/sections/CaseStudiesSection";
import { CtaSection } from "@/components/sections/CtaSection";
import { IntroWrapper } from "@/components/intro/IntroWrapper";

export default function HomePage() {
  return (
    <IntroWrapper>
      <PublicLayout>
        <main>
          <HeroSection />
          <TrustSection />
          <CaseStudiesSection />
          <CtaSection />
        </main>
      </PublicLayout>
    </IntroWrapper>
  );
}

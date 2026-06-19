import { PublicLayout } from "@/components/layout/PublicLayout";
import { HeroSection } from "@/components/sections/HeroSection";
import { TrustSection } from "@/components/sections/TrustSection";
import { CtaSection } from "@/components/sections/CtaSection";

export default function HomePage() {
  return (
    <PublicLayout>
      <main>
        <HeroSection />
        <TrustSection />
        <CtaSection />
      </main>
    </PublicLayout>
  );
}

import { Header } from '@/components/header';

import CtaSection from './_components/cta-section';
import FeaturesSection from './_components/features-section';
import Footer from './_components/footer';
import HeroSection from './_components/hero-section';
import HowItWorks from './_components/how-it-works';
import TestimonialsSection from './_components/testimonials-section';

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <FeaturesSection />
        <HowItWorks />
        <TestimonialsSection />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
}

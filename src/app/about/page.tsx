import type { Metadata } from 'next';

import { Header } from '@/components/header';

import FeaturesSection from '../_components/features-section';
import AboutHero from './_components/about-hero';
import BenefitsSection from './_components/benefits-section';
import CTASection from './_components/cta-section';
import MissionSection from './_components/mission-section';
import ProblemSection from './_components/problem-section';
import SolutionSection from './_components/solution-section';

export const metadata: Metadata = {
  title: "About Us | Farmers' Platform",
  description:
    'Learn about our mission to connect farmers directly to markets and provide affordable machinery rental services.'
};

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="flex min-h-screen flex-col">
        <AboutHero />
        <MissionSection />
        <ProblemSection />
        <SolutionSection />
        <FeaturesSection />
        <BenefitsSection />
        <CTASection />
      </main>
    </>
  );
}

import type { Metadata } from "next";
import AboutHero from "./_components/about-hero";
import MissionSection from "./_components/mission-section";
import ProblemSection from "./_components/problem-section";
import SolutionSection from "./_components/solution-section";
import FeaturesSection from "../_components/features-section";
import BenefitsSection from "./_components/benefits-section";
import CTASection from "./_components/cta-section";
import { Header } from "@/components/header";

export const metadata: Metadata = {
	title: "About Us | Farmers' Platform",
	description:
		"Learn about our mission to connect farmers directly to markets and provide affordable machinery rental services.",
};

export default function AboutPage() {
	return (
		<>
			<Header />
			<main className="flex flex-col min-h-screen">
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

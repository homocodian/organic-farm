import { Header } from "@/components/landing/header";
import { Footer } from "@/components/landing/footer";
import { HeroSection } from "@/components/landing/hero-section";
import { InfoSection } from "@/components/landing/info-section";
import { AboutSection } from "@/components/landing/about-section";
import { CommunitySection } from "@/components/landing/community-section";

export default function Home() {
	return (
		<div className="flex min-h-screen flex-col">
			<Header />
			<main className="flex-1">
				<HeroSection />
				<InfoSection />
				<AboutSection />
				<CommunitySection />
			</main>
			<Footer />
		</div>
	);
}

import { Header } from "@/components/header";
import { Footer } from "@/components/landing/footer";
import { Hero } from "@/components/landing/hero-section";
import { Information } from "@/components/landing/info-section";
import { LearnMode } from "@/components/landing/about-section";
import { Community } from "@/components/landing/community-section";

export default function Home() {
	return (
		<div className="flex min-h-screen flex-col">
			<Header />
			<main className="flex-1">
				<Hero />
				<Information />
				<LearnMode />
				<Community />
			</main>
			<Footer />
		</div>
	);
}

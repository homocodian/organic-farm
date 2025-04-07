import { Header } from "@/components/header";
import { Hero } from "./_components/hero-section";
import { Information } from "./_components/info-section";
import { LearnMode } from "./_components/about-section";
import { Community } from "./_components/community-section";
import { Footer } from "./_components/footer";

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

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AppConfig } from "@/lib/app-config";

export default function HeroSection() {
	return (
		<section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
			<div className="container mx-auto px-4 md:px-6">
				<div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
					<div className="flex flex-col justify-center space-y-4">
						<div className="space-y-2">
							<h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-primary">
								Connecting Farmers Directly to Markets
							</h1>
							<p className="max-w-[600px] text-muted-foreground md:text-xl">
								Sell your produce at better prices and rent farming equipment at
								affordable rates. Grow your farm business with {AppConfig.name}.
							</p>
						</div>
						<div className="flex flex-col gap-2 min-[400px]:flex-row">
							<Button size="lg" asChild>
								<Link href="/signup">Get Started</Link>
							</Button>
							<Button size="lg" variant="outline" asChild>
								<Link href="#how-it-works">Learn More</Link>
							</Button>
						</div>
					</div>
					<div className="flex items-center justify-center">
						<Image
							src="/hero.png?height=500&width=500"
							width={550}
							height={550}
							alt="Farmer with produce"
							className="rounded-lg object-cover"
							priority
						/>
					</div>
				</div>
			</div>
		</section>
	);
}

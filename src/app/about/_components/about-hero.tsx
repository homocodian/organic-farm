import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function AboutHero() {
	return (
		<section className="relative w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-muted/40">
			<div className="container mx-auto px-4 md:px-6">
				<div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
					<div className="flex flex-col justify-center space-y-4">
						<div className="space-y-2">
							<h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
								Empowering Farmers Through Technology
							</h1>
							<p className="max-w-[600px] text-muted-foreground md:text-xl">
								We&apos;re building a platform that connects farmers directly to
								markets and provides affordable access to farming machinery.
							</p>
						</div>
						<div className="flex flex-col gap-2 min-[400px]:flex-row">
							<Link href="#features">
								<Button size="lg">Learn More</Button>
							</Link>
							<Link href="/contact">
								<Button size="lg" variant="outline">
									Contact Us
								</Button>
							</Link>
						</div>
					</div>
					<Image
						alt="Farmer in field with technology"
						className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
						height={550}
						src="/hero.png?height=550&width=800"
						width={800}
					/>
				</div>
			</div>
		</section>
	);
}

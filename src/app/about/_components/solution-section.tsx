import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function SolutionSection() {
	return (
		<section className="w-full py-12 md:py-24 lg:py-32 bg-background">
			<div className="container mx-auto px-4 md:px-6">
				<div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
					<Image
						alt="Farmers using digital platform"
						className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center"
						height={500}
						src="/images/hero.jpg?height=500&width=800"
						width={800}
					/>
					<div className="flex flex-col justify-center space-y-4">
						<div className="space-y-2">
							<h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
								Our Solution
							</h2>
							<p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
								We&apos;ve built a comprehensive platform that addresses these
								challenges head-on, providing farmers with the tools they need
								to succeed.
							</p>
						</div>
						<ul className="grid gap-6">
							<li className="flex items-start gap-4">
								<div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
									1
								</div>
								<div className="space-y-1">
									<h3 className="text-xl font-medium">Direct Market Access</h3>
									<p className="text-muted-foreground">
										Our platform connects farmers directly with buyers,
										eliminating middlemen and ensuring farmers receive fair
										prices for their produce.
									</p>
								</div>
							</li>
							<li className="flex items-start gap-4">
								<div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
									2
								</div>
								<div className="space-y-1">
									<h3 className="text-xl font-medium">
										Machinery Rental Marketplace
									</h3>
									<p className="text-muted-foreground">
										Farmers can rent essential equipment at affordable rates,
										avoiding the high upfront costs of purchasing while still
										accessing modern machinery.
									</p>
								</div>
							</li>
							<li className="flex items-start gap-4">
								<div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
									3
								</div>
								<div className="space-y-1">
									<h3 className="text-xl font-medium">
										Community & Knowledge Sharing
									</h3>
									<p className="text-muted-foreground">
										Our platform fosters a community where farmers can share
										best practices, techniques, and market insights.
									</p>
								</div>
							</li>
						</ul>
						<div className="flex flex-col gap-2 min-[400px]:flex-row">
							<Link href="/marketplace">
								<Button>Explore Marketplace</Button>
							</Link>
							<Link href="/equipment">
								<Button variant="outline">Browse Equipment</Button>
							</Link>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function CTASection() {
	return (
		<section className="w-full py-12 md:py-24 lg:py-32 bg-primary text-primary-foreground">
			<div className="container mx-auto px-4 md:px-6">
				<div className="flex flex-col items-center justify-center space-y-4 text-center">
					<div className="space-y-2">
						<h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
							Join Our Growing Community
						</h2>
						<p className="mx-auto max-w-[700px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
							Thousands of farmers are already benefiting from our platform.
							Start your journey to increased profitability and efficiency
							today.
						</p>
					</div>
					<div className="flex flex-col gap-2 min-[400px]:flex-row">
						<Link href="/register">
							<Button size="lg" variant="secondary">
								Sign Up Now
							</Button>
						</Link>
						<Link href="/demo">
							<Button
								size="lg"
								variant="outline"
								className="bg-transparent border-primary-foreground hover:bg-primary-foreground/10"
							>
								Request a Demo
							</Button>
						</Link>
					</div>
					<p className="text-sm opacity-90">
						No credit card required. Start with our free plan and upgrade as you
						grow.
					</p>
				</div>
			</div>
		</section>
	);
}

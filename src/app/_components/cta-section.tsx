import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function CtaSection() {
	return (
		<section className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
			<div className="container mx-auto px-4 md:px-6">
				<div className="flex flex-col items-center justify-center space-y-4 text-center">
					<div className="space-y-2">
						<h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
							Ready to transform your farming business?
						</h2>
						<p className="max-w-[600px] text-muted-foreground md:text-xl">
							Join thousands of farmers who are already benefiting from our
							platform.
						</p>
					</div>
					<div className="w-full max-w-sm space-y-2">
						<form className="flex flex-col sm:flex-row gap-2">
							<Input
								type="email"
								placeholder="Enter your email"
								className="max-w-lg flex-1"
							/>
							<Button type="submit">Get Started</Button>
						</form>
						<p className="text-xs text-muted-foreground">
							By signing up, you agree to our{" "}
							<Link href="#" className="underline underline-offset-2">
								Terms & Conditions
							</Link>
						</p>
					</div>
				</div>
			</div>
		</section>
	);
}

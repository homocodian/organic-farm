import Image from "next/image";
import { Check } from "lucide-react";
import { PropsWithChildren } from "react";

export default function HowItWorks() {
	return (
		<section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32">
			<div className="container mx-auto px-4 md:px-6">
				<div className="flex flex-col items-center justify-center space-y-4 text-center">
					<div className="space-y-2">
						<div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
							How It Works
						</div>
						<h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
							Simple process, powerful results
						</h2>
						<p className="max-w-[900px] text-muted-foreground md:text-xl">
							Our platform is designed to be intuitive and easy to use, helping
							you focus on what matters most - your farm.
						</p>
					</div>
				</div>

				<div className="mt-16">
					{/* Market Access Section */}
					<div className="grid gap-6 items-center lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
						<div className="flex flex-col justify-center space-y-4">
							<div className="space-y-2">
								<h3 className="text-2xl font-bold tracking-tighter md:text-3xl">
									Sell Your Produce Directly
								</h3>
								<p className="text-muted-foreground md:text-lg">
									List your produce on our platform and connect with buyers
									directly, eliminating middlemen and increasing your profits.
								</p>
							</div>
							<ul className="space-y-2">
								<StepItem>
									Create a profile and list your available produce
								</StepItem>
								<StepItem>Set your own prices and quantities</StepItem>
								<StepItem>Receive orders directly from buyers</StepItem>
								<StepItem>Arrange delivery or pickup options</StepItem>
								<StepItem>Get paid securely through our platform</StepItem>
							</ul>
						</div>
						<div className="flex items-center justify-center">
							<Image
								src="/placeholder.svg?height=400&width=500"
								width={500}
								height={400}
								alt="Farmer selling produce"
								className="rounded-lg object-cover"
							/>
						</div>
					</div>

					{/* Equipment Rental Section */}
					<div className="mt-20 grid gap-6 items-center lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
						<div className="flex items-center justify-center order-last lg:order-first">
							<Image
								src="/placeholder.svg?height=400&width=500"
								width={500}
								height={400}
								alt="Farm equipment rental"
								className="rounded-lg object-cover"
							/>
						</div>
						<div className="flex flex-col justify-center space-y-4">
							<div className="space-y-2">
								<h3 className="text-2xl font-bold tracking-tighter md:text-3xl">
									Rent Farming Equipment
								</h3>
								<p className="text-muted-foreground md:text-lg">
									Access essential farming machinery without the high upfront
									costs through our equipment rental service.
								</p>
							</div>
							<ul className="space-y-2">
								<StepItem>Browse available equipment in your area</StepItem>
								<StepItem>
									Check specifications, availability, and rental rates
								</StepItem>
								<StepItem>Book equipment for your required dates</StepItem>
								<StepItem>Arrange pickup or delivery</StepItem>
								<StepItem>Return equipment after use</StepItem>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

function StepItem({ children }: PropsWithChildren) {
	return (
		<li className="flex items-start">
			<Check className="mr-2 h-5 w-5 text-primary mt-0.5" />
			<span>{children}</span>
		</li>
	);
}

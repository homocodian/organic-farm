import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { ShoppingBag, Tractor, BarChart, Users2 } from "lucide-react";

export default function FeaturesSection() {
	return (
		<section
			id="features"
			className="w-full py-12 md:py-24 lg:py-32 bg-muted/40"
		>
			<div className="container px-4 md:px-6">
				<div className="flex flex-col items-center justify-center space-y-4 text-center">
					<div className="space-y-2">
						<h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
							Platform Features
						</h2>
						<p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
							Our comprehensive platform offers these key features to support
							farmers&apos; success.
						</p>
					</div>
					<div className="mx-auto grid max-w-5xl gap-6 py-12 md:grid-cols-2 lg:gap-12">
						<Card>
							<CardHeader>
								<ShoppingBag className="h-10 w-10 text-primary mb-2" />
								<CardTitle>Direct Marketplace</CardTitle>
								<CardDescription>
									Connect directly with buyers for your produce
								</CardDescription>
							</CardHeader>
							<CardContent>
								<ul className="list-disc pl-5 space-y-2 text-muted-foreground">
									<li>
										List your products with detailed descriptions and pricing
									</li>
									<li>Receive orders directly from consumers and businesses</li>
									<li>Manage inventory and track sales in real-time</li>
									<li>Build your reputation with ratings and reviews</li>
								</ul>
							</CardContent>
						</Card>
						<Card>
							<CardHeader>
								<Tractor className="h-10 w-10 text-primary mb-2" />
								<CardTitle>Equipment Rental</CardTitle>
								<CardDescription>
									Access essential machinery without purchasing
								</CardDescription>
							</CardHeader>
							<CardContent>
								<ul className="list-disc pl-5 space-y-2 text-muted-foreground">
									<li>Browse available equipment in your area</li>
									<li>Rent machinery by the day, week, or month</li>
									<li>List your own equipment for others to rent</li>
									<li>Schedule pickups, deliveries, and returns</li>
								</ul>
							</CardContent>
						</Card>
						<Card>
							<CardHeader>
								<BarChart className="h-10 w-10 text-primary mb-2" />
								<CardTitle>Market Analytics</CardTitle>
								<CardDescription>
									Make informed decisions with data insights
								</CardDescription>
							</CardHeader>
							<CardContent>
								<ul className="list-disc pl-5 space-y-2 text-muted-foreground">
									<li>Track price trends for various agricultural products</li>
									<li>Analyze seasonal demand patterns</li>
									<li>Compare your performance with market averages</li>
									<li>Receive personalized recommendations</li>
								</ul>
							</CardContent>
						</Card>
						<Card>
							<CardHeader>
								<Users2 className="h-10 w-10 text-primary mb-2" />
								<CardTitle>Farmer Community</CardTitle>
								<CardDescription>
									Connect with other farmers and share knowledge
								</CardDescription>
							</CardHeader>
							<CardContent>
								<ul className="list-disc pl-5 space-y-2 text-muted-foreground">
									<li>Join discussion forums on farming techniques</li>
									<li>Participate in virtual and local meetups</li>
									<li>Share success stories and learn from others</li>
									<li>Access educational resources and training</li>
								</ul>
							</CardContent>
						</Card>
					</div>
				</div>
			</div>
		</section>
	);
}

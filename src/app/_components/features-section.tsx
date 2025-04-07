import {
	ShoppingCart,
	Truck,
	Users,
	Tractor,
	BarChart,
	Shield,
} from "lucide-react";

export default function FeaturesSection() {
	return (
		<section
			id="features"
			className="w-full py-12 md:py-24 lg:py-32 bg-muted/50"
		>
			<div className="container mx-auto px-4 md:px-6">
				<div className="flex flex-col items-center justify-center space-y-4 text-center">
					<div className="space-y-2">
						<div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
							Features
						</div>
						<h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
							Everything you need to grow your farm business
						</h2>
						<p className="max-w-[900px] text-muted-foreground md:text-xl">
							Our platform provides farmers with the tools they need to succeed
							in today&apos;s competitive market.
						</p>
					</div>
				</div>
				<div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
					<FeatureCard
						icon={<ShoppingCart className="h-10 w-10" />}
						title="Direct Market Access"
						description="Sell your produce directly to buyers without middlemen, ensuring better prices for your harvest."
					/>
					<FeatureCard
						icon={<Tractor className="h-10 w-10" />}
						title="Equipment Rental"
						description="Access essential farming machinery without the high upfront costs through our rental service."
					/>
					<FeatureCard
						icon={<Users className="h-10 w-10" />}
						title="Community Support"
						description="Connect with other farmers to share knowledge, experiences, and best practices."
					/>
					<FeatureCard
						icon={<Truck className="h-10 w-10" />}
						title="Logistics Solutions"
						description="Simplified transportation and delivery options to get your produce to market efficiently."
					/>
					<FeatureCard
						icon={<BarChart className="h-10 w-10" />}
						title="Market Insights"
						description="Access real-time data and analytics to make informed decisions about what to grow and when to sell."
					/>
					<FeatureCard
						icon={<Shield className="h-10 w-10" />}
						title="Secure Transactions"
						description="Our platform ensures safe and transparent transactions between all parties."
					/>
				</div>
			</div>
		</section>
	);
}

function FeatureCard({
	icon,
	title,
	description,
}: {
	icon: React.ReactNode;
	title: string;
	description: string;
}) {
	return (
		<div className="flex flex-col items-center space-y-2 rounded-lg border bg-card p-6 shadow-sm">
			<div className="text-primary">{icon}</div>
			<h3 className="text-xl font-bold">{title}</h3>
			<p className="text-muted-foreground text-center">{description}</p>
		</div>
	);
}

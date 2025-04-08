import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

export default function MissionSection() {
	return (
		<section className="w-full py-12 md:py-24 lg:py-32 bg-background">
			<div className="container mx-auto px-4 md:px-6">
				<div className="flex flex-col items-center justify-center space-y-4 text-center">
					<div className="space-y-2">
						<h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
							Our Mission
						</h2>
						<p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
							To transform the agricultural sector by providing farmers with
							direct market access and affordable machinery solutions.
						</p>
					</div>
					<div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
						<Card>
							<CardHeader>
								<CardTitle>Connecting Farmers to Markets</CardTitle>
								<CardDescription>
									Eliminating middlemen and creating direct connections
								</CardDescription>
							</CardHeader>
							<CardContent>
								<p className="text-muted-foreground">
									Our platform creates a direct bridge between farmers and
									buyers, allowing agricultural producers to sell their goods at
									fair market prices without relying on intermediaries who often
									take significant cuts of the profits.
								</p>
							</CardContent>
						</Card>
						<Card>
							<CardHeader>
								<CardTitle>Affordable Machinery Access</CardTitle>
								<CardDescription>
									Sharing resources to reduce costs and increase efficiency
								</CardDescription>
							</CardHeader>
							<CardContent>
								<p className="text-muted-foreground">
									By creating a machinery rental marketplace, we enable farmers
									to access essential equipment without the prohibitive upfront
									costs of purchasing, helping them improve productivity while
									managing expenses.
								</p>
							</CardContent>
						</Card>
					</div>
				</div>
			</div>
		</section>
	);
}

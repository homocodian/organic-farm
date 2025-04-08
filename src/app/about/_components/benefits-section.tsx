import { Card, CardContent } from "@/components/ui/card";
import { CircleDollarSign, TrendingUp, Clock, Shield } from "lucide-react";

export default function BenefitsSection() {
	return (
		<section className="w-full py-12 md:py-24 lg:py-32 bg-background">
			<div className="container mx-auto px-4 md:px-6">
				<div className="flex flex-col items-center justify-center space-y-4 text-center">
					<div className="space-y-2">
						<h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
							Benefits for Farmers
						</h2>
						<p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
							Our platform delivers tangible benefits that improve farmers&apos;
							livelihoods and operations.
						</p>
					</div>
					<div className="mx-auto grid max-w-5xl gap-6 py-12 md:grid-cols-2 lg:grid-cols-4">
						<Card className="flex flex-col items-center text-center p-6">
							<CircleDollarSign className="h-12 w-12 text-primary mb-4" />
							<CardContent className="p-0">
								<h3 className="text-xl font-medium mb-2">Increased Profits</h3>
								<p className="text-sm text-muted-foreground">
									Earn up to 40% more by selling directly to consumers and
									businesses without middlemen.
								</p>
							</CardContent>
						</Card>
						<Card className="flex flex-col items-center text-center p-6">
							<TrendingUp className="h-12 w-12 text-primary mb-4" />
							<CardContent className="p-0">
								<h3 className="text-xl font-medium mb-2">
									Enhanced Productivity
								</h3>
								<p className="text-sm text-muted-foreground">
									Access to modern equipment improves efficiency and yield,
									boosting overall farm productivity.
								</p>
							</CardContent>
						</Card>
						<Card className="flex flex-col items-center text-center p-6">
							<Clock className="h-12 w-12 text-primary mb-4" />
							<CardContent className="p-0">
								<h3 className="text-xl font-medium mb-2">Time Savings</h3>
								<p className="text-sm text-muted-foreground">
									Streamlined processes for selling produce and renting
									equipment save valuable time for farming activities.
								</p>
							</CardContent>
						</Card>
						<Card className="flex flex-col items-center text-center p-6">
							<Shield className="h-12 w-12 text-primary mb-4" />
							<CardContent className="p-0">
								<h3 className="text-xl font-medium mb-2">Reduced Risk</h3>
								<p className="text-sm text-muted-foreground">
									Lower capital investment requirements and more stable market
									access reduce financial risks.
								</p>
							</CardContent>
						</Card>
					</div>
				</div>
			</div>
		</section>
	);
}

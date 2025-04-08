import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CircleDollarSign, Users, ShoppingCart, Truck } from "lucide-react";

export default function ProblemSection() {
	return (
		<section className="w-full py-12 md:py-24 lg:py-32 bg-muted/40">
			<div className="container mx-auto px-4 md:px-6">
				<div className="flex flex-col items-center justify-center space-y-4 text-center">
					<div className="space-y-2">
						<h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
							The Challenges Farmers Face
						</h2>
						<p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
							Many farmers struggle with these key challenges that limit their
							growth and profitability.
						</p>
					</div>
					<div className="mx-auto grid max-w-5xl gap-6 py-12 md:grid-cols-2 lg:grid-cols-4">
						<Card className="flex flex-col items-center text-center">
							<CardHeader className="pb-2 w-full">
								<div className="flex items-center justify-center w-full">
									<Users className="h-12 w-12 text-primary" />
								</div>
								<CardTitle className="text-xl">Middlemen Dependency</CardTitle>
							</CardHeader>
							<CardContent>
								<p className="text-sm text-muted-foreground">
									Reliance on intermediaries who often take significant portions
									of potential profits.
								</p>
							</CardContent>
						</Card>
						<Card className="flex flex-col items-center text-center">
							<CardHeader className="pb-2 w-full">
								<div className="flex items-center justify-center w-full">
									<ShoppingCart className="h-12 w-12 text-primary" />
								</div>
								<CardTitle className="text-xl">Limited Market Access</CardTitle>
							</CardHeader>
							<CardContent>
								<p className="text-sm text-muted-foreground">
									Difficulty reaching broader markets and finding fair prices
									for produce.
								</p>
							</CardContent>
						</Card>
						<Card className="flex flex-col items-center text-center">
							<CardHeader className="pb-2 w-full">
								<div className="flex items-center justify-center w-full">
									<CircleDollarSign className="h-12 w-12 text-primary" />
								</div>
								<CardTitle className="text-xl">High Equipment Costs</CardTitle>
							</CardHeader>
							<CardContent>
								<p className="text-sm text-muted-foreground">
									Prohibitive upfront costs for purchasing essential farming
									machinery.
								</p>
							</CardContent>
						</Card>
						<Card className="flex flex-col items-center text-center">
							<CardHeader className="pb-2 w-full">
								<div className="flex items-center justify-center w-full">
									<Truck className="h-12 w-12 text-primary" />
								</div>
								<CardTitle className="text-xl">Logistics Hurdles</CardTitle>
							</CardHeader>
							<CardContent>
								<p className="text-sm text-muted-foreground">
									Challenges in transportation and distribution of agricultural
									products.
								</p>
							</CardContent>
						</Card>
					</div>
				</div>
			</div>
		</section>
	);
}

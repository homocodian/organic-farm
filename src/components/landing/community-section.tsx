"use client";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { motion } from "framer-motion";

export function CommunitySection() {
	return (
		<section className="w-full py-12 md:py-24 lg:py-32">
			<div className="container mx-auto px-4 md:px-6">
				<div className="grid gap-10 px-10 md:gap-16 lg:grid-cols-2">
					<motion.div
						className="space-y-4"
						initial={{ opacity: 0, x: -50 }}
						whileInView={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.5 }}
						viewport={{ once: true }}
					>
						<Badge className="bg-primary/10 text-primary" variant="secondary">
							Join Our Community
						</Badge>
						<h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-primary">
							Subscribe to our newsletter for organic tips and exclusive offers
						</h2>
						<Button variant="secondary">Subscribe Now</Button>
					</motion.div>
					<motion.div
						className="flex flex-col items-start space-y-4"
						initial={{ opacity: 0, x: 50 }}
						whileInView={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.5 }}
						viewport={{ once: true }}
					>
						<Badge className="bg-primary/10 text-primary" variant="secondary">
							Testimonials
						</Badge>
						<p className="text-gray-600 md:text-xl/relaxed dark:text-muted-foreground">
							&quot;I&#39;ve been ordering from OrganicHarvest for over a year
							now, and the quality of their produce is consistently excellent.
							The vegetables taste like they should - full of flavor and
							freshness!&quot;
						</p>
						<div className="flex items-center space-x-2">
							<Avatar className="h-10 w-10">
								<AvatarImage src="/placeholder.svg" alt="Customer" />
								<AvatarFallback>JD</AvatarFallback>
							</Avatar>
							<div>
								<p className="text-sm font-medium">Jane Doe</p>
								<p className="text-xs text-gray-500">Loyal Customer</p>
							</div>
						</div>
					</motion.div>
				</div>
			</div>
		</section>
	);
}

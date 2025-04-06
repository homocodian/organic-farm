"use client";

import { motion } from "framer-motion";
import { Badge } from "../ui/badge";

export function InfoSection() {
	return (
		<section className="w-full py-12 md:py-24 lg:py-32">
			<div className="container mx-auto px-4 md:px-6">
				<div className="flex flex-col items-center justify-center space-y-4 text-center">
					<motion.div
						className="space-y-2"
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5 }}
						viewport={{ once: true }}
					>
						<Badge className="text-primary bg-primary/10" variant="secondary">
							Why Choose Organic
						</Badge>
						<h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-primary">
							Benefits of Organic Farming
						</h2>
						<p className="max-w-[900px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-muted-foreground">
							Organic farming practices promote soil health, biodiversity, and
							sustainable agriculture. Discover why organic produce is better
							for you and the planet.
						</p>
					</motion.div>
				</div>
				<div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
					{[
						{
							title: "Healthier Food",
							description:
								"Organic produce contains fewer pesticides and no GMOs, making it healthier for consumption.",
							icon: "🥦",
						},
						{
							title: "Environmental Benefits",
							description:
								"Organic farming practices reduce pollution, conserve water, and promote soil fertility.",
							icon: "🌱",
						},
						{
							title: "Support Local Farmers",
							description:
								"By choosing organic, you support sustainable farming practices and local communities.",
							icon: "🧑‍🌾",
						},
					].map((item, index) => (
						<motion.div
							key={index}
							className="flex flex-col items-center space-y-4 rounded-lg border p-6 shadow-sm"
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: index * 0.1 }}
							viewport={{ once: true }}
						>
							<div className="text-4xl">{item.icon}</div>
							<h3 className="text-xl font-bold text-primary">{item.title}</h3>
							<p className="text-gray-600 dark:text-muted-foreground text-center">
								{item.description}
							</p>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
}

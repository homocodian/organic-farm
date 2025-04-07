"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

export function LearnMode() {
	return (
		<section className="w-full py-12 md:py-24 lg:py-32 bg-primary/5" id="learn">
			<div className="container mx-auto px-4 md:px-6">
				<motion.div
					className="flex flex-col items-center justify-center space-y-4 text-center mb-12"
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
					viewport={{ once: true }}
				>
					<div className="space-y-2">
						<Badge className="bg-primary/10 text-primary" variant="secondary">
							Latest Articles
						</Badge>
						<h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-primary">
							Learn More About Organic Farming
						</h2>
						<p className="max-w-[900px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
							Explore our collection of articles about organic farming
							practices, benefits, and tips.
						</p>
					</div>
				</motion.div>
				<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
					{[
						{
							title: "The Benefits of Crop Rotation",
							description:
								"Learn how crop rotation improves soil health and reduces pest problems naturally.",
							date: "May 15, 2023",
							category: "Farming Practices",
							imageUrl: "/images/crop-rotation.webp",
						},
						{
							title: "Seasonal Eating Guide",
							description:
								"Discover the benefits of eating produce that's in season and how it can improve your health.",
							date: "June 3, 2023",
							category: "Nutrition",
							imageUrl: "/images/seasonal-guide.png",
						},
						{
							title: "Composting 101",
							description:
								"A beginner's guide to starting your own compost pile and reducing food waste.",
							date: "July 22, 2023",
							category: "Sustainability",
							imageUrl: "/images/compost.jpg",
						},
					].map((article, index) => (
						<motion.div
							key={index}
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: index * 0.1 }}
							viewport={{ once: true }}
						>
							<Card className="h-full overflow-hidden transition-all hover:shadow-lg py-0">
								<CardHeader className="p-0">
									<div className="h-48 w-full overflow-hidden">
										<Image
											src={`${
												article.imageUrl
											}?height=200&width=400&text=Article+${index + 1}`}
											alt={article.title}
											width={400}
											height={200}
											className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
										/>
									</div>
								</CardHeader>
								<CardContent className="p-6">
									<Badge
										className="bg-primary/10 text-primary"
										variant="secondary"
									>
										{article.category}
									</Badge>
									<CardTitle className="text-xl text-primary">
										{article.title}
									</CardTitle>
									<CardDescription className="mt-2 line-clamp-2">
										{article.description}
									</CardDescription>
								</CardContent>
								<CardFooter className="flex items-center justify-between p-6 pt-0">
									<div className="text-sm text-gray-500 dark:text-muted-foreground">
										{article.date}
									</div>
									<Button variant="ghost">
										Read more
										<ChevronRight className="ml-1 h-4 w-4" />
									</Button>
								</CardFooter>
							</Card>
						</motion.div>
					))}
				</div>
				<div className="flex justify-center mt-10">
					<Button
						variant="outline"
						className="border-primary text-primary hover:text-primary hover:bg-primary/10"
					>
						View All Articles
					</Button>
				</div>
			</div>
		</section>
	);
}

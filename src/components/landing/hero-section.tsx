"use client";

import { motion } from "framer-motion";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function Hero() {
	return (
		<section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-b from-primary/10 dark:from-0% to-white dark:to-background">
			<div className="container mx-auto px-4 md:px-6">
				<div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
					<div className="flex flex-col justify-center space-y-4">
						<div className="space-y-2">
							<motion.div
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.5 }}
							>
								<Badge
									className="bg-primary/10 text-primary"
									variant="secondary"
								>
									100% Organic
								</Badge>
							</motion.div>
							<motion.h1
								className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-primary"
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.5, delay: 0.1 }}
							>
								Farm Fresh Organic Produce Delivered to Your Door
							</motion.h1>
							<motion.p
								className="max-w-[600px] text-gray-600 md:text-xl dark:text-muted-foreground"
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.5, delay: 0.2 }}
							>
								Experience the taste of nature with our carefully selected
								organic fruits and vegetables. Grown with love, harvested with
								care.
							</motion.p>
						</div>
						<motion.div
							className="flex flex-col gap-2 min-[400px]:flex-row"
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: 0.3 }}
						>
							<Button size="lg" asChild>
								<Link href="/products">
									Shop Now
									<ChevronRight className="ml-2 h-4 w-4" />
								</Link>
							</Button>
							<Button variant="outline" size="lg" asChild>
								<Link href="#learn">Learn More</Link>
							</Button>
						</motion.div>
					</div>
					<motion.div
						initial={{ opacity: 0, scale: 0.9 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ duration: 0.7 }}
						className="relative h-[300px] sm:h-[400px] lg:h-[500px] rounded-xl overflow-hidden"
					>
						<Image
							src="/placeholder.jpeg?height=500&width=500"
							alt="Organic vegetables"
							fill
							className="object-cover"
							priority
						/>
					</motion.div>
				</div>
			</div>
		</section>
	);
}

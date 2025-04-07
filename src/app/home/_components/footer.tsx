import { AppConfig } from "@/lib/app-config";
import { Leaf } from "lucide-react";
import Link from "next/link";

export function Footer() {
	return (
		<footer className="w-full border-t bg-primary/5 py-6 md:py-12">
			<div className="container mx-auto flex flex-col gap-6 md:flex-row md:justify-between">
				<div className="flex flex-col space-y-4">
					<Link href="/" className="flex items-center space-x-2">
						<Leaf className="h-6 w-6 text-primary" />
						<span className="font-bold text-primary">{AppConfig.name}</span>
					</Link>
					<p className="max-w-[250px] text-sm text-gray-600 dark:text-muted-foreground">
						Bringing the freshest organic produce from our farms to your table.
					</p>
				</div>
				<div className="grid grid-cols-2 gap-10 sm:grid-cols-4">
					<div className="space-y-3">
						<h3 className="text-sm font-medium text-primary">Shop</h3>
						<ul className="space-y-2 text-sm">
							<li>
								<Link
									href="#"
									className="text-gray-600 dark:text-muted-foreground hover:text-primary/60"
								>
									All Products
								</Link>
							</li>
							<li>
								<Link
									href="#"
									className="text-gray-600 dark:text-muted-foreground hover:text-primary/60"
								>
									Vegetables
								</Link>
							</li>
							<li>
								<Link
									href="#"
									className="text-gray-600 dark:text-muted-foreground hover:text-primary/60"
								>
									Fruits
								</Link>
							</li>
							<li>
								<Link
									href="#"
									className="text-gray-600 dark:text-muted-foreground hover:text-primary/60"
								>
									Dairy
								</Link>
							</li>
						</ul>
					</div>
					<div className="space-y-3">
						<h3 className="text-sm font-medium text-primary">Company</h3>
						<ul className="space-y-2 text-sm">
							<li>
								<Link
									href="#"
									className="text-gray-600 dark:text-muted-foreground hover:text-primary/60"
								>
									About Us
								</Link>
							</li>
							<li>
								<Link
									href="#"
									className="text-gray-600 dark:text-muted-foreground hover:text-primary/60"
								>
									Blog
								</Link>
							</li>
							<li>
								<Link
									href="#"
									className="text-gray-600 dark:text-muted-foreground hover:text-primary/60"
								>
									Careers
								</Link>
							</li>
							<li>
								<Link
									href="#"
									className="text-gray-600 dark:text-muted-foreground hover:text-primary/60"
								>
									Press
								</Link>
							</li>
						</ul>
					</div>
					<div className="space-y-3">
						<h3 className="text-sm font-medium text-primary">Support</h3>
						<ul className="space-y-2 text-sm">
							<li>
								<Link
									href="#"
									className="text-gray-600 dark:text-muted-foreground hover:text-primary/60"
								>
									Help Center
								</Link>
							</li>
							<li>
								<Link
									href="#"
									className="text-gray-600 dark:text-muted-foreground hover:text-primary/60"
								>
									Contact Us
								</Link>
							</li>
							<li>
								<Link
									href="#"
									className="text-gray-600 dark:text-muted-foreground hover:text-primary/60"
								>
									FAQs
								</Link>
							</li>
							<li>
								<Link
									href="#"
									className="text-gray-600 dark:text-muted-foreground hover:text-primary/60"
								>
									Shipping
								</Link>
							</li>
						</ul>
					</div>
					<div className="space-y-3">
						<h3 className="text-sm font-medium text-primary">Legal</h3>
						<ul className="space-y-2 text-sm">
							<li>
								<Link
									href="#"
									className="text-gray-600 dark:text-muted-foreground hover:text-primary/60"
								>
									Privacy Policy
								</Link>
							</li>
							<li>
								<Link
									href="#"
									className="text-gray-600 dark:text-muted-foreground hover:text-primary/60"
								>
									Terms of Service
								</Link>
							</li>
							<li>
								<Link
									href="#"
									className="text-gray-600 dark:text-muted-foreground hover:text-primary/60"
								>
									Cookie Policy
								</Link>
							</li>
							<li>
								<Link
									href="#"
									className="text-gray-600 dark:text-muted-foreground hover:text-primary/60"
								>
									Accessibility
								</Link>
							</li>
						</ul>
					</div>
				</div>
			</div>
			<div className="container mx-auto mt-8 border-t pt-6">
				<p className="text-center text-xs text-accent-foreground">
					© {new Date().getFullYear()} {AppConfig.name}. All rights reserved.
				</p>
			</div>
		</footer>
	);
}

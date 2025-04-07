import Link from "next/link";
import { Facebook, Twitter, Instagram, Youtube } from "lucide-react";

export default function Footer() {
	return (
		<footer className="w-full border-t bg-background">
			<div className="container mx-auto px-4 md:px-6 py-12">
				<div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-5">
					<div className="col-span-2 lg:col-span-2">
						<Link href="/" className="flex items-center space-x-2">
							<span className="text-xl font-bold">FarmConnect</span>
						</Link>
						<p className="mt-2 text-sm text-muted-foreground max-w-xs">
							Connecting farmers directly to markets and providing access to
							affordable equipment rental.
						</p>
						<div className="mt-4 flex space-x-4">
							<Link
								href="#"
								className="text-muted-foreground hover:text-foreground"
							>
								<Facebook className="h-5 w-5" />
								<span className="sr-only">Facebook</span>
							</Link>
							<Link
								href="#"
								className="text-muted-foreground hover:text-foreground"
							>
								<Twitter className="h-5 w-5" />
								<span className="sr-only">Twitter</span>
							</Link>
							<Link
								href="#"
								className="text-muted-foreground hover:text-foreground"
							>
								<Instagram className="h-5 w-5" />
								<span className="sr-only">Instagram</span>
							</Link>
							<Link
								href="#"
								className="text-muted-foreground hover:text-foreground"
							>
								<Youtube className="h-5 w-5" />
								<span className="sr-only">YouTube</span>
							</Link>
						</div>
					</div>
					<div>
						<h3 className="text-sm font-medium">Platform</h3>
						<ul className="mt-2 space-y-2 text-sm">
							<li>
								<Link
									href="#"
									className="text-muted-foreground hover:text-foreground"
								>
									Market Access
								</Link>
							</li>
							<li>
								<Link
									href="#"
									className="text-muted-foreground hover:text-foreground"
								>
									Equipment Rental
								</Link>
							</li>
							<li>
								<Link
									href="#"
									className="text-muted-foreground hover:text-foreground"
								>
									Community
								</Link>
							</li>
							<li>
								<Link
									href="#"
									className="text-muted-foreground hover:text-foreground"
								>
									Market Insights
								</Link>
							</li>
						</ul>
					</div>
					<div>
						<h3 className="text-sm font-medium">Company</h3>
						<ul className="mt-2 space-y-2 text-sm">
							<li>
								<Link
									href="#"
									className="text-muted-foreground hover:text-foreground"
								>
									About Us
								</Link>
							</li>
							<li>
								<Link
									href="#"
									className="text-muted-foreground hover:text-foreground"
								>
									Careers
								</Link>
							</li>
							<li>
								<Link
									href="#"
									className="text-muted-foreground hover:text-foreground"
								>
									Blog
								</Link>
							</li>
							<li>
								<Link
									href="#"
									className="text-muted-foreground hover:text-foreground"
								>
									Press
								</Link>
							</li>
						</ul>
					</div>
					<div>
						<h3 className="text-sm font-medium">Support</h3>
						<ul className="mt-2 space-y-2 text-sm">
							<li>
								<Link
									href="#"
									className="text-muted-foreground hover:text-foreground"
								>
									Help Center
								</Link>
							</li>
							<li>
								<Link
									href="#"
									className="text-muted-foreground hover:text-foreground"
								>
									Contact Us
								</Link>
							</li>
							<li>
								<Link
									href="#"
									className="text-muted-foreground hover:text-foreground"
								>
									FAQs
								</Link>
							</li>
							<li>
								<Link
									href="#"
									className="text-muted-foreground hover:text-foreground"
								>
									Privacy Policy
								</Link>
							</li>
							<li>
								<Link
									href="#"
									className="text-muted-foreground hover:text-foreground"
								>
									Terms of Service
								</Link>
							</li>
						</ul>
					</div>
				</div>
				<div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
					<p>
						&copy; {new Date().getFullYear()} FarmConnect. All rights reserved.
					</p>
				</div>
			</div>
		</footer>
	);
}

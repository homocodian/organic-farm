import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
} from "./ui/navigation-menu";
import { Button } from "./ui/button";
import { Suspense } from "react";
import { ModeToggle } from "./mode-toggle";
import { UserAccount } from "./user-account";
import { AppConfig } from "@/lib/app-config";
import { CartCount } from "@/components/cart-count";

export type HeaderProps = {
	showCart?: boolean;
};

export function Header({ showCart = true }: HeaderProps) {
	return (
		<header className="sticky px-4 top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
			<div className="container mx-auto flex h-16 items-center justify-between">
				<div className="flex items-center gap-6 md:gap-10">
					<Link href="/" className="flex items-center space-x-2">
						<AppConfig.logo />
						<span className="hidden font-bold sm:inline-block">
							{AppConfig.name}
						</span>
					</Link>
					<NavigationMenu>
						<NavigationMenuList>
							<NavigationMenuItem>
								<NavigationMenuTrigger>Products</NavigationMenuTrigger>
								<NavigationMenuContent>
									<ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-2">
										<li className="row-span-3">
											<NavigationMenuLink asChild>
												<Link
													className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-primary/5 to-primary/10 p-6 no-underline outline-none focus:shadow-md"
													href="/products"
												>
													<div className="mb-2 mt-4 text-lg font-medium text-primary">
														Featured Products
													</div>
													<p className="text-sm leading-tight text-primary/80">
														Discover our selection of premium organic produce
													</p>
												</Link>
											</NavigationMenuLink>
										</li>
										<li>
											<Link href="/products" legacyBehavior passHref>
												<NavigationMenuLink className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
													<div className="text-sm font-medium leading-none">
														Explore
													</div>
													<p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
														Fresh, organic from local farms
													</p>
												</NavigationMenuLink>
											</Link>
										</li>
										<li>
											<Link href="/products" legacyBehavior passHref>
												<NavigationMenuLink className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
													<div className="text-sm font-medium leading-none">
														Vegetables
													</div>
													<p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
														Fresh, organic vegetables from local farms
													</p>
												</NavigationMenuLink>
											</Link>
										</li>
										<li>
											<Link href="/products" legacyBehavior passHref>
												<NavigationMenuLink className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
													<div className="text-sm font-medium leading-none">
														Fruits
													</div>
													<p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
														Seasonal fruits grown without pesticides
													</p>
												</NavigationMenuLink>
											</Link>
										</li>
									</ul>
								</NavigationMenuContent>
							</NavigationMenuItem>
							<NavigationMenuItem>
								<Link href="/ai" legacyBehavior passHref>
									<NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50">
										AI
									</NavigationMenuLink>
								</Link>
							</NavigationMenuItem>
							<NavigationMenuItem>
								<Link href="/about" legacyBehavior passHref>
									<NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50">
										About
									</NavigationMenuLink>
								</Link>
							</NavigationMenuItem>
							<NavigationMenuItem>
								<Link href="/contact" legacyBehavior passHref>
									<NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50">
										Contact
									</NavigationMenuLink>
								</Link>
							</NavigationMenuItem>
						</NavigationMenuList>
					</NavigationMenu>
				</div>
				<div className="flex items-center gap-4">
					<UserAccount />
					{showCart && (
						<Button variant="outline" size="icon" className="relative" asChild>
							<Link href="/cart">
								<ShoppingCart className="h-5 w-5" />
								<Suspense>
									<CartCount />
								</Suspense>
							</Link>
						</Button>
					)}
					<ModeToggle />
				</div>
			</div>
		</header>
	);
}

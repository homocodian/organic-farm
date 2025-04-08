import { ShoppingCart, Sparkles } from "lucide-react";
import Link from "next/link";
import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
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
								<Link href="/products" legacyBehavior passHref>
									<NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50">
										Products
									</NavigationMenuLink>
								</Link>
							</NavigationMenuItem>
							<NavigationMenuItem>
								<Link href="/assistant" legacyBehavior passHref>
									<NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50">
										<div className="flex items-center">
											<Sparkles className="mr-2 h-4 w-4" />
											Assistant
										</div>
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

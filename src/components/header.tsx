import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import { Suspense } from "react";
import { UserAccount } from "./user-account";
import { AppConfig } from "@/lib/app-config";
import { CartCount } from "@/components/cart-count";
import { links } from "@/constants/links";
import { HeaderMobileMenu } from "./header-mobile-menu";
import { cn } from "@/lib/utils";

export type HeaderProps = {
	showCart?: boolean;
};

export function Header({ showCart = true }: HeaderProps) {
	return (
		<header
			className={cn(
				"sticky px-4 top-0 z-40 w-full border-b bg-background/95",
				"backdrop-blur supports-[backdrop-filter]:bg-background/60"
			)}
		>
			<div className="container mx-auto flex h-16 items-center justify-between">
				<div className="flex items-center gap-6 md:gap-10">
					<HeaderMobileMenu />
					<Link href="/" className="items-center space-x-2 hidden md:flex">
						<AppConfig.logo />
						<span className="hidden font-bold sm:inline-block">
							{AppConfig.name}
						</span>
					</Link>
					<div className="hidden md:flex">
						<>
							{links.map((link) => (
								<a
									key={link.name}
									href={link.href}
									className={cn(
										"group flex h-10 items-center justify-center gap-2",
										"rounded-md px-4 py-2 text-sm leading-none",
										"font-medium transition-colors hover:bg-accent",
										"hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
										"focus:outline-none disabled:pointer-events-none disabled:opacity-50",
										"data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
									)}
								>
									{link.icon && <link.icon className="size-4" />}
									{link.name}
								</a>
							))}
						</>
					</div>
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
				</div>
			</div>
		</header>
	);
}

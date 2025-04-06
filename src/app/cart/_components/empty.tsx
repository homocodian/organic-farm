import { ShoppingCart } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export function EmptyCart() {
	return (
		<div className="container mx-auto h-full px-4 py-12 md:py-16 grid place-items-center">
			<div className="flex flex-col items-center justify-center py-12 text-center">
				<ShoppingCart className="h-12 w-12 text-muted-foreground mb-4" />
				<h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
				<p className="text-muted-foreground mb-6">
					Looks like you haven&apos;t added anything to your cart yet.
				</p>
				<Button asChild>
					<Link href="/products">Browse Products</Link>
				</Button>
			</div>
		</div>
	);
}

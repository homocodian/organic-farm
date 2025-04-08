import { ShoppingCart } from "lucide-react";
import { db } from "@/server/db";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";

import { EmptyCart } from "./_components/empty";
import { getCurrentUser } from "@/lib/session";
import { cart as cartTable } from "@/server/db/schema/cart";
import { Cart } from "./_components/cart";
import { Header } from "@/components/header";

export default async function CartPage() {
	const user = await getCurrentUser();

	if (!user) {
		redirect("/login");
	}

	const cart = await db.query.cart.findFirst({
		where: eq(cartTable.userId, user.id),
		with: {
			cartItems: {
				with: {
					product: true,
				},
			},
		},
	});

	return (
		<>
			<Header showCart={false} />
			<div className="container mx-auto px-4 py-12 md:py-16">
				{cart ? (
					<>
						<div className="flex items-center gap-2 mb-8">
							<ShoppingCart className="h-6 w-6" />
							<h1 className="text-3xl font-bold tracking-tight">Your Cart</h1>
						</div>
						<Cart cartId={cart.id} cartItems={cart.cartItems} />
					</>
				) : (
					<EmptyCart />
				)}
			</div>
		</>
	);
}

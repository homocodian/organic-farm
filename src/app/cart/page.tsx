import { redirect } from "next/navigation";

import { getCurrentUser } from "@/lib/session";
import { Cart } from "./_components/cart";
import { Header } from "@/components/header";
import { CartProvider } from "../context/cart";
import { getCartData } from "@/server/functions/cart";
import { match } from "@/types";
import { CartItem } from "@/lib/store/cart";

export default async function CartPage() {
	const [user, cartData] = await Promise.all([getCurrentUser(), getCartData()]);
	if (!user) {
		redirect("/login");
	}

	let initialCartItems: CartItem[] = [];

	match(cartData, {
		ok: (items) => {
			initialCartItems = items;
		},
		err: (error) => {
			console.error("Failed to fetch cart data:", error);
		},
	});

	return (
		<>
			<Header showCart={false} />
			<CartProvider initialCartItems={initialCartItems}>
				<div className="container mx-auto px-4 py-12 md:py-16">
					<Cart />
				</div>
			</CartProvider>
		</>
	);
}

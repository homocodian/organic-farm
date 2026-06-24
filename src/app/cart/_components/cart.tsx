"use client";

import React from "react";

import { Card, CardContent } from "@/components/ui/card";
import { OrderSummary } from "./order-summary";
import { CartItem } from "./cart-item";
import { Product } from "@/server/db/schema/product";
import { EmptyCart } from "./empty";
import { useCartStore } from "@/app/context/cart";
import { ShoppingCart } from "lucide-react";

export type CartProps = {
	cartItems: {
		productId: string;
		quantity: number;
		product: Product;
	}[];
	cartId: string;
};

export function Cart() {
	const cart = useCartStore((state) => state.cart);
	const cartItems = React.useMemo(() => Array.from(cart.values()), [cart]);

	if (cartItems.length === 0) {
		return <EmptyCart />;
	}

	return (
		<>
			<div className="flex items-center gap-2 mb-8">
				<ShoppingCart className="h-6 w-6" />
				<h1 className="text-3xl font-bold tracking-tight">Your Cart</h1>
			</div>
			<_Cart cartId="cart-id-placeholder" cartItems={cartItems} />
		</>
	);
}

function _Cart({ cartItems, cartId }: CartProps) {
	if (cartItems.length === 0) {
		return <EmptyCart />;
	}

	return (
		<div className="grid gap-8 lg:grid-cols-3">
			<div className="lg:col-span-2">
				<Card>
					<CardContent className="p-6">
						<div className="grid gap-6">
							{cartItems.map((item) => (
								<CartItem
									key={item.productId}
									quantity={item.quantity}
									product={item.product}
								/>
							))}
						</div>
					</CardContent>
				</Card>
			</div>

			{/* Order Summary */}
			<div>
				<OrderSummary cartId={cartId} cartItems={cartItems} />
			</div>
		</div>
	);
}

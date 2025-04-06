"use client";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { OrderSummary } from "./order-summary";
import { CartItem } from "./cart-item";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Product } from "@/server/db/schema/product";
import { useCallback, useState } from "react";
import { EmptyCart } from "./empty";

export type CartProps = {
	cartItems: {
		productId: string;
		quantity: number;
		product: Product;
	}[];
};

export function Cart({ cartItems }: CartProps) {
	const [items, setItems] = useState(() => cartItems);

	const clearCart = useCallback(() => {
		setItems([]);
	}, []);

	const handleRemoveItem = useCallback((productId: string) => {
		setItems((prevItems) =>
			prevItems.filter((item) => item.productId !== productId)
		);
	}, []);

	const handleUpdateItem = useCallback(
		(productId: string, quantity: number) => {
			if (quantity < 1) {
				handleRemoveItem(productId);
				return;
			}

			setItems((prevItems) =>
				prevItems.map((item) =>
					item.productId === productId
						? {
								...item,
								quantity,
						  }
						: item
				)
			);
		},
		[handleRemoveItem]
	);

	if (items.length === 0) {
		return <EmptyCart />;
	}

	return (
		<div className="grid gap-8 lg:grid-cols-3">
			<div className="lg:col-span-2">
				<Card>
					<CardContent className="p-6">
						<div className="grid gap-6">
							{items.map((item) => (
								<CartItem
									key={item.productId}
									quantity={item.quantity}
									product={item.product}
									handleRemoveItem={handleRemoveItem}
									handleUpdateItem={handleUpdateItem}
								/>
							))}
						</div>
					</CardContent>
					<CardFooter className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between p-6 pt-0">
						<Button variant="outline" asChild>
							<Link href="/products">Continue Shopping</Link>
						</Button>
						<Button variant="outline">Update Cart</Button>
					</CardFooter>
				</Card>
			</div>

			{/* Order Summary */}
			<div>
				<OrderSummary cartItems={items} clearCart={clearCart} />
			</div>
		</div>
	);
}

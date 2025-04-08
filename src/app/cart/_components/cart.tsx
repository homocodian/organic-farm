"use client";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { OrderSummary } from "./order-summary";
import { CartItem } from "./cart-item";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Product } from "@/server/db/schema/product";
import { useCallback, useState } from "react";
import { EmptyCart } from "./empty";
import {
	removeItemFromCart,
	updateItemQuantity,
} from "@/server/functions/cart";
import { useRouter } from "next/navigation";

export type CartProps = {
	cartItems: {
		productId: string;
		quantity: number;
		product: Product;
	}[];
	cartId: string;
};

export function Cart({ cartItems, cartId }: CartProps) {
	const [items, setItems] = useState(() => cartItems);
	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();

	const clearCart = useCallback(() => {
		setItems([]);
	}, []);

	const handleRemoveItem = useCallback(
		async (productId: string) => {
			setItems((prevItems) =>
				prevItems.filter((item) => item.productId !== productId)
			);
			await removeItemFromCart(cartId, productId);
		},
		[cartId]
	);

	const handleUpdateItem = useCallback(
		async (productId: string, quantity: number) => {
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

			await updateItemQuantity(cartId, productId, quantity);
		},
		[handleRemoveItem, cartId]
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
						<Button
							variant="outline"
							onClick={() => {
								setIsLoading(true);
								router.refresh();
							}}
							disabled={isLoading}
						>
							Update Cart
						</Button>
					</CardFooter>
				</Card>
			</div>

			{/* Order Summary */}
			<div>
				<OrderSummary cartId={cartId} cartItems={items} clearCart={clearCart} />
			</div>
		</div>
	);
}

"use client";

import { Badge } from "./ui/badge";
import { useCartStore } from "@/app/context/cart";
import React from "react";

export function CartCount() {
	const getCartCount = useCartStore((state) => state.getCartCount);
	const [count, setCount] = React.useState<number | null>(() => getCartCount());
	const cart = useCartStore((state) => state.cart);

	React.useEffect(() => {
		setCount(getCartCount());
	}, [cart, getCartCount]);

	if (count === null || count <= 0) {
		return null;
	}

	return (
		<Badge className="absolute -right-2 -top-2 h-5 w-5 rounded-full p-0 flex items-center justify-center">
			{count}
		</Badge>
	);
}

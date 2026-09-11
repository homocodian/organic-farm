"use client";

import { CartItem, CartStore, createCartStore } from "@/lib/store/cart";
import React from "react";
import { useStore } from "zustand";
import { usePathname } from "next/navigation";

const CartContext = React.createContext<CartStore | null>(null);

type CartState = ReturnType<CartStore["getState"]>;

type CartProviderProps = {
	children: React.ReactNode;
	initialCartItems?: CartItem[];
};

export const CartProvider = ({
	children,
	initialCartItems,
}: CartProviderProps) => {
	const storeRef = React.useRef<CartStore>(null);
	const pathname = usePathname();

	if (!storeRef.current) {
		const initialCart = new Map(
			initialCartItems?.map((item) => [item.productId, item]) ?? [],
		);
		storeRef.current = createCartStore(
			initialCart,
			initialCartItems === undefined,
		);
	}

	React.useEffect(() => {
		if (initialCartItems === undefined && pathname !== "/cart") {
			storeRef.current?.getState().fetchCart();
		}
	}, [initialCartItems, pathname]);

	return (
		<CartContext.Provider value={storeRef.current}>
			{children}
		</CartContext.Provider>
	);
};

export function useCartStore<T>(selector: (state: CartState) => T): T {
	const store = React.useContext(CartContext);
	if (!store) throw new Error("Missing CartContext.Provider");
	return useStore(store, selector);
}

"use client";

import { CartStore, createCartStore } from "@/lib/store/cart";
import React from "react";
import { useStore } from "zustand";

const CartContext = React.createContext<CartStore | null>(null);

type CartState = ReturnType<CartStore["getState"]>;

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
	const storeRef = React.useRef<CartStore>(null);

	if (!storeRef.current) {
		storeRef.current = createCartStore();
	}

	React.useEffect(() => {
		// Fetch cart data when the component mounts
		storeRef.current?.getState().fetchCart();
	}, []);

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

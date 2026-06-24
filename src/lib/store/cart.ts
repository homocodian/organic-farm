import { Product } from "@/server/db/schema/product";
import {
	addToCart,
	clearCart,
	getCartData,
	removeItemFromCart,
	updateItemQuantity,
} from "@/server/functions/cart";
import { match } from "@/types";
import { create } from "zustand";

type ProductId = string;

export interface CartItem {
	productId: ProductId;
	quantity: number;
	product: Product;
}

export type Cart = Map<ProductId, CartItem>;

interface StoreState {
	cart: Cart;

	fetchCart: () => Promise<void>;
	setCart: (cart: Cart) => void;

	// Cart actions
	addToCart: (
		product: CartItem["product"],
		quantity?: number,
	) => ReturnType<typeof addToCart>;
	incrementQuantity: (
		product: CartItem["product"],
	) => ReturnType<typeof updateItemQuantity>;
	decrementQuantity: (
		product: CartItem["product"],
	) => ReturnType<typeof updateItemQuantity>;
	removeFromCart: (
		productId: ProductId,
	) => ReturnType<typeof removeItemFromCart>;
	clearCart: () => ReturnType<typeof clearCart>;

	// Selectors/helpers
	getCartQuantity: (productId: ProductId) => number;
	getCartCount: () => number;
}

export const createCartStore = (initialCartItems: Cart = new Map()) => {
	return create<StoreState>((set, get) => ({
		cart: initialCartItems,

		setCart: (cart) => set({ cart }),

		fetchCart: async () => {
			const cartData = await getCartData();

			match(cartData, {
				ok: (data) => {
					const cartItemsMap = new Map<ProductId, CartItem>();
					data.forEach((item) => {
						cartItemsMap.set(item.productId, item);
					});
					set({ cart: cartItemsMap });
				},
				err: (error) => {
					console.error("Failed to fetch cart data:", error);
				},
			});
		},

		addToCart: async (product: CartItem["product"], quantity = 1) => {
			const existingItem = get().cart.get(product.id);

			set((state) => {
				const cart = new Map(state.cart);

				cart.set(product.id, {
					productId: product.id,
					quantity: (existingItem?.quantity ?? 0) + quantity,
					product,
				});

				return { cart };
			});

			if (existingItem) {
				const data = await updateItemQuantity(
					product.id,
					get().getCartQuantity(product.id) + quantity,
				);

				if ("error" in data) {
					set((state) => {
						const cart = new Map(state.cart);

						cart.set(product.id, existingItem);

						return { cart };
					});
				}

				return data;
			} else {
				const data = await addToCart(product.id);
				if ("error" in data) {
					set((state) => {
						const cart = new Map(state.cart);

						cart.delete(product.id);

						return { cart };
					});
				}
				return data;
			}
		},

		incrementQuantity: async (product: CartItem["product"]) => {
			set((state) => {
				const cart = new Map(state.cart);

				const existing = cart.get(product.id);

				cart.set(product.id, {
					productId: product.id,
					quantity: (existing?.quantity ?? 0) + 1,
					product: existing?.product ?? product,
				});

				return { cart };
			});

			const data = await updateItemQuantity(
				product.id,
				get().getCartQuantity(product.id) + 1,
			);

			if ("error" in data) {
				set((state) => {
					const cart = new Map(state.cart);

					const existing = cart.get(product.id);

					if (existing) {
						cart.set(product.id, {
							productId: product.id,
							quantity: existing.quantity - 1,
							product: existing.product,
						});
					}

					return { cart };
				});
			}

			return data;
		},

		decrementQuantity: async (product: CartItem["product"]) => {
			set((state) => {
				const cart = new Map(state.cart);

				const existing = cart.get(product.id);

				if (!existing) {
					return { cart };
				}

				const nextQuantity = existing.quantity - 1;

				if (nextQuantity <= 0) {
					cart.delete(product.id);
				} else {
					cart.set(product.id, {
						...existing,
						quantity: nextQuantity,
					});
				}

				return { cart };
			});

			const data = await updateItemQuantity(
				product.id,
				Math.max(get().getCartQuantity(product.id) - 1, 0),
			);

			if ("error" in data) {
				set((state) => {
					const cart = new Map(state.cart);

					const existing = cart.get(product.id);

					if (existing) {
						cart.set(product.id, {
							productId: product.id,
							quantity: existing.quantity + 1,
							product: existing.product,
						});
					}

					return { cart };
				});
			}

			return data;
		},

		removeFromCart: async (productId) => {
			const cart = new Map(get().cart);

			set(() => {
				cart.delete(productId);
				return { cart };
			});

			const data = await removeItemFromCart(productId);

			match(data, {
				ok: () => {
					// Successfully removed item from cart
				},
				err: (error) => {
					console.error("Failed to remove item from cart:", error);
					set(() => {
						return { cart };
					});
				},
			});

			return data;
		},

		clearCart: async () => {
			const cartItems = get().cart;
			set({
				cart: new Map(),
			});
			const data = await clearCart();
			if ("error" in data) {
				set(() => {
					return { cart: new Map(cartItems) };
				});
			}
			return data;
		},

		getCartQuantity: (productId) => get().cart.get(productId)?.quantity ?? 0,

		getCartCount: () =>
			Array.from(get().cart.values()).reduce(
				(sum, item) => sum + item.quantity,
				0,
			),
	}));
};

export type CartStore = ReturnType<typeof createCartStore>;

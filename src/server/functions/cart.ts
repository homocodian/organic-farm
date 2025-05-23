"use server";

import "server-only";
import { getCurrentUser } from "@/lib/session";
import { db } from "../db";
import {
	cartItem as cartItemTable,
	cart as cartTable,
} from "../db/schema/cart";

import { and, eq } from "drizzle-orm";

export async function addToCart(productId: string) {
	const user = await getCurrentUser();

	if (!user) {
		return {
			error: "User not authenticated",
			statusCode: 401,
		};
	}

	try {
		let [cart] = await db
			.select()
			.from(cartTable)
			.where(eq(cartTable.userId, user.id))
			.limit(1);

		console.log("🚀 ~ addToCart ~ cart:", cart);

		if (!cart) {
			console.log("Creating cart for user", user.id);
			const newCart = await createCart(user.id);
			cart = newCart[0];
		}

		const [cartItem] = await db
			.insert(cartItemTable)
			.values({
				cartId: cart.id,
				productId,
			})
			.returning();

		console.log("🚀 ~ addToCart ~ cartItem:", cartItem);

		if (!cartItem) {
			return {
				error: "Failed to add item to cart",
				statusCode: 500,
			};
		}

		return cartItem;
	} catch (error) {
		console.error("🚀 ~ addToCart ~ error:", error);

		if (
			// @ts-expect-error any
			error?.code === "23505" &&
			// @ts-expect-error any
			error?.constraint_name === "cart_item_cart_id_product_id_pk"
		) {
			return {
				error: "Item already in cart",
				statusCode: 409,
			};
		}

		return {
			error: "Failed to add item to cart",
			statusCode: 500,
		};
	}
}

function createCart(userId: string) {
	return db.insert(cartTable).values({ userId }).returning();
}

export async function removeItemFromCart(cartId: string, productId: string) {
	const user = await getCurrentUser();

	if (!user) {
		return {
			error: "User not authenticated",
			statusCode: 401,
		};
	}

	try {
		const [cart] = await db
			.select()
			.from(cartTable)
			.where(eq(cartTable.userId, user.id));

		if (cart.id !== cartId) {
			return {
				error: "Cart not found",
				statusCode: 404,
			};
		}

		const [cartItem] = await db
			.delete(cartItemTable)
			.where(
				and(
					eq(cartItemTable.cartId, cartId),
					eq(cartItemTable.productId, productId)
				)
			)
			.returning();

		if (!cartItem) {
			return {
				error: "Failed to remove item from cart",
				statusCode: 500,
			};
		}

		return cartItem;
	} catch (error) {
		console.error("🚀 ~ removeItemFromCart ~ error:", error);
		return {
			error: "Failed to remove item from cart",
			statusCode: 500,
		};
	}
}

export async function clearCart(cartId: string) {
	const user = await getCurrentUser();

	if (!user) {
		return {
			error: "User not authenticated",
			statusCode: 401,
		};
	}

	try {
		const [cart] = await db
			.select()
			.from(cartTable)
			.where(eq(cartTable.userId, user.id));

		if (cart.id !== cartId) {
			return {
				error: "Cart not found",
				statusCode: 404,
			};
		}

		await db.delete(cartItemTable).where(eq(cartItemTable.cartId, cartId));
		return {
			error: null,
			statusCode: 200,
		};
	} catch (error) {
		console.error("🚀 ~ clearCart ~ error:", error);
		return {
			error: "Failed to clear cart",
			statusCode: 500,
		};
	}
}

export async function updateItemQuantity(
	cartId: string,
	productId: string,
	quantity: number
) {
	const user = await getCurrentUser();

	if (!user) {
		return {
			error: "User not authenticated",
			statusCode: 401,
		};
	}

	try {
		const [cart] = await db
			.select()
			.from(cartTable)
			.where(eq(cartTable.userId, user.id));

		if (cart.id !== cartId) {
			return {
				error: "Cart not found",
				statusCode: 404,
			};
		}

		const [cartItem] = await db
			.update(cartItemTable)
			.set({ quantity })
			.where(
				and(
					eq(cartItemTable.cartId, cartId),
					eq(cartItemTable.productId, productId)
				)
			)
			.returning();

		if (!cartItem) {
			return {
				error: "Failed to update item quantity",
				statusCode: 500,
			};
		}

		return cartItem;
	} catch (error) {
		console.error("🚀 ~ incrementItemQuantity ~ error:", error);
		return {
			error: "Failed to update item quantity",
			statusCode: 500,
		};
	}
}

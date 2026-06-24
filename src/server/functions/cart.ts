"use server";

import "server-only";
import { getCurrentUser } from "@/lib/session";
import { db } from "../db";
import {
	cartItem as cartItemTable,
	cart as cartTable,
} from "../db/schema/cart";

import { and, eq } from "drizzle-orm";
import { err, flatMapAsync, mapAsync, ok, tryCatchAsync } from "@/types";

export type CartError =
	| { readonly _tag: "UserNotFound" }
	| { readonly _tag: "DatabaseError"; readonly cause: unknown }
	| { readonly _tag: "CartNotFoundError"; readonly cause: unknown };

const userNotFound = (): CartError => Object.freeze({ _tag: "UserNotFound" });
const databaseError = (cause: unknown): CartError =>
	Object.freeze({ _tag: "DatabaseError", cause });
const cartNotFoundError = (cause: unknown): CartError =>
	Object.freeze({ _tag: "CartNotFoundError", cause });

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

async function getUser() {
	const user = await getCurrentUser();

	if (!user) {
		return err(userNotFound());
	}

	return ok(user);
}

export async function removeItemFromCart(productId: string) {
	return mapAsync(getUser(), async (user) => {
		try {
			const [cart] = await db
				.select()
				.from(cartTable)
				.where(eq(cartTable.userId, user.id));

			if (!cart) {
				return err(cartNotFoundError("Cart not found for user"));
			}

			const [cartItem] = await db
				.delete(cartItemTable)
				.where(
					and(
						eq(cartItemTable.cartId, cart.id),
						eq(cartItemTable.productId, productId),
					),
				)
				.returning();

			if (!cartItem) {
				return err(cartNotFoundError("Failed to remove item from cart"));
			}

			return ok(cartItem);
		} catch (error) {
			console.error("🚀 ~ removeItemFromCart ~ error:", error);
			return err(databaseError("Failed to remove item from cart"));
		}
	});
}

export async function clearCart() {
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

		if (!cart) {
			return {
				error: "Cart not found",
				statusCode: 404,
			};
		}

		await db.delete(cartItemTable).where(eq(cartItemTable.cartId, cart.id));
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

export async function updateItemQuantity(productId: string, quantity: number) {
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

		if (!cart) {
			return {
				error: "Cart not found",
				statusCode: 404,
			};
		}

		if (quantity <= 0) {
			const [cartItem] = await db
				.delete(cartItemTable)
				.where(
					and(
						eq(cartItemTable.cartId, cart.id),
						eq(cartItemTable.productId, productId),
					),
				)
				.returning();

			if (!cartItem) {
				return {
					error: "Failed to remove item from cart",
					statusCode: 500,
				};
			}

			return cartItem;
		}

		const [cartItem] = await db
			.update(cartItemTable)
			.set({ quantity })
			.where(
				and(
					eq(cartItemTable.cartId, cart.id),
					eq(cartItemTable.productId, productId),
				),
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
		console.error("🚀 ~ updateItemQuantity ~ error:", error);
		return {
			error: "Failed to update item quantity",
			statusCode: 500,
		};
	}
}

const getCartDataOfUser = (userId: string) =>
	tryCatchAsync(
		() =>
			db.query.cart.findMany({
				where(fields, operators) {
					return operators.eq(fields.userId, userId);
				},
				with: {
					cartItems: {
						columns: {
							quantity: true,
							productId: true,
						},
						with: {
							product: true,
						},
					},
				},
			}),
		databaseError,
	)();

/**
 * Returns all cart items for the current user, or a typed CartError.
 *
 * @example
 * const result = await getCartData();
 *
 * match(result, {
 *   ok:  (items) => renderCart(items),
 *   err: (e) => {
 *     if (e._tag === "UserNotFound") return redirectToLogin();
 *     if (e._tag === "DatabaseError") return showRetryBanner(e.cause);
 *   },
 * });
 */
export const getCartData = async () => {
	return flatMapAsync(getUser(), async (user) =>
		flatMapAsync(getCartDataOfUser(user.id), (rows) =>
			Promise.resolve(ok(rows.flatMap((c) => c.cartItems))),
		),
	);
};

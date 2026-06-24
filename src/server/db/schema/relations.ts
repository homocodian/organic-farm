import { relations } from "drizzle-orm";

import { address } from "./address";
import { cart, cartItem } from "./cart";
import { product } from "./product";
import { supplier } from "./supplier";
import { user } from "./user";

export const userRelations = relations(user, ({ one }) => ({
	cart: one(cart, {
		fields: [user.id],
		references: [cart.userId],
	}),
}));

export const addressRelation = relations(address, ({ one }) => ({
	user: one(user, {
		fields: [address.userId],
		references: [user.id],
	}),
	supplier: one(supplier, {
		fields: [address.supplierId],
		references: [supplier.id],
	}),
}));

export const supplierRelations = relations(supplier, ({ one }) => ({
	user: one(user, { fields: [supplier.userId], references: [user.id] }),
}));

export const productRelations = relations(product, ({ one, many }) => ({
	user: one(user, {
		fields: [product.userId],
		references: [user.id],
	}),
	cartItems: many(cartItem),
}));

export const cartsRelations = relations(cart, ({ many }) => ({
	cartItems: many(cartItem),
}));

export const cartItemsRelations = relations(cartItem, ({ one }) => ({
	product: one(product, {
		fields: [cartItem.productId],
		references: [product.id],
	}),
	cart: one(cart, { fields: [cartItem.cartId], references: [cart.id] }),
}));

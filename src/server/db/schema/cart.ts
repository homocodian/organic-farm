import { relations } from "drizzle-orm";
import {
	integer,
	pgTable,
	text,
	uuid,
	timestamp,
	primaryKey,
	index,
} from "drizzle-orm/pg-core";
import { product } from "./product";
import { user } from "./user";

export const cart = pgTable(
	"cart",
	{
		id: uuid("id").notNull().primaryKey().defaultRandom(),
		userId: text("user_id")
			.notNull()
			.references(() => user.id, { onDelete: "cascade" }),
	},
	(t) => [index("cart_user_idx").on(t.userId)]
);

export const cartItem = pgTable(
	"cart_item",
	{
		cartId: uuid("cart_id")
			.notNull()
			.references(() => cart.id),
		productId: uuid("product_id")
			.notNull()
			.references(() => product.id),
		quantity: integer("quantity").notNull().default(1),
		createdAt: timestamp("created_at", { withTimezone: true, mode: "date" })
			.defaultNow()
			.notNull(),
		updatedAt: timestamp("updated_at", { withTimezone: true, mode: "date" })
			.notNull()
			.defaultNow()
			.$onUpdate(() => new Date()),
	},
	(table) => [primaryKey({ columns: [table.cartId, table.productId] })]
);

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

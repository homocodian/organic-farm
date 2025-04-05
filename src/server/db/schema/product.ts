import {
	index,
	pgEnum,
	pgTable,
	real,
	text,
	uuid,
	timestamp,
} from "drizzle-orm/pg-core";
import { user } from "./user";
import { relations } from "drizzle-orm";
import { cartItem } from "./cart";

export const productCategory = pgEnum("product_category", [
	"Machinery",
	"Vegetable",
	"Cereal",
	"Millets",
	"Pulses",
	"Fruits",
	"Sugar crops",
	"Fibre crops",
	"Flower crops",
	"Narcotics",
	"Medicinal & aromatic plants",
	"Leaves",
	"Milk products",
	"Others",
]);

export const productType = pgEnum("product_type", [
	"Purchasable",
	"Rentable",
	"Contract",
	"Biddable",
]);

export const quantityType = pgEnum("product_quantity_type", [
	"Kg",
	"Quintal",
	"Hours",
]);

export const product = pgTable(
	"product",
	{
		id: uuid("id").notNull().primaryKey().defaultRandom(),
		name: text("name").notNull(),
		description: text("description").notNull(),
		category: productCategory("category").notNull(),
		quatityType: productType("quantity_type").notNull(),
		amount: real("amount").notNull(),
		userId: text("user_id")
			.notNull()
			.references(() => user.id, { onDelete: "cascade" }),
		createdAt: timestamp("created_at", { withTimezone: true, mode: "date" })
			.defaultNow()
			.notNull(),
		updatedAt: timestamp("updated_at", { withTimezone: true, mode: "date" })
			.notNull()
			.defaultNow()
			.$onUpdate(() => new Date()),
	},
	(t) => [index("product_user_idx").on(t.userId)]
);

export const productRelations = relations(product, ({ one, many }) => ({
	user: one(user, {
		fields: [product.userId],
		references: [user.id],
	}),
	cartItems: many(cartItem),
}));

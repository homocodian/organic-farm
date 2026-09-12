import {
	index,
	integer,
	pgEnum,
	pgTable,
	real,
	text,
	timestamp,
	uniqueIndex,
	uuid,
} from "drizzle-orm/pg-core";
import { product } from "./product";
import { user } from "./user";

export const orderPaymentStatus = pgEnum("order_payment_status", [
	"pending",
	"paid",
	"failed",
	"cancelled",
]);

export const order = pgTable(
	"order",
	{
		id: uuid("id").notNull().primaryKey().defaultRandom(),
		userId: text("user_id")
			.notNull()
			.references(() => user.id, { onDelete: "cascade" }),
		razorpayOrderId: text("razorpay_order_id").notNull(),
		paymentId: text("payment_id"),
		paymentSignature: text("payment_signature"),
		amount: integer("amount").notNull(),
		currency: text("currency").notNull(),
		paymentStatus: orderPaymentStatus("payment_status")
			.notNull()
			.default("pending"),
		failureReason: text("failure_reason"),
		createdAt: timestamp("created_at", { withTimezone: true, mode: "date" })
			.defaultNow()
			.notNull(),
		updatedAt: timestamp("updated_at", { withTimezone: true, mode: "date" })
			.defaultNow()
			.$onUpdate(() => new Date()),
	},
	(table) => [
		uniqueIndex("order_razorpay_order_id_idx").on(table.razorpayOrderId),
		index("order_user_idx").on(table.userId),
	],
);

export const orderItem = pgTable(
	"order_item",
	{
		id: uuid("id").notNull().primaryKey().defaultRandom(),
		orderId: uuid("order_id")
			.notNull()
			.references(() => order.id, { onDelete: "cascade" }),
		productId: uuid("product_id").references(() => product.id, {
			onDelete: "set null",
		}),
		productName: text("product_name").notNull(),
		unitAmount: real("unit_amount").notNull(),
		quantity: integer("quantity").notNull(),
	},
	(table) => [index("order_item_order_idx").on(table.orderId)],
);

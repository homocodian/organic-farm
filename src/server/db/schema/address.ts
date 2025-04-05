import { relations } from "drizzle-orm";
import {
	integer,
	pgTable,
	text,
	uuid,
	timestamp,
	index,
} from "drizzle-orm/pg-core";
import { user } from "./user";
import { supplier } from "./supplier";

export const address = pgTable(
	"address",
	{
		id: uuid().notNull().primaryKey().defaultRandom(),
		city: text("city").notNull(),
		state: text("state").notNull(),
		street: text("street").notNull(),
		landmark: text("landmark"),
		pinCode: integer("pin_code").notNull(),
		phone: text("phone").notNull(),
		alternatePhone: text("alternate_phone"),

		userId: text("user_id").references(() => user.id, { onDelete: "cascade" }),
		supplierId: uuid("supplier_id").references(() => supplier.id, {
			onDelete: "cascade",
		}),

		createdAt: timestamp("created_at", { withTimezone: true, mode: "date" })
			.defaultNow()
			.notNull(),
		updatedAt: timestamp("updated_at", { withTimezone: true, mode: "date" })
			.notNull()
			.defaultNow()
			.$onUpdate(() => new Date()),
	},
	(t) => [index("address_user_idx").on(t.userId)]
);

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

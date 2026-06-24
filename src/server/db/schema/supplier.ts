import { pgTable, text, uuid, index } from "drizzle-orm/pg-core";
import { user } from "./user";

export const supplier = pgTable(
	"supplier",
	{
		id: uuid().notNull().primaryKey().defaultRandom(),
		userId: text("user_id")
			.notNull()
			.references(() => user.id, { onDelete: "cascade" }),
		companyName: text("company_name").notNull(),
		license: text("license").notNull(),
	},
	(t) => [index("supplier_user_idx").on(t.userId)],
);

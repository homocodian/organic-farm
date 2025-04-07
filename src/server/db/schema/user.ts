import { relations } from "drizzle-orm";
import { pgTable, text, timestamp, boolean, pgEnum } from "drizzle-orm/pg-core";
import { address } from "./address";
import { supplier } from "./supplier";
import { cart } from "./cart";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

export const userRole = pgEnum("role", ["buyer", "seller", "supplier"]);

export const userRoles = userRole.enumValues;
export type UserRole = (typeof userRoles)[number];

export const user = pgTable("user", {
	id: text("id").primaryKey(),
	name: text("name").notNull(),
	email: text("email").notNull().unique(),
	emailVerified: boolean("email_verified").notNull(),
	image: text("image"),
	phone: text("phone"),
	role: userRole("role").notNull().default("buyer"),
	onboardingCompleted: boolean("onboarding_completed").notNull().default(false),
	alternatePhone: text("alternate_phone"),
	createdAt: timestamp("created_at").notNull(),
	updatedAt: timestamp("updated_at").notNull(),
});

export const session = pgTable("session", {
	id: text("id").primaryKey(),
	expiresAt: timestamp("expires_at").notNull(),
	token: text("token").notNull().unique(),
	createdAt: timestamp("created_at").notNull(),
	updatedAt: timestamp("updated_at").notNull(),
	ipAddress: text("ip_address"),
	userAgent: text("user_agent"),
	userId: text("user_id")
		.notNull()
		.references(() => user.id, { onDelete: "cascade" }),
});

export const account = pgTable("account", {
	id: text("id").primaryKey(),
	accountId: text("account_id").notNull(),
	providerId: text("provider_id").notNull(),
	userId: text("user_id")
		.notNull()
		.references(() => user.id, { onDelete: "cascade" }),
	accessToken: text("access_token"),
	refreshToken: text("refresh_token"),
	idToken: text("id_token"),
	accessTokenExpiresAt: timestamp("access_token_expires_at"),
	refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
	scope: text("scope"),
	password: text("password"),
	createdAt: timestamp("created_at").notNull(),
	updatedAt: timestamp("updated_at").notNull(),
});

export const verification = pgTable("verification", {
	id: text("id").primaryKey(),
	identifier: text("identifier").notNull(),
	value: text("value").notNull(),
	expiresAt: timestamp("expires_at").notNull(),
	createdAt: timestamp("created_at"),
	updatedAt: timestamp("updated_at"),
});

export const userRelations = relations(user, ({ one, many }) => ({
	supplier: one(supplier),
	addresses: many(address),
	cart: one(cart, {
		fields: [user.id],
		references: [cart.userId],
	}),
}));

export const userInsertSchema = createInsertSchema(user).omit({
	id: true,
	emailVerified: true,
	createdAt: true,
	updatedAt: true,
	email: true,
});
export type UserInsertSchema = typeof userInsertSchema._type;

export const userSelectSchema = createSelectSchema(user);
export type UserSelectSchema = typeof userSelectSchema._type;

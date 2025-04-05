import { Hono } from "hono";
import { authHandler } from "../utils/auth-handler";
import { Session, User } from "@/lib/client-auth";
import { db } from "../db";
import {
	userInsertSchema,
	UserSelectSchema,
	user as userTable,
} from "../db/schema/user";
import { eq } from "drizzle-orm";
import { onboardingSchema } from "@/lib/schema/onboarding";
import { address } from "../db/schema/address";
import { supplier } from "../db/schema/supplier";
import { zValidator } from "../utils/zod-validator";
import { cart } from "../db/schema/cart";

export const user = new Hono<{
	Variables: {
		user: User;
		session: Session;
	};
}>()
	.use("*", authHandler)
	.get("/me", (c) => {
		const user = c.get("user");
		return c.json(user);
	})
	.patch("/me", async (c) => {
		const user = c.get("user");

		const body = await c.req.json();
		const parsedUser = userInsertSchema.partial().safeParse(body);

		if (!parsedUser.success) {
			return c.json(
				{ error: Object.values(parsedUser.error.flatten().fieldErrors) },
				400
			);
		}

		try {
			const [updatedUser] = await db
				.update(userTable)
				.set(parsedUser.data)
				.where(eq(userTable.id, user.id))
				.returning();

			if (!updatedUser) {
				return c.json({ error: "User not found" }, 404);
			}

			return c.json(updatedUser);
		} catch (error) {
			console.error("Error updating user:", error);
			return c.json({ error: "Internal server error" }, 500);
		}
	})
	.post("/onboarding", zValidator("json", onboardingSchema), async (c) => {
		const user = c.get("user");

		if (user.onboardingCompleted) {
			return c.json({ error: "User already onboarded" }, 400);
		}

		const body = c.req.valid("json");

		try {
			const updatedUser = await db.transaction(async (tx) => {
				const promises = [
					tx
						.update(userTable)
						.set({
							role: body.role,
							phone: body.phone,
							alternatePhone: body.alternatePhone,
							onboardingCompleted: true,
						})
						.where(eq(userTable.id, user.id))
						.returning(),
					tx
						.insert(address)
						.values({
							userId: user.id,
							city: body.city,
							state: body.state,
							street: body.street,
							pinCode: body.pinCode,
							phone: body.addressPhone,
							landmark: body.landmark,
							alternatePhone: body.addressAlternatePhone,
						})
						.returning(),
					tx.insert(cart).values({
						userId: user.id,
					}),
				];

				if (body.role === "supplier" && body.companyName && body.license) {
					const supplierPromise = tx
						.insert(supplier)
						.values({
							companyName: body.companyName!,
							license: body.license!.toString(),
							userId: user.id,
						})
						.returning();

					// @ts-expect-error any
					promises.push(supplierPromise);
				}

				const [updatedUser] = await Promise.all(promises);

				return updatedUser[0] as UserSelectSchema | undefined;
			});

			if (!updatedUser) {
				return c.json({ error: "User not found" }, 404);
			}

			return c.json(updatedUser);
		} catch (error) {
			console.error("Error updating user:", error);
			return c.json({ error: "Internal server error" }, 500);
		}
	});

import { Session, User } from "@/lib/client-auth";
import { Hono } from "hono";
import { zValidator } from "../utils/zod-validator";
import {
	product as productTable,
	productInsertSchema,
} from "../db/schema/product";
import { authHandler } from "../utils/auth-handler";
import { db } from "../db";

export const product = new Hono<{
	Variables: {
		user?: User;
		session?: Session;
	};
}>()
	.on(["POST", "PATCH", "DELETE", "PUT"], "*", authHandler)
	.get("/", async (c) => {
		try {
			const products = await db.query.product.findMany();
			return c.json(products, 200);
		} catch {
			return c.json({ error: "Error fetching products" }, 500);
		}
	})
	.post("/", zValidator("json", productInsertSchema), async (c) => {
		const user = c.get("user")!;
		const body = c.req.valid("json");

		try {
			const [product] = await db
				.insert(productTable)
				.values({
					...body,
					userId: user.id,
				})
				.returning();

			return c.json(product, 201);
		} catch {
			return c.json({ error: "Error creating product" }, 500);
		}
	});

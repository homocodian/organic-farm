"use server";

import "server-only";

import { revalidateTag } from "next/cache";

import { product, ProductInsertSchema } from "../db/schema/product";
import { getCurrentUser } from "@/lib/session";
import { db } from "../db";
import { eq } from "drizzle-orm";

export async function createProduct(body: ProductInsertSchema) {
	try {
		const user = await getCurrentUser();

		if (!user) {
			return { error: "User not found", data: null };
		}

		const data = await db
			.insert(product)
			.values({
				...body,
				userId: user.id,
			})
			.returning();

		if (!data) {
			return { error: "Failed to create product" };
		}

		revalidateTag("products");

		return { data };
	} catch (error) {
		console.log("Error", error);

		return {
			error: "Failed to create product",
		};
	}
}

export async function updateProduct(body: Partial<ProductInsertSchema>) {
	try {
		const user = await getCurrentUser();

		if (!user) {
			return { error: "User not found", data: null };
		}

		const data = await db
			.update(product)
			.set({
				...body,
			})
			.where(eq(product.id, user.id))
			.returning();

		if (!data) {
			return { error: "Failed to create product" };
		}

		revalidateTag("products");

		return { data };
	} catch (error) {
		console.log("Error", error);

		return {
			error: "Failed to create product",
		};
	}
}

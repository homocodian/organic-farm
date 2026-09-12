import crypto from "node:crypto";

import Razorpay from "razorpay";
import { Hono, type Context } from "hono";
import { z } from "zod";
import { and, eq } from "drizzle-orm";

import { db } from "@/server/db";
import { cartItem } from "@/server/db/schema/cart";
import { order as orderTable, orderItem } from "@/server/db/schema/order";
import { product } from "@/server/db/schema/product";
import { getCurrentUser } from "@/lib/session";
import { err, matchAsync, ok, tryCatchAsync, type Result } from "@/types";
import { zValidator } from "../utils/zod-validator";

const createOrderSchema = z.object({
	currency: z.string().length(3).default("INR"),
	receipt: z.string().min(1).max(40),
});

const verifyPaymentSchema = z.object({
	razorpay_order_id: z.string().min(1),
	razorpay_payment_id: z.string().min(1),
	razorpay_signature: z.string().min(1),
});

const failedPaymentSchema = z.object({
	razorpay_order_id: z.string().min(1),
	status: z.enum(["failed", "cancelled"]).default("failed"),
	reason: z.string().trim().min(1).max(500).default("Payment failed"),
});

type PaymentVerificationError = "invalid_signature";

const verifySignature = (
	input: z.infer<typeof verifyPaymentSchema>,
): Result<void, PaymentVerificationError> => {
	const secret = process.env.RAZORPAY_KEY_SECRET;
	if (!secret) return err("invalid_signature");

	const expectedSignature = crypto
		.createHmac("sha256", secret)
		.update(`${input.razorpay_order_id}|${input.razorpay_payment_id}`)
		.digest("hex");
	const expected = Buffer.from(expectedSignature, "utf8");
	const received = Buffer.from(input.razorpay_signature, "utf8");

	return expected.length === received.length &&
		crypto.timingSafeEqual(expected, received)
		? ok(undefined)
		: err("invalid_signature");
};

const razorpay = new Razorpay({
	key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID ?? "",
	key_secret: process.env.RAZORPAY_KEY_SECRET ?? "",
});

export const payment = new Hono()
	.post("/orders", zValidator("json", createOrderSchema), async (c) => {
		const user = await getCurrentUser();
		if (!user) return c.json({ error: "Please sign in to checkout" }, 401);

		const { currency, receipt } = c.req.valid("json");
		const cartRows = await db.query.cart.findFirst({
			where: (fields, operators) => operators.eq(fields.userId, user.id),
			with: { cartItems: { with: { product: true } } },
		});
		if (!cartRows?.cartItems.length)
			return c.json({ error: "Your cart is empty" }, 400);

		const amount = cartRows.cartItems.reduce(
			(total, item) =>
				// Razorpay expects the amount in the smallest currency unit (e.g., paise for INR)
				total + Math.round(item.product.amount * 100) * item.quantity,
			0,
		);

		try {
			const order = await razorpay.orders.create({ amount, currency, receipt });
			const [savedOrder] = await db
				.insert(orderTable)
				.values({
					userId: user.id,
					razorpayOrderId: order.id,
					amount,
					currency: order.currency,
				})
				.returning({ id: orderTable.id });
			if (!savedOrder) throw new Error("Unable to save order");
			return c.json(
				{
					order_id: order.id,
					amount: order.amount,
					currency: order.currency,
				},
				201,
			);
		} catch (error) {
			const statusCode =
				typeof error === "object" &&
				error !== null &&
				"statusCode" in error &&
				typeof error.statusCode === "number"
					? error.statusCode
					: 500;

			if (statusCode === 401) {
				return c.json({ error: "Razorpay authentication failed" }, 401);
			}

			return c.json({ error: "Unable to create order" }, 500);
		}
	})
	.post("/verify", zValidator("json", verifyPaymentSchema), async (c) => {
		const input = c.req.valid("json");
		return matchAsync(verifySignature(input), {
			err: () =>
				c.json({ error: "Payment signature mismatch" }, 400) as Response,
			ok: async () => {
				const userResult = await tryCatchAsync(
					() => getCurrentUser(),
					() => "session_error" as const,
				)();
				return matchAsync(userResult, {
					err: () =>
						c.json({ error: "Unable to verify your session" }, 500) as Response,
					ok: async (user) => {
						if (!user)
							return c.json(
								{ error: "Please sign in to verify payment" },
								401,
							) as Response;

						return finalizePayment(c, input, user.id);
					},
				});
			},
		});
	})
	.post("/failed", zValidator("json", failedPaymentSchema), async (c) => {
		const userResult = await tryCatchAsync(
			() => getCurrentUser(),
			() => "session_error" as const,
		)();
		return matchAsync(userResult, {
			err: () =>
				c.json({ error: "Unable to update payment status" }, 500) as Response,
			ok: async (user) => {
				if (!user)
					return c.json(
						{ error: "Please sign in to update payment" },
						401,
					) as Response;
				const input = c.req.valid("json");
				const updateResult = await tryCatchAsync(
					() =>
						db
							.update(orderTable)
							.set({ paymentStatus: input.status, failureReason: input.reason })
							.where(
								and(
									eq(orderTable.razorpayOrderId, input.razorpay_order_id),
									eq(orderTable.userId, user.id),
									eq(orderTable.paymentStatus, "pending"),
								),
							),
					() => "database_error" as const,
				)();
				return matchAsync(updateResult, {
					err: () =>
						c.json(
							{ error: "Unable to update payment status" },
							500,
						) as Response,
					ok: () => c.json({ updated: true }, 200) as Response,
				});
			},
		});
	});

async function finalizePayment(
	c: Context,
	input: z.infer<typeof verifyPaymentSchema>,
	userId: string,
) {
	try {
		const savedOrder = await db.query.order.findFirst({
			where: (fields, operators) =>
				and(
					operators.eq(fields.razorpayOrderId, input.razorpay_order_id),
					operators.eq(fields.userId, userId),
				),
		});
		if (!savedOrder) return c.json({ error: "Order not found" }, 404);
		if (savedOrder.paymentStatus === "paid")
			return c.json({ verified: true, order_id: savedOrder.id }, 200);

		const cartRows = await db.query.cart.findFirst({
			where: (fields, operators) => operators.eq(fields.userId, userId),
		});
		if (!cartRows) return c.json({ error: "Your cart is empty" }, 400);

		await db.transaction(async (tx) => {
			const items = await tx
				.select({
					productId: cartItem.productId,
					productName: product.name,
					unitAmount: product.amount,
					quantity: cartItem.quantity,
				})
				.from(cartItem)
				.innerJoin(product, eq(product.id, cartItem.productId))
				.where(eq(cartItem.cartId, cartRows.id));
			if (!items.length) throw new Error("Your cart is empty");

			const [updatedOrder] = await tx
				.update(orderTable)
				.set({
					paymentId: input.razorpay_payment_id,
					paymentSignature: input.razorpay_signature,
					paymentStatus: "paid",
				})
				.where(
					and(
						eq(orderTable.id, savedOrder.id),
						eq(orderTable.paymentStatus, "pending"),
					),
				)
				.returning({ id: orderTable.id });
			if (!updatedOrder) return;

			await tx
				.insert(orderItem)
				.values(items.map((item) => ({ ...item, orderId: savedOrder.id })));
			await tx.delete(cartItem).where(eq(cartItem.cartId, cartRows.id));
		});
		return c.json({ verified: true, order_id: savedOrder.id }, 200);
	} catch (error) {
		console.error("Error finalizing payment:", error);
		return c.json(
			{ error: "Payment verified, but we could not save your order" },
			500,
		);
	}
}

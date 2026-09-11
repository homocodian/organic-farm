import crypto from "node:crypto";

import Razorpay from "razorpay";
import { Hono } from "hono";
import { z } from "zod";

import { err, match, ok, type Result } from "@/types";
import { zValidator } from "../utils/zod-validator";

const createOrderSchema = z.object({
	amount: z.number().int().min(100),
	currency: z.string().length(3).default("INR"),
	receipt: z.string().min(1).max(40),
});

const verifyPaymentSchema = z.object({
	razorpay_order_id: z.string().min(1),
	razorpay_payment_id: z.string().min(1),
	razorpay_signature: z.string().min(1),
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
		const { amount, currency, receipt } = c.req.valid("json");

		try {
			const order = await razorpay.orders.create({ amount, currency, receipt });
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

			return c.json({ error: "Unable to create Razorpay order" }, 500);
		}
	})
	.post("/verify", zValidator("json", verifyPaymentSchema), async (c) => {
		const result = verifySignature(c.req.valid("json"));

		return match(result, {
			ok: () => c.json({ verified: true }, 200) as Response,
			err: () =>
				c.json({ error: "Payment signature mismatch" }, 400) as Response,
		});
	});

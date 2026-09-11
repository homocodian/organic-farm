import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CartProps } from "./cart";
import { useMemo, useState } from "react";
import { Loader2 } from "lucide-react";
import Script from "next/script";
import { toast } from "sonner";
import { getRazorpay } from "@/lib/razorpay";

type OrderSummaryProps = CartProps;

export function OrderSummary({ items: cartItems }: OrderSummaryProps) {
	const subTotal = useMemo(() => {
		return cartItems.reduce(
			(acc, item) => acc + item.product.amount * item.quantity,
			0,
		);
	}, [cartItems]);

	const shipping = 0; // Assuming free shipping for now
	const total = subTotal + shipping;

	const [loading, setLoading] = useState(false);

	const createOrder = async () => {
		setLoading(true);
		try {
			const response = await fetch("/api/payment/orders", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					amount: Math.round(total * 100),
					currency: "INR",
					receipt: `cart_${Date.now()}`,
				}),
			});
			const order = await response.json();
			if (!response.ok)
				throw new Error(order.error ?? "Unable to create order");
			const Razorpay = getRazorpay();
			if (!Razorpay) throw new Error("Razorpay checkout is unavailable");

			const checkout = new Razorpay({
				key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
				amount: order.amount,
				currency: order.currency,
				name: "Organic Farm",
				description: "Cart checkout",
				order_id: order.order_id,
				handler: async (paymentResponse) => {
					try {
						const verification = await fetch("/api/payment/verify", {
							method: "POST",
							headers: { "Content-Type": "application/json" },
							body: JSON.stringify(paymentResponse),
						});
						if (!verification.ok)
							throw new Error("Payment verification failed");
						toast.success("Payment verified successfully");
					} catch (error) {
						toast.error(
							error instanceof Error
								? error.message
								: "Payment verification failed",
						);
					}
				},
				modal: {
					ondismiss: () => toast.info("Payment cancelled"),
				},
			});
			checkout.on("payment.failed", () =>
				toast.error("Payment failed. Please try again."),
			);
			checkout.open();
		} catch (error) {
			toast.error(
				error instanceof Error ? error.message : "Unable to start checkout",
			);
		} finally {
			setLoading(false);
		}
	};

	return (
		<>
			<Script
				src="https://checkout.razorpay.com/v1/checkout.js"
				strategy="afterInteractive"
			/>
			<Card>
				<CardContent className="p-6">
					<h2 className="text-xl font-semibold mb-4">Order Summary</h2>
					<div className="grid gap-3">
						<div className="flex items-center justify-between">
							<span className="text-muted-foreground">Subtotal</span>
							<span>${subTotal.toFixed(2)}</span>
						</div>
						<div className="flex items-center justify-between">
							<span className="text-muted-foreground">Shipping</span>
							<span>₹{shipping.toFixed(2)}</span>
						</div>
						<Separator className="my-2" />
						<div className="flex items-center justify-between font-semibold">
							<span>Total</span>
							<span>₹{total.toFixed(2)}</span>
						</div>
					</div>
				</CardContent>
				<CardFooter className="p-6 pt-0">
					<Button className="w-full" onClick={createOrder} disabled={loading}>
						{loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
						Proceed to Checkout
					</Button>
				</CardFooter>
			</Card>
		</>
	);
}

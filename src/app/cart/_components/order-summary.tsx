import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CartProps } from "./cart";
import { useMemo, useState } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

interface OrderSummaryProps extends CartProps {
	clearCart: () => void;
}

export function OrderSummary({ cartItems, clearCart }: OrderSummaryProps) {
	const subTotal = useMemo(() => {
		return cartItems.reduce(
			(acc, item) => acc + item.product.amount * item.quantity,
			0
		);
	}, [cartItems]);

	const shipping = 0; // Assuming free shipping for now
	const total = subTotal + shipping;

	const [loading, setLoading] = useState(false);

	return (
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
				<Button
					className="w-full"
					onClick={() => {
						setLoading(true);
						setTimeout(() => {
							setLoading(false);
							toast.success("Order placed successfully!");
							clearCart();
						}, 2000);
					}}
					disabled={loading}
				>
					{loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
					Proceed to Checkout
				</Button>
			</CardFooter>
		</Card>
	);
}

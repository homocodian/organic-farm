export interface RazorpayPaymentResponse {
	razorpay_order_id: string;
	razorpay_payment_id: string;
	razorpay_signature: string;
}

export interface RazorpayOptions {
	key: string | undefined;
	amount: number;
	currency: string;
	name: string;
	description: string;
	order_id: string;
	handler: (response: RazorpayPaymentResponse) => void | Promise<void>;
	modal?: { ondismiss?: () => void };
}

export interface RazorpayCheckout {
	open: () => void;
	on: (event: "payment.failed", handler: () => void) => void;
}

interface RazorpayWindow extends Window {
	Razorpay?: new (options: RazorpayOptions) => RazorpayCheckout;
}

export const getRazorpay = () =>
	typeof window === "undefined"
		? undefined
		: (window as RazorpayWindow)?.Razorpay;

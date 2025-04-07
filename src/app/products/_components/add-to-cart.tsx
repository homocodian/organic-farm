"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { addToCart } from "@/server/functions/cart";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";

type AddToCartProps = {
	productId: string;
};

export function AddToCart({ productId }: AddToCartProps) {
	const addToCartWithProductId = addToCart.bind(null, productId);
	const [state, formAction, pending] = useActionState(addToCartWithProductId, {
		error: "",
		statusCode: 0,
	});
	const router = useRouter();

	useEffect(() => {
		// @ts-expect-error any
		if (state?.statusCode === 401) {
			router.push("/login");
			return;
		}
		// @ts-expect-error any
		if (state?.error) {
			// @ts-expect-error any
			toast.error(state.error);
		}
	}, [state, router]);

	return (
		<form action={formAction}>
			<Button
				size="sm"
				variant="outline"
				disabled={pending}
				className="relative"
			>
				<span className={cn(pending && "opacity-0")}>Add to cart</span>
				{pending && (
					<span className="absolute inset-0 flex items-center justify-center">
						<Loader2 className="animate-spin" />
					</span>
				)}
			</Button>
		</form>
	);
}

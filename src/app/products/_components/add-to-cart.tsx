"use client";

import { useCartStore } from "@/app/context/cart";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Product } from "@/server/db/schema/product";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

type AddToCartProps = {
	product: Product;
};

export function AddToCart({ product }: AddToCartProps) {
	const router = useRouter();

	const addToCart = useCartStore((state) => state.addToCart);
	const [pending, setPending] = React.useState(false);

	const handleAddToCart = async () => {
		setPending(true);
		try {
			const res = await addToCart(product, 1);
			if ("error" in res) {
				toast.error(res.error);
			}
			if ("statusCode" in res && res.statusCode === 401) {
				toast.error("Please log in to add items to your cart.");
				router.push("/login");
			}
		} catch {
			toast.error("Failed to add item to cart.");
		} finally {
			setPending(false);
		}
	};

	return (
		<Button
			size="sm"
			variant="outline"
			disabled={pending}
			className="relative"
			onClick={handleAddToCart}
			type="button"
		>
			<span className={cn(pending && "opacity-0")}>Add to cart</span>
			{pending && (
				<span className="absolute inset-0 flex items-center justify-center">
					<Loader2 className="animate-spin" />
				</span>
			)}
		</Button>
	);
}

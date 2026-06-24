import React from "react";
import Image from "next/image";

import { toast } from "sonner";
import { Minus, Plus, Trash2, Loader2 } from "lucide-react";

import { useCartStore } from "@/app/context/cart";
import { Button } from "@/components/ui/button";
import { Product } from "@/server/db/schema/product";
import { match } from "@/types";

type CartItemProps = {
	product: Product;
	quantity: number;
};

const excludeQTypes: Product["quantityType"][] = ["Hour"];

export function CartItem({ quantity, product }: CartItemProps) {
	const incrementQuantity = useCartStore((state) => state.incrementQuantity);
	const decrementQuantity = useCartStore((state) => state.decrementQuantity);
	const removeItem = useCartStore((state) => state.removeFromCart);
	const [isRemovePending, setIsRemovePending] = React.useState(false);

	const handleRemoveItem = async () => {
		setIsRemovePending(true);

		const _removeItem = await removeItem(product.id);
		match(_removeItem, {
			ok: () => {
				// Item removed successfully
			},
			err: (error) => {
				console.error("Failed to remove item from cart:", error);
				toast.error("Failed to remove item from cart. Please try again.");
			},
		});

		setIsRemovePending(false);
	};

	return (
		<div className="grid gap-4 sm:grid-cols-[1fr_auto] sm:gap-6">
			<div className="grid gap-4 sm:grid-cols-[80px_1fr] sm:gap-6">
				<div className="relative aspect-square h-20 w-20 min-w-fit overflow-hidden rounded-md bg-muted">
					<Image
						src={product.imageUrl ?? "/placeholder.jpeg?height=80&width=80"}
						alt="Product 1"
						fill
						className="object-cover"
					/>
				</div>
				<div className="grid gap-1">
					<h3 className="font-semibold">{product.name}</h3>
					<div className="text-sm text-muted-foreground">
						{product.category}
					</div>
					<div className="font-medium">
						₹{product.amount.toFixed(2)}/{product.quantityType}
					</div>

					{product.category === "Machinery" ||
					excludeQTypes.includes(product.quantityType) ? null : (
						<div className="flex items-center gap-2 sm:hidden">
							<Button
								variant="outline"
								size="icon"
								className="h-8 w-8"
								onClick={() => decrementQuantity(product)}
							>
								<Minus className="h-3 w-3" />
								<span className="sr-only">Decrease quantity</span>
							</Button>
							<span className="text-sm">{quantity}</span>
							<Button
								variant="outline"
								size="icon"
								className="h-8 w-8"
								onClick={() => incrementQuantity(product)}
							>
								<Plus className="h-3 w-3" />
								<span className="sr-only">Increase quantity</span>
							</Button>
							<Button
								variant="outline"
								size="icon"
								className="h-8 w-8 ml-auto"
								onClick={() => decrementQuantity(product)}
							>
								<Trash2 className="h-3 w-3" />
								<span className="sr-only">Remove item</span>
							</Button>
						</div>
					)}
				</div>
			</div>
			<div className="hidden sm:flex sm:flex-col sm:items-center sm:gap-2">
				{product.category === "Machinery" ||
				excludeQTypes.includes(product.quantityType) ? null : (
					<div className="flex items-center gap-2">
						<Button
							variant="outline"
							size="icon"
							className="h-8 w-8"
							onClick={() => decrementQuantity(product)}
						>
							<Minus className="h-3 w-3" />
							<span className="sr-only">Decrease quantity</span>
						</Button>
						<span className="text-sm w-4 text-center">{quantity}</span>
						<Button
							variant="outline"
							size="icon"
							className="h-8 w-8"
							onClick={() => incrementQuantity(product)}
						>
							<Plus className="h-3 w-3" />
							<span className="sr-only">Increase quantity</span>
						</Button>
					</div>
				)}
				<Button
					variant="ghost"
					size="sm"
					className="text-sm text-muted-foreground"
					onClick={handleRemoveItem}
					disabled={isRemovePending}
				>
					{isRemovePending ? (
						<Loader2 className="h-3 w-3 mr-2 animate-spin" />
					) : (
						<Trash2 className="h-3 w-3 mr-2 text-destructive" />
					)}
					Remove
				</Button>
			</div>
		</div>
	);
}

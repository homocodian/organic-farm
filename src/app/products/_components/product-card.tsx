import Image from "next/image";
// import { Star } from "lucide-react";
import { Product } from "@/server/db/schema/product";
import { AddToCart } from "./add-to-cart";
import { AppConfig } from "@/lib/app-config";
import { EditButton } from "../listings/_compenents/edit-button";
import { useCartStore } from "@/app/context/cart";
import { Button } from "@/components/ui/button";

interface ProductCardProps {
	product: Product;
	isOwner?: boolean;
}

export function ProductCard({ product, isOwner = false }: ProductCardProps) {
	const cartItem = useCartStore((state) => state.cart.get(product.id));
	const incrementQuantity = useCartStore((state) => state.incrementQuantity);
	const decrementQuantity = useCartStore((state) => state.decrementQuantity);

	return (
		<div className="bg-card rounded-lg overflow-hidden border hover:shadow-md transition-shadow">
			<div className="relative h-48 bg-gray-100">
				<Image
					src={product.imageUrl ?? AppConfig.placeholderImages[1]}
					alt={product.name}
					fill
					className="object-cover"
				/>
			</div>
			<div className="p-4">
				<h3 className="font-medium">{product.name}</h3>
				<p className="text-sm mb-2 text-card-foreground/70">
					{product.category} · {product.type}
				</p>
				<div className="flex justify-between items-center">
					<span className="font-semibold">
						₹{`${product.amount.toFixed(2)}/${product.quantityType}`}
					</span>
					{isOwner ? (
						<EditButton productId={product.id} />
					) : cartItem ? (
						<div>
							<Button onClick={() => decrementQuantity(product)}>-</Button>
							<span className="mx-2">{cartItem.quantity}</span>
							<Button onClick={() => incrementQuantity(product)}>+</Button>
						</div>
					) : (
						<AddToCart product={product} />
					)}
				</div>
			</div>
		</div>
	);
}

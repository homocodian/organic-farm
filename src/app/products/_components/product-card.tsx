import Image from "next/image";
// import { Star } from "lucide-react";
import { Product } from "@/server/db/schema/product";
import { AddToCart } from "./add-to-cart";
import { AppConfig } from "@/lib/app-config";

interface ProductCardProps {
	product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
	return (
		<div className="bg-card rounded-lg overflow-hidden border hover:shadow-md transition-shadow">
			<div className="relative h-48 bg-gray-100">
				<Image
					src={AppConfig.placeholderImages[1]}
					alt={product.name}
					fill
					className="object-cover"
				/>
			</div>
			<div className="p-4">
				{/* <div className="flex items-center mb-1">
					<div className="flex text-amber-400">
						{[...Array(5)].map((_, i) => (
							<Star
								key={i}
								className={`h-4 w-4 ${
									i < Math.floor(product.rating)
										? "fill-current"
										: "stroke-current fill-none"
								} ${
									i === Math.floor(product.rating) && product.rating % 1 > 0
										? "fill-current opacity-50"
										: ""
								}`}
							/>
						))}
					</div>
					<span className="text-xs text-muted-foreground ml-1">
						{product.rating.toFixed(1)}
					</span>
				</div> */}
				<h3 className="font-medium">{product.name}</h3>
				<p className="text-sm mb-2 text-card-foreground/70">
					{product.category} · {product.type}
				</p>
				<div className="flex justify-between items-center">
					<span className="font-semibold">
						₹{`${product.amount.toFixed(2)}/${product.quantityType}`}
					</span>
					<AddToCart productId={product.id} />
				</div>
			</div>
		</div>
	);
}

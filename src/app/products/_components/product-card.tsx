import Image from 'next/image';

import { useCartStore } from '@/app/context/cart';
import { Button } from '@/components/ui/button';
import { AppConfig } from '@/lib/app-config';
// import { Star } from "lucide-react";
import { Product } from '@/server/db/schema/product';

import { EditButton } from '../listings/_compenents/edit-button';
import { AddToCart } from './add-to-cart';

interface ProductCardProps {
  product: Product;
  isOwner?: boolean;
}

export function ProductCard({ product, isOwner = false }: ProductCardProps) {
  const cartItem = useCartStore((state) => state.cart.get(product.id));
  const incrementQuantity = useCartStore((state) => state.incrementQuantity);
  const decrementQuantity = useCartStore((state) => state.decrementQuantity);

  return (
    <div className="bg-card overflow-hidden rounded-lg border transition-shadow hover:shadow-md">
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
        <p className="text-card-foreground/70 mb-2 text-sm">
          {product.category} · {product.type}
        </p>
        <div className="flex items-center justify-between">
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

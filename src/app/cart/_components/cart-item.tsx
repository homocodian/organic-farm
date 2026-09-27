import React from 'react';

import { Loader2, Minus, Plus, Trash2 } from 'lucide-react';
import Image from 'next/image';
import { toast } from 'sonner';

import { useCartStore } from '@/app/context/cart';
import { Button } from '@/components/ui/button';
import { Product } from '@/server/db/schema/product';
import { match } from '@/types';

type CartItemProps = {
  product: Product;
  quantity: number;
};

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
        console.error('Failed to remove item from cart:', error);
        toast.error('Failed to remove item from cart. Please try again.');
      }
    });

    setIsRemovePending(false);
  };

  return (
    <div className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-4 sm:gap-5">
      <div className="bg-muted relative aspect-[4/3] h-full min-h-20 self-stretch overflow-hidden rounded-md">
        <Image
          src={product.imageUrl ?? '/placeholder.jpeg?height=80&width=80'}
          alt={product.name}
          fill
          className="object-cover"
        />
      </div>
      <div className="grid min-w-0 content-center gap-1">
        <h3 className="line-clamp-2 leading-snug font-semibold">
          {product.name}
        </h3>
        <div className="text-muted-foreground truncate text-sm">
          {product.category}
        </div>
        <div className="mt-2 flex min-h-9 items-center gap-2">
          <div className="bg-background flex h-9 items-center rounded-md border shadow-xs">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 rounded-r-none border-0 border-r shadow-none"
              onClick={() => decrementQuantity(product)}
              aria-label={`Decrease quantity of ${product.name}`}
            >
              <Minus className="h-3 w-3" />
            </Button>
            <span className="min-w-9 px-2 text-center text-sm font-semibold tabular-nums">
              {quantity}
            </span>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 rounded-l-none border-0 border-l shadow-none"
              onClick={() => incrementQuantity(product)}
              aria-label={`Increase quantity of ${product.name}`}
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>
          <Button
            variant="outline"
            size="icon"
            className="text-muted-foreground hover:border-destructive/50 hover:bg-destructive/10 hover:text-destructive h-9 w-9"
            onClick={handleRemoveItem}
            disabled={isRemovePending}
            aria-label={`Delete ${product.name} from cart`}
          >
            {isRemovePending ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Trash2 className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>
      <div className="self-center text-right">
        <div className="text-sm font-semibold whitespace-nowrap sm:text-base">
          ₹{product.amount.toFixed(2)}
        </div>
        <div className="text-muted-foreground text-xs">
          /{product.quantityType}
        </div>
      </div>
    </div>
  );
}

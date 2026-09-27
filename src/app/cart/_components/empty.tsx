import { ShoppingCart } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';

export function EmptyCart() {
  return (
    <div className="container mx-auto grid h-full place-items-center px-4 py-12 md:py-16">
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <ShoppingCart className="text-muted-foreground mb-4 h-12 w-12" />
        <h2 className="mb-2 text-2xl font-semibold">Your cart is empty</h2>
        <p className="text-muted-foreground mb-6">
          Looks like you haven&apos;t added anything to your cart yet.
        </p>
        <Button asChild>
          <Link href="/products">Browse Products</Link>
        </Button>
      </div>
    </div>
  );
}

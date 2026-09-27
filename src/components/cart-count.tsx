'use client';

import React from 'react';

import { useCartStore } from '@/app/context/cart';

import { Badge } from './ui/badge';

export function CartCount() {
  const getCartCount = useCartStore((state) => state.getCartCount);
  const [count, setCount] = React.useState<number | null>(() => getCartCount());
  const cart = useCartStore((state) => state.cart);

  React.useEffect(() => {
    // eslint-disable-next-line
    setCount(getCartCount());
  }, [cart, getCartCount]);

  if (count === null || count <= 0) {
    return null;
  }

  return (
    <Badge className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full p-0">
      {count}
    </Badge>
  );
}

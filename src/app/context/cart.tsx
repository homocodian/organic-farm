'use client';

import React from 'react';

import { usePathname } from 'next/navigation';
import { useStore } from 'zustand';

import { CartItem, CartStore, createCartStore } from '@/lib/store/cart';

const CartContext = React.createContext<CartStore | null>(null);

type CartState = ReturnType<CartStore['getState']>;

type CartProviderProps = {
  children: React.ReactNode;
  initialCartItems?: CartItem[];
};

export const CartProvider = ({
  children,
  initialCartItems
}: CartProviderProps) => {
  const [cartStore] = React.useState(() => {
    const initialCart = new Map(
      initialCartItems?.map((item) => [item.productId, item]) ?? []
    );
    return createCartStore(initialCart, initialCartItems === undefined);
  });
  const pathname = usePathname();

  React.useEffect(() => {
    if (initialCartItems === undefined && pathname !== '/cart') {
      cartStore?.getState().fetchCart();
    }
  }, [initialCartItems, pathname, cartStore]);

  return (
    <CartContext.Provider value={cartStore}>{children}</CartContext.Provider>
  );
};

export function useCartStore<T>(selector: (state: CartState) => T): T {
  const store = React.useContext(CartContext);
  if (!store) throw new Error('Missing CartContext.Provider');
  return useStore(store, selector);
}

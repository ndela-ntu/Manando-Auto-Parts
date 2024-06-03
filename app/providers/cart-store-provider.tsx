'use client';

import { type StoreApi, useStore } from 'zustand';
import { type CartStore, createCartStore, initCartState } from '../stores/cart-store';
import { type ReactNode, createContext, useContext, useRef } from 'react';

export const CartStoreContext = createContext<StoreApi<CartStore> | null>(
  null,
);

export interface CartStoreProviderProps {
    children: ReactNode;
}

export const CartStoreProvider = ({
    children,
}: CartStoreProviderProps) => {
    const storeRef = useRef<StoreApi<CartStore>>();
    if (!storeRef.current) {
        storeRef.current = createCartStore(initCartState());
    }

    return (
        <CartStoreContext.Provider value={storeRef.current}>
            {children}
        </CartStoreContext.Provider>
    );
} 

export const useCartStore = <T,>(
    selector: (store: CartStore) => T,
): T => {
    const cartStoreContext = useContext(CartStoreContext);

    if (!cartStoreContext) {
        throw new Error(`useCounterStore must be use within CounterStoreProvider`)
    }

    return useStore(cartStoreContext, selector);
}

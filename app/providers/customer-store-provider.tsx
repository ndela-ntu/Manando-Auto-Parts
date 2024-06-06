'use client';

import { type StoreApi, useStore } from 'zustand';
import { type CustomerStore, createCustomerStore, initCustomerState } from '../stores/customer-store';
import { type ReactNode, createContext, useContext, useRef } from 'react';

export const CustomerStoreContext = createContext<StoreApi<CustomerStore> | null>(
  null,
);

export interface CustomerStoreProviderProps {
    children: ReactNode;
}

export const CustomerStoreProvider = ({
    children,
}: CustomerStoreProviderProps) => {
    const storeRef = useRef<StoreApi<CustomerStore>>();
    if (!storeRef.current) {
        storeRef.current = createCustomerStore(initCustomerState());
    }

    return (
        <CustomerStoreContext.Provider value={storeRef.current}>
            {children}
        </CustomerStoreContext.Provider>
    );
} 

export const useCustomerStore = <T,>(
    selector: (store: CustomerStore) => T,
): T => {
    const customerStoreContext = useContext(CustomerStoreContext);

    if (!customerStoreContext) {
        throw new Error(`useCounterStore must be use within CounterStoreProvider`)
    }

    return useStore(customerStoreContext, selector);
}

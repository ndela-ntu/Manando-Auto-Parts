'use client';

import { type StoreApi, useStore } from 'zustand';
import { type AddressStore, createAddressStore, initAddressState } from '../stores/address-store';
import { type ReactNode, createContext, useContext, useRef } from 'react';

export const AddressStoreContext = createContext<StoreApi<AddressStore> | null>(
  null,
);

export interface AddressStoreProviderProps {
    children: ReactNode;
}

export const AddressStoreProvider = ({
    children,
}: AddressStoreProviderProps) => {
    const storeRef = useRef<StoreApi<AddressStore>>();
    if (!storeRef.current) {
        storeRef.current = createAddressStore(initAddressState());
    }

    return (
        <AddressStoreContext.Provider value={storeRef.current}>
            {children}
        </AddressStoreContext.Provider>
    );
} 

export const useAddressStore = <T,>(
    selector: (store: AddressStore) => T,
): T => {
    const addressStoreContext = useContext(AddressStoreContext);

    if (!addressStoreContext) {
        throw new Error(`useCounterStore must be use within CounterStoreProvider`)
    }

    return useStore(addressStoreContext, selector);
}

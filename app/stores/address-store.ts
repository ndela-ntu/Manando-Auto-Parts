import { createStore } from "zustand/vanilla";

export type AddressState = {
    success: boolean;
    addressId: string;
}

export type AddressActions = {
    addAddress: ({success, addressId}: {success: boolean; addressId: string}) => void;
}

export type AddressStore = AddressState & AddressActions;

export const initAddressState = (): AddressState => {
    return {success: false, addressId: ''};
}

export const defaultInitState: AddressState = {
    success: false,
    addressId: ''
}

export const createAddressStore = (
    initState: AddressState = defaultInitState,
) => {
    return createStore<AddressStore>()((set) => ({
        ...initState,
        addAddress: ({success, addressId}: {success: boolean; addressId: string}) => set((state) => ({success: success, addressId: addressId}))
    }))
}
import { IProduct } from "../models/product"
import { createStore } from 'zustand/vanilla'

export type CartState = {
    items: IProduct[];
}

export type CartActions = {
    addToCart: (item: IProduct) => void;
    removeFromCart: (id: string) => void;
}

export type CartStore = CartState & CartActions;

export const initCartState = (): CartState => {
    return { items: [] }
}

export const defaultInitState: CartState = {
    items: []
}

export const createCartStore = (
    initState: CartState = defaultInitState,
) => {
    return createStore<CartStore>()((set) => ({
        ...initState,
        addToCart: (item) => set((state) => ({items: state.items.concat([item])})),
        removeFromCart: (id) => set((state) => ({items: state.items.filter(item => item.id.toString() !== id)}))
    }))
}
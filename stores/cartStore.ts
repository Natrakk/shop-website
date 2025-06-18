// stores/cartStore.ts
import { create } from 'zustand';
import type { ProductColor, ProductSize } from "@/types/product";

export type CartItem = {
    id: string;
    name: string;
    image: string;
    price: number;
    quantity: number;
    size?: ProductSize;
    color?: ProductColor;
};




type CartState = {
    items: CartItem[];
    addToCart: (item: CartItem) => void;
    removeFromCart: (id: string) => void;
    totalItems: () => number;
};

export const useCartStore = create<CartState>((set, get) => ({
    items: [],
    addToCart: (item) => {
        const existing = get().items.find((i) => i.id === item.id);
        if (existing) {
            set({
                items: get().items.map((i) =>
                    i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
                ),
            });
        } else {
            set({ items: [...get().items, item] });
        }
    },
    removeFromCart: (id) =>
        set({ items: get().items.filter((i) => i.id !== id) }),
    totalItems: () =>
        get().items.reduce((sum, item) => sum + item.quantity, 0),
}));

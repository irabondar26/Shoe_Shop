import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product, CartState } from "../../types/types";

const THREE_DAYS_IN_MS = 3 * 24 * 60 * 60 ** 1000;

const loadCartFromStorage = () => {
    try {
        const serializesState = localStorage.getItem("shopping-cart");
        if (serializesState === null) return [];

        const parsed = JSON.parse(serializesState);
        const now = Date.now();

        if (now - parsed.timestamp > THREE_DAYS_IN_MS) {
            localStorage.removeItem("shopping-cart");
            return [];
        }

        return parsed.items;
    } catch {
        return [];
    }
}

const initialState: CartState = {
    items: loadCartFromStorage()
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<{ product: Product, size: number }>) => {
            const { product, size } = action.payload;

            const existingItem = state.items.find((i) => i.id === product.id && i.selectedSize === size);

            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                state.items.push({
                    ...product,
                    selectedSize: size,
                    quantity: 1,
                })
            }
        },

        removeFromCart: (state, action: PayloadAction<{ id: number; size: number }>) => {
            state.items = state.items.filter((i) => !(i.id === action.payload.id && i.selectedSize === action.payload.size))
        },

        updateQuantity: (state, action: PayloadAction<{ id: number, size: number, quantity: number }>) => {

            const { id, size, quantity } = action.payload;

            const itemIndex = state.items.findIndex(i => i.id === id && i.selectedSize === size);

            if (itemIndex !== -1) {
                if (quantity < 1) {
                    state.items.splice(itemIndex, 1);
                } else {
                    state.items[itemIndex].quantity = quantity;
                }
            }
        },
    }
})


export const { addToCart, removeFromCart, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;
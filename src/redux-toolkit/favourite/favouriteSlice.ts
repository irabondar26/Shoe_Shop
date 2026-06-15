import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product, FavouriteState } from "../../types/types";

const loadFavouriteFromStorage = () => {
    try {
        const serializedState = localStorage.getItem("favourites-list");
        return serializedState ? JSON.parse(serializedState) : [];
    } catch {
        return [];
    }
};

const initialState: FavouriteState = {
    items: loadFavouriteFromStorage()
}

const favouriteSlice = createSlice({
    name: "favourite",
    initialState,
    reducers: {
        addToFavourite: (state, action: PayloadAction<{ product: Product }>) => {
            const { product } = action.payload;
            const exists = state.items.some((i) => i.id === product.id);

            if (!exists) {
                state.items.push({ ...product })
                localStorage.setItem("favourites-list", JSON.stringify(state.items))
            };
        },

        removeFromFavourite: (state, action: PayloadAction<{ id: number }>) => {
            state.items = state.items.filter((i) => !(i.id === action.payload.id))
            localStorage.setItem("favourites-list", JSON.stringify(state.items))
        }
    }
});

export const { addToFavourite, removeFromFavourite } = favouriteSlice.actions;
export default favouriteSlice.reducer;
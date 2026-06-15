import { configureStore, Middleware } from "@reduxjs/toolkit";
import cartReducer from "./cart/cartSlice";
import favouriteReducer from "./favourite/favouriteSlice";

const cartLocalStorageMiddleware: Middleware = (storeAPI) => (next) => (action) => {
    const result = next(action);

    if (action && typeof action === "object" && "type" in action) {
        if ((action.type as string).startsWith("cart/")) {
            const cartState = storeAPI.getState().cart;
            const dataToSave = {
                items: cartState.items,
                timestamp: Date.now(),
            }
            localStorage.setItem("shopping-cart", JSON.stringify(dataToSave));
        }
    };
    return result;
};

export const store = configureStore({
    reducer: {
        cart: cartReducer,
        favourite:favouriteReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(cartLocalStorageMiddleware),
    devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
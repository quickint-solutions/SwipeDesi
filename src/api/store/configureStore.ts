import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { loginSlice } from "../../module/pages/Login/loginSlice";
import { cartSlice } from "../../module/pages/Cart/cartSlice";

export const store = configureStore({
    reducer: {
        loginSlice: loginSlice.reducer,
        cartSlice: cartSlice.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    }),
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
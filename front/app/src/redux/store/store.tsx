import { configureStore } from "@reduxjs/toolkit";
import { SessionHallSlice } from "../slices/SessionHallSlice";

export const store = configureStore({
    reducer: {
        [SessionHallSlice.name]: SessionHallSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
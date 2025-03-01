import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./features/productsSlice";
import notificationsReducer from "./features/notificationsSlice";

export const store = configureStore({
  reducer: {
    products: productsReducer,
    notifications: notificationsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

import { configureStore } from "@reduxjs/toolkit";
import authReducer, { persistAuthSubscriber, restoreAuthOnClient } from "./authSlice";

export const makeStore = () => {
  const store = configureStore({
    reducer: {
      auth: authReducer,
      lookup: lookupReducer
    },
    middleware: (getDefault) => getDefault({ serializableCheck: false })
  });

  // Client-side persistence
  if (typeof window !== "undefined") {
    restoreAuthOnClient(store);
    persistAuthSubscriber(store);
  }

  return store;
};

export const store = makeStore();

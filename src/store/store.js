
import { configureStore } from "@reduxjs/toolkit";
import authReducer, { persistAuthSubscriber, restoreAuthOnClient } from "./authSlice";
import lookupReducer from './lookupSlice';
import searchReducer from './searchSlice';
import seatLayoutReducer from './seatLayoutSlice';
export const makeStore = () => {
  const store = configureStore({
    reducer: {
      auth: authReducer,
      lookup: lookupReducer,
      search: searchReducer,
      seatLayout: seatLayoutReducer,
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

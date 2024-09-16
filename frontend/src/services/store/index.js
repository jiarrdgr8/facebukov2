import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { thunk } from "redux-thunk"; // Use named import
import createRootReducer from "./rootReducer";

const persistConfig = {
  key: "default",
  storage: storage,
};

let rootReducer = createRootReducer();
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = () => {
  let store = configureStore({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== "production",
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ serializableCheck: false }).concat(thunk),
  });
  let persistor = persistStore(store);
  // The following line will purge the persisted store.
  // persistor.purge();
  return { store, persistor };
};

export default store;

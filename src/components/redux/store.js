import { configureStore } from "@reduxjs/toolkit";
import newsReducer from "./newsSlice"; // ✅ Correct Import
import { persistStore, persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";

const persistConfig = {
  key: "news",
  storage: AsyncStorage, // ✅ Store data in AsyncStorage
  whitelist: ["articles", "cache"], // ✅ Persist articles & cache
};

const persistedReducer = persistReducer(persistConfig, newsReducer); // ✅ Use newsReducer here

export const store = configureStore({
  reducer: { news: persistedReducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // ✅ Fix Redux Persist serialization issues
    }),
});

export const persistor = persistStore(store);

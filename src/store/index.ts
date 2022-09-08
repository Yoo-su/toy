import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { productsReducer } from "./slices/productSlice";

const rootReducer = combineReducers({
  productsReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;

export type RootState = ReturnType<typeof store.getState>; 
export type AppDispatch = typeof store.dispatch;

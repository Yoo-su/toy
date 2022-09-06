import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { productsReducer } from './reducers/productReducer';

const rootReducer = combineReducers({
    productsReducer
})

const store = configureStore({
    reducer:rootReducer
})

export default store;
export type RootState = ReturnType<typeof rootReducer>
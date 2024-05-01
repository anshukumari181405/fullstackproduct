import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice'; 

// Create a Redux store
const store = configureStore({
    reducer: {
        cart: cartReducer,
    },
});

export default store;

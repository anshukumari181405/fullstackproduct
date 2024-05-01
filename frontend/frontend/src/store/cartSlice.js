
import { createSlice } from '@reduxjs/toolkit';

export const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: {},
        message: '',
    },
    reducers: {
        addToCart: (state, action) => {
            const id = action.payload._id; 
            if (state.items[id]) {
                state.message = "Product already in cart";
            } else {
                state.items[id] = {...action.payload, quantity: 1};
                state.message = "Product added to cart";
            }
        },
        removeFromCart: (state, action) => {
            delete state.items[action.payload._id];
            state.message = "Product removed from cart";
        },
        incrementQuantity: (state, action) => {
            const id = action.payload._id;
            if (state.items[id]) {
                state.items[id].quantity++;
                
            }
        },
        decrementQuantity: (state, action) => {
            const id = action.payload._id;
            if (state.items[id] && state.items[id].quantity > 1) {
                state.items[id].quantity--;
               
            } else {
                state.message = "Cannot decrease below 1";
            }
        },
        clearMessage: (state) => {
            state.message = '';
        }
    },
});

export const { addToCart, removeFromCart, incrementQuantity, decrementQuantity, clearMessage } = cartSlice.actions;

export default cartSlice.reducer;

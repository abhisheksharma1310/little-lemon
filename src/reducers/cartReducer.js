import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            state.push(action.payload);
        },
        removeFromCart: (state, action) => {
            return state.filter((product) => product.id !== action.payload);
        },
        updateCart: (state, action) => {
            const indexToUpdate = state.findIndex((product) => product.id === action.payload.id);
            if(indexToUpdate !== -1) state[indexToUpdate] = action.payload;
        },
        removeAllFromCart: (state, action) => {
            return state = [];
        }
    }
});

export const {addToCart, removeFromCart, updateCart, removeAllFromCart} = cartSlice.actions;

export default cartSlice.reducer;
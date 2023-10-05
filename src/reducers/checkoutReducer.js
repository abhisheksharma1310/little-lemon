import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    address: "Enter your address",
    order: {},
    history: []
}

const checkoutSlice = createSlice({
    name: "checkout",
    initialState,
    reducers: {
        addAddress: (state, action) => {
            state.address = action.payload;
        },
        addOrder: (state, action) => {
            state.order = action.payload;
        },
        addToHistory: (state, action) => {
            state.history.push(action.payload);
        }
    }
});

export const {addAddress, addOrder, addToHistory} = checkoutSlice.actions;

export default checkoutSlice.reducer;
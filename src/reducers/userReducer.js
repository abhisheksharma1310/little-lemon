import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    details: {},
    isLogin: false
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        createUser: (state, action) => {
            state.details = action.payload;
        },
        loginStatus: (state, action) => {
           state.isLogin = action.payload
        },
    }
});

export const {createUser, loginStatus} = userSlice.actions;

export default userSlice.reducer;
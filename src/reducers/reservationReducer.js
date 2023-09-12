// reservationReducer.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  list: [], // An array to store reservation data
};

const reservationSlice = createSlice({
  name: "reservation",
  initialState,
  reducers: {
    createReservation: (state, action) => {
      state.list.push(action.payload);
    },
    deleteReservation: (state, action) => {
      state.list = state.list.filter(
        (reservation) => reservation.id !== action.payload
      );
    },
    updateReservation: (state, action) => {
      // Find the reservation to update by its ID
      const indexToUpdate = state.list.findIndex(
        (reservation) => reservation.id === action.payload.id
      );

      // If the reservation is found, update it
      if (indexToUpdate !== -1) {
        state.list[indexToUpdate] = action.payload;
      }
    },
  },
});

export const {
  createReservation,
  deleteReservation,
  updateReservation,
} = reservationSlice.actions;

export default reservationSlice.reducer;

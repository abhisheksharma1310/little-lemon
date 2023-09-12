
import { combineReducers } from "@reduxjs/toolkit";
import reservationReducer from "./reservationReducer";
import cartReducer from "./cartReducer";
import checkoutReducer from "./checkoutReducer";
import userReducer from "./userReducer";

const rootReducer = combineReducers({
  reservation: reservationReducer,
  cart: cartReducer,
  checkout: checkoutReducer,
  user: userReducer
});

export default rootReducer;

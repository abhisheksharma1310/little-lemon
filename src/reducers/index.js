
import { combineReducers } from "@reduxjs/toolkit";
import reservationReducer from "./reservationReducer";
import cartReducer from "./cartReducer";
import checkoutReducer from "./checkoutReducer";
import userReducer from "./userReducer";

const appReducer = combineReducers({
  reservation: reservationReducer,
  cart: cartReducer,
  checkout: checkoutReducer,
  user: userReducer
});

const rootReducer = (state, action) => {
  if (action.type === 'CLEAR_DATA') {
    return appReducer(undefined, action)
  }

  return appReducer(state, action)
}

export default rootReducer;

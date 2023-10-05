import React from "react";
import Cart from "../components/Cart";
import OrderHistory from "../components/OrderHistory";

const OrderPage = () => {

  return (
    <div className="page">
      <header className="page-header">
        <h2>Place online order</h2>
      </header>
      <div className="">
        <Cart />
      </div>
      <div>
        <OrderHistory/>
      </div>
    </div>
  );
};

export default OrderPage;

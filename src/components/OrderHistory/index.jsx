import React, { useState } from "react";
import { useSelector } from "react-redux";

import "./styles.css";

const OrderHistory = () => {
  const privousOrder = useSelector((state) => state.checkout.history);

  console.log("H: ", privousOrder);

  return (
    <section className="history-section">
      <div className="history-container">
        <header className="history-heading">
          <h2>Order History</h2>
        </header>
        <hr />
        {privousOrder?.map((order) => (
          <OrderItems key={order?.id} order={order} />
        ))}
      </div>
    </section>
  );
};

const OrderItems = ({ order }) => {
  const [showProduct, setShowProduct] = useState(false);
  const [showBill, setShowBill] = useState(false);
  const [showButton, setShowButton] = useState(false);

  const handleMouse = () => {
    setShowButton((p) => !p);
  };

  const handleProduct = () => {
    setShowProduct((p) => !p);
  };

  const handleBill = () => {
    setShowBill((p) => !p);
  };

  return (
    <div className="history-details">
      <div
        className="history-item"
        onMouseEnter={handleMouse}
        onMouseLeave={handleMouse}
      >
        <p>Id</p>
        <p className="lm">{order?.id}</p>
        <p>Qty</p>
        <p className="lm">
          {order?.qty} {order?.qty > 1 ? "items" : "item"}
        </p>
        <p>Order Total</p>
        <p className="lm">$ {order?.orderTotal}</p>
        <p>Time</p>
        <p className="lm">{order?.time}</p>
        <div className="history-btn">
          {showButton && (
            <button className="btn-primary" onClick={handleProduct}>
              products detail
            </button>
          )}
        </div>
        <div className="history-btn">
          {showButton && (
            <button className="btn-primary" onClick={handleBill}>
              Billing Detail
            </button>
          )}
        </div>
      </div>
      <div className="history-item-detail">
        {showProduct && <div>Product</div>}
        {showBill && <div>Bill</div>}
      </div>
    </div>
  );
};



export default OrderHistory;

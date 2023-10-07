import React, { memo, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import MenuItems from "../../assets/data/menu";

import "./styles.css";

const OrderHistory = () => {
  const privousOrder = useSelector((state) => state.checkout.history);

  return (
    <section className="history-section">
      <div className="history-container">
        <header className="history-heading">
          <h2>Order History</h2>
        </header>
        <hr />
        {privousOrder.length === 0 && <p>No previous order found.</p>}
        <div className="previous-order-items">
          {privousOrder?.map((order) => (
            <OrderItems key={order?.id} order={order} />
          ))}
        </div>
      </div>
    </section>
  );
};

const OrderItems = ({ order }) => {
  const [show, setShow] = useState(false);

  const handleButton = () => {
    setShow((p) => !p);
  };

  return (
    <div className="history-details">
      <div className="history-item">
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
      </div>
      <div className="history-item-detail">
        <div className="detail-btn">
          <button className="btn-primary" onClick={handleButton}>
            Details
          </button>
        </div>
        {show && <OrderProduct order={order} />}
        {show && <OrderBill order={order} />}
      </div>
    </div>
  );
};

const OrderBill = ({ order }) => {
  return (
    <div>
      <h4>Bill Summary</h4>
      <div className="history-item">
        <p>Address</p>
        <p className="lm">{order?.address}</p>
        <p>Price</p>
        <p className="lm">$ {order?.price}</p>
        <p>Items</p>
        <p className="lm">$ {order?.items}</p>
        <p>Delivery</p>
        <p className="lm">$ {order?.delivery}</p>
        <p>Total</p>
        <p className="lm">$ {order?.total}</p>
        <p>Discount</p>
        <p className="lm">$ {order?.discount}</p>
        <p>Order Total</p>
        <p className="lm">$ {order?.orderTotal}</p>
      </div>
    </div>
  );
};

const OrderProduct = ({ order }) => {
  const getProducts = useMemo(() => {
    const product = order.product?.map((product) => {
      const detail = MenuItems.find((item) => item.id === product.id);
      return { ...detail, qty: product.qty };
    });
    return product;
  }, [order]);

  return (
    <div>
      <h4>Products</h4>
      <div className="product-container">
        {getProducts?.map((product) => {
          return (
            <div className="product" key={product?.id}>
              <img
                src={product?.img}
                alt={product?.title}
                className="product-img"
              />
              <div className="product-details">
                <p>{product?.title}</p>
                <p>Qty {product?.qty}</p>
                <p>$ {product?.price}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default memo(OrderHistory);

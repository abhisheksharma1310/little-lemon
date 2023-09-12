import React, { useEffect, useMemo, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addAddress, addToHistory } from "../../reducers/checkoutReducer";
import { removeAllFromCart } from "../../reducers/cartReducer";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import "./styles.css";

const msg = `Your order is placed successfully.
  You can track you order in order history on online order page.
  You are redirected to online order page...
`;

const Checkout = () => {
  const orderDetails = useSelector((state) => state.checkout.order);
  const address = useSelector((state) => state.checkout.address);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [newAddress, setNewAddress] = useState(address);
  const [success, setSuccess] = useState(true);

  const buttonRef = useRef(null);

  const order = useMemo(() => {
    const price = Math.round(orderDetails.price);
    const delivery = Math.max(Math.round((price / 100) * 2), 1);
    const total = price + delivery;
    const discount = Math.round((total / 100) * 5);
    const orderTotal = total - discount;

    const value = {
      ...orderDetails,
      items: price,
      delivery: delivery,
      total: total,
      discount: discount,
      orderTotal: orderTotal,
    };

    return value;
  }, [orderDetails]);

  const handleAddress = (event) => {
    const { value } = event.target;
    setNewAddress(value);
    setSuccess(true);
  };

  const handleCheckout = () => {
    if (newAddress.length > 30) {
      processCheckout();
    } else {
      toast.error("Enter valid address at least 30 char.");
    }
    setSuccess(false);
  };

  const processCheckout = () => {
    toast((t) => (
      <div>
        <div>
          Are you sure to <b>procced</b>?
        </div>
        <div className="alert">
          <button
            className="btn-primary"
            onClick={() => {
              toast.dismiss(t.id);
              setSuccess(true);
            }}
          >
            No
          </button>
          <button
            className="btn-primary"
            onClick={() => {
              toast.dismiss(t.id);
              beginCheckout();
            }}
          >
            Yes
          </button>
        </div>
      </div>
    ));
  };

  const beginCheckout = () => {
    dispatch(addAddress(newAddress));
    dispatch(addToHistory({ ...order, address: newAddress }));
    dispatch(removeAllFromCart());
    toast.success(msg, { duration: 2000 });
    goToOrderPage();
  };

  const goToOrderPage = () => {
    setTimeout(() => {
      navigate("/order");
    }, 2000);
  };

  useEffect(() => {
    buttonRef.current.disabled = !success;
  }, [success]);

  return (
    <div className="checkout-section">
      <div>
        <Toaster />
      </div>
      <section className="checkout-container">
        <header className="checkout-heading">
          <h2>Checkout</h2>
          <hr />
        </header>
        <section className="checkout-address">
          <p>Delivery address</p>
          <textarea
            name="address"
            rows={2}
            defaultValue={address === "" ? "Enter your address" : address}
            onChange={handleAddress}
          />
          <hr />
        </section>
        <section className="checkout-order">
          <div className="chekout-h">
            <p>Order Summary</p>
          </div>
          <div className="checkout-order-details">
            <p>Quantity</p>
            <p className="lm">$ {order.qty}</p>
            <p>Items</p>
            <p className="lm">$ {order.items}</p>
            <p>Delivery</p>
            <p className="lm">$ {order.delivery}</p>
            <p>Total</p>
            <p className="lm">$ {order.total}</p>
            <p>Discounts</p>
            <p className="lm">$ {order.discount}</p>
          </div>
          <hr />
          <div className="checkout-order-details">
            <span>Order total</span>
            <span className="lm">$ {order.orderTotal}</span>
          </div>
          <hr />
        </section>
        <div className="cart-sub-total">
          <button
            className="btn-primary"
            onClick={handleCheckout}
            ref={buttonRef}
          >
            Checkout order
          </button>
        </div>
      </section>
    </div>
  );
};

export default Checkout;

import React, { memo, useEffect, useMemo, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addAddress, addToHistory } from "../../reducers/checkoutReducer";
import { removeAllFromCart } from "../../reducers/cartReducer";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import ToastConfirm from "../Toasts/ToastConfirm";

import "./styles.css";
import useCurrentAddress from "../../utils/useLocation";

const msg = `Your order is placed successfully.
  You can track you order in order history on online order page.
  You are redirected to online order page...
`;

const Checkout = () => {
  const orderDetails = useSelector((state) => state.checkout.order);
  const address = useSelector((state) => state.checkout.address);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const currentAddress = useCurrentAddress();

  const [newAddress, setNewAddress] = useState(
    address === "" ? currentAddress : address
  );
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
      setSuccess(false);
      processCheckout();
    } else {
      setSuccess(false);
      toast.error("Enter valid address at least 30 char.");
    }
  };

  const processCheckout = () => {
    toast(
      ToastConfirm(
        "Are you sure to",
        "procced",
        "",
        () => {
          setSuccess(true);
        },
        () => {
          beginCheckout();
        }
      ),
      {
        duration: 60000,
      }
    );
  };

  const beginCheckout = () => {
    dispatch(addAddress(newAddress));
    dispatch(addToHistory({ ...order, address: newAddress }));
    dispatch(removeAllFromCart());
    goToOrderPage();
  };

  const goToOrderPage = () => {
    const tid = toast.success(msg);
    setTimeout(() => {
      toast.dismiss(tid);
      navigate("/order");
    }, 2000);
  };

  useEffect(() => {
    buttonRef.current.disabled = !success;
  }, [success]);

  useEffect(() => {
    if (currentAddress !== "") setNewAddress(currentAddress);
  }, [currentAddress]);

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
            value={newAddress}
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
            <p className="lm"> {order.qty}</p>
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

export default memo(Checkout);

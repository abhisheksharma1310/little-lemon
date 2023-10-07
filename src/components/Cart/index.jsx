import React, { memo, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, updateCart } from "../../reducers/cartReducer";
import { addOrder } from "../../reducers/checkoutReducer";
import { useNavigate } from "react-router-dom";
import menuItems from "../../assets/data/menu";
import toast, { Toaster } from "react-hot-toast";
import ToastConfirm from "../Toasts/ToastConfirm";

import "./styles.css";

const qty = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const Cart = () => {
  const cartList = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const getCartItem = useMemo(() => {
    const items = cartList.map((item) => {
      const product = menuItems.find((menu) => menu.id === item.id);
      return { ...product, qty: item.qty };
    });

    return items;
  }, [cartList]);

  const getSubTotal = useMemo(() => {
    const totalPrice = getCartItem.reduce((acc, item) => {
      const price = item.price * item.qty;
      acc += price;
      return acc;
    }, 0);

    return totalPrice.toFixed(2);
  }, [getCartItem]);

  const getQtyTotal = useMemo(() => {
    const totalQty = getCartItem.reduce((acc, item) => {
      acc += item.qty;
      return acc;
    }, 0);

    return totalQty;
  }, [getCartItem]);

  const setQty = (event, id) => {
    const { value } = event.target;
    dispatch(updateCart({ id: id, qty: Number(value) }));
  };

  const removeProduct = (id) => {
    toast(
      ToastConfirm(
        "Are you sure to",
        "remove",
        "this item",
        () => {
          console.log("");
        },
        () => {
          removeItem(id);
        }
      ),
      {
        duration: 60000,
      }
    );
  };

  const removeItem = (id) => {
    dispatch(removeFromCart(id));
    const tid = toast.success("Successfully item removed from cart.");
    setTimeout(() => {
      toast.dismiss(tid);
    }, 2000);
  };

  const placeOrder = () => {
    const order = {
      qty: getQtyTotal,
      price: getSubTotal,
      time: new Date().toLocaleString(),
      id: new Date().getTime(),
      product: cartList,
    };
    dispatch(addOrder(order));
    navigate("/checkout");
  };

  const CartDetail = ({ product }) => {
    return (
      <section className="cart-details">
        <img className="cart-img" src={product?.img} alt={product.title} />
        <div className="cart-detail">
          <div>
            <p>{product?.title}</p>
            <p>$ {product?.price}</p>
            <p>Eligible for free shipping</p>
          </div>
          <div className="cart-action">
            <label htmlFor="qty" className="cart-qty">
              Qty
              <select
                id="qty"
                className="cart-qty-op"
                onChange={(e) => {
                  setQty(e, product.id);
                }}
                value={product.qty}
              >
                {qty.map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
            </label>
            <button
              className="cart-btn-dl"
              onClick={() => {
                removeProduct(product.id);
              }}
            >
              Remove
            </button>
          </div>
        </div>
      </section>
    );
  };

  return (
    <div className="cart-section">
      <div>
        <Toaster />
      </div>
      <section className="cart-container">
        <header className="cart-heading">
          <h2>
            Your Cart{" "}
            {getCartItem.length === 0
              ? "is empty add some item from menu."
              : ""}
          </h2>
        </header>
        {getCartItem.length !== 0 && <hr />}
        <div className="cart-items">
          {getCartItem?.map((product) => (
            <CartDetail key={product.id} product={product} />
          ))}
        </div>
        {getCartItem.length > 0 && (
          <div className="cart-sub-total">
            <p>
              Subtotal (
              <span>
                {getQtyTotal} {getQtyTotal > 1 ? "items" : "item"}
              </span>
              ): $ {getSubTotal}
            </p>
          </div>
        )}
        {getCartItem.length > 0 && (
          <div className="cart-sub-total">
            <button className="btn-primary" onClick={placeOrder}>
              Place order
            </button>
          </div>
        )}
      </section>
    </div>
  );
};

export default memo(Cart);

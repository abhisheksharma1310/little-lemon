import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import Cart from "../components/Cart";
import OrderHistory from "../components/OrderHistory";

const OrderPage = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (!user?.isLogin) {
      const tid = toast.error("You can not access this page. please login.");
      setTimeout(() => toast.dismiss(tid), 1000);
      navigate("/login");
    }
  }, [user?.isLogin, navigate]);

  return (
    <div className="page">
      <div>
        <Toaster />
      </div>
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

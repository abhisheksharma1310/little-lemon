import React from "react";
import { useNavigate } from "react-router-dom";
import { loginStatus } from "../../reducers/userReducer";
import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";

import logo from "../../assets/img/logo.png";
import "./styles.css";

const Navbar = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleUserStatus = () => {
    if (user?.isLogin) {
      dispatch(loginStatus(false));
      toast.success("Logout successfull!");
      navigate("/login");
    } else {
      navigate("/login");
    }
  };

  return (
    <nav className="main-nav">
      <div className="nav-logo">
        <img src={logo} alt="nav-logo-img" className="nav-logo-img" />
        <h1 className="nav-logo-title">LITTLE LEMON</h1>
      </div>

      <ul className="nav-link">
        <div>
          <Toaster />
        </div>
        <li>
          <button
            onClick={() => {
              navigate("/");
            }}
          >
            Home
          </button>
        </li>
        <li>
          <button
            onClick={() => {
              navigate("/about");
            }}
          >
            About
          </button>
        </li>
        <li>
          <button
            onClick={() => {
              navigate("/menu");
            }}
          >
            Menu
          </button>
        </li>
        <li>
          <button
            onClick={() => {
              navigate("/reservation");
            }}
          >
            Reservations
          </button>
        </li>
        <li>
          <button
            onClick={() => {
              navigate("/order");
            }}
          >
            Order Online
          </button>
        </li>
        <li>
          <button onClick={handleUserStatus}>
            {user.isLogin ? "Logout" : "Login"}
          </button>
        </li>
      </ul>

      <div className="nav-link-m">Nav</div>
    </nav>
  );
};

export default Navbar;

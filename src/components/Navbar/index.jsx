import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginStatus } from "../../reducers/userReducer";
import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons';

import logo from "../../assets/img/logo.png";
import "./styles.css";

const Navbar = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [humburgur, setHumburger] = useState(false);

  const handleUserStatus = () => {
    if (user?.isLogin) {
      dispatch(loginStatus(false));
      toast.success("Logout successfull!");
      navigate("/login");
    } else {
      navigate("/login");
    }
  };

  const handleHumburger = () => {
    setHumburger((p) => !p);
  };

  const navClass = humburgur ? "nav-link nav-m" : "nav-link";

  return (
    <nav className="main-nav">
      <div className="nav-logo">
        <img src={logo} alt="nav-logo-img" className="nav-logo-img" />
        <h1 className="nav-logo-title">LITTLE LEMON</h1>

        <div className="nav-humburgur" onClick={handleHumburger}>
          <FontAwesomeIcon icon={ humburgur ? faXmark : faBars} />
        </div>
      </div>

      <ul className={navClass} onClick={handleHumburger}>
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
    </nav>
  );
};

export default Navbar;

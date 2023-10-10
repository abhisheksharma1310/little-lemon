import React, { memo, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { loginStatus } from "../../reducers/userReducer";
import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import ToastConfirm from "../Toasts/ToastConfirm";

import logo from "../../assets/img/logo.jpg";
import "./styles.css";

const Navbar = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const location = useLocation();

  const path = location.pathname;

  const linkClass = (val) =>
    val === path.split("/")[1] ? "menu-link active" : "menu-link";

  const [humburgur, setHumburger] = useState(false);

  const handleUserStatus = () => {
    if (user?.isLogin) {
      handleLogout();
    }
  };

  const handleLogout = () => {
    toast(
      ToastConfirm(
        "Are you sure to",
        "logout",
        "",
        () => {
          console.log("");
        },
        () => {
          dispatch(loginStatus(false));
          logoutInfo();
        }
      ),
      {
        duration: 60000,
      }
    );
  };

  const logoutInfo = () => {
    const tid = toast.success("Logout successfull");
    setTimeout(() => {
      toast.dismiss(tid);
    }, 1000);
  };

  const handleHumburger = () => {
    setHumburger((p) => !p);
  };

  const navClass = humburgur ? "nav-link nav-m" : "nav-link";

  return (
    <div className="sticky-nav">
      <div>
        <Toaster />
      </div>
      <nav className="main-nav">
        <div className="nav-logo">
          <img src={logo} alt="nav-logo-img" className="nav-logo-img" />
          <h1 className="nav-logo-title">LITTLE LEMON</h1>

          <div className="nav-humburgur" onClick={handleHumburger}>
            <FontAwesomeIcon icon={humburgur ? faXmark : faBars} />
          </div>
        </div>

        <ul className={navClass} onClick={handleHumburger}>
          <li>
            <Link to="/" className={linkClass("")}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" className={linkClass("about")}>
              About
            </Link>
          </li>
          <li>
            <Link to="/menu" className={linkClass("menu")}>
              Menu
            </Link>
          </li>
          <li>
            <Link to="/reservation" className={linkClass("reservation")}>
              Reservations
            </Link>
          </li>
          <li>
            <Link to="/order" className={linkClass("order")}>
              Order Online
            </Link>
          </li>
          <li>
            <Link
              to="/login"
              onClick={handleUserStatus}
              className={linkClass("login")}
            >
              {user.isLogin ? "Logout" : "Login"}
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default memo(Navbar);

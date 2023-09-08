import React from "react";
import { useNavigate } from "react-router-dom";

import logo from "../../assets/img/logo.png";
import "./styles.css";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="main-nav">
      <div className="nav-logo">
        <img src={logo} alt="nav-logo-img" className="nav-logo-img" />
        <h1 className="nav-logo-title">LITTLE LEMON</h1>
      </div>

      <ul className="nav-link">
        <li>
          <button onClick={() => {navigate("/")}}>Home</button>
        </li>
        <li>
          <button onClick={() => {navigate("/about")}}>About</button>
        </li>
        <li>
          <button onClick={() => {navigate("/menu")}}>Menu</button>
        </li>
        <li>
          <button onClick={() => {navigate("/reservations")}}>Reservations</button>
        </li>
        <li>
          <button onClick={() => {navigate("/")}}>Order Online</button>
        </li>
        <li>
          <button onClick={() => {navigate("/")}}>Login</button>
        </li>
      </ul>

      <div className="nav-link-m">Nav</div>
    </nav>
  );
};

export default Navbar;

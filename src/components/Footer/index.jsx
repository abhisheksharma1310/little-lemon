import React from "react";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from "react-router-dom";
import { loginStatus } from "../../reducers/userReducer";
import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";

import "./styles.css";

const Footer = () => {
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
    <div>
      <div>
        <Toaster />
      </div>
      <footer>
        {/* <div className="footer-email">
          <p>Subscribe to Little Lemon</p>
          <hr />
          <div className="email-container">
            <input type="text" placeholder="Email Address" />
            <FontAwesomeIcon className="arrow-icon" icon={faArrowRight} />
          </div>
          <div id="email-sub">
            <label>
              <input type="checkbox" />
              <span id="email-sub-text">
                Subscribe to receive offer from Little Lemon. By subscribing,
                you confirm you have read and understood our privacy policy.
              </span>
            </label>
          </div>
        </div> */}

        <div className="footer-orders">
          <p>Doormat Navigation</p>
          <hr />
          <p
            className="link"
            onClick={() => {
              navigate("/");
            }}
          >
            Home{" "}
          </p>
          <p
            className="link"
            onClick={() => {
              navigate("/about");
            }}
          >
            About{" "}
          </p>
          <p
            className="link"
            onClick={() => {
              navigate("/menu");
            }}
          >
            Menu{" "}
          </p>
          <p
            className="link"
            onClick={() => {
              navigate("/reservation");
            }}
          >
            Reservations{" "}
          </p>
          <p
            className="link"
            onClick={() => {
              navigate("/order");
            }}
          >
            Order Online
          </p>
          <p className="link" onClick={handleUserStatus}>
            {user.isLogin ? "Logout" : "Login"}
          </p>
        </div>

        <div className="footer-about">
          <p>Contact</p>
          <hr />
          <p href="">100 Main Road, Capital City</p>
          <p href="">+1 123456789</p>
          <p href="">contact@little.lemon</p>
        </div>

        <div className="footer-orders">
          <p>Social media links</p>
          <hr />
          <a href="https://www.facebook.com" target="_blank" rel="noreferrer">Facebook </a>
          <a href="https://www.twitter.com" target="_blank" rel="noreferrer">Twitter </a>
          <a href="https://www.instagram.com" target="_blank" rel="noreferrer">Instagram </a>
          <a href="https://www.linkedin.com" target="_blank" rel="noreferrer">Linkedin </a>
        </div>
      </footer>
      <div className="footer-c">
        <hr />
        <div className="footer-c-d">
          <p>© Little Lemon</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;

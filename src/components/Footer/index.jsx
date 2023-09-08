import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

import "./styles.css";

const Footer = () => {
  return (
    <div>
      <footer>
        <div className="footer-email">
          <p>Subscribe to Little Lemon</p>
          <hr />
          <div className="email-container">
            <input type="text" placeholder="Email Address" />
            {/* <img src={ArrowRight} alt={ArrowRight} /> */}
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
        </div>

        <div className="footer-orders">
          <p>Doormat Navigation</p>
          <hr />
          <a href="/">Home </a>
          <a href="/about">About </a>
          <a href="/menu">Menu </a>
          <a href="/reservations">Reservations </a>
          <a href="/">Order Online</a>
          <a href="/">Login</a>
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
          <a href="/">Facebook </a>
          <a href="/">Twitter </a>
          <a href="/">Instagram </a>
          <a href="/">Linkedin </a>
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

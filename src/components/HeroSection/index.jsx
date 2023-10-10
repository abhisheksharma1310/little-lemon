import React, { memo } from "react";
import { useNavigate } from "react-router-dom";

import heroImage from "../../assets/img/restaurant-food.jpg";
import "./styles.css";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <div className="hero-wrap">
      <div className="hero-section">
        <div className="hero-container">
          <div className="hero-content">
            <h1>Little Lemon</h1>
            <h2>Chicago</h2>
            <p>
              We are a family owned Mediterranean restaurant, focused on
              traditional recipes served with a modern twist.
            </p>
            <button
              className="btn-primary"
              onClick={() => {
                navigate("/reservation");
              }}
            >
              Reserve a table
            </button>
          </div>
          <div className="hero-img">
            <img src={heroImage} alt="hero" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(HeroSection);

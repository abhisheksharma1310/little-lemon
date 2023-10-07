import React, { memo } from "react";
import AboutImg from "../../assets/img/restaurant.jpg";

import "./styles.css";

const About = () => {
  return (
    <div className="about-section">
      <div className="about-content">
        <h1>Little Lemon</h1>
        <h2>Chicago</h2>
        <p>
          Little Lemon is a family-owned Mediterranean restaurant, focused on
          traditional recipes served with a modern twist.
        </p>
        <p>
          The restaurant is reminiscent of gathering places found in Greece,
          with old world flavors and rustic roots.
        </p>
      </div>
      <div className="about-img">
        <img src={AboutImg} alt="hero" />
      </div>
    </div>
  );
};

export default memo(About);

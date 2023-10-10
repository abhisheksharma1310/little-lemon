import React, { memo } from "react";
import { Link } from "react-router-dom";

import "./styles.css";

const Error = () => {
  return (
    <div className="page">
      <section className="page_404">
        <div className="four_zero_four_bg">
          <h1 className="text-center ">404</h1>
        </div>

        <div className="contant_box_404">
          <h3 className="h2">Look like you're lost</h3>
          <p>the page you are looking for not avaible!</p>
          <Link to="/" className="link_404">
            Go to Home
          </Link>
        </div>
      </section>
    </div>
  );
};

export default memo(Error);

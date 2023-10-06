import React from "react";
import { Link } from "react-router-dom";

import "./styles.css";

const Error = () => {
  return (
    <div>
      <section class="page_404">
        <div class="four_zero_four_bg">
          <h1 class="text-center ">404</h1>
        </div>

        <div class="contant_box_404">
          <h3 class="h2">Look like you're lost</h3>
          <p>the page you are looking for not avaible!</p>
          <Link to="/" class="link_404">
            Go to Home
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Error;

import React, { memo } from "react";
import testimonialsData from "../../assets/data/testimonials";

import "./styles.css";

const Testimonials = () => {
  const str = "⭐";
  return (
    <section className="testimonials-section">
      <header className="testimonials-header">What our customers say!</header>
      <div className="testimonials-container">
        {testimonialsData?.map((testimonial) => {
          return (
            <div key={testimonial?.name} className="testimonial">
              <p className="testimonial-star">
                {str.repeat(testimonial?.rating)}
              </p>
              <div className="testimonial-profile">
                <img
                  className="testimonial-profile-pic"
                  src={testimonial?.picture}
                  alt={testimonial?.name}
                />
                <p className="testimonial-profile-name">{testimonial?.name}</p>
              </div>
              <p className="testimonial-desc">{testimonial?.desc}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default memo(Testimonials);

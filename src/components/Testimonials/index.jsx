
import React from 'react';

import "./styles.css";

const Testimonials = () => {
  return (
    <section className='testimonials-section'>
        <header className='testimonials-header'>What our customers say!</header>
        <div className='testimonials-container'>
            <div className='testimonial'>
                <p className='testimonial-star'>⭐⭐⭐⭐⭐</p>
                <div className='testimonial-profile'>
                    <img className='testimonial-profile-pic'/>
                    <p className='testimonial-profile-name'>Abhishek</p>
                </div>
                <p className='testimonial-desc'>Description</p>
            </div>
        </div>
    </section>
  )
}

export default Testimonials
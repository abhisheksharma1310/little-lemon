import React from "react";
import HeroSection from "../components/HeroSection";
import Menu from "../components/Menu";
import Testimonials from "../components/Testimonials";
import About from "../components/About";

const Home = () => {
  return (
    <div className="page">
      <HeroSection />
      <Menu />
      <Testimonials />
      <About />
    </div>
  );
};

export default Home;

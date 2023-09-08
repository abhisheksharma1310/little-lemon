import React from "react";
import MenuItems from "../../assets/data/menu";

import "./styles.css";

const Menu = () => {
  return (
    <section className="menu-section">
      <header className="menu-header">
        <h2>This week specials!</h2>
        <button>Online Menu</button>
      </header>
      <div className="menu-items">
        {MenuItems?.map((item) => {
          return (
            <div key={item.id} className="menu-item">
              <img className="menu-item-img" src={item.img} alt={item.title} />
              <div className="menu-item-title-price">
                <h3 className="menu-item-title">{item.title}</h3>
                <h3 className="menu-item-price">
                  <span>$ {item.price}</span>
                </h3>
              </div>
              <p className="menu-item-desc">{item.desc}</p>
              <button className="menu-item-btn">
                <span>Order {item.title}</span>
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Menu;

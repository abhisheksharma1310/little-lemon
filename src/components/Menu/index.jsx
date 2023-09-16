import React, { useMemo, useState } from "react";
import MenuItems from "../../assets/data/menu";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, updateCart } from "../../reducers/cartReducer";
import { useNavigate } from "react-router-dom";

import "./styles.css";

const msg = `Item added to cart.`;
const qty = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const pageLength = MenuItems.length;
const noOfPages = Math.round(pageLength / 6);
let pages = [];
for (let i = 0; i <= noOfPages; i++) {
  pages[i] = i + 1;
}

const Menu = ({ menuPage = false }) => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);
  const cartList = useSelector((state) => state.cart);

  const [currentPage, setCurrentPage] = useState(1);

  const getMenuItems = useMemo(() => {
    const items = MenuItems.map((item) => {
      const cartItem = cartList.find((cart) => cart.id === item.id);
      return { ...item, qty: cartItem?.qty > 0 ? cartItem?.qty : 0 };
    });

    return items;
  }, [cartList]);

  const maxItem = 6;
  const ItemsList = menuPage
    ? getMenuItems.slice(maxItem*(currentPage-1), maxItem*currentPage)
    : getMenuItems.slice(0, 3);

  const addItemToCart = (id) => {
    if (user?.isLogin) {
      dispatch(addToCart({ id: id, qty: 1 }));
      toast.success(msg, { duration: 3000 });
    } else {
      toast.error("Login to add item to cart.");
    }
  };

  const setQty = (event, id) => {
    const { value } = event.target;
    dispatch(updateCart({ id: id, qty: Number(value) }));
  };

  const MenuBottom = ({ item }) => {
    return (
      <div className="menu-bottom">
        {(!user?.isLogin || item?.qty === 0) && (
          <p
            className="menu-item-btn"
            onClick={() => {
              addItemToCart(item?.id);
            }}
            role="button"
          >
            Add to cart
          </p>
        )}
        {user?.isLogin && item?.qty > 0 && (
          <p
            className="menu-item-btn"
            onClick={() => {
              navigate("/order");
            }}
          >
            Added to cart
          </p>
        )}
        {user?.isLogin && item?.qty > 0 && (
          <div className="menu-item-p">
            Qty{" "}
            <select
              className="menu-item-select"
              onChange={(e) => {
                setQty(e, item.id);
              }}
              value={item?.qty}
            >
              {qty.map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>
    );
  };

  const PageNavigate = () => {
    const prevBtn =
      currentPage === 1 ? "nav-btn disable-btn" : "nav-btn active-btn";
    const pageBtn = (v) =>
      currentPage === v ? "nav-btn active-btn-page" : "nav-btn active-btn";
    const nextBtn =
      currentPage === pages.length
        ? "nav-btn disable-btn"
        : "nav-btn active-btn";

    const handlePrev = () => {
      if (currentPage > 1 && currentPage <= pages.length) {
        setCurrentPage((p) => (p -= 1));
      }
    };

    const handleNext = () => {
      if (currentPage >= 1 && currentPage < pages.length) {
        setCurrentPage((p) => (p += 1));
      }
    };

    const handlePage = (page) => {
      setCurrentPage(page);
    };

    console.log(currentPage);

    return (
      <div className="page-navigate">
        <button className={prevBtn} onClick={handlePrev}>
          Prev
        </button>
        {pages.map((page) => (
          <button
            key={page}
            className={pageBtn(page)}
            onClick={() => {
              handlePage(page);
            }}
          >
            {page}
          </button>
        ))}
        <button className={nextBtn} onClick={handleNext}>
          Next
        </button>
      </div>
    );
  };

  return (
    <section className="menu-section">
      <div>
        <Toaster />
      </div>
      <header className="menu-header">
        <h2>This week specials!</h2>
        <button
          onClick={() => {
            navigate("/menu");
          }}
        >
          Online Menu
        </button>
      </header>
      <div className="menu-items">
        {ItemsList?.map((item) => {
          return (
            <div key={item?.id} className="menu-item">
              <img className="menu-item-img" src={item?.img} alt={item.title} />
              <div className="menu-item-title-price">
                <h3 className="menu-item-title">{item?.title}</h3>
                <h3 className="menu-item-price">
                  <span>$ {item.price}</span>
                </h3>
              </div>
              <p className="menu-item-desc">{item?.desc}</p>
              <MenuBottom item={item} />
            </div>
          );
        })}
      </div>
      {menuPage && <PageNavigate />}
    </section>
  );
};

export default Menu;

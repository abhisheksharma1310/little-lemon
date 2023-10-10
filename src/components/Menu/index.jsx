import React, { memo, useMemo, useState } from "react";
import MenuItems from "../../assets/data/menu";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, updateCart } from "../../reducers/cartReducer";
import { useNavigate } from "react-router-dom";

import "./styles.css";

const msg = `Item added to cart.`;
const qty = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const menuType = ["Appetizers", "Main", "Deserts", "Soups", "Salad"];

const Menu = ({ menuPage = false }) => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);
  const cartList = useSelector((state) => state.cart);

  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("auto");
  const [filterBy, setFilterBy] = useState("auto");

  //map menu items with cart menu items
  const getMenuItems = useMemo(() => {
    const items = MenuItems.map((item) => {
      const cartItem = cartList.find((cart) => cart.id === item.id);
      return { ...item, qty: cartItem?.qty > 0 ? cartItem?.qty : 0 };
    });

    return items;
  }, [cartList]);

  //Sort menu items
  const getSortedMenu = useMemo(() => {
    if (sortBy === "auto") return getMenuItems;
    let items = [...getMenuItems];
    if (sortBy === "name-a")
      items.sort((a, b) => {
        if (a.title < b.title) return -1;
        if (a.title > b.title) return 1;
        return 0;
      });
    if (sortBy === "name-d")
      items.sort((a, b) => {
        if (a.title > b.title) return -1;
        if (a.title < b.title) return 1;
        return 0;
      });

    return items;
  }, [getMenuItems, sortBy]);

  //Filter menu Items
  const getFilteredMenu = useMemo(() => {
    if (filterBy === "auto") return getSortedMenu;
    let items = [...getSortedMenu];
    items = items?.filter((item) => item?.type === filterBy);

    return items;
  }, [filterBy, getSortedMenu]);

  //Count number page for page navigation
  const pages = useMemo(() => {
    const pageLength = getFilteredMenu.length;
    const noOfPages = Math.floor(pageLength / 6);
    let pages = [];
    for (let i = 0; i <= noOfPages; i++) {
      pages[i] = i + 1;
    }
    return pages;
  }, [getFilteredMenu]);

  //Show items per page as required
  const maxItem = 6;
  const ItemsList = menuPage
    ? getFilteredMenu?.slice(maxItem * (currentPage - 1), maxItem * currentPage)
    : getFilteredMenu?.slice(0, 3);

  //Add item to cart
  const addItemToCart = (id) => {
    if (user?.isLogin) {
      dispatch(addToCart({ id: id, qty: 1 }));
      const tid = toast.success(msg);
      setTimeout(() => toast.dismiss(tid), 1000);
    } else {
      const tid = toast.error("Login to add item to cart.");
      setTimeout(() => toast.dismiss(tid), 2000);
    }
  };

  //Set quantity of item
  const setQty = (event, id) => {
    const { value } = event.target;
    dispatch(updateCart({ id: id, qty: Number(value) }));
  };

  //Items menu button component
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
            <label htmlFor="item-qty">Qty</label>
            <select
              id="item-qty"
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

  //Page navigate component
  const PageNavigate = () => {
    const prevBtn =
      currentPage === 1 ? "nav-btn disable-btn" : "nav-btn active-btn";
    const pageBtn = (v) =>
      currentPage === v ? "nav-btn active-btn-page" : "nav-btn active-btn";
    const nextBtn =
      currentPage === pages?.length
        ? "nav-btn disable-btn"
        : "nav-btn active-btn";

    const handlePrev = () => {
      if (currentPage > 1 && currentPage <= pages?.length) {
        setCurrentPage((p) => (p -= 1));
      }
    };

    const handleNext = () => {
      if (currentPage >= 1 && currentPage < pages?.length) {
        setCurrentPage((p) => (p += 1));
      }
    };

    const handlePage = (page) => {
      setCurrentPage(page);
    };

    return (
      <div className="page-navigate">
        <button className={prevBtn} onClick={handlePrev}>
          Prev
        </button>
        {pages?.map((page) => (
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

  //Component for Filter and Sorting menu items
  const FilterButtons = () => {
    return (
      <div className="filter-btn">
        <div>
          <label htmlFor="filterBy">FilterBy:</label>
          <select
            name="filterBy"
            id="filterBy"
            onChange={(e) => {
              setFilterBy(e.target.value);
              setCurrentPage(1);
            }}
            defaultValue={filterBy}
          >
            <option value="auto">Auto</option>
            {menuType.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="SortBy">Sort By:</label>
          <select
            name="sortBy"
            id="sortBy"
            onChange={(e) => {
              setSortBy(e.target.value);
            }}
            defaultValue={sortBy}
          >
            <option value="auto">Auto</option>
            <option value="name-a">Name Asd</option>
            <option value="name-d">Name Dsc</option>
          </select>
        </div>
      </div>
    );
  };

  //return main menu items component
  return (
    <section className="menu-section">
      <div>
        <Toaster />
      </div>
      <header className="menu-header">
        <h2>This week specials!</h2>
        {!menuPage && (
          <button
            className="btn-primary"
            onClick={() => {
              navigate("/menu");
            }}
          >
            Online Menu
          </button>
        )}
        {menuPage && <FilterButtons />}
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

export default memo(Menu);

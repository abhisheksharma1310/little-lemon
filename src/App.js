import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import { useSelector } from "react-redux";

import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AboutPage from "./pages/AboutPage";
import MenuPage from "./pages/MenuPage";
import ReservationPage from "./pages/ReservationPage";
import BookingForm from "./components/BookingForm";
import OrderPage from "./pages/OrderPage";
import Checkout from "./components/Checkout";
import LoginPage from "./pages/LoginPage";
import Error from "./components/Error";

function App() {
  const user = useSelector((state) => state.user);

  const privateRoute = (page) => {
    return user?.isLogin ? page : <LoginPage />;
  };

  return (
    <div className="main-area">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route
            path="/reservation"
            element={privateRoute(<ReservationPage />)}
          />
          <Route
            path="/reservation/create"
            element={privateRoute(<BookingForm />)}
          />
          <Route
            path="reservation/edit/:id"
            element={privateRoute(<BookingForm />)}
          />
          <Route path="/order" element={privateRoute(<OrderPage />)} />
          <Route path="/checkout" element={privateRoute(<Checkout />)} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<Error />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";

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

function App() {

  return (
    <div className="main-area">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/reservation" element={<ReservationPage />} />
          <Route path="/reservation/create" element={<BookingForm />} />
          <Route path="reservation/edit/:id" element={<BookingForm />} />
          <Route path="/order" element={<OrderPage />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;

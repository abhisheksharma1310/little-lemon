import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import BookingCard from "../components/BookingCard";

const ReservationPage = () => {
  const navigate = useNavigate();
  const reservationList = useSelector((state) => state.reservation.list);

  const bookNew = () => {
    navigate("/reservation/create");
  };

  const BookNewButton = () => {
    return (
      <div>
        <button className="btn-primary" onClick={bookNew}>
          Book {reservationList.length === 0 ? "your" : "more"} table
        </button>
      </div>
    );
  };

  return (
    <div className="page">
      <header className="page-header">
        <h2>Reserve your table</h2>
      </header>
      {reservationList.length > 0 && (
        <h2>You have {reservationList.length} booking!</h2>
      )}
      {reservationList.length !== 0 && (
        <BookingCard bookings={reservationList} />
      )}
      {reservationList.length === 0 && (
        <p>You don't have any booking please book one.</p>
      )}
      {reservationList.length === 0 && <BookNewButton />}
      {reservationList.length > 0 && reservationList.length < 3 && (
        <BookNewButton />
      )}
      {reservationList.length === 3 && (
        <p className="warn-msg">
          You have reached maximum limit of online table bookings.
        </p>
      )}
    </div>
  );
};

export default ReservationPage;

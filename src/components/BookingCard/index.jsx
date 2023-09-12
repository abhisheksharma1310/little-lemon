import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenToSquare,
  faRectangleXmark,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteReservation } from "../../reducers/reservationReducer";
import toast, { Toaster } from "react-hot-toast";

import "./styles.css";

const BookingCard = ({ bookings }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cancelBooking = (id) => {
    toast((t) => (
      <div>
        <div>
          Are you sure to <b>cancel</b> booking?
        </div>
        <div className="alert">
          <button
            className="btn-primary"
            onClick={() => {
              toast.dismiss(t.id);
            }}
          >
            No
          </button>
          <button
            className="btn-primary"
            onClick={() => {
              toast.dismiss(t.id);
              toast.success('Successfully booking canceled.');
              cancelConfirm(id);
            }}
          >
            Yes
          </button>
        </div>
      </div>
    ));
  };

  const cancelConfirm = (id) => {
    setTimeout(() => {
      dispatch(deleteReservation(id));
    }, 1000);
  }

  const Card = ({ booking }) => (
    <div className="booking-card">
      <div className="booking-detail">
        <p className="b-h">Order id: {booking?.id.slice(4, -3)}</p>
        <p>Booking Date: {booking?.date}</p>
        <p>Booking time: {booking?.time}</p>
        <p>Toal guest: {booking?.guest}</p>
        <p>Booked for: {booking?.occasion}</p>
      </div>
      <div className="booking-icons">
        <FontAwesomeIcon
          className="booking-icon"
          icon={faRectangleXmark}
          onClick={() => {
            cancelBooking(booking?.id);
          }}
        />
        <FontAwesomeIcon
          className="booking-icon"
          icon={faPenToSquare}
          onClick={() => {
            navigate(`/reservation/edit/${booking?.id}`);
          }}
        />
      </div>
    </div>
  );

  return (
    <div className="booking-container">
      <div>
        <Toaster />
      </div>
      {bookings?.map((booking) => (
        <Card key={booking?.id} booking={booking} />
      ))}
    </div>
  );
};

export default BookingCard;

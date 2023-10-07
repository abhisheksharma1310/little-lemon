import React, { memo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenToSquare,
  faRectangleXmark,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteReservation } from "../../reducers/reservationReducer";
import toast, { Toaster } from "react-hot-toast";
import ToastConfirm from "../Toasts/ToastConfirm";

import "./styles.css";

const BookingCard = ({ bookings }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cancelBooking = (id) => {
    toast(
      ToastConfirm(
        "Are you sure to",
        "cancel",
        "booking",
        () => {
          console.log("");
        },
        () => {
          cancelConfirm(id);
        }
      ),
      {
        duration: 60000,
      }
    );
  };

  const cancelConfirm = (id) => {
    const tid = toast.success("Successfully booking canceled.");
    dispatch(deleteReservation(id));
    setTimeout(() => {
      toast.dismiss(tid);
    }, 1000);
  };

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

export default memo(BookingCard);

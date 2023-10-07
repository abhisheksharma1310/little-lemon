import React, { memo } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import {
  createReservation,
  updateReservation,
} from "../../reducers/reservationReducer";
import toast, { Toaster } from "react-hot-toast";

import "./styles.css";

const schema = yup
  .object({
    date: yup
      .string()
      .required()
      .test("is-future-date", "Date must be in the future", (value) => {
        if (!value) return true;
        const selectedDate = new Date(value);
        const currentDate = new Date();
        return selectedDate > currentDate;
      }),
    time: yup.number().positive().integer().required(),
    guest: yup.number().positive().integer().min(1).max(10).required(),
    occasion: yup.string().required(),
    id: yup.string().required(),
  })
  .required();

const availableTimes = [17.0, 18.0, 19.0, 20.0, 21.0, 22.0];
const occasion = ["Birthday", "Anniversary", "Party", "Other"];

const BookingForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();

  const reservations = useSelector((state) => state.reservation.list);
  const dispatch = useDispatch();

  const update = location.pathname.split("/")[2] === "edit";

  const updateValue = reservations.find(
    (reservation) => reservation?.id === id
  );

  const defaultValue = {
    date: "",
    time: availableTimes[0],
    guest: 1,
    occasion: occasion[0],
    id: new Date().getTime(),
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: update ? updateValue : defaultValue,
  });

  const handleFormSubmit = (data) => {
    if (update) {
      const tid = toast.success("Successfully booking updated!");
      setTimeout(() => toast.dismiss(tid), 1000);
      dispatch(updateReservation(data));
      redirect();
    } else {
      const tid = toast.success("Successfully booking created!");
      setTimeout(() => toast.dismiss(tid), 1000);
      dispatch(createReservation(data));
      redirect();
    }
  };

  const redirect = () => {
    setTimeout(() => {
      navigate("/reservation");
    }, 2000);
  };

  return (
    <div className="booking-section">
      <div>
        <Toaster />
      </div>
      <h2>{update ? "Update your reservation" : "Reserve your table"}</h2>
      <form
        className="booking-form"
        onSubmit={handleSubmit(handleFormSubmit)}
        method="post"
      >
        <label htmlFor="res-date">Choose date</label>
        <input
          id="res-date"
          type="date"
          placeholder="DD-MM-YY"
          {...register("date")}
          className={`${errors.date ? "field-err" : ""}`}
        />
        {errors.date && <span className="err">Select valid date.</span>}

        <label htmlFor="res-time">Choose time</label>
        <select
          id="res-time"
          {...register("time")}
          className={`${errors.time ? "field-err" : ""}`}
        >
          {availableTimes?.map((time) => (
            <option key={time} value={time}>
              {time}
            </option>
          ))}
        </select>
        {errors.time && <span className="err">Select valid time.</span>}

        <label htmlFor="guests">Number of guests</label>
        <input
          type="number"
          id="guests"
          {...register("guest")}
          className={`${errors.guest ? "field-err" : ""}`}
        />
        {errors.guest && (
          <span className="err">
            Select valid no. of guest min: 1 and max: 10.
          </span>
        )}

        <label htmlFor="occasion">Occasion</label>
        <select
          id="occasion"
          {...register("occasion")}
          className={`${errors.occasion ? "field-err" : ""}`}
        >
          {occasion?.map((occ) => (
            <option key={occ} value={occ}>
              {occ}
            </option>
          ))}
        </select>
        {errors.occasion && <span className="err">Select valid occasion.</span>}
        <input
          type="submit"
          value={update ? "Update Your reservation" : "Make Your reservation"}
        />
      </form>
    </div>
  );
};

export default memo(BookingForm);

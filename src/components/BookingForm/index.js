import React, { useState } from "react";

import "./styles.css";

const availableTimes = [17.0, 18.0, 19.0, 20.0, 21.0, 22.0];
const occasion = ["Birthday", "Anniversary", "Party", "Other"];

const BookingForm = () => {
  const [formData, setFromData] = useState({
    date: "",
    time: availableTimes[0],
    guest: 1,
    occasion: occasion[0],
  });

  const handleForm = (event) => {
    const { name, value } = event.target;
    setFromData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
  };

  return (
    <div className="booking-section">
      <form className="booking-form" onSubmit={handleFormSubmit} method="post">
        <label for="res-date">Choose date</label>
        <input
          type="date"
          id="res-date"
          placeholder="DD-MM-YY"
          name="date"
          value={formData.date}
          onChange={handleForm}
          required
        />
        <label for="res-time">Choose time</label>
        <select
          id="res-time "
          name="time"
          value={formData.time}
          onChange={handleForm}
          required
        >
          {availableTimes?.map((time) => (
            <option>{time}</option>
          ))}
        </select>
        <label for="guests">Number of guests</label>
        <input
          type="number"
          placeholder="1"
          min="1"
          max="10"
          id="guests"
          name="guest"
          value={formData.guest}
          onChange={handleForm}
          required
        />
        <label for="occasion">Occasion</label>
        <select
          id="occasion"
          name="occasion"
          value={formData.occasion}
          onChange={handleForm}
          required
        >
          {occasion?.map((occ) => (
            <option>{occ}</option>
          ))}
        </select>
        <input type="submit" value="Make Your reservation" />
      </form>
    </div>
  );
};

export default BookingForm;

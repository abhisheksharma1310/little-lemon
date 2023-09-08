import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import BookingForm from "./index";

test("it should handle form submission and capture the selected values", () => {
  // Create a spy function to capture console.log calls
  const consoleSpy = jest.spyOn(console, "log");

  render(<BookingForm />);

  // Fill in the form fields
  const dateInput = screen.getByLabelText("Choose date");
  const timeSelect = screen.getByLabelText("Choose time");
  const guestInput = screen.getByLabelText("Number of guests");
  const occasionSelect = screen.getByLabelText("Occasion");

  fireEvent.change(dateInput, { target: { value: "2023-09-08" } });
  fireEvent.change(timeSelect, { target: { value: "18" } });
  fireEvent.change(guestInput, { target: { value: "4" } });
  fireEvent.change(occasionSelect, { target: { value: "Party" } });

  // Submit the form
  const submitButton = screen.getByText("Make Your reservation");
  fireEvent.click(submitButton);

  // Check if the form data is captured correctly
  expect(consoleSpy).toHaveBeenCalledWith({
    date: "2023-09-08",
    time: "18",
    guest: "4",
    occasion: "Party",
  });

  // Restore the original console.log
  consoleSpy.mockRestore();
});

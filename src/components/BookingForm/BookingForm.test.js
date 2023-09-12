import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import configureStore from 'redux-mock-store'; // You may need to install this package

import BookingForm from './index.jsx'; // Import your component here

const mockStore = configureStore([]);

describe('BookingForm Component', () => {
  let store;
  let initialState = {}; // Define your initial state here

  beforeEach(() => {
    store = mockStore(initialState);
  });

  test('renders correctly', () => {
    render(
      <Provider store={store}>
        <Router>
          <BookingForm />
        </Router>
      </Provider>
    );

    // You can use screen.getByLabelText, screen.getByText, etc. to access form elements and make assertions.
    const dateInput = screen.getByLabelText('Choose date');
    const timeInput = screen.getByLabelText('Choose time');
    const guestsInput = screen.getByLabelText('Number of guests');
    const occasionInput = screen.getByLabelText('Occasion');
    const submitButton = screen.getByText('Make Your reservation');

    // You can use userEvent library to simulate user interactions
    userEvent.type(dateInput, '2023-12-31');
    userEvent.selectOptions(timeInput, '18.0');
    userEvent.type(guestsInput, '4');
    userEvent.selectOptions(occasionInput, 'Anniversary');
    userEvent.click(submitButton);

    // Make assertions about the form interactions and any expected behavior

    // For example:
    expect(dateInput).toHaveValue('2023-12-31');
    expect(timeInput).toHaveValue('18.0');
    expect(guestsInput).toHaveValue('4');
  });
});

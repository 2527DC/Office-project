import React from 'react';
import { render, waitFor, screen } from '@testing-library/react-native';
import MockAdapter from 'axios-mock-adapter';

import axios from 'axios';
// Adjust the path if necessary
import BookingHistory from '../src/screens/BookingHistory';
import API_ENDPOINTS from '../src/constant/Constants';

// Mock Axios
const mock = new MockAdapter(axios);

describe('BookingHistory Component', () => {
  afterEach(() => {
    mock.reset();
  });

  it('should display loading indicator while fetching data', () => {
    const { getByText, getByTestId } = render(<BookingHistory />);

    expect(getByTestId('loading-indicator')).toBeTruthy();
    expect(getByText('Loading...')).toBeTruthy();
  });

  it('should display booking history data when API call is successful', async () => {
    // Mock API response
    mock.onPost(API_ENDPOINTS.BOOKING_HISTORY).reply(200, {
      success: 1,
      data: {
        rides: [
          {
            booking_id: 123,
            book_date: '2024-11-28',
            book_time: '10:00 AM',
            source_address: 'Point A',
            dest_address: 'Point B',
            ride_status: 'Completed',
            total_kms: 20,
            driving_time: '30 mins',
          },
        ],
      },
    });

    const { getByText } = render(<BookingHistory />);

    await waitFor(() => {
      expect(getByText('Booking ID: 123')).toBeTruthy();
      expect(getByText('Date: 2024-11-28')).toBeTruthy();
      expect(getByText('Source: Point A')).toBeTruthy();
      expect(getByText('Destination: Point B')).toBeTruthy();
      expect(getByText('Status: Completed')).toBeTruthy();
    });
  });

  it('should display an error message when the API call fails', async () => {
    // Mock API failure
    mock.onPost(API_ENDPOINTS.BOOKING_HISTORY).networkError();

    const { getByText } = render(<BookingHistory />);

    await waitFor(() => {
      expect(getByText('Something went wrong. Please try again later.')).toBeTruthy();
    });
  });

  it('should display an error when the API returns a non-success status', async () => {
    // Mock API response with failure
    mock.onPost(API_ENDPOINTS.BOOKING_HISTORY).reply(200, {
      success: 0,
    });

    const { getByText } = render(<BookingHistory />);

    await waitFor(() => {
      expect(getByText('Failed to load booking history.')).toBeTruthy();
    });
  });
});

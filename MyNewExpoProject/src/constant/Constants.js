// apiEndpoints.js

const BASE_URL = 'https://ets.mltcorporate.com/api'; // Replace with your actual base URL

const API_ENDPOINTS = {
  REGISTER: `${BASE_URL}/user-registration`,
  LOGIN: `${BASE_URL}/user-login`,
  BOOK_NOW: `${BASE_URL}/book-now`,
  BOOKING_HISTORY: `${BASE_URL}/user/ride-history`,
  CANCLE_BOOKING: `${BASE_URL}/cancel-booking`,
};

export default API_ENDPOINTS;

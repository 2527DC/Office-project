import Config from "react-native-config";


const BASE_URL =Config.BASE_URL ; // This will load from your .env file

const API_ENDPOINTS = {
  REGISTER: `${BASE_URL}/user-registration`,
  LOGIN: `${BASE_URL}/user-login`,
  BOOK_NOW: `${BASE_URL}/book-now`,
  BOOKING_HISTORY: `${BASE_URL}/ride-history`,
  CANCLE_BOOKING: `${BASE_URL}/cancel-booking`,
  GOOGLE_MAPS_API_KEY:"AIzaSyCI7CwlYJ6Qt5pQGW--inSsJmdEManW-K0"

};

export default API_ENDPOINTS;

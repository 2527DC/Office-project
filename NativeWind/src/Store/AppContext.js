import React, { createContext, useContext, useState, useEffect } from 'react';
import { Alert } from 'react-native';
import Geolocation from '@react-native-community/geolocation';

// Create Context
const AppContext = createContext();

// Custom hook to use the context
export const useAppContext = () => {
  return useContext(AppContext);
};

// Create a provider component
export const AppProvider = ({ children }) => {
  // State to store user data
  const [userData, setUserData] = useState({
    api_token: '',
    emailid: '',
    user_name: '',
    phone: '',
    phone_code: '',
    gender: '',
    address: '',
    user_id: '',
  });

  // State to store location
  const [location, setLocation] = useState(null);

  // Method to update specific user data field
  const updateUserData = (key, value) => {
    setUserData((prev) => ({
      ...prev,
      [key]: value, // Update only the specified key
    }));
  };

  // Method to set all user data at once
  const setAllUserData = (data) => {
    setUserData(data);
  };

  // Method to get a specific field value from user data
  const getUserData = (key) => {
    return userData[key] || null; // Return the value or null if not found
  };

  // Method to clear user data
  const clearUserData = () => {
    setUserData({
      api_token: '',
      emailid: '',
      user_name: '',
      phone: '',
      phone_code: '',
      gender: '',
      address: '',
      user_id: '',
    });
  };

  // Method to get the current location
  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });

        // Log latitude and longitude
        console.log('Latitude:', latitude);
        console.log('Longitude:', longitude);
      },
      (error) => {
        console.error(error);
        Alert.alert('Error', 'Unable to fetch location.');
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };

  useEffect(() => {
    // Automatically fetch location when the app loads
    getCurrentLocation();
  }, []);

  return (
    <AppContext.Provider
      value={{
        userData,
        updateUserData,
        setAllUserData,
        getUserData,
        clearUserData,
        location, // Provide location data
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

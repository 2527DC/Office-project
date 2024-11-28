import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_ENDPOINTS from '../constant/Constants'; // Adjust the path if necessary

const BookingHistory = () => {
  const [bookingHistory, setBookingHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // API call to fetch booking history
    const fetchBookingHistory = async () => {
      try {
        const response = await axios.post(API_ENDPOINTS.BOOKING_HISTORY, {
          customer_id: 167, // Replace with dynamic customer_id if needed
          api_token: 'N8pBvNaYHtEGLTEYrCW9KZsqDntoNI2BiMWG1Dj6UADR9dUPjkhXHMcA24pU', // Replace with dynamic api_token if needed
        }, {
          headers: {
            'Content-Type': 'application/json', // Ensure the request body is sent as JSON
          },
        });

        const result = response.data;

        if (response.status === 200 && result.success === 1) {
          setBookingHistory(result.data.rides);
        } else {
          setError('Failed to load booking history.');
        }
      } catch (err) {
        console.error(err); // Log the error for debugging
        setError('Something went wrong. Pgain later.');
      } finally {
        setLoading(false);
      }
    };

    fetchBookingHistory();
  }, []); // Empty dependency array means this effect runs once when the component mounts

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
     
      <FlatList
        data={bookingHistory}
        keyExtractor={(item) => item.booking_id.toString()}
        renderItem={({ item }) => (
          <View style={styles.bookingItem}>
            <Text style={styles.bookingText}>Booking ID: {item.booking_id}</Text>
            <Text style={styles.bookingText}>Date: {item.book_date}</Text>
            <Text style={styles.bookingText}>Time: {item.book_time}</Text>
            <Text style={styles.bookingText}>Source: {item.source_address}</Text>
            <Text style={styles.bookingText}>Destination: {item.dest_address}</Text>
            <Text style={styles.bookingText}>Status: {item.ride_status}</Text>
            <Text style={styles.bookingText}>Distance: {item.total_kms || 'N/A'}</Text>
            <Text style={styles.bookingText}>Driving Time: {item.driving_time || 'N/A'}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  bookingItem: {
    marginBottom: 16,
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  bookingText: {
    fontSize: 16,
    marginBottom: 4,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default BookingHistory;
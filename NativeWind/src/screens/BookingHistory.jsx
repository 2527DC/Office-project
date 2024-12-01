import { View, Text, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
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
      <View className="flex-1 justify-center items-center bg-gray-100">
      <ActivityIndicator size="large" color="#0000ff" />
      <Text className="text-lg text-gray-700 mt-2">Loading...</Text>
    </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-100">
        <Text className="text-lg text-red-500">{error}</Text>
      </View>
    );
  }

  return (
   
   
    <View >
     
      <FlatList
        data={bookingHistory}
        keyExtractor={(item) => item.booking_id.toString()}
        renderItem={({ item }) => (
          
           <View className="bg-blue-700 w-[350px] p-4 rounded-lg shadow-md">
      
           {/* Date and Time Row */}
           <View className="flex-row justify-between mb-2">
             <Text className="text-[16px] font-bold text-white">Date: {item.book_date}</Text>
             <Text className="text-md font-bold text-white">Time: {item.book_time}</Text>
           </View>
     
           {/* Source and Destination */}
           <Text className="text-[16px] font-bold text-white mb-2">
             Source:{item.ride_status}
           </Text>
           <Text className="text-[16px] font-bold text-white mb-2">
             Destination: {item.dest_address} </Text>
     
           {/* Status */}
           <Text className="text-md font-bold text-white mb-2">
             Time: 09:08 PM
           </Text>
     
           <View className="flex-row justify-between items-center">
             <Text className="text-lg font-bold text-white">Status: Cancelled</Text>
             <TouchableOpacity className='bg-red-500'>
               <Text className="text-lg text-white font-bold">Cancel</Text>
             </TouchableOpacity>
           </View>
         </View>
        )}
      /> 
    </View>

    
  );
};



export default BookingHistory;
import React, { useState } from "react";
import { View, Text, TouchableOpacity, Alert, Platform } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Calendar } from "react-native-calendars";
import ModalDatetimePicker from "react-native-modal-datetime-picker";
import axios from "axios";

const Schedule = () => {
  const [selectedDates, setSelectedDates] = useState([]);
  const [selectedTime, setSelectedTime] = useState(null);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const today = new Date().toISOString().split("T")[0];

  const handleDateSelect = (day) => {
    const date = day.dateString;
    const isSelected = selectedDates.find((item) => item.date === date);

    if (isSelected) {
      // Unselect the date if it's already selected
      setSelectedDates((prev) => prev.filter((item) => item.date !== date));
    } else {
      // Select the date and set the time
      if (selectedTime) {
        setSelectedDates((prev) => [...prev, { date, time: selectedTime }]);
      } else {
        Alert.alert("Error", "Please select a time before adding the date.");
      }
    }
  };

  const handleTimeSelect = (time) => {
    const formattedTime = time.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    setSelectedTime(formattedTime);
    setShowTimePicker(false); // Hide the time picker after selection
  };

  const sendDataToBackend = async () => {
    try {
      const jsonData = selectedDates.map(({ date, time }) => ({ date, time }));
      const response = await axios.post("https://your-backend-url.com/api/schedule", jsonData);
      Alert.alert("Success", "Data sent successfully!");
    } catch (error) {
      Alert.alert("Error", "Failed to send data to the backend.");
    }
  };

  return (
    <SafeAreaProvider>
      <View className="flex-1 bg-white">
        {/* Calendar and Time Selection */}
        <View className="flex-1 p-4">
          <Calendar
            minDate={today}
            onDayPress={handleDateSelect}
            markedDates={selectedDates.reduce((acc, item) => {
              acc[item.date] = { selected: true, marked: true };
              return acc;
            }, {})}
            theme={{
              selectedDayBackgroundColor: "blue",
              todayTextColor: "red",
              arrowColor: "blue",
            }}
          />
          <TouchableOpacity
            onPress={() => setShowTimePicker(true)}
            className="mt-4 bg-blue-500 p-3 rounded-lg"
          >
            <Text className="text-white text-center font-bold">Choose Time</Text>
          </TouchableOpacity>
        </View>

        {/* Submit Button */}
        <View className="h-1/5 p-4 border-t border-gray-200">
          <TouchableOpacity
            onPress={sendDataToBackend}
            className="mt-4 bg-green-500 p-3 rounded-lg"
          >
            <Text className="text-white text-center font-bold">Submit</Text>
          </TouchableOpacity>
        </View>

        {/* Time Picker Modal */}
        <ModalDatetimePicker
          isVisible={showTimePicker}
          mode="time"
          onConfirm={handleTimeSelect}
          onCancel={() => setShowTimePicker(false)}
          date={new Date()}
        />
      </View>
    </SafeAreaProvider>
  );
};

export default Schedule;

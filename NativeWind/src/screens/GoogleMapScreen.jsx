import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, FlatList } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import API_ENDPOINTS from '../constant/Constants';

const GoogleMapScreen = () => {
  const [showBookingView, setShowBookingView] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [showDriverInfo, setShowDriverInfo] = useState(false);

  const handleRadioButton = (option) => {
    setSelectedOption(option);
  };

  const handleConfirmBooking = () => {
    alert(`Booking Confirmed: Source - ${source}, Destination - ${destination}`);
    setShowBookingView(false);
    setSource('');
    setDestination('');
    setSelectedOption('');
  };

  const options = ['Home', 'Office', 'RAC'];

  const renderOption = ({ item }) => (
    <TouchableOpacity
      className={`p-2 m-2 rounded-xl ${selectedOption === item ? 'bg-green-500' : 'bg-gray-200'}`}
      onPress={() => handleRadioButton(item)}
    >
      <Text className={`${selectedOption === item ? 'text-white font-bold' : 'text-gray-800'} text-lg`}>
        {item}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View className="flex-1">
      {/* MapView */}
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker coordinate={{ latitude: 37.78825, longitude: -122.4324 }} />
      </MapView>

      {/* Book Button */}
      <TouchableOpacity
        className="absolute bottom-5 right-5 bg-green-500 p-2 rounded-full shadow-lg"
        onPress={() => setShowBookingView(true)} // Show the booking view when clicked
      >
        <Text className="text-white font-bold text-lg">Book</Text>
      </TouchableOpacity>

      {/* Driver Info Button */}
      <TouchableOpacity
        className="absolute bottom-5 left-5 bg-green-500 p-2 rounded-full shadow-lg"
        onPress={() => setShowDriverInfo(true)} // Show driver info when clicked
      >
        <Text className="text-white font-bold text-lg">Driver Info</Text>
      </TouchableOpacity>

      {/* Booking View */}
      {showBookingView && (
        <View className="absolute bottom-0 left-0 right-0 bg-white p-3 rounded-tl-xl rounded-tr-xl shadow-lg z-10">
          {/* Source and Destination Fields */}
          {selectedOption === 'RAC' && (
            <View className="m-0">
              <GooglePlacesAutocomplete
                placeholder="Source"
                onPress={(data, details = null) => setSource(data.description)}
                query={{
                  key: API_ENDPOINTS.GOOGLE_MAPS_API_KEY,
                  language: 'en',
                }}
                fetchDetails={true}
                styles={{
                  container: { width: '100%', marginBottom: 16 },
                  textInput: {
                    height: 40,
                    borderColor: '#ccc',
                    borderWidth: 1,
                    borderRadius: 5,
                    paddingLeft: 8,
                  },
                }}
              />
              <GooglePlacesAutocomplete
                placeholder="Destination"
                onPress={(data, details = null) => setDestination(data.description)}
                query={{
                  key: API_ENDPOINTS.GOOGLE_MAPS_API_KEY,
                  language: 'en',
                }}
                fetchDetails={true}
                styles={{
                  container: { width: '100%', marginBottom: 16 },
                  textInput: {
                    height: 40,
                    borderColor: '#ccc',
                    borderWidth: 1,
                    borderRadius: 5,
                    paddingLeft: 8,
                  },
                }}
              />
            </View>
          )}

          {/* Options (Radio Buttons in a row) */}
          <View className="flex-row mt-2 mb-1 justify-between">
            <FlatList
              horizontal
              data={options}
              renderItem={renderOption}
              keyExtractor={(item) => item}
              showsHorizontalScrollIndicator={false}
            />
          </View>

          {/* Confirm Booking and Close Buttons */}
          <View className="flex-row justify-between items-center mt-1 mb-6 px-4">
            {/* Close Button */}
            <TouchableOpacity
              className="bg-red-500 p-1 rounded-lg flex-1 mr-2 "
              onPress={() => setShowBookingView(false)}
            >
              <Text className="text-white font-bold text-lg text-center">Close</Text>
            </TouchableOpacity>

            {/* Confirm Booking Button */}
            <TouchableOpacity
              className="bg-blue-500 p-1 rounded-lg flex-1 ml-2"
              onPress={handleConfirmBooking}
            >
              <Text className="text-white font-bold text-lg text-center">Confirm</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Driver Info Modal */}
      {showDriverInfo && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={showDriverInfo}
          onRequestClose={() => setShowDriverInfo(false)}
        >
          <View className="flex-1 justify-center items-center bg-black/50">
            <View className="bg-white p-6 rounded-xl w-4/5 items-center">
              <Text className="text-xl font-bold mb-4">Driver Information</Text>
              <Text>Name: John Doe</Text>
              <Text>Phone: +1 234 567 890</Text>
              <Text>Car Model: Toyota Prius</Text>
              <Text>License Plate: ABC123</Text>

              <TouchableOpacity
                className="bg-blue-500 p-3 rounded-lg mt-4"
                onPress={() => setShowDriverInfo(false)}
              >
                <Text className="text-white font-bold text-lg">Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

export default GoogleMapScreen;

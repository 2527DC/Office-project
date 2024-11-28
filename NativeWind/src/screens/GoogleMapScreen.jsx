import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const GoogleMapScreen = () => {
  return (
    <View style={{ flex: 1 }}>
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
        {/* Example Marker */}
        <Marker coordinate={{ latitude: 37.78825, longitude: -122.4324 }} />
      </MapView>

      {/* Button at the Mid-Right */}
      <TouchableOpacity
        style={styles.midRightButton}
        onPress={() => alert('Mid Right Button Pressed')}
      >
        <Text style={styles.buttonText}>Mid Right</Text>
      </TouchableOpacity>

      {/* Bottom Buttons */}
      <View style={styles.bottomButtonsContainer}>
        <TouchableOpacity
          style={styles.bottomButton}
          onPress={() => alert('Bottom Left Button Pressed')}
        >
          <Text style={styles.buttonText}>Left</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.bottomButton}
          onPress={() => alert('Bottom Right Button Pressed')}
        >
          <Text style={styles.buttonText}>Right</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  midRightButton: {
    position: 'absolute',
    top: '50%', // Position at the middle
    right: 10, // Right side
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1, // Ensure the button is above the map
  },
  bottomButtonsContainer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  bottomButton: {
    backgroundColor: 'blue',
    padding: 15,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default GoogleMapScreen;

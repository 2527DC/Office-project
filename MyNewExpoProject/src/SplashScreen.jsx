import React, { useEffect } from 'react';
import { View, Text } from 'react-native';

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Login'); // Navigate to Login after 5 seconds
    }, 5000);

    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, [navigation]);

  return (
    <View className="flex-1 justify-center items-center bg-blue-600">
      <Text className="text-white text-4xl font-extrabold">ETS RIDER</Text>
    </View>
  );
};

export default SplashScreen;

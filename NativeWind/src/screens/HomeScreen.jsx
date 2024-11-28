import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';


const HomeScreen = () => {
  
  return (
    <SafeAreaProvider>
<View className="flex-1 justify-center items-center bg-white">
      <Text className="text-blue-500 font-bold text-2xl">ForgotPasswordScreen</Text>
    </View>
    </SafeAreaProvider>
  );
};


export default HomeScreen;

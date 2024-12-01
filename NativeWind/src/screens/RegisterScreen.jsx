import React, { useState } from 'react';
import { Text, TouchableOpacity, TextInput, Alert, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';


const RegisterScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');

  const handleSignUp = () => {
    if (!username || !email || !password || !phone) {
      Alert.alert('Error', 'Please fill in all fields.');
    } else {
      Alert.alert('Success', 'Registration Successful!');
    }
  };

  return (
    <SafeAreaProvider>
      <LinearGradient
        colors={['blue', '#dbeafe', 'black', '#60a5fa','white']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
      >
        {/* Card View */}
        <View className="bg-blue-700 p-6 rounded-2xl w-[350] max-w-sm">
          <Text className="font-bold text-2xl mb-4 text-white">Sign Up</Text>

          {/* Username Field */}
          <TextInput
            className="w-full h-12 border border-gray-300 rounded-lg p-3 mb-4 bg-white"
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
          />

          {/* Email Field */}
          <TextInput
            className="w-full h-12 border border-gray-300 rounded-lg p-3 mb-4 bg-white"
            placeholder="Email"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />

          {/* Password Field */}
          <TextInput
            className="w-full h-12 border border-gray-300 rounded-lg p-3 mb-4 bg-white"
            placeholder="Password"
            secureTextEntry={true}
            value={password}
            onChangeText={setPassword}
          />

          {/* Phone Number Field */}
          <TextInput
            className="w-full h-12 border border-gray-300 rounded-lg p-3 mb-4 bg-white"
            placeholder="Phone Number"
            keyboardType="phone-pad"
            value={phone}
            onChangeText={setPhone}
          />

          {/* Sign Up Button */}
          <TouchableOpacity
            className="bg-blue-800 w-[85]  p-2 rounded-lg mt-4"
            onPress={handleSignUp}
          >
            <Text className="text-white font-bold text-lg">Sign Up</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </SafeAreaProvider>
  );
};

export default RegisterScreen;

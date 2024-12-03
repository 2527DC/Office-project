import React, { useState, useRef } from 'react';
import { Text, TouchableOpacity, TextInput, Alert, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import PhoneInput from 'react-native-phone-number-input';
import axios from 'axios'; // Importing axios for API requests
import API_ENDPOINTS from '../constant/Constants';

// CustomDropdown Component for Gender Selection
const GenderDropdown = ({ onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedGender, setSelectedGender] = useState(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (gender) => {
    setSelectedGender(gender);
    setIsOpen(false);
    onSelect(gender);
  };

  return (
    <View style={{ width: '100%', marginBottom: 16 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
        <Text style={{ fontSize: 16, color: '#333', marginRight: 10 }}>GENDER</Text>
        <TouchableOpacity
          style={{
            flex: 1,
            padding: 16,
            backgroundColor: '#f1f1f1',
            borderRadius: 8,
            borderWidth: 1,
            borderColor: '#ccc',
          }}
          onPress={toggleDropdown}>
          <Text style={{ fontSize: 16, color: '#333' }}>
            {selectedGender ? selectedGender : 'Select Gender'}
          </Text>
        </TouchableOpacity>
      </View>

      {isOpen && (
        <View
          style={{
            marginTop: 5,
            backgroundColor: '#fff',
            borderRadius: 8,
            borderWidth: 1,
            borderColor: '#ccc',
            elevation: 3,
          }}>
          {['Male', 'Female', 'Other'].map((gender, index) => (
            <TouchableOpacity
              key={index}
              style={{ padding: 10 }}
              onPress={() => handleSelect(gender)}>
              <Text style={{ fontSize: 16, color: '#333' }}>{gender}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

const RegisterScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [formattedPhone, setFormattedPhone] = useState('');
  const [selectedGender, setSelectedGender] = useState(null); // For gender selection
  const phoneInput = useRef(null);

  const handleSignUp = async () => {
    // Validation
    if (!username || !email || !password || !selectedGender || !formattedPhone) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }
  
    // Email Validation (basic)
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Error', 'Please enter a valid email address.');
      return;
    }
  
    // Password Validation (at least 8 characters, mix of letters and numbers)
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!passwordRegex.test(password)) {
      Alert.alert('Error', 'Password must be at least 8 characters long and contain both letters and numbers.');
      return;
    }
  
    // Phone Number Validation (correct country code and 10 digits)
    const phoneCode = phoneInput.current?.getCountryCode(); // Get the country code from PhoneInput
    const fullPhoneNumber = `+${phoneCode}${formattedPhone}`;

    if (!formattedPhone || formattedPhone.length !== 10 || !phoneCode) {
      Alert.alert('Error', 'Please enter a valid phone number with 10 digits.');
      return;
    }
  
    // Preparing data in JSON format
    const registrationData = {
      username: username,
      email: email,
      password: password,
      phone: fullPhoneNumber, // Send full phone number with country code
      gender: selectedGender,
    };
  
    // Sending data to the backend using Axios
    try {
      const response = await axios.post(API_ENDPOINTS.REGISTER, registrationData, {
        headers: {
          'Content-Type': 'application/json', // Ensures the data is sent as JSON
        },
      });
      if (response.status === 200) {
        Alert.alert('Success', 'Registration Successful!');
        // Navigate to the next screen or reset form
        navigation.navigate('NextScreen'); // Replace 'NextScreen' with your desired screen name
      } else {
        Alert.alert('Error', 'Something went wrong, please try again.');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'An error occurred. Please try again.');
    }
  };
  
  return (
    <SafeAreaProvider>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f7f7f7' }}>
        <View style={{ backgroundColor: '#fff', padding: 20, borderRadius: 10, width: '90%', maxWidth: 400, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 10 }}>
          <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#333', textAlign: 'center', marginBottom: 20 }}>Sign Up</Text>

          {/* Username Field */}
          <TextInput
            style={{ width: '100%', height: 45, borderColor: '#ccc', borderWidth: 1, borderRadius: 8, paddingLeft: 10, marginBottom: 16 }}
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
          />

          {/* Email Field */}
          <TextInput
            style={{ width: '100%', height: 45, borderColor: '#ccc', borderWidth: 1, borderRadius: 8, paddingLeft: 10, marginBottom: 16 }}
            placeholder="Email"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />

          {/* Password Field */}
          <TextInput
            style={{ width: '100%', height: 45, borderColor: '#ccc', borderWidth: 1, borderRadius: 8, paddingLeft: 10, marginBottom: 16 }}
            placeholder="Password"
            secureTextEntry={true}
            value={password}
            onChangeText={setPassword}
          />

          {/* Phone Input Field */}
          <PhoneInput
            ref={phoneInput}
            defaultValue={phone}
            layout="first"
            onChangeText={setPhone}
            onChangeFormattedText={setFormattedPhone}
            withDarkTheme
            withShadow
            autoFocus
            containerStyle={{
              width: '100%',
              marginBottom: 16,
              borderRadius: 8,
              backgroundColor: '#f1f1f1',
            }}
            textContainerStyle={{ backgroundColor: '#fff' }}
            withFlag
            withCountryCallingCode={false}
          />

          {/* Gender Dropdown Field */}
          <GenderDropdown onSelect={setSelectedGender} />

          {/* Sign Up Button */}
          <TouchableOpacity
            style={{
              backgroundColor: '#007bff',
              paddingVertical: 15,
              borderRadius: 8,
              marginTop: 20,
              alignItems: 'center',
            }}
            onPress={handleSignUp}>
            <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold' }}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaProvider>
  );
};

export default RegisterScreen;

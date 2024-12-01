import React from 'react';
import { View, Text, Image, TouchableOpacity, Alert } from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import LinearGradient from 'react-native-linear-gradient'; // Import LinearGradient
import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';
import BookingHistory from './screens/BookingHistory';
import Reviews from './screens/Reviews';
import Schedule from './screens/Schedule';

// Create Drawer Navigator
const Drawer = createDrawerNavigator();

// Custom Drawer Content
const CustomDrawerContent = (props) => {
  const handleLogout = () => {

    Alert.alert(
      "Logout",
      "Are you sure you want to log out?",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Logout", 
          style: "destructive",
          onPress: () => {
         // Perform logout actions here (e.g., clearing tokens, navigating to login)   
           props.navigation.reset({
              index: 0,
              routes: [{ name: 'Login' }], // Replace 'Login' with your actual login screen name
            });
          }
        }
      ]
    );
  };

  return (
    <LinearGradient
    // colors={['#3b82f6', '#dbeafe', '#bfdbfe','#60a5fa']} // Gradient colors
    start={{ x: 4, y: 0 }} // Start from top-left
    end={{ x: 1, y: -1 }} // End at bottom-right
    style={{ flex: 1 }}
   colors={['white','white']}
    >
      <DrawerContentScrollView {...props}>
        {/* Custom Header */}
        <View className="bg-blue-400 p-5 items-center border-b border-gray-300 rounded-lg mb-2">
          <Image
            source={require('./assets/image/images.jpg')}
            className="w-20 h-20 rounded-full mb-2"/>
          <Text className="text-lg font-bold mb-1">John Doe</Text>
          <Text className="text-md text-blacks-500">johndoe@example.com</Text>
        </View>

        {/* Default Drawer Items */}
        <DrawerItemList {...props} />

        {/* Logout Button */}
        <View className="mt-5 px-12">
          <TouchableOpacity
            className="bg-red-500 py-2 px-4 rounded-lg items-center my-2"
            onPress={handleLogout}
          >
            <Text className="text-white font-bold text-lg">
              Logout
            </Text>
          </TouchableOpacity>
        </View>
      </DrawerContentScrollView>
    </LinearGradient>
  );
};

// Drawer Navigator
const MyDrawer = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{

        
        drawerItemStyle: {
          borderWidth: 1, // Add border
          borderColor: 'white', // Border color
          marginVertical: 5, // Add spacing between items
          borderRadius: 16, // Optional: rounded corners
        },
        drawerActiveTintColor: 'white', // Active item text color
        drawerInactiveTintColor: 'black', // Inactive item text color
        drawerActiveBackgroundColor: '#60a5fa', // Active item background color
        drawerLabelStyle: {
          fontSize: 16,
          fontWeight: 'bold', // Make the label bold
        },
      }}
    >
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
      />
      <Drawer.Screen
        name="Profile"
        component={ProfileScreen}
      />
      <Drawer.Screen
        name="BookingHistory"
        component={BookingHistory}
      />
      <Drawer.Screen
        name="Schedule"
        component={Schedule}
      />
      <Drawer.Screen name="Reviews"
        component={Reviews}/>
    </Drawer.Navigator>
  );
};

export default MyDrawer;

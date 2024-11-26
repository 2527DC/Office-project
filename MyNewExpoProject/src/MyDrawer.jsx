import React from 'react';
import { View, Text, Image } from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';
import BookingHistory from './screens/BookingHistory';
import Reviews from './screens/Reviews';
import Schedule from './screens/Schedule';

// Create Drawer Navigator
const Drawer = createDrawerNavigator();

// Custom Drawer Content
const CustomDrawerContent = (props) => {
  return (
    <DrawerContentScrollView {...props}>
      {/* Custom Header */}
      <View className="bg-gray-100 p-5 items-center border-b border-gray-300 mb-2">
        <Image
          source={{ uri: 'https://via.placeholder.com/100' }} // Replace with your image URL
          className="w-20 h-20 rounded-full mb-2"
        />
        <Text className="text-lg font-bold mb-1">John Doe</Text>
        <Text className="text-sm text-gray-500">johndoe@example.com</Text>
      </View>
      
      {/* Default Drawer Items */}
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
};

// Drawer Navigator
const MyDrawer = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Profile" component={ProfileScreen} />
      <Drawer.Screen name="BookingHistory" component={BookingHistory} />
      <Drawer.Screen name="Schedule" component={Schedule} />
      <Drawer.Screen name="Reviews" component={Reviews} />
    </Drawer.Navigator>
  );
};

export default MyDrawer;

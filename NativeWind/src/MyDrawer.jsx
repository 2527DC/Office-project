import React from 'react';
import { View, Text, Image } from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/Ionicons'; // Import the icon library
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
      <View className="bg-blue-200 p-5 items-center border-b border-gray-300 mb-2">
        <Image
          source={require('./assects/image/images.jpg')}
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
    screenOptions={{
      
      drawerActiveTintColor: 'white',
      drawerActiveBackgroundColor: '#003CB3',
      drawerLabelStyle: {
        color: 'white',
        fontSize: 14,
        fontFamily: 'Georgia',
      },
    }}

    
  >
  
      <Drawer.Screen


        name="Home"
        component={HomeScreen}
        options={{
          drawerIcon: ({ color, size }) => (
          
            <Icon name="home-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <Icon name="person-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="BookingHistory"
        component={BookingHistory}
        options={{
          drawerIcon: ({ color, size }) => (
            <Icon name="book-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Schedule"
        component={Schedule}
        options={{
          drawerIcon: ({ color, size }) => (
            <Icon name="calendar-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Reviews"
        component={Reviews}
        options={{
          drawerIcon: ({ color, size }) => (
            <Icon name="chatbubbles-outline" size={size} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

export default MyDrawer;

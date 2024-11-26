import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ForgotPasswordScreen from './screens/ForgotPasswordScreen';

import '../global.css'
import SplashScreen from './SplashScreen';
import MyDrawer from './MyDrawer';
import { AppProvider } from './Store/AppContext';

const Stack = createNativeStackNavigator();


const App = () => {
  return (
    <AppProvider>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen 
          name="Splash" 
          component={SplashScreen} 
          options={{ headerShown: false }} // Hide header for splash screen
        />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen 
          name="Main" 
          component={MyDrawer} 
          options={{ headerShown: false }} // Hide header for the drawer
        />
      </Stack.Navigator>
    </NavigationContainer>
    </AppProvider>
  );
};

export default App;

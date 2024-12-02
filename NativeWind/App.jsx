import React from 'react';
// Import SafeAreaProvider
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Login from './src/screens/LoginScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ForgotPasswordScreen from './src/screens/ForgotPasswordScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import MyDrawer from './src/MyDrawer';
import { AppProvider } from './src/Store/AppContext';
import 'react-native-get-random-values'; // used for the googleautocomplete places


const Stack = createNativeStackNavigator();
function App() {



  
  return (
    // Wrap your app in SafeAreaProvider for handling safe areas
    <SafeAreaProvider>
      <AppProvider>
     <NavigationContainer>
      <Stack.Navigator >
        
        <Stack.Screen name="Login" component={Login} />
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
    </SafeAreaProvider>
  );
}

export default App;

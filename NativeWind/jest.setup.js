import 'react-native-gesture-handler/jestSetup'; // Automatically mocks gesture handler
jest.mock('react-native-gesture-handler', () => {
  return {
    GestureHandlerRootView: 'View', // Mock root view component
    GestureHandler: 'View', // Mock GestureHandler component
  };
});

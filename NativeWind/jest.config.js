module.exports = {
  preset: 'react-native',
  transform: {
    '^.+\\.jsx?$': 'babel-jest', // Use babel-jest to transform .js and .jsx files
  },
  transformIgnorePatterns: [
    'node_modules/(?!react-native|nativewind|react-native-reanimated|react-native-gesture-handler)/', // Ensure these modules are transformed by Babel
  ],
  setupFiles: ['./jest.setup.js'], // Add this line to use your setup file
};

import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'

const RegisterScreen = ({navigation}) => {
  return (
    <SafeAreaProvider>
    <View className="flex-1 justify-center items-center bg-white">
          <Text className="text-blue-500 font-bold text-2xl">Register Screen </Text>
        </View>
        </SafeAreaProvider>
  )
}

export default RegisterScreen
import HomeScreen from '../screens/HomeScreen'
import SearchScreen from '../screens/SearchScreen/SearchScreen'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

export const HomeStackScreen = () => {
  const HomeStack = createNativeStackNavigator()

  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false, gestureEnabled: true }}>
      <HomeStack.Screen name="Home" component={HomeScreen} />
      <HomeStack.Screen name="Search" component={SearchScreen} />
    </HomeStack.Navigator>
  )
}

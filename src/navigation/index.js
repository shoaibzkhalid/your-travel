import React from 'react'
import { View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import SignInScreen from '../screens/SignInScreen'
import SignUpScreen from '../screens/SignUpScreen'
import ConfirmEmailScreen from '../screens/ConfirmEmailScreen'
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen'
import TabNavigation from './TabNavigation'
import Toast from 'react-native-toast-message'
import { toastConfig } from '../util'
import { ActivityIndicator } from 'react-native-paper'
import { useAuthUser } from '../util/useAuthUser'
import { UserContextProvider } from '../state/userContext'

const Stack = createNativeStackNavigator()

const Navigation = () => {
  const { userVerified, user } = useAuthUser()

  if (user === undefined) {
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <ActivityIndicator />
      </View>
    )
  }

  // console.log('check here', user, userVerified)

  return (
    <UserContextProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {userVerified ? (
            <>
              <Stack.Screen name="Home" component={TabNavigation} />
            </>
          ) : (
            <>
              <Stack.Screen name="SignIn" component={SignInScreen} />
              <Stack.Screen name="SignUp" component={SignUpScreen} />
              <Stack.Screen name="ConfirmEmail" component={ConfirmEmailScreen} />
              <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
      <Toast config={toastConfig} />
    </UserContextProvider>
  )
}

export default Navigation

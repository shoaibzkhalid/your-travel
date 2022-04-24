import React, { useState } from 'react'
import { View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import SignInScreen from '../screens/SignInScreen'
import SignUpScreen from '../screens/SignUpScreen'
import ConfirmEmailScreen from '../screens/ConfirmEmailScreen'
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen'
import TabNavigation from './TabNavigation'
import auth from '@react-native-firebase/auth'
import Toast from 'react-native-toast-message'
import { showSuccessToast, toastConfig } from '../util'
import { ActivityIndicator } from 'react-native-paper'

const Stack = createNativeStackNavigator()

const Navigation = () => {
  const [user, setUser] = useState(undefined)
  const [userVerified, setUserVerified] = useState(user?.emailVerified)
  const [initializing, setInitializing] = useState(true)

  // console.log('check here hook', user, userVerified)

  function onAuthStateChanged(user) {
    // console.log('check authchange', user, user?.emailVerified)
    if (user && !user?.emailVerified) {
      showSuccessToast('Please verify your email')
    }

    setUser(user)
    if (initializing) setInitializing(false)
  }

  React.useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged)

    const check = auth().onUserChanged(user => {
      if (!user) {
        setUserVerified(false)
      }
      if (user?.emailVerified) {
        setUserVerified(true)
      }
    })
    return subscriber // unsubscribe on unmount
  }, [user?.emailVerified])

  if (user === undefined) {
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <ActivityIndicator />
      </View>
    )
  }

  // console.log('check here', user, userVerified)

  return (
    <>
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
    </>
  )
}

export default Navigation

import React, { useState } from 'react'
import { View, StyleSheet, ScrollView, Text } from 'react-native'
import CustomInput from '../../components/CustomInput'
import CustomButton from '../../components/CustomButton'
import { useNavigation } from '@react-navigation/native'
import { useForm } from 'react-hook-form'
import auth from '@react-native-firebase/auth'
import { checkInternetConnection, showErrorToast } from '../../util'
import CustomBtn from '../../components/CustomBtn'
import HomeHeader from '../HomeScreen/HomeHeader'
import { useNetInfo } from '@react-native-community/netinfo'
import { heightPercentageToDP } from 'react-native-responsive-screen'

const SignInScreen = () => {
  const navigation = useNavigation()
  const netInfo = useNetInfo()

  const [isLoading, setLoading] = useState(false)
  const { control, handleSubmit } = useForm()

  const onSignInPressed = async data => {
    setLoading(true)
    // const { email, password } = data
    const { password, email } = {
      email: 'shoaibzkhalid@gmail.com',
      password: '123456',
    }

    try {
      // sign in with email and password
      await auth().signInWithEmailAndPassword(email, password)
      // getting email verification status
      const emailVerified = auth().currentUser.emailVerified
      setLoading(false)

      if (!emailVerified) {
        showErrorToast('Verify your email to sign in')
      }
    } catch (error) {
      console.log('Error signing in: ', error)
      if (error.code === 'auth/email-already-in-use') {
        showErrorToast('Email already in use')
      }

      if (error.code === 'auth/invalid-email') {
        showErrorToast('That email address is invalid!')
      }

      showErrorToast(error.message)
      console.error(error)
    }

    setLoading(false)
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <HomeHeader subText={'Login to see your saved trips and book your next trip!'} />

      {
        <View>
          {netInfo.isConnected ? (
            <>
              <View style={styles.root}>
                <CustomInput
                  name="email"
                  placeholder="Email"
                  control={control}
                  rules={{ required: 'Email is required' }}
                />

                <CustomInput
                  name="password"
                  placeholder="Password"
                  secureTextEntry
                  control={control}
                  rules={{
                    required: 'Password is required',
                    minLength: {
                      value: 3,
                      message: 'Password should be minimum 3 characters long',
                    },
                  }}
                />

                <CustomBtn onPress={handleSubmit(onSignInPressed)} isLoading={isLoading}>
                  Sign In
                </CustomBtn>

                <CustomButton
                  text="Forgot password?"
                  onPress={() => navigation.navigate('ForgotPassword')}
                  type="TERTIARY"
                  isLoading={null}
                />

                <CustomButton
                  text="Don't have an account? Create one"
                  onPress={() => navigation.navigate('SignUp')}
                  type="TERTIARY"
                  isLoading={null}
                />
              </View>
            </>
          ) : (
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                height: heightPercentageToDP(70),
              }}>
              <Text style={{ fontSize: 20 }}>No internet connection</Text>
              <CustomBtn onPress={checkInternetConnection}>Reconnect</CustomBtn>
            </View>
          )}
        </View>
      }
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  root: {
    padding: 10,
  },
  logo: {
    width: '70%',
    maxWidth: 300,
    maxHeight: 200,
    alignSelf: 'center',
  },
})

export default SignInScreen

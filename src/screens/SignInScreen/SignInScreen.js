import React, { useState } from 'react'
import { View, Image, StyleSheet, useWindowDimensions, ScrollView } from 'react-native'
import Logo from '../../../assets/images/Logo_1.png'
import CustomInput from '../../components/CustomInput'
import CustomButton from '../../components/CustomButton'
import { useNavigation } from '@react-navigation/native'
import { useForm } from 'react-hook-form'
import auth from '@react-native-firebase/auth'
import { showErrorToast } from '../../util'
import CustomBtn from '../../components/CustomBtn'
import HomeHeader from '../HomeScreen/HomeHeader'

const SignInScreen = () => {
  const navigation = useNavigation()
  const [isLoading, setLoading] = useState(false)
  const { control, handleSubmit } = useForm()

  const onSignInPressed = async data => {
    setLoading(true)
    try {
      await auth().signInWithEmailAndPassword(data.email, data.password)
      setLoading(false)
    } catch (e) {
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

    // try {
    //   // const response = await Auth.signIn(data.email, data.password);
    //   console.log(response);
    // } catch (e) {
    //   Alert.alert('Oops', e.message);
    // }
    setLoading(false)
  }

  const onForgotPasswordPressed = () => {
    navigation.navigate('ForgotPassword')
  }

  const onSignUpPress = () => {
    navigation.navigate('SignUp')
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <HomeHeader />
      <View style={styles.root}>
        {/* <Image
          source={Logo}
          style={[styles.logo, { height: height * 0.3 }]}
          resizeMode="contain"
        /> */}

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
          onPress={onForgotPasswordPressed}
          type="TERTIARY"
          isLoading={null}
        />

        <CustomButton
          text="Don't have an account? Create one"
          onPress={onSignUpPress}
          type="TERTIARY"
          isLoading={null}
        />
      </View>
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

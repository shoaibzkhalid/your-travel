import React from 'react'
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native'
import CustomInput from '../../components/CustomInput'
import CustomButton from '../../components/CustomButton'
import { useNavigation } from '@react-navigation/core'
import { useForm } from 'react-hook-form'
import auth from '@react-native-firebase/auth'
import { COLORS } from '../../theme/colors'

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

const SignUpScreen = () => {
  const [isLoading, setLoading] = React.useState(false)
  const { control, handleSubmit, watch } = useForm()
  const pwd = watch('password')
  const navigation = useNavigation()

  const onRegisterPressed = async data => {
    setLoading(true)
    const { name, password, email } = data
    // const { name, password, email } = {
    //   name: 'Sho',
    //   password: '123456',
    //   email: 'shoaibzkhalid@gmail.com',
    // }

    try {
      await auth().createUserWithEmailAndPassword(email, password)
      await auth().currentUser.updateProfile({ displayName: name })
      await auth().currentUser.sendEmailVerification()
      navigation.navigate('ConfirmEmail')
    } catch (error) {
      setLoading(false)
      console.log('error', error)
      if (error.code === 'auth/email-already-in-use') {
        Alert.alert('That email address is already in use!')
      }

      if (error.code === 'auth/invalid-email') {
        Alert.alert('That email address is invalid!')
      }

      // Alert.alert('Oops', error);
    }
  }

  const onSignInPress = () => {
    navigation.navigate('SignIn')
  }

  const onTermsOfUsePressed = () => {
    console.warn('onTermsOfUsePressed')
  }

  const onPrivacyPressed = () => {
    console.warn('onPrivacyPressed')
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
        <Text style={styles.title}>Create an account</Text>

        <CustomInput
          name="name"
          control={control}
          placeholder="Name"
          rules={{
            required: 'Name is required',
          }}
        />

        <CustomInput
          name="email"
          control={control}
          placeholder="Email"
          rules={{
            required: 'Email is required',
            pattern: { value: EMAIL_REGEX, message: 'Email is invalid' },
          }}
        />
        <CustomInput
          name="password"
          control={control}
          placeholder="Password"
          secureTextEntry
          rules={{
            required: 'Password is required',
            minLength: {
              value: 6,
              message: 'Password should be at least 8 characters long',
            },
          }}
        />
        <CustomInput
          name="password-repeat"
          control={control}
          placeholder="Repeat Password"
          secureTextEntry
          rules={{
            validate: value => value === pwd || 'Password do not match',
          }}
        />

        <CustomButton
          text="Register"
          isLoading={isLoading}
          onPress={handleSubmit(onRegisterPressed)}
        />

        <Text style={styles.text}>
          By registering, you confirm that you accept our{' '}
          <Text style={styles.link} onPress={onTermsOfUsePressed}>
            Terms of Use
          </Text>{' '}
          and{' '}
          <Text style={styles.link} onPress={onPrivacyPressed}>
            Privacy Policy
          </Text>
        </Text>

        <CustomButton
          text="Have an account? Sign in"
          onPress={onSignInPress}
          type="TERTIARY"
          isLoading={null}
        />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#051C60',
    margin: 10,
  },
  text: {
    color: 'gray',
    marginVertical: 10,
  },
  link: {
    color: COLORS.secondary,
  },
})

export default SignUpScreen

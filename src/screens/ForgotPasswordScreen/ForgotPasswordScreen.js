import React from 'react'
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native'
import CustomInput from '../../components/CustomInput'
import CustomButton from '../../components/CustomButton'
import { useNavigation } from '@react-navigation/core'
import { useForm } from 'react-hook-form'
import auth from '@react-native-firebase/auth'

const ForgotPasswordScreen = () => {
  const { control, handleSubmit } = useForm()
  const navigation = useNavigation()

  const onSendPressed = async data => {
    try {
      // Sending password reset email to user
      // on success, navigate to SignInScreen
      await auth().sendPasswordResetEmail(data.email)
      navigation.navigate('SignIn')
    } catch (e) {
      Alert.alert('Oops', e.message)
    }
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
        <Text style={styles.title}>Reset your password</Text>

        <CustomInput
          name="email"
          control={control}
          placeholder="Email"
          rules={{
            required: 'Email is required',
          }}
        />

        <CustomButton text="Send" onPress={handleSubmit(onSendPressed)} />

        <CustomButton
          text="Back to Sign in"
          onPress={() => navigation.navigate('SignIn')}
          type="TERTIARY"
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
    color: '#FDB075',
  },
})

export default ForgotPasswordScreen

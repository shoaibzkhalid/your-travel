import React, { useState } from 'react';
import { View, Image, StyleSheet, useWindowDimensions, ScrollView } from 'react-native';
import Logo from '../../../assets/images/Logo_1.png';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import { useNavigation } from '@react-navigation/native';
import { useForm } from 'react-hook-form';
import auth from '@react-native-firebase/auth';

const SignInScreen = () => {
  const { height } = useWindowDimensions();
  const navigation = useNavigation();
  const [isLoading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSignInPressed = async data => {
    console.log('here', data);

    setLoading(true);

    auth()
      .signInWithEmailAndPassword(data.email, data.password)
      .then(() => {
        console.log('User signed in!');
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }

        console.error(error);
      });

    // try {
    //   // const response = await Auth.signIn(data.email, data.password);
    //   console.log(response);
    // } catch (e) {
    //   Alert.alert('Oops', e.message);
    // }
    setLoading(false);
  };

  const onForgotPasswordPressed = () => {
    navigation.navigate('ForgotPassword');
  };

  const onSignUpPress = () => {
    navigation.navigate('SignUp');
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
        <Image
          source={Logo}
          style={[styles.logo, { height: height * 0.3 }]}
          resizeMode="contain"
        />

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

        <CustomButton
          text={'Sign In'}
          onPress={handleSubmit(onSignInPressed)}
          isLoading={isLoading}
        />

        <CustomButton
          text="Forgot password?"
          onPress={onForgotPasswordPressed}
          type="TERTIARY"
          isLoading={null}
        />

        {/* <SocialSignInButtons /> */}

        <CustomButton
          text="Don't have an account? Create one"
          onPress={onSignUpPress}
          type="TERTIARY"
          isLoading={null}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    width: '70%',
    maxWidth: 300,
    maxHeight: 200,
  },
});

export default SignInScreen;

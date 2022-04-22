import React from 'react';
import {View, Text} from 'react-native';
import CustomButton from '../CustomButton';

const SocialSignInButtons = () => {
  const onSignInFacebook = () => {
    console.warn('onSignInFacebook');
  };

  const onSignInGoogle = () => {
    console.warn('onSignInGoogle');
  };

  const onSignInApple = () => {
    console.warn('onSignInApple');
  };

  return (
    <>
      {/* <CustomButton
        text="Sign In with Facebook"
        onPress={onSignInFacebook}
        bgColor="#E7EAF4"
        fgColor="#4765A9"
        disabled={true}
      />
      <CustomButton
        text="Sign In with Google"
        onPress={onSignInGoogle}
        bgColor="#DD4D44"
        fgColor="#DD4D44"
      />
      <CustomButton
        text="Sign In with Apple"
        onPress={onSignInApple}
        bgColor="#e3e3e3"
        fgColor="#363636"
        disabled={true}
      /> */}
    </>
  );
};

export default SocialSignInButtons;

import React from 'react';
import auth from '@react-native-firebase/auth';
import { ProfileAvatar } from './ProfileAvatar';

import CustomInput from '../../components/CustomInput';
import { useForm } from 'react-hook-form';
import styled from 'styled-components/native';
import CustomBtn from '../../components/CustomBtn';
import firebase from '@react-native-firebase/app';

const Profile = () => {
  const user = auth().currentUser;
  const firestoreForDefaultApp = firebase.firestore();
  const [isLoading, setLoading] = React.useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const updateProfile = async data => {
    setLoading(true);
    const { name, phoneNumber } = data;

    auth().currentUser.updateProfile({
      displayName: name,
    });

    console.log('data', data, user);

    setLoading(false);
  };

  // console.log('data', user);

  return (
    <Container>
      <ProfileAvatar />

      <CustomInput
        name="name"
        placeholder="Name"
        defaultValue={user.displayName}
        control={control}
        rules={{ required: 'Name is required' }}
      />

      <CustomInput
        name="phoneNumber"
        placeholder="Phone Number"
        keyboardType={'number-pad'}
        control={control}
      />

      <CustomBtn onPress={handleSubmit(updateProfile)}>Update</CustomBtn>
    </Container>
  );
};

const Container = styled.View`
  padding: 10px;
`;

export default Profile;

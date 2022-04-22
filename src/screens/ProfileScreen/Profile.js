import { View, Text } from 'react-native';
import React from 'react';
import auth from '@react-native-firebase/auth';
import { ProfileAvatar } from './ProfileAvatar';
import CustomInput from '../../components/CustomInput';
import { useForm } from 'react-hook-form';
import styled from 'styled-components/native';
import CustomBtn from '../../components/CustomBtn';

const Profile = () => {
  const user = auth().currentUser;

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

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
        name="country"
        placeholder="Country"
        // defaultValue={user.displayName}
        control={control}
        // rules={{ required: 'Name is required' }}
      />

      <CustomBtn>Update</CustomBtn>
    </Container>
  );
};

const Container = styled.View`
  padding: 10px;
`;

export default Profile;

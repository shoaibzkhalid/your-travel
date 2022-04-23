import React from 'react';
import auth from '@react-native-firebase/auth';
import { ProfileAvatar } from './ProfileAvatar';
import CustomInput from '../../components/CustomInput';
import { useForm } from 'react-hook-form';
import styled from 'styled-components/native';
import CustomBtn from '../../components/CustomBtn';
import firestore from '@react-native-firebase/firestore';
import { profileFields } from '../../config/constants';
import { UserContext } from '../../state/userContext';
import { showErrorToast, showSuccessToast, showToast } from '../../util';

const Profile = () => {
  const user = auth().currentUser;
  const [profile] = React.useContext(UserContext);

  const [isLoading, setLoading] = React.useState(false);
  const profileFieldKeys = profileFields.map(f => f.name);
  const { control, handleSubmit, setValue } = useForm();

  // console.log('profile', profile, user.email);

  React.useEffect(() => {
    if (profile) {
      profileFieldKeys.map(key => setValue(key, profile[key] ?? ''));
      return;
    }

    profileFieldKeys.map(key => setValue(key, user[key] ?? ''));
  }, [user]);

  const updateProfile = async data => {
    setLoading(true);
    // console.log('data', data);

    try {
      await firestore().collection('Users').doc(user.uid).set({
        displayName: data.displayName,
        country: data.country,
        phoneNumber: data.phoneNumber,
        email: data.email,
      });

      showSuccessToast('Profile updated successfully');

      setLoading(false);
    } catch (error) {
      showErrorToast('Error updating profile');
      console.log('error updating profile', error);
    }
  };

  return (
    <Container>
      <ProfileAvatar />

      {profileFields.map(field => (
        <CustomInput
          key={field.name}
          disabled={field.name === 'email'}
          name={field.name}
          placeholder={field.placeholder}
          defaultValue={profile ? profile[field.name] : user[field.name]}
          control={control}
        />
      ))}

      <CustomBtn onPress={handleSubmit(updateProfile)} isLoading={isLoading}>
        Update
      </CustomBtn>
    </Container>
  );
};

const Container = styled.View`
  padding: 10px;
`;

export default Profile;

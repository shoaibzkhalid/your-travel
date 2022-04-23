import React from 'react';
import { Alert, View } from 'react-native';
import { ActivityIndicator, IconButton } from 'react-native-paper';
import styled from 'styled-components/native';
import { COLORS } from '../../theme/colors';
import { ICONS } from '../../theme/icons';
import storage from '@react-native-firebase/storage';
import { launchImageLibrary } from 'react-native-image-picker';
import auth from '@react-native-firebase/auth';
import { constants } from '../../config/constants';
import { set } from 'react-hook-form';

export const ProfileAvatar = () => {
  // SET CURRENT PHOTO
  const [isLoading, setLoading] = React.useState(false);

  const user = auth().currentUser;

  const [userPhoto, setUserPhoto] = React.useState(
    user.photoURL ?? constants.placeHolderPhoto,
  );

  const uploadPhoto = async () => {
    try {
      setLoading(true);
      const result = await launchImageLibrary({ includeBase64: true });
      const photo = result.assets[0];
      const ref = await storage().ref(photo.fileName);
      await ref.putFile(photo.uri);
      const url = await ref.getDownloadURL();
      await auth().currentUser.updateProfile({ photoURL: url });
      setUserPhoto(photo.uri);
      setLoading(false);
    } catch (error) {
      Alert.alert('Error', error.message);
      console.log('error uploading photo', error);
    }
  };

  return (
    <AvatarContainer>
      {isLoading ? (
        <View style={{ padding: 100, height: 150 }}>
          <ActivityIndicator />
        </View>
      ) : (
        <RoundedProfileImg source={{ uri: userPhoto }} />
      )}

      <UploadIconContainer onPress={uploadPhoto}>
        <IconButton icon={ICONS.camera} />
      </UploadIconContainer>
    </AvatarContainer>
  );
};

const AvatarContainer = styled.View`
  justify-content: center;
  padding: 5px;
  align-self: center;
  padding-bottom: 0;
`;

const RoundedProfileImg = styled.Image`
  width: 150px;
  height: 150px;
  border-radius: 100px;
`;

const UploadIconContainer = styled.TouchableOpacity`
  background-color: ${COLORS.white};
  align-self: flex-end;
  top: -40px;
  padding: 5px;
  /* margin-bottom: 0; */
  border-radius: 50px;
`;

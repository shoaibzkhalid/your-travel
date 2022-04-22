import React from 'react';
import { IconButton } from 'react-native-paper';
import styled from 'styled-components/native';
import { COLORS } from '../../theme/colors';
import { ICONS } from '../../theme/icons';

export const ProfileAvatar = ({ onChange, defaultValue }) => {
  return (
    <AvatarContainer>
      <RoundedProfileImg
        source={{
          uri: `https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png`,
        }}
      />

      <UploadIconContainer>
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

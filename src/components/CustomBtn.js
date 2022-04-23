import { View, Text } from 'react-native';
import React from 'react';
import { ActivityIndicator, Button } from 'react-native-paper';
import styled from 'styled-components/native';
import { COLORS } from '../theme/colors';
import { SIZES } from '../theme/sizes';

const CustomBtn = ({
  children,
  onPress,
  text,
  type = 'PRIMARY',
  bgColor,
  fgColor,
  disabled = false,
  style,
  isLoading = false,
}) => {
  return (
    <Container disabled={false} onPress={onPress}>
      {isLoading && isLoading !== null ? (
        <ActivityIndicator size={'small'} color={'white'} />
      ) : (
        <Button color={COLORS.white}>{children}</Button>
      )}
    </Container>
  );
};

const Container = styled.TouchableOpacity`
  padding: 10px;
  margin: 10px 0px;

  background-color: ${COLORS.primary};
  border-radius: ${SIZES.borderRadius}px;
`;

export default CustomBtn;

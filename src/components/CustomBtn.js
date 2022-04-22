import { View, Text } from 'react-native';
import React from 'react';
import { Button } from 'react-native-paper';
import styled from 'styled-components/native';
import { COLORS } from '../theme/colors';
import { SIZES } from '../theme/sizes';

const CustomBtn = ({ children }) => {
  return (
    <Container>
      <Button color={COLORS.white}>{children}</Button>
    </Container>
  );
};

const Container = styled.View`
  padding: 10px;
  margin: 10px 0px;

  background-color: ${COLORS.primary};
  border-radius: ${SIZES.borderRadius};
`;

export default CustomBtn;

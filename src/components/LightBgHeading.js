import { View, Text } from 'react-native';
import React from 'react';
import styled from 'styled-components/native';
import { COLORS } from '../theme/colors';

const LightBgHeading = ({ children, size = 20 }) => {
  return <StyledText size={size}>{children}</StyledText>;
};

const StyledText = styled.Text`
  color: ${COLORS.white};
  font-size: ${props => props.size}px;
  font-weight: 500;
  width: 30%;
`;

export default LightBgHeading;

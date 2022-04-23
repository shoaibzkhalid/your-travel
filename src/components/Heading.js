import { View, Text } from 'react-native';
import React from 'react';
import styled from 'styled-components/native';
import { COLORS } from '../theme/colors';

const Heading = ({ children }) => {
  return <StyledText>{children}</StyledText>;
};

const StyledText = styled.Text`
  color: ${COLORS.primary};
  font-size: 20px;
  font-weight: 500;
`;

export default Heading;

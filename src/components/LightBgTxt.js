import React from 'react';
import styled from 'styled-components/native';

export const LightBgTxt = ({ children }) => {
  return <StyledText>{children}</StyledText>;
};

const StyledText = styled.Text`
  color: black;
  text-transform: capitalize;
  font-size: 18px;
`;

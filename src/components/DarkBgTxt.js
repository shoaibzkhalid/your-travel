import React from 'react'
import styled from 'styled-components/native'

export const DarkBgTxt = ({ children }) => {
  return <StyledText>{children}</StyledText>
}

const StyledText = styled.Text`
  color: white;
  text-transform: capitalize;
`

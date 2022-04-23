import { View, Text } from 'react-native'
import React from 'react'
import styled from 'styled-components/native'
import { COLORS } from '../../theme/colors'
import { SIZES } from '../../theme/sizes'

const Tag = ({ children, color }) => {
  return (
    <Container color={color}>
      <TagText>{children}</TagText>
    </Container>
  )
}

const Container = styled.View`
  padding: 7px 7px;
  border-radius: ${SIZES.borderRadiusSm}px;
  background-color: ${props => props.color};
  margin: 3px;
`
const TagText = styled.Text`
  color: ${COLORS.white};
  font-weight: 600;
`

export default Tag

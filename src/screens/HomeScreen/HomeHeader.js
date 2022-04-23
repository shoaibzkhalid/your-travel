import React, { useContext } from 'react'
import styled from 'styled-components/native'
import { COLORS } from '../../theme/colors'
import HomeIcons from './HomeIcons'
import auth from '@react-native-firebase/auth'
import { HomeContext } from '../../state/homeContext'
import { Text } from 'react-native-paper'
import { useRoute } from '@react-navigation/native'

const HomeHeader = () => {
  const route = useRoute()

  return (
    <Container>
      <HeaderText>MyTravels.com</HeaderText>

      {route.name === 'Home' ? (
        <HomeIcons />
      ) : (
        <HeaderSubheading>
          Login to see your saved trips and book your next trip!
        </HeaderSubheading>
      )}
    </Container>
  )
}

const Container = styled.View`
  background-color: ${COLORS.primary};
  padding-bottom: 10px;
`

const HeaderText = styled.Text`
  font-size: 40px;
  color: ${COLORS.white};
  text-align: center;
  padding: 10px;
  font-weight: 500;
`

const HeaderSubheading = styled.Text`
  color: ${COLORS.white};
  text-align: center;
  padding: 10px;
  font-size: 20px;
  font-weight: 500;
`

export default HomeHeader

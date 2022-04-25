import React from 'react'
import styled from 'styled-components/native'
import HomeHeader from './HomeHeader'
import { HomeContextProvider } from '../../state/homeContext'
import HomeContent from './HomeContent'
import { useAuthUser } from '../../util/useAuthUser'

const Home = () => {
  // Getting auth user
  useAuthUser()
  // Root home screen
  return (
    <HomeContextProvider>
      <HomeHeader />
      <Container>
        <HomeContent />
      </Container>
    </HomeContextProvider>
  )
}

const Container = styled.View`
  padding: 10px;
  flex: 1;
`

export default Home

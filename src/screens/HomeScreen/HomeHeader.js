import React, { useContext } from 'react';
import styled from 'styled-components/native';
import { COLORS } from '../../theme/colors';
import HomeIcons from './HomeIcons';
import auth from '@react-native-firebase/auth';

const HomeHeader = () => {
  console.log('auth', auth().currentUser);

  return (
    <Container>
      <HeaderText>MyTravels.com</HeaderText>
      <HomeIcons />
    </Container>
  );
};

const Container = styled.View`
  background-color: ${COLORS.primary};
  padding-bottom: 10px;
`;

const HeaderText = styled.Text`
  font-size: 40px;
  color: ${COLORS.white};
  text-align: center;
  padding: 10px;
  font-weight: 500;
`;

export default HomeHeader;

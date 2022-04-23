import React, { useContext } from 'react';
import styled from 'styled-components/native';
import HomeHeader from './HomeHeader';
import { HomeContextProvider } from '../../state/homeContext';
import HomeContent from './HomeContent';
import auth from '@react-native-firebase/auth';
import { UserContext } from '../../state/userContext';
import firestore from '@react-native-firebase/firestore';
import DestMap from './DestMap';

const Home = () => {
  const authUser = auth().currentUser;
  const [user, setUser] = useContext(UserContext);

  React.useEffect(() => {
    (async () => {
      const profile = await firestore().collection('Users').doc(authUser.uid).get();
      setUser(profile.data());
    })();
  }, [user]);

  return (
    <HomeContextProvider>
      <HomeHeader />
      {/* <DestMap /> */}
      <Container>
        <HomeContent />
      </Container>
      {/* <CustomBtn>Search</CustomBtn> */}
    </HomeContextProvider>
  );
};

const Container = styled.View`
  padding: 10px;
`;

export default Home;

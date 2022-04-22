import React from 'react';
import { View, Image, Share } from 'react-native';
import CustomBtn from '../../components/CustomBtn';
import styled from 'styled-components/native';

import { launchImageLibrary } from 'react-native-image-picker';
import HomeHeader from './HomeHeader';
import { HomeContext, HomeContextProvider } from '../../state/homeContext';
import HomeContent from './HomeContent';

const Home = () => {
  const [homeIcon, setHomeIcon] = React.useContext(HomeContext);

  return (
    <HomeContextProvider>
      <HomeHeader />
      <Container style={{ flex: 1 }}>
        {/* <Button title="Select 📑" onPress={handleDocumentSelection}>
        Select an Image
      </Button> */}

        <HomeContent />

        <CustomBtn>Search</CustomBtn>
      </Container>
    </HomeContextProvider>
  );
};

const Container = styled.View`
  padding: 10px;
`;

export default Home;

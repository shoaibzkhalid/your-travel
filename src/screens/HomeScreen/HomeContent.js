import { View } from 'react-native';
import React from 'react';
import { HomeContext } from '../../state/homeContext';
import { LightBgTxt } from '../../components/LightBgTxt';
import Landmarks from './Landmarks';

const HomeContent = () => {
  const [homeIcon, setHomeIcon] = React.useContext(HomeContext);

  console.log('homeIcon 2', homeIcon === 'flights');

  switch (homeIcon) {
    case 'flights':
      return <LightBgTxt>Search Flights</LightBgTxt>;

    case 'hotels':
      return <LightBgTxt>Search Hotels</LightBgTxt>;

    case 'landmarks':
      return <Landmarks />;
      break;
    default:
      return null;
      break;
  }
};

export default HomeContent;

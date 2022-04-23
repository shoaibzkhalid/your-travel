import React from 'react';
import { View } from 'react-native';
import { HomeContext } from '../../state/homeContext';
import { LightBgTxt } from '../../components/LightBgTxt';
import Landmarks from './Landmarks';
import { Fragment } from 'react/cjs/react.production.min';
import { useForm } from 'react-hook-form';
import CustomInput from '../../components/CustomInput/CustomInput';
import CustomBtn from '../../components/CustomBtn';
import Events from './Events';
import DestMap from './DestMap';

const HomeContent = () => {
  const [homeIcon, setHomeIcon] = React.useContext(HomeContext);
  const { control, handleSubmit } = useForm({});

  switch (homeIcon) {
    case 'flights':
      return (
        <Fragment>
          <LightBgTxt>Search Flights</LightBgTxt>
          <CustomInput name="username" control={control} placeholder="Destination" />

          <DestMap />

          <CustomBtn>Search</CustomBtn>
        </Fragment>
      );

    case 'hotels':
      return (
        <Fragment>
          <LightBgTxt>Search Hotels</LightBgTxt>
          <CustomInput name="username" control={control} placeholder="Destination" />
        </Fragment>
      );

    case 'landmarks':
      return <Landmarks />;

    case 'events':
      return <Events />;
      break;
    default:
      return null;
      break;
  }
};

export default HomeContent;

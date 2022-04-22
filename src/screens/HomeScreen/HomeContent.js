import { View } from 'react-native';
import React from 'react';
import { HomeContext } from '../../state/homeContext';
import { LightBgTxt } from '../../components/LightBgTxt';
import Landmarks from './Landmarks';
import { Fragment } from 'react/cjs/react.production.min';
import { useForm } from 'react-hook-form';
import CustomInput from '../../components/CustomInput/CustomInput';

const HomeContent = () => {
  const [homeIcon, setHomeIcon] = React.useContext(HomeContext);

  const { control, handleSubmit, watch } = useForm({});

  console.log('homeIcon 2', homeIcon === 'flights');

  switch (homeIcon) {
    case 'flights':
      return (
        <Fragment>
          <LightBgTxt>Search Flights</LightBgTxt>
          <CustomInput name="username" control={control} placeholder="Destination" />
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
      break;
    default:
      return null;
      break;
  }
};

export default HomeContent;

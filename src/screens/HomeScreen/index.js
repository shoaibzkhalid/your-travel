import React from 'react';
import { View, Image, Share } from 'react-native';
import CustomButton from '../../components/CustomButton/CustomButton';
import { Button, Text } from 'react-native-paper';
import { launchImageLibrary } from 'react-native-image-picker';
import { ICONS } from '../../theme/icons';
import HomeHeader from './HomeHeader';
import { HomeContextProvider } from '../../state/homeContext';

const Home = () => {
  const handleDocumentSelection = React.useCallback(async event => {
    try {
      const result = await launchImageLibrary({ includeBase64: true });
      const key =
        'ya29.c.b0AXv0zTMUbQu-QXP464gdrL3tCfs3kDKf0KjEyEE7y-k4e1PRwqMJwN7ggl5wcY0FIFRyU2JGIJhmN7vxToO_L0_klxPI9nLNDmKCdnuMF4-3F_eQfGcia95cGVuWcPB3IkQwL1Q98W8qxyXtKWM6q5fmMSmE5jxyRpfvO2cNbFuPqLb6SOTz1mxZTJUh_48xGwHOsRqkhAioFxvOjI8omXq8rA2z8GRwxnWmDJAh';

      let body = JSON.stringify({
        requests: [
          {
            features: [{ type: 'LANDMARK_DETECTION', maxResults: 5 }],
            image: {
              content: result.assets[0].base64,
            },
          },
        ],
      });

      let res = await fetch('https://vision.googleapis.com/v1/images:annotate', {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${key}`,
        },
        method: 'POST',
        body,
      });

      if (!result) {
        return;
      }

      let responseJson = await res.json();

      console.log('ml', res, responseJson);

      const response = await fetch(result.assets[0].uri);
      const blob = await response.blob();
    } catch (err) {
      console.log('error putting photo', err);
    }
  }, []);

  return (
    <HomeContextProvider>
      <View style={{ flex: 1 }}>
        <HomeHeader />
        {/* <Button title="Select 📑" onPress={handleDocumentSelection}>
        Select an Image
      </Button> */}

        <View
          style={{
            margin: 5,
          }}>
          <Image
            source={require('../../../assets/images/home.jpeg')}
            style={{}}
            resizeMode="cover"
          />
        </View>

        <View
          style={{
            margin: 5,
          }}>
          <Image
            source={require('../../../assets/images/pas.jpeg')}
            style={{
              height: 200,
            }}
            resizeMode="cover"
          />
        </View>
        {/* <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            padding: 5,
          }}>
          <CustomButton
            text={'Share with your friends'}
            isLoading={null}
            onPress={() => {
              Share.share({
                message: 'Testing',
              });
            }}
          />
        </View> */}
      </View>
    </HomeContextProvider>
  );
};

export default Home;

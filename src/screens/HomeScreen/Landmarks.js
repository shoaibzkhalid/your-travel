import { View, Text, Alert, Image } from 'react-native';
import React from 'react';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
import CustomBtn from '../../components/CustomBtn';
import styled from 'styled-components/native';
import { COLORS } from '../../theme/colors';
import Config from 'react-native-config';

const Landmarks = () => {
  const [image, setImage] = React.useState(null);
  const [landmark, setLandmark] = React.useState('');

  const takePhoto = React.useCallback(async useCamera => {
    let result;

    try {
      if (useCamera === 'camera') {
        result = await launchCamera({ includeBase64: true });
      } else {
        result = await launchImageLibrary({ includeBase64: true });
      }

      if (result.errorCode) {
        Alert.alert('Error', result.errorCode);
        return;
      }

      const selectedImage = result.assets[0];
      setImage(selectedImage.uri);

      let body = JSON.stringify({
        requests: [
          {
            features: [{ type: 'LANDMARK_DETECTION', maxResults: 5 }],
            image: {
              content: selectedImage.base64,
            },
          },
        ],
      });

      let res = await fetch('https://vision.googleapis.com/v1/images:annotate', {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${Config.PRINT_ACCESS_TOKEN}`,
        },
        method: 'POST',
        body,
      });

      if (!result) {
        return;
      }
      let responseJson = await res.json();
      const temp = responseJson.responses[0].landmarkAnnotations[0].description;
      setLandmark(temp);

      // console.log('ml', responseJson);
    } catch (err) {
      console.log('error putting photo', err);
    }
  }, []);

  return (
    <View>
      <Heading>Detect a landmark</Heading>

      <Text>Take a photo of a landmark</Text>
      <CustomBtn onPress={() => takePhoto('camera')}>Launch Camera</CustomBtn>

      <Text>Choose a photo of a landmark from gallery</Text>

      <Image source={{ uri: image }} style={{ width: 100, height: 100, margin: 10 }} />
      <CustomBtn onPress={() => takePhoto('gallery')}>Choose from gallery</CustomBtn>

      <Text>Detected landmark in the photo</Text>
      <Heading>{landmark}</Heading>
    </View>
  );
};

const Heading = styled.Text`
  font-size: 22px;
  margin: 10px 0px;
  color: ${COLORS.primary};
`;

export default Landmarks;

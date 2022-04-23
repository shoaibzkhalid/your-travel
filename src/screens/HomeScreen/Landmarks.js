import { View, Text, Alert, Image } from 'react-native';
import React from 'react';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
import CustomBtn from '../../components/CustomBtn';
import styled from 'styled-components/native';
import { COLORS } from '../../theme/colors';
import Config from 'react-native-config';
import { ActivityIndicator } from 'react-native-paper';

const Landmarks = () => {
  const [image, setImage] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [isLoading, setLoading] = React.useState(false);

  const [landmark, setLandmark] = React.useState(null);

  const takePhoto = React.useCallback(async useCamera => {
    let result;
    setLoading(true);
    setLandmark(null);
    setError(null);
    setImage(null);

    try {
      if (useCamera === 'camera') {
        result = await launchCamera({ includeBase64: true });
      } else {
        result = await launchImageLibrary({ includeBase64: true });
      }

      if (result.didCancel) {
        setLoading(false);
        return;
      }

      if (result.errorCode) {
        setLoading(false);
        Alert.alert('Error', result.errorCode);
        return;
      }

      if (!result.assets.length) {
        setLoading(false);
        Alert.alert('Error selecting an image');
      }

      const selectedImage = result.assets[0];
      // console.log('selectedImage', result);

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

      let res = await fetch(
        `https://vision.googleapis.com/v1/images:annotate?key=${Config.GC_API_KEY}`,
        {
          method: 'POST',
          body,
        },
      );

      if (!result) {
        return;
      }

      let responseJson = await res.json();
      // console.log('res', responseJson, responseJson.responses[0]);

      const checkLandmark = Object.keys(responseJson.responses[0]).length === 0;

      if (checkLandmark) {
        setLoading(false);
        setError('Could not detect any landmark');
      }

      const temp = responseJson.responses[0].landmarkAnnotations[0].description;
      setLandmark(temp);
      setLoading(false);
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

      {image && (
        <Image source={{ uri: image }} style={{ width: 100, height: 100, margin: 10 }} />
      )}
      <CustomBtn onPress={() => takePhoto('gallery')}>Choose from gallery</CustomBtn>

      {isLoading && <ActivityIndicator />}
      {landmark && <Text>Detected landmark in the photo</Text>}
      {error && (
        <Text>
          <Text style={{ color: COLORS.error }}>Error: </Text>
          {error}
        </Text>
      )}
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

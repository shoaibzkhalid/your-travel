import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { IconButton } from 'react-native-paper';
import { ICONS } from '../../theme/icons';

const Landmarks = () => {
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
    <View>
      <Text>Take a photo</Text>
      <TouchableOpacity onPress={handleDocumentSelection}>
        <IconButton icon={ICONS.camera} />
      </TouchableOpacity>
      <Text>Upload a photo of a landmark</Text>
    </View>
  );
};

export default Landmarks;

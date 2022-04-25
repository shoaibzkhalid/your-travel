import { View, Text, Alert, Image } from 'react-native'
import React from 'react'
import { launchImageLibrary, launchCamera } from 'react-native-image-picker'
import CustomBtn from '../../components/CustomBtn'
import styled from 'styled-components/native'
import { COLORS } from '../../theme/colors'
import Config from 'react-native-config'
import { ActivityIndicator } from 'react-native-paper'
import { GC_VISION_URL } from '../../config/constants'

const Landmarks = () => {
  const [image, setImage] = React.useState(null)
  const [error, setError] = React.useState(null)
  const [isLoading, setLoading] = React.useState(false)
  const [landmark, setLandmark] = React.useState(null)

  // useCamera to check if user selected
  // Gallery option or Camera option
  const takePhoto = React.useCallback(async useCamera => {
    let result
    setLoading(true)
    setLandmark(null)
    setError(null)
    setImage(null)

    try {
      if (useCamera === 'camera') {
        result = await launchCamera({ includeBase64: true })
      } else {
        result = await launchImageLibrary({ includeBase64: true })
      }

      // If user cancels the image selection
      if (result.didCancel) {
        setLoading(false)
        return
      }

      // If something goes wrong
      if (result.errorCode) {
        setLoading(false)
        Alert.alert('Error', result.errorCode)
        return
      }

      // if error occurs -- no image selected
      if (!result.assets.length) {
        setLoading(false)
        Alert.alert('Error selecting an image')
      }

      const selectedImage = result.assets[0]
      // setting image uri to state
      setImage(selectedImage.uri)

      // calling Google VISION API with api key as parameter
      let res = await fetch(`${GC_VISION_URL}${Config.GC_API_KEY}`, {
        method: 'POST',
        body: JSON.stringify({
          requests: [
            {
              features: [{ type: 'LANDMARK_DETECTION', maxResults: 5 }],
              image: {
                content: selectedImage.base64,
              },
            },
          ],
        }),
      })

      // return if no response
      if (!result) return

      // extracting response from Google Vision API
      let responseJson = await res.json()
      // console.log('res', responseJson, responseJson.responses[0])

      // if no landmark detected
      const checkLandmark = Object.keys(responseJson.responses[0]).length === 0
      if (checkLandmark) {
        setLoading(false)
        setError('Could not detect any landmark')
      }

      // setting landmark to state
      const temp = responseJson.responses[0].landmarkAnnotations[0].description
      setLandmark(temp)
      setLoading(false)
    } catch (err) {
      console.log('error putting photo', err)
    }
  }, [])

  return (
    <View>
      <Heading>Detect a landmark</Heading>

      <Text>Take a photo of a landmark</Text>
      <CustomBtn
        onPress={() => takePhoto('camera')}
        icon={'camera'}
        color={COLORS.secondary}>
        Launch Camera
      </CustomBtn>

      <Text>Choose a photo of a landmark from gallery</Text>

      <CustomBtn onPress={() => takePhoto('gallery')} icon="gallery">
        Choose from gallery
      </CustomBtn>

      {isLoading ? (
        <View style={{ padding: 40 }}>
          <ActivityIndicator />
        </View>
      ) : (
        <Image source={{ uri: image }} style={{ width: 100, height: 100, margin: 10 }} />
      )}

      {landmark && <Text>Detected landmark in the photo</Text>}
      {error && (
        <Text>
          <Text style={{ color: COLORS.error }}>Error: </Text>
          {error}
        </Text>
      )}
      <Heading>{landmark}</Heading>
    </View>
  )
}

const Heading = styled.Text`
  font-size: 22px;
  margin: 10px 0px;
  color: ${COLORS.primary};
`

export default Landmarks

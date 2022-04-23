import { View, Text, Image } from 'react-native'
import React from 'react'
import { ActivityIndicator, Button } from 'react-native-paper'
import styled from 'styled-components/native'
import { COLORS } from '../theme/colors'
import { SIZES } from '../theme/sizes'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { ICONS } from '../theme/icons'

const CustomBtn = ({ children, onPress, isLoading = false, icon = null }) => {
  return (
    <Container disabled={false} onPress={onPress}>
      {isLoading && isLoading !== null ? (
        <ActivityIndicator size={'small'} color={'white'} />
      ) : (
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
            flex: 1,
          }}>
          {icon && <Image source={ICONS[icon]} style={{ width: 20, height: 20 }} />}
          <Button color={COLORS.white}>{children}</Button>
        </View>
      )}
    </Container>
  )
}

const Container = styled.TouchableOpacity`
  padding: 10px;
  margin: 10px 0px;
  height: ${hp(6.5)}px;
  background-color: ${COLORS.primary};
  border-radius: ${SIZES.borderRadius}px;
  justify-content: center;
`

export default CustomBtn

import { View, Text, Image } from 'react-native'
import React from 'react'
import { ActivityIndicator } from 'react-native-paper'
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
        <BtnTextAndIcon>
          {icon && (
            <View style={{ paddingRight: 10 }}>
              <Image source={ICONS[icon]} style={{ width: 20, height: 20 }} />
            </View>
          )}
          <View style={{ paddingLeft: icon ? 10 : 0 }}>
            <Text style={{ color: COLORS.white }}>{children}</Text>
          </View>
        </BtnTextAndIcon>
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
const BtnTextAndIcon = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`

export default CustomBtn

import React from 'react'
import { StatusBar, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { COLORS } from '../theme/colors'

export const CustomStatusBar = () => {
  const insets = useSafeAreaInsets()

  return (
    <View style={{ backgroundColor: COLORS.primary, height: insets.top }}>
      <StatusBar
        animated={true}
        backgroundColor={COLORS.primary}
        barStyle="light-content"
      />
    </View>
  )
}

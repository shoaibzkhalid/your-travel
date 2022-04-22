import React from 'react';
import { StatusBar, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS } from '../theme/colors';

export const CustomStatusBar = () => {
  const insets = useSafeAreaInsets();

  return (
    <View style={{ backgroundColor: COLORS.primary, height: insets.top }}>
      <StatusBar
        animated={true}
        backgroundColor="red"
        barStyle="light-content"
        // barStyle={statusBarStyle}
        // showHideTransition={statusBarTransition}
        // hidden={hidden}
      />
    </View>
  );
};

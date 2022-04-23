import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { COLORS } from '../../theme/colors';

const CustomButton = ({
  onPress,
  text,
  type = 'PRIMARY',
  bgColor,
  fgColor,
  disabled = false,
  style,
  isLoading = false,
}) => {
  return (
    <Pressable
      disabled={false}
      onPress={onPress}
      style={[
        styles.container,
        styles[`container_${type}`],
        bgColor
          ? disabled
            ? { backgroundColor: bgColor }
            : { backgroundColor: 'grey' }
          : {},
        style,
      ]}>
      {isLoading && isLoading !== null ? (
        <ActivityIndicator size={'small'} color={'white'} />
      ) : (
        <Text
          style={[
            styles.text,
            styles[`text_${type}`],
            fgColor ? { color: fgColor } : {},
          ]}>
          {text}
        </Text>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 10,
    marginVertical: 5,
    alignItems: 'center',
    borderRadius: 5,
  },

  container_PRIMARY: {
    backgroundColor: COLORS.primary,
  },

  container_SECONDARY: {
    borderColor: COLORS.primary,
    borderWidth: 2,
  },

  container_TERTIARY: {},

  text: {
    fontWeight: 'bold',
    color: 'white',
  },

  text_SECONDARY: {
    color: COLORS.primary,
  },

  text_TERTIARY: {
    color: 'gray',
  },
});

export default CustomButton;

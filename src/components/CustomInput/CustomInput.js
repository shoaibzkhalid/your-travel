import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Controller } from 'react-hook-form'
import { TextInput } from 'react-native-paper'
import { COLORS } from '../../theme/colors'

const CustomInput = props => {
  const { control, name, rules = {}, keyboardType = 'default' } = props
  const { placeholder, defaultValue = '', secureTextEntry, disabled = false } = props

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
        <>
          <View
            style={[
              styles.container,
              { borderColor: error ? COLORS.primary : '#e8e8e8' },
            ]}>
            <TextInput
              disabled={disabled}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              // label={placeholder}
              defaultValue={defaultValue}
              keyboardType={keyboardType}
              placeholder={placeholder}
              style={[styles.input, { backgroundColor: 'transparent' }]}
              secureTextEntry={secureTextEntry}
              autoCapitalize={'none'}
              autoCorrect={false}
              autoComplete={'off'}
              underlineColor={COLORS.primary}
              theme={{ colors: { primary: COLORS.primary } }}
            />
          </View>
          {error && (
            <Text
              // underlineColor={COLORS.primary}
              style={{ color: 'red', alignSelf: 'stretch' }}
              // theme={{colors: {primary: COLORS.primary}}}
            >
              {error.message || 'Error'}
            </Text>
          )}
        </>
      )}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    width: '100%',

    borderColor: '#e8e8e8',
    borderWidth: 1,
    borderRadius: 5,

    marginVertical: 5,
  },
  input: {
    color: 'black',
  },
})

export default CustomInput

import Toast, { BaseToast } from 'react-native-toast-message'
import React from 'react'
import { COLORS } from '../theme/colors'

const baseToast = (props, color) => (
  <BaseToast
    {...props}
    text1Style={{ fontSize: 16, color }}
    text2Style={{ fontSize: 18 }}
    style={{ borderLeftColor: color }}
  />
)

export const toastConfig = {
  success: props => baseToast(props, COLORS.secondary),
  error: props => baseToast(props, COLORS.error),
}

export const showSuccessToast = message => {
  Toast.show({
    type: 'success',
    text1: 'Success',
    text2: message,
  })
}

export const showErrorToast = message => {
  Toast.show({
    type: 'error',
    text1: 'Error',
    text2: message,
  })
}

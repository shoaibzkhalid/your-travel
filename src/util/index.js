import Toast, { BaseToast } from 'react-native-toast-message'
import React from 'react'
import axios from 'axios'
import { COLORS } from '../theme/colors'
import { GEO_CODE_URL } from '../config/constants'
import Config from 'react-native-config'

// Toast customizations
const baseToast = (props, color) => (
  <BaseToast
    {...props}
    text1Style={{ fontSize: 16, color }}
    text2Style={{ fontSize: 18 }}
    style={{ borderLeftColor: color }}
  />
)

// Toast config
export const toastConfig = {
  success: props => baseToast(props, COLORS.secondary),
  error: props => baseToast(props, COLORS.error),
}

// Helper function to show toast messages
export const showSuccessToast = message => {
  Toast.show({
    type: 'success',
    text1: 'Success',
    text2: message,
  })
}

// Helper function to show error toast
export const showErrorToast = message => {
  Toast.show({
    type: 'error',
    text1: 'Error',
    text2: message,
  })
}

// Get User's country from latitude and longitude
export const getCountryFromLatLng = async (lat, lng) => {
  if (!lat) return
  const latlng = `?latlng=${lat},${lng}`
  const key = `&key=${Config.GC_API_KEY}`

  try {
    const result = await axios.get(GEO_CODE_URL + latlng + key + '&result_type=country')

    // returning country name from response
    return result.data.results[0].formatted_address
  } catch (err) {
    console.log('error getting user country', err)
  }
}

// Getting latitude and longitude from address
export const getLatlngFromAddress = async address => {
  if (!address) return
  // console.log('address', address)

  const key = `&key=${Config.GC_API_KEY}`
  const pAddress = `?address=${address}`

  try {
    const result = await axios.get(GEO_CODE_URL + pAddress + key)
    const length = result.data.results[0].address_components.length
    const userCountry = result.data.results[0].address_components[length - 1].long_name
    const latLng = result.data.results[0].geometry.location
    // console.log('result', country, latLng)
    // lat lang from response
    return { userCountry, destinationLocation: latLng }
  } catch (err) {
    console.log('error getting user country', err)
  }
}

// For number formatting in thousands and millions
export const numFormatter = num => {
  if (num > 999 && num < 1000000) {
    return (num / 1000).toFixed(1) + 'K' // convert to K for number from > 1000 < 1 million
  } else if (num > 1000000) {
    return (num / 1000000).toFixed(1) + 'M' // convert to M for number from > 1 million
  } else if (num < 900) {
    return num // if value < 1000, nothing to do
  }
}

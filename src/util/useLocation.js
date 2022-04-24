import React, { useEffect, useContext } from 'react'
import GetLocation from 'react-native-get-location'
import { getCountryFromLatLng, getLatlngFromAddress } from '.'
import { HomeContext } from '../state/homeContext'

export const useLocation = () => {
  const [home, setLocation] = useContext(HomeContext)
  const [destination, setDestination] = React.useState('')
  // console.log('useLocation', home.covidDataOfUserCountry)

  useEffect(() => {
    ;(async () => {
      const { destinationLocation, userCountry } = await getLatlngFromAddress(destination)
      // console.log('Check', destinationLocation)

      const userLocation = destinationLocation ?? location

      console.log('check', destinationLocation, userCountry)

      if (!destinationLocation) return

      setLocation({
        ...home,
        userCountry,
        destinationLocation: {
          latitude: destinationLocation?.lat,
          longitude: destinationLocation?.lng,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        },
      })
    })()
  }, [destination])

  useEffect(() => {
    ;(async () => {
      const location = await GetLocation.getCurrentPosition({
        // Setting this to true makes location null on Android Emulator
        enableHighAccuracy: false,
        timeout: 15000,
      })

      const destinationLocation = home.destinationLocation
      const userLocation = location

      const userCountry = await getCountryFromLatLng(
        userLocation?.latitude,
        userLocation?.longitude,
      )

      // console.log('check', userCountry)

      if (!location) return
      setLocation({
        ...home,
        location: {
          latitude: location?.latitude,
          longitude: location?.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        },
        userCountry,
      })
    })()
  }, [])

  // useEffect(() => {
  //   ;(async () => {})()
  // }, [destination])

  const handleDestination = destination => {
    setDestination(destination)
  }

  const setNewDestination = destinationLocation => {
    setLocation({
      ...home,
      destinationLocation,
    })
  }

  return { handleDestination, setNewDestination }
}

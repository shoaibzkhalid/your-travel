import React, { useEffect, useContext } from 'react'
import GetLocation from 'react-native-get-location'
import { getCountryFromLatLng, getLatlngFromAddress, showErrorToast } from '.'
import { HomeContext } from '../state/homeContext'

const deltaCoordinates = {
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
}

export const useLocation = () => {
  const [home, setLocation] = useContext(HomeContext)
  const [destination, setDestination] = React.useState('')

  // side effect when destination changes
  useEffect(() => {
    ;(async () => {
      // Getting destination location and country from address
      const { destinationLocation, userCountry } = await getLatlngFromAddress(destination)
      if (!destinationLocation) return
      // console.log('check', destinationLocation, userCountry)

      // setting destination location and country to context
      setLocation({
        ...home,
        userCountry,
        destinationLocation: {
          latitude: destinationLocation?.lat,
          longitude: destinationLocation?.lng,
          ...deltaCoordinates,
        },
      })
    })()
  }, [destination])

  // user location effect
  useEffect(() => {
    ;(async () => {
      try {
        const location = await GetLocation.getCurrentPosition({
          // Setting this to true makes location null on Android Emulator
          enableHighAccuracy: false,
          timeout: 15000,
        })

        const userLocation = location

        // getting user country from latitude and longitude
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
            ...deltaCoordinates,
          },
          userCountry,
        })
      } catch (error) {
        if (error.code == 'UNAUTHORIZED') {
          setLocation({
            ...home,
            location: error.code,
          })
          showErrorToast('Location permission not granted')
          return
        }

        console.log(
          'error getting location',
          error,

          error.code == 'UNAUTHORIZED',
        )
      }
    })()
  }, [])

  // helper function to set destination
  const handleDestination = destination => setDestination(destination)

  const setNewDestination = destinationLocation => {
    setLocation({
      ...home,
      destinationLocation,
    })
  }

  return { handleDestination, setNewDestination }
}

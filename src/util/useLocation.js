import React, { useEffect, useContext } from 'react'
import GetLocation from 'react-native-get-location'
import { HomeContext } from '../state/homeContext'

export const useLocation = () => {
  const [home, setLocation] = useContext(HomeContext)

  useEffect(() => {
    ;(async () => {
      const location = await GetLocation.getCurrentPosition({
        // Setting this to true makes location null on Android Emulator
        enableHighAccuracy: false,
        timeout: 15000,
      })
      if (!location) return

      // console.log('location effect', location)
      setLocation({ ...home, location })
    })()
  }, [])
}

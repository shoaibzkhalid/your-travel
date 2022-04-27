import React from 'react'
import { View } from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import { Fragment } from 'react/cjs/react.production.min'
import { ICONS } from '../../theme/icons'
import { ActivityIndicator } from 'react-native-paper'
import { HomeContext } from '../../state/homeContext'
import { useLocation } from '../../util/useLocation'
import { useCovidData } from '../../util/useCovidData'
import { placeholderLocation } from '../../config/constants'

const CustomMap = () => {
  useCovidData()
  const { setNewDestination } = useLocation()
  const [homeContext] = React.useContext(HomeContext)
  const { location } = homeContext
  const destLocation = homeContext.destinationLocation
  const locationNotGranted = location === 'UNAUTHORIZED'
  const validLocation = locationNotGranted ? placeholderLocation : location
  // console.log('location', location, location === 'UNAUTHORIZED')

  return (
    <Fragment>
      {!location ? (
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <ActivityIndicator />
        </View>
      ) : (
        // Google Map with Marker
        <MapView
          style={{ flex: 1 }}
          initialRegion={validLocation}
          region={destLocation}
          onRegionChange={region => setNewDestination(region)}>
          <Marker coordinate={destLocation ?? validLocation} image={ICONS.marker} />
        </MapView>
      )}
    </Fragment>
  )
}

export default CustomMap

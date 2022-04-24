import React from 'react'
import MapView, { Marker } from 'react-native-maps'
import { Fragment } from 'react/cjs/react.production.min'
import { ICONS } from '../../theme/icons'
import { ActivityIndicator } from 'react-native-paper'
import { HomeContext } from '../../state/homeContext'
import { useLocation } from '../../util/useLocation'
import { useCovidData } from '../../util/useCovidData'

const CustomMap = () => {
  const { setNewDestination } = useLocation()
  useCovidData()
  const [homeContext] = React.useContext(HomeContext)
  const { location } = homeContext

  const destLocation = homeContext.destinationLocation

  return (
    <Fragment>
      {!location ? (
        <ActivityIndicator />
      ) : (
        <MapView
          style={{ flex: 1 }}
          initialRegion={location}
          region={destLocation}
          onRegionChange={region => setNewDestination(region)}>
          <Marker coordinate={destLocation ?? location} image={ICONS.marker} />
        </MapView>
      )}
    </Fragment>
  )
}

export default CustomMap

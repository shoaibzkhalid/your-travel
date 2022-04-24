import MapView, { Marker } from 'react-native-maps'
import { Fragment } from 'react/cjs/react.production.min'
import React, { useContext } from 'react'
import { ICONS } from '../../theme/icons'
import { ActivityIndicator } from 'react-native-paper'
import { HomeContext } from '../../state/homeContext'
import { useLocation } from '../../util/useLocation'

const CustomMap = () => {
  useLocation()
  const [homeContext] = React.useContext(HomeContext)
  const { location } = homeContext

  return (
    <Fragment>
      {!location ? (
        <ActivityIndicator />
      ) : (
        <MapView
          style={{ flex: 1 }}
          initialRegion={{
            latitude: location?.latitude,
            longitude: location?.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}>
          <Marker
            coordinate={{
              latitude: location?.latitude,
              longitude: location?.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            image={ICONS.marker}
          />
        </MapView>
      )}
    </Fragment>
  )
}

export default CustomMap

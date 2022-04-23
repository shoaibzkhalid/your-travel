import { useLocation } from '../../util/useLocation';
import MapView, { Marker } from 'react-native-maps';
import { Fragment } from 'react/cjs/react.production.min';
import React from 'react';
import { ICONS } from '../../theme/icons';

const DestMap = () => {
  const { location, coords } = useLocation(null);

  return (
    <Fragment>
      {location && (
        <Fragment>
          <MapView style={{ flex: 1 }} initialRegion={coords}>
            <Marker coordinate={coords} image={ICONS.marker} />
          </MapView>
        </Fragment>
      )}
    </Fragment>
  );
};

export default DestMap;

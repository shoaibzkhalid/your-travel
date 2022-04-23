import React, { useEffect, useState } from 'react';
import GetLocation from 'react-native-get-location';

export const useLocation = () => {
  const [location, setLocation] = useState(null);

  useEffect(() => {
    (async () => {
      const location = await GetLocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 15000,
      });
      setLocation(location);
    })();
  }, []);

  const coords = {
    latitude: location?.latitude,
    longitude: location?.longitude,
    latitudeDelta: 0.0222,
    longitudeDelta: 0.0121,
  };

  return { location, coords };
};

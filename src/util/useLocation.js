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

  return { location };
};

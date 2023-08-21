import React from 'react';
import { Map, Autocomplete } from 'react-mapbox-geocoder-autocomplete';

const initViewPosition = {
  longitude: -73.9866,
  latitude: 40.72929915979287,
};

interface ViewPosition {
    longitude: number;
    latitude: number;
}

interface ViewPositionShort {
  lng: number;
  lat: number;
}

/** `promiseFn` for fetching map-box address by coordinates */
const getMapAddress = async (mapToken: string, { lng, lat }: ViewPositionShort) => {
  try {
    const response = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${mapToken}`
    );
    if (response.status >= 200 && response.status < 300) {
      const result = await response.json();

      return result?.features?.[0]?.place_name || "";
    }
  } catch {
    console.error("Error");
  }
  return {};
};

function App({ mapToken = process.env.REACT_APP_MAP_TOKEN as string }) {
  const [viewPosition, setViewPosition] = React.useState(initViewPosition);
  const [address, setAddress] = React.useState("");

  React.useEffect(() => {
    const fetchAddress = async() => {
      const addressReponse = await getMapAddress(mapToken, { lng: initViewPosition.longitude, lat: initViewPosition.latitude });
      setAddress(addressReponse);
    }
    fetchAddress();
  }, []);

  const onItemClick = (vp: ViewPosition, item: { place_name: string}) => {
    setAddress(item?.place_name);
    setViewPosition(vp);
  };

  const handleMarkerDrag = async (lngLat: ViewPositionShort) => {
    const { lng, lat } = lngLat;
    const addressReponse = await getMapAddress(mapToken, { lng, lat });
    setAddress(addressReponse);
    setViewPosition({ longitude: lng, latitude: lat });
  };
  return (
    <div>
      <Autocomplete mapToken={mapToken} address={address} onItemClick={onItemClick} />
      <Map handleMarkerDrag={handleMarkerDrag} mapToken={mapToken} viewPosition={viewPosition} />
    </div>
  );
}

export default App;

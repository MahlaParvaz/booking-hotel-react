import { useState } from 'react';
import { useEffect } from 'react';

import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvent,
} from 'react-leaflet';

import { useNavigate, useSearchParams } from 'react-router-dom';
import useGeoLocation from '../../Hooks/useGeoLocation';
import useUrlLocation from '../../Hooks/useUrlLocation';

function Map({ markerLocations }) {
  const [mapCenter, setMapCenter] = useState([20, 4]);
  const [lat, lng] = useUrlLocation();
  const navigate = useNavigate();

  const {
    isLoading: isLoadingPosition,
    position: geoLocationPosition,
    getPosition,
  } = useGeoLocation();
  // const updateMapCenter = (newCenter) => {
  //   // Clone the newCenter array using the spread operator

  //   const clonedCenter = [...newCenter];
  //   setMapCenter(clonedCenter);
  //   // navigate(`/hotels-result?lat=${lat}&lng=${lng}`);
  //   console.log('clonedCenter:', clonedCenter);

  useEffect(() => {
    // Initialize map center based on URL parameters or geolocation
    if (lat && lng) {
      setMapCenter([lat, lng]);
    } else if (geoLocationPosition?.lat && geoLocationPosition?.lng) {
      setMapCenter([geoLocationPosition.lat, geoLocationPosition.lng]);
    }
  }, [lat, lng, geoLocationPosition]);

  // useEffect(() => {
  //   // Initialize map center based on URL parameters or geolocation
  //   if (lat && lng) {
  //     setMapCenter([lat, lng]);
  //   }
  // }, [lat, lng, setMapCenter]);

  // useEffect(() => {
  //   if (geoLocationPosition?.lat && geoLocationPosition?.lng) {
  //     setMapCenter([geoLocationPosition.lat, geoLocationPosition.lng]);
  //     console.log('Map Center Updated:', geoLocationPosition);
  //   }
  // }, [geoLocationPosition]);
  // // // Log for debugging
  useEffect(() => {
    console.log('Map Center Updated:', mapCenter);
  }, [mapCenter]);

  return (
    <>
      <MapContainer
        className="map h-full rounded-2xl  "
        center={mapCenter}
        zoom={6}
        scrollWheelZoom={true}
      >
        <button
          onClick={getPosition}
          className="getLocation -bg--dark-green text-white z-[800] absolute rounded-2xl py-1 px-2 font-bold bottom-4 left-4 shadow-lg  shadow-white "
        >
          {isLoadingPosition ? 'Loading ...' : ' Use Your Location'}
        </button>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        <DitectClick />
        <ChangeCenter position={mapCenter} />

        {markerLocations.map((item) => (
          <Marker key={item.id} position={[item.latitude, item.longitude]}>
            <Popup>{item.host_location}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </>
  );
}

export default Map;

function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}
function DitectClick() {
  const navigate = useNavigate();
  useMapEvent({
    click: (e) => navigate(`/bookmark/add?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
  });
  return null;
}

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

  const {
    isLoading: isLoadingGeoPosition,
    position: geoPosition,
    getPosition,
  } = useGeoLocation();

  useEffect(() => {
    if (lat && lng) setMapCenter([lat, lng]);
  }, [lat, lng]);

  useEffect(() => {
    if (geoPosition?.lat && geoPosition.lng)
      setMapCenter([geoPosition.lat, geoPosition.lng]);
  }, [geoPosition]);

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
          {isLoadingGeoPosition ? 'Loading ...' : ' Use Your Location'}
        </button>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        <DitectClick />
        <ChangeCenter position={mapCenter} />
        {markerLocations.map((item) => {
          return (
            <Marker key={item.id} position={[item.latitude, item.longitude]}>
              <Popup>{item.host_location}</Popup>
            </Marker>
          );
        })}
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

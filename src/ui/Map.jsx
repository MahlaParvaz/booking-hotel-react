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
import useGeoLocation from '../hooks/useGeoLocation';
import useUrlLocation from '../hooks/useUrlLocation';
import { useHotels } from '../features/hotels/HotelResultProvider';

function Map({ markerLocations }) {
  const [mapCenter, setMapCenter] = useState([20, 4]);
  const [lat, lng] = useUrlLocation();
  const { currentHotel } = useHotels();
  const {
    isLoading: isLoadingPosition,
    position: geoLocationPosition,
    getPosition,
  } = useGeoLocation();

  useEffect(() => {
    console.log('lat, lng:', lat, lng);
    if (lat && lng) setMapCenter([lat, lng]);
  }, [lat, lng]);

  useEffect(() => {
    if (currentHotel?.latitude && currentHotel?.longitude) {
      setMapCenter([currentHotel.latitude, currentHotel.longitude]);
    }
  }, [currentHotel]);

  return (
    <>
      <MapContainer
        className="map h-full rounded-2xl  "
        center={mapCenter}
        zoom={7}
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
  useEffect(() => {
    map.setView(position);
  }, [position, map]);
  return null;
}
function DitectClick() {
  const navigate = useNavigate();
  useMapEvent({
    click: (e) =>
      navigate(`/bookmark/add?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
  });
  return null;
}

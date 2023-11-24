import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import { useHotels } from '../context/HotelResultProvider';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import useGeoLocation from '../../Hooks/useGeoLocation';

function Map() {
  const { isLoading, hotels } = useHotels();
  const [mapCenter, setMapCenter] = useState([20, 4]);
  const [searchParams, setSearchParams] = useSearchParams();
  const lat = searchParams.get('lat');
  const lng = searchParams.get('lng');

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
    <div className="mapContainer  flex-1 relative -bg--light-gray">
      <MapContainer
        className="map h-full"
        center={mapCenter}
        zoom={6}
        scrollWheelZoom={true}
      >
        <button
          onClick={getPosition}
          className="getLocation -bg--violet-700 text-white z-[1000] absolute rounded-2xl py-1 px-2 font-bold bottom-4 left-4 shadow-lg  shadow-white "
        >
          {isLoadingGeoPosition ? 'Loading ...' : ' Use Your Location'}
        </button>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        <ChangeCenter position={mapCenter} />
        {hotels.map((item) => {
          return (
            <Marker key={item.id} position={[item.latitude, item.longitude]}>
              <Popup>{item.host_location}</Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}

export default Map;

function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}

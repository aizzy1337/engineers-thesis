import { useState, useRef } from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  Autocomplete,
} from "@react-google-maps/api";
import "./map.css"

export default function Map() {

  const [location, setLocation] = useState({ lat: 50, lng: 20 });
  const [center, setCenter] = useState({ lat: 50, lng: 20 });
  const autocompleteRef = useRef(null);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  });

  if (!isLoaded) return <div>Loading....</div>;

  function changeLocation(e) {
    setLocation({ lat: e.latLng.lat(), lng: e.latLng.lng() })
  }

  function handlePlaceChanged() {
    const place = autocompleteRef.current.getPlace();
    const latlng = {
      lat: place.geometry.location.lat(),
      lng: place.geometry.location.lng(),
    }
    setLocation(latlng);
    setCenter(latlng);
  }

  return (
    <div className="map-div">
      <div className="navigation">
        <div className="location">
          <p><b>Latitude:</b> {location.lat}°</p>
          <p><b>Longitude:</b> {location.lng}°</p>
        </div>
        <Autocomplete
          onLoad={(autocomplete) => {
            autocompleteRef.current = autocomplete;
          }}
          onPlaceChanged={handlePlaceChanged}
          options={{ fields: ["address_components", "geometry", "name"] }}
          mapContainerStyle
        >
          <input type="text" placeholder="Search for location..." className="bg-black-50 border border-white-300 text-white-900 text-lg text-center rounded-full focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-black dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 shadow shadow-blue-500/50 focus:shadow-md focus:shadow-white" id="autocomplete"/>
        </Autocomplete>
        <div className="button">
            <button type="button" className="bg-black-50 border border-white-300 text-white-900 text-lg text-center rounded-full focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-black dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 shadow shadow-blue-500/50 focus:shadow-md focus:shadow-white hover:shadow-md hover:shadow-white">Generate raport</button>
        </div>
      </div>
      
      <GoogleMap
        zoom={12}
        center={center}
        mapContainerClassName="map"
        mapContainerStyle={{ width: "auto", height: "50vh", borderRadius: "20px"}}
        mapTypeId="roadmap"
        onClick={changeLocation}
      >
        <Marker position={location} />
      </GoogleMap>
    </div>
  );
}
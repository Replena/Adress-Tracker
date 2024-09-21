import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "500px",
};

function Map({ lat, lng, city, country, isp }) {
  return (
    <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={{ lat: lat, lng: lng }}
        zoom={13}
      >
        <Marker
          position={{ lat: lat, lng: lng }}
          title={`${city}, ${country} - ISP: ${isp}`}
        />
      </GoogleMap>
    </LoadScript>
  );
}

export default Map;

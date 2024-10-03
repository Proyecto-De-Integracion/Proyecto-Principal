import { useCallback, useEffect, useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const apiKey = "AIzaSyDoU5qjzzHh-2rVgmvQjMiB8QSy9HCouUw"; // Reemplaza con tu API key de Google Maps

export const Map = ({ onMarkerChange }) => {
  const [markerPosition, setMarkerPosition] = useState({
    lat: -26.1853,
    lng: -58.1735,
  });

  const onLoad = useCallback((marker) => {
    marker.setDraggable(true);
  }, []);

  const onMarkerDragEnd = (e) => {
    const newPosition = { lat: e.latLng.lat(), lng: e.latLng.lng() };
    setMarkerPosition(newPosition);
    if (onMarkerChange) {
      onMarkerChange(newPosition.lat, newPosition.lng);
    }
    getAddressFromCoordinates(newPosition.lat, newPosition.lng);
  };

  const getAddressFromCoordinates = async (lat, lng) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`
      );
      const data = await response.json();
      if (data.results && data.results.length > 0) {
        const address = data.results[0].formatted_address;
        console.log("Address:", address);
      } else {
        console.log("No address found.");
      }
    } catch (error) {
      console.error("Error fetching address:", error);
    }
  };

  return (
    <LoadScript googleMapsApiKey={apiKey}>
      <GoogleMap
        mapContainerStyle={{ height: "200px", width: "100%" }}
        center={markerPosition}
        zoom={14}
      >
        <Marker
          position={markerPosition}
          draggable={true}
          onLoad={onLoad}
          onDragEnd={onMarkerDragEnd}
        />
      </GoogleMap>
      <div style={{ marginTop: "10px" }}>
        <strong>Coordinates:</strong> Lat: {markerPosition.lat}, Lng:{" "}
        {markerPosition.lng}
      </div>
    </LoadScript>
  );
};

export default Map;

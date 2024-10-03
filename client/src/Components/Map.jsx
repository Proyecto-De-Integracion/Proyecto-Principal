import { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import markerIcon from "leaflet/dist/images/marker-icon.png";

const icon = L.icon({
  iconUrl: markerIcon,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const Map = ({ onMarkerChange }) => {
  const [markerPosition, setMarkerPosition] = useState({
    lat: -26.1853,
    lng: -58.1735,
  });

  const handleMarkerDragEnd = (e) => {
    const newPosition = e.target.getLatLng();
    setMarkerPosition(newPosition);
    if (onMarkerChange) {
      onMarkerChange(newPosition.lat, newPosition.lng);
    }
    getAddressFromCoordinates(newPosition.lat, newPosition.lng);
  };

  const getAddressFromCoordinates = async (lat, lng) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
      );
      const data = await response.json();
      if (data.display_name) {
        console.log("Address:", data.display_name);
      } else {
        console.log("No address found.");
      }
    } catch (error) {
      console.error("Error fetching address:", error);
    }
  };

  return (
    <MapContainer
      center={markerPosition}
      zoom={14}
      style={{ height: "400px", width: "100%" }} // Altura y ancho definidos
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" // Cambiado a OpenStreetMap
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker
        position={markerPosition}
        icon={icon}
        draggable={true}
        eventHandlers={{
          dragend: handleMarkerDragEnd,
        }}
      >
        <Popup>¡Estás aquí!</Popup>
      </Marker>
    </MapContainer>
  );
};

export default Map;

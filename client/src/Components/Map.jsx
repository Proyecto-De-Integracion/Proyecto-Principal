import { useEffect, useRef, useState } from "react";

const apiKey = "-ijxS-BfcuGXeFpSbQB6o7TT6ty2l1MV0zFbI-cs1a4";

export const Map = ({ onMarkerChange }) => {
  const mapRef = useRef(null);
  const [markerPosition, setMarkerPosition] = useState(null);
  const [address, setAddress] = useState("");

  useEffect(() => {
    const loadScript = (url, callback) => {
      const script = document.createElement("script");
      script.src = url;
      script.async = true;
      script.onload = callback;
      document.head.appendChild(script);
    };

    const initMap = () => {
      const H = window.H;

      if (!H) {
        console.error("HERE Maps is not available.");
        return;
      }

      const platform = new H.service.Platform({
        apikey: apiKey,
      });

      const defaultLayers = platform.createDefaultLayers();

      const map = new H.Map(mapRef.current, defaultLayers.vector.normal.map, {
        center: { lat: -26.1853, lng: -58.1735 },
        zoom: 14,
        pixelRatio: window.devicePixelRatio || 1,
      });

      const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

      H.ui.UI.createDefault(map, defaultLayers);

      addDraggableMarker(map, platform, behavior);
      addPolygon(map);
    };

    const addPolygon = (map) => {
      const coordinates = [
        [-26.166042903313993, -58.20976346588134],
        [-26.166042903313993, -58.13723653411866],
        [-26.204553914505333, -58.13723653411866],
        [-26.204553914505333, -58.20976346588134],
        [-26.166042903313993, -58.20976346588134],
      ];

      const lineString = new window.H.geo.LineString();
      coordinates.forEach((coord) => {
        lineString.pushLatLngAlt(coord[0], coord[1]);
      });

      const polygon = new window.H.map.Polygon(lineString, {
        style: {
          lineWidth: 0,
          strokeColor: "transparent",
          fillColor: "transparent",
        },
      });

      map.addObject(polygon);
    };

    const addDraggableMarker = (map, platform, behavior) => {
      const marker = new window.H.map.Marker(
        { lat: -26.1853, lng: -58.1735 },
        { volatility: true }
      );
      marker.draggable = true;
      map.addObject(marker);

      map.addEventListener(
        "dragstart",
        (ev) => {
          const target = ev.target;
          if (target instanceof window.H.map.Marker) {
            behavior.disable();
          }
        },
        false
      );

      map.addEventListener(
        "dragend",
        (ev) => {
          const target = ev.target;
          if (target instanceof window.H.map.Marker) {
            const position = target.getGeometry();
            setMarkerPosition(position);
            if (onMarkerChange) {
              onMarkerChange(position.lat, position.lng); // Pass the coordinates to the parent component
            }
            behavior.enable();
            getAddressFromCoordinates(position.lat, position.lng);
          }
        },
        false
      );

      map.addEventListener(
        "drag",
        (ev) => {
          const target = ev.target;
          const pointer = ev.currentPointer;
          if (target instanceof window.H.map.Marker) {
            target.setGeometry(
              map.screenToGeo(pointer.viewportX, pointer.viewportY)
            );
          }
        },
        false
      );
    };

    const getAddressFromCoordinates = async (lat, lng) => {
      try {
        const response = await fetch(
          `https://revgeocode.search.hereapi.com/v1/revgeocode?at=${lat},${lng}&lang=en-US&apiKey=${apiKey}`
        );
        const data = await response.json();

        if (data.items && data.items.length > 0) {
          const address = data.items[0].address.label;
          setAddress(address);
        } else {
          setAddress("No address found.");
        }
      } catch (error) {
        console.error("Error during reverse geocoding:", error);
        setAddress("Error fetching address.");
      }
    };

    loadScript("https://js.api.here.com/v3/3.1/mapsjs-core.js", () => {
      loadScript("https://js.api.here.com/v3/3.1/mapsjs-service.js", () => {
        loadScript("https://js.api.here.com/v3/3.1/mapsjs-ui.js", () => {
          loadScript(
            "https://js.api.here.com/v3/3.1/mapsjs-mapevents.js",
            () => {
              initMap();
            }
          );
        });
      });
    });

    return () => {
      if (mapRef.current) {
        mapRef.current.innerHTML = "";
      }
    };
  }, [onMarkerChange]);

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <div
        ref={mapRef}
        style={{ height: "200px", width: "100%", overflow: "hidden" }}
      />
      <div style={{ marginTop: "10px", width: "80%" }}>
        <strong>Coordinates:</strong>{" "}
        {markerPosition
          ? `Lat: ${markerPosition.lat}, Lng: ${markerPosition.lng}`
          : "Drag the marker to get coordinates."}
        <br />
        <strong>Address:</strong>{" "}
        {address ? address : "Drag the marker to get the address."}
      </div>
    </div>
  );
};

export default Map;

import React, { useEffect, useRef, useState } from "react";

// Replace with your HERE Maps API key
const apiKey = "-ijxS-BfcuGXeFpSbQB6o7TT6ty2l1MV0zFbI-cs1a4";

export const Map = () => {
  const mapRef = useRef(null); // Reference to the map div
  const [markerPosition, setMarkerPosition] = useState(null); // Track marker coordinates
  const [address, setAddress] = useState(""); // Track the reverse geocoded address

  useEffect(() => {
    // Function to load HERE Maps SDK scripts sequentially
    const loadScript = (url, callback) => {
      const script = document.createElement("script");
      script.src = url;
      script.async = true;
      script.onload = callback;
      document.head.appendChild(script);
    };

    // Initialize the map once all scripts are loaded
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
        center: { lat: -26.1853, lng: -58.1735 }, // Formosa center
        zoom: 14,
        pixelRatio: window.devicePixelRatio || 1,
      });

      // Make the map interactive
      const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

      // Create default UI components
      H.ui.UI.createDefault(map, defaultLayers);

      // Add draggable marker
      addDraggableMarker(map, platform, behavior);

      // Add polygon to the map
      addPolygon(map);
    };

    // Function to add a polygon to the map
    const addPolygon = (map) => {
      // Define the polygon's coordinates (lat, lng pairs)
      const coordinates = [
        [-26.166042903313993, -58.20976346588134],
        [-26.166042903313993, -58.13723653411866],
        [-26.204553914505333, -58.13723653411866],
        [-26.204553914505333, -58.20976346588134],
        [-26.166042903313993, -58.20976346588134], // Close the loop
      ];

      // Create the polygon object using H.geo.LineString
      const lineString = new window.H.geo.LineString();
      coordinates.forEach((coord) => {
        lineString.pushLatLngAlt(coord[0], coord[1]);
      });

      const polygon = new window.H.map.Polygon(lineString, {
        style: {
          lineWidth: 0, // No border width
          strokeColor: "transparent", // Transparent border
          fillColor: "transparent", // Transparent fill
        },
      });

      // Add the polygon to the map
      map.addObject(polygon);
    };

    // Define the draggable marker functionality
    const addDraggableMarker = (map, platform, behavior) => {
      const marker = new window.H.map.Marker(
        { lat: -26.1853, lng: -58.1735 }, // Initial marker position
        { volatility: true } // Allows marker to be draggable
      );
      marker.draggable = true;
      map.addObject(marker);

      // Add dragstart listener
      map.addEventListener(
        "dragstart",
        (ev) => {
          const target = ev.target;
          if (target instanceof window.H.map.Marker) {
            behavior.disable(); // Disable map movement while dragging
          }
        },
        false
      );

      // Add dragend listener to get updated position
      map.addEventListener(
        "dragend",
        (ev) => {
          const target = ev.target;
          if (target instanceof window.H.map.Marker) {
            const position = target.getGeometry(); // Get the new marker position
            setMarkerPosition(position); // Update state with the new coordinates
            behavior.enable(); // Re-enable map movement after dragging
            getAddressFromCoordinates(position.lat, position.lng); // Reverse geocode the new position
          }
        },
        false
      );

      // Add drag listener to update position during drag
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

    // Reverse Geocoding: Get the address based on latitude and longitude
    const getAddressFromCoordinates = async (lat, lng) => {
      try {
        const response = await fetch(
          `https://revgeocode.search.hereapi.com/v1/revgeocode?at=${lat},${lng}&lang=en-US&apiKey=${apiKey}`
        );
        const data = await response.json();

        if (data.items && data.items.length > 0) {
          const address = data.items[0].address.label;
          setAddress(address); // Update the address state
        } else {
          setAddress("No address found.");
        }
      } catch (error) {
        console.error("Error during reverse geocoding:", error);
        setAddress("Error fetching address.");
      }
    };

    // Load scripts sequentially
    loadScript("https://js.api.here.com/v3/3.1/mapsjs-core.js", () => {
      loadScript("https://js.api.here.com/v3/3.1/mapsjs-service.js", () => {
        loadScript("https://js.api.here.com/v3/3.1/mapsjs-ui.js", () => {
          loadScript(
            "https://js.api.here.com/v3/3.1/mapsjs-mapevents.js",
            () => {
              // After all scripts are loaded, initialize the map
              initMap();
            }
          );
        });
      });
    });

    // Clean up
    return () => {
      if (mapRef.current) {
        mapRef.current.innerHTML = "";
      }
    };
  }, []);

  return (
    <div>
      <div ref={mapRef} style={{ height: "500px", width: "100%" }} />
      <div style={{ marginTop: "10px" }}>
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

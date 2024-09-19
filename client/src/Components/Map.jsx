import React, { useEffect, useRef } from "react";

// Replace with your HERE Maps API key
const apiKey = "-ijxS-BfcuGXeFpSbQB6o7TT6ty2l1MV0zFbI-cs1a4";

export const Map = () => {
  const mapRef = useRef(null); // Reference to the map div

  useEffect(() => {
    // Load the HERE Maps SDK script with a Promise
    const loadScript = (url) => {
      return new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = url;
        script.async = true;
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
      });
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
        center: { lat: 42.35805, lng: -71.0636 }, // Boston center
        zoom: 12,
        pixelRatio: window.devicePixelRatio || 1,
      });

      // Make the map interactive
      const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

      // Create default UI components
      H.ui.UI.createDefault(map, defaultLayers);

      // Add the draggable marker
      addDraggableMarker(map, behavior);

      // Add a simple route example
      calculateRouteFromAtoB(platform, map);
    };

    // Define the draggable marker functionality
    const addDraggableMarker = (map, behavior) => {
      const marker = new window.H.map.Marker(
        { lat: 42.35805, lng: -71.0636 },
        { volatility: true }
      );
      marker.draggable = true;
      map.addObject(marker);

      map.addEventListener(
        "dragstart",
        function (ev) {
          const target = ev.target;
          const pointer = ev.currentPointer;
          if (target instanceof window.H.map.Marker) {
            const targetPosition = map.geoToScreen(target.getGeometry());
            target.offset = new window.H.math.Point(
              pointer.viewportX - targetPosition.x,
              pointer.viewportY - targetPosition.y
            );
            behavior.disable();
          }
        },
        false
      );

      map.addEventListener(
        "dragend",
        function (ev) {
          const target = ev.target;
          if (target instanceof window.H.map.Marker) {
            behavior.enable();
          }
        },
        false
      );

      map.addEventListener(
        "drag",
        function (ev) {
          const target = ev.target;
          const pointer = ev.currentPointer;
          if (target instanceof window.H.map.Marker) {
            target.setGeometry(
              map.screenToGeo(
                pointer.viewportX - target.offset.x,
                pointer.viewportY - target.offset.y
              )
            );
          }
        },
        false
      );
    };

    // Calculate route from A to B
    const calculateRouteFromAtoB = (platform, map) => {
      const router = platform.getRoutingService(null, 8);
      const routeRequestParams = {
        routingMode: "fast",
        transportMode: "car",
        origin: "52.5160,13.3779", // Brandenburg Gate
        destination: "52.5206,13.3862", // Friedrichstraße Railway Station
        return: "polyline,turnByTurnActions,actions,instructions,travelSummary",
      };

      router.calculateRoute(
        routeRequestParams,
        function (result) {
          const route = result.routes[0];
          addRouteShapeToMap(route, map);
        },
        function (error) {
          console.error(error);
          alert("Can't reach the remote server");
        }
      );
    };

    // Add the polyline to the map to show the route
    const addRouteShapeToMap = (route, map) => {
      route.sections.forEach((section) => {
        const linestring = window.H.geo.LineString.fromFlexiblePolyline(
          section.polyline
        );
        const polyline = new window.H.map.Polyline(linestring, {
          style: { lineWidth: 4, strokeColor: "rgba(0, 128, 255, 0.7)" },
        });
        map.addObject(polyline);
        map.getViewModel().setLookAtData({ bounds: polyline.getBoundingBox() });
      });
    };

    // Load the HERE Maps SDK scripts
    Promise.all([
      loadScript("https://js.api.here.com/v3/3.1/mapsjs-core.js"),
      loadScript("https://js.api.here.com/v3/3.1/mapsjs-service.js"),
      loadScript("https://js.api.here.com/v3/3.1/mapsjs-ui.js"),
      loadScript("https://js.api.here.com/v3/3.1/mapsjs-mapevents.js"),
    ])
      .then(() => {
        // Initialize the map after all scripts are loaded
        initMap();
      })
      .catch((err) => {
        console.error("Error loading scripts:", err);
      });

    // Clean up
    return () => {
      if (mapRef.current) {
        mapRef.current.innerHTML = "";
      }
    };
  }, []);

  return <div ref={mapRef} style={{ height: "500px", width: "100%" }} />;
};

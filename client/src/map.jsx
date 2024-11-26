import  { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "maplibre-gl";
import "@maplibre/maplibre-gl-leaflet/leaflet-maplibre-gl";

const Map = () => {
  useEffect(() => {
    // Initialize the map
    const map = L.map("map").setView([52.517, 13.388], 9.5);

    // Add MapLibre GL tiles
    L.maplibreGL({
      style: "https://tiles.openfreemap.org/styles/liberty",
    }).addTo(map);

    // Cleanup function to remove the map instance on component unmount
    return () => {
      map.remove();
    };
  }, []);

  return (
    <div
      id="map"
      style={{ width: "100%", height: "500px", borderRadius: "8px" }}
    ></div>
  );
};

export default Map;

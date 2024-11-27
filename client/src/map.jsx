import { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "maplibre-gl";
import "@maplibre/maplibre-gl-leaflet/leaflet-maplibre-gl";

const Map = ({viewPort,setViewPort}) => {
  useEffect(() => {
    const map = L.map("map").setView([viewPort.latitude, viewPort.longitude], viewPort.zoom);
  
    L.maplibreGL({
      style: "https://tiles.openfreemap.org/styles/liberty",
    }).addTo(map);
  
    return () => {
      map.remove();
    };
  }, [viewPort]);
  

  return (
    <div
      id="map"
      style={{ width: `${viewPort.width}`, height: `${viewPort.height}`, borderRadius: "8px" }}
    ></div>
  );
};

export default Map;

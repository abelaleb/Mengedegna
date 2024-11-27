import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "maplibre-gl";
import "@maplibre/maplibre-gl-leaflet/leaflet-maplibre-gl";

const Map = ({ viewPort, setViewPort, logEntries }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    const map = L.map(mapRef.current).setView([viewPort.latitude, viewPort.longitude], viewPort.zoom);

    L.maplibreGL({
      style: "https://tiles.openfreemap.org/styles/liberty",
    }).addTo(map);

    const handleMarkerClick = (marker) => {
      marker.openPopup();
    };

    logEntries.forEach((entry) => {
      const marker = L.marker([entry.latitude, entry.longitude]).addTo(map);
      marker.bindPopup(`
          <b>${entry.title}</b><br>
          ${entry.comments}<br>
          <img src="${entry.image}" alt="${entry.title}" style="max-width:100%; height:auto;">
      `);
      marker.on("click", () => handleMarkerClick(marker)); // Add click event listener
    });

    return () => {
      map.remove(); // Cleanup function to remove the map on unmount
    };
  }, [viewPort, logEntries]); // Update map on prop changes

  return (
    <div
      ref={mapRef}
      style={{ width: `${viewPort.width}`, height: `${viewPort.height}`, borderRadius: "8px" }}
    />
  );
};

export default Map;
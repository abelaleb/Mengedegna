/* eslint-disable */
import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "maplibre-gl";
import "@maplibre/maplibre-gl-leaflet/leaflet-maplibre-gl";
import map from "./assets/map-pin.svg";
import { createRoot } from "react-dom/client";
import { useForm } from "react-hook-form";
import LogEntryForm from "./LogEntryForm.jsx";

const Map = ({
  viewPort,
  setViewPort,
  logEntries,
  addEntryLocation,
  setAddEntryLocation,
}) => {
  const mapRef = useRef(null);

  useEffect(() => {
    const map = L.map(mapRef.current, { doubleClickZoom: false }).setView(
      [viewPort.latitude, viewPort.longitude],
      viewPort.zoom
    );

    map.on("dblclick", (e) => {
      const { lat, lng } = e.latlng;
      console.log("latitude: ", lat, "longitude: ", lng);
      setAddEntryLocation({
        latitude: lat,
        longitude: lng,
      });

      const marker = L.marker([lat, lng]).addTo(map);

      marker
        .bindPopup(
          `<div id="form-container"></div>`,
          {
            autoPan: true,
            autoPanPadding: [100, 100],
          }
        )
        .openPopup();

      const formContainer = document.getElementById("form-container");
      if (formContainer) {
        const root = createRoot(formContainer);
        root.render(<LogEntryForm latitude={lat} longitude={lng} />);
      }
    });

    L.maplibreGL({
      style: "https://tiles.openfreemap.org/styles/liberty",
    }).addTo(map);

    const handleMarkerClick = (marker) => marker.openPopup();

    logEntries.forEach((entry) => {
      const marker = L.marker([entry.latitude, entry.longitude]).addTo(map);
      marker.bindPopup(`
         <div style="display: flex; align-items: center; gap: 10px;">
          <img src="${entry.image}" alt="${entry.title}" style="max-width: 200px; max-height: 200px; height: auto;">
          <div >
            <b>${entry.title}</b><br>
            ${entry.comments}<br>
          </div>
        </div>
      `);
      marker.on("click", () => handleMarkerClick(marker));
    });

    return () => map.remove();
  }, [viewPort, logEntries]);

  return (
    <>
      <div
        ref={mapRef}
        style={{
          width: `${viewPort.width}`,
          height: `${viewPort.height}`,
          borderRadius: "8px",
        }}
      />
    </>
  );
};

export default Map;

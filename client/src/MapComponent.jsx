import { useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";
function MapComponent() {
  const mapContainerRef = useRef(null); // Use a ref to reference the map container

  useEffect(() => {
    const map = new maplibregl.Map({
      style: "https://tiles.openfreemap.org/styles/liberty",
      center: [13.388, 52.517],
      zoom: 9.5,
      container: mapContainerRef.current, // Attach the map to the div referenced by the ref
    });

    // Cleanup the map instance on unmount
    return () => {
      map.remove();
    };
  }, []); // Empty dependency array to run only on mount/unmount

  return <div id="map" ref={mapContainerRef} style={{ width: "100%", height: "500px" }}></div>;
}

export default MapComponent;

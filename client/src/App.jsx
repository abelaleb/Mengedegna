import { useEffect, useState } from "react";
import Map from "./Map";
import { listLogEntries } from "./API";

const App = () => {
  const [logEntries, setLogEntries] = useState([]);
  const [addEntryLocation, setAddEntryLocation] = useState(null);
  const [viewPort, setViewPort] = useState({
    width: "95%",
    height: "500px",
    latitude: 38.7946,
    longitude: -96.5348,
    zoom: 4,
  });

  useEffect(() => {
    const fetchLogEntries = async () => {
      const logEntries = await listLogEntries();
      setLogEntries(logEntries);
    };
    fetchLogEntries();
  }, []);

  const containerStyle = {
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  };

  return (
    <div style={containerStyle}>
      <h1>Welcome to the Travel Log</h1>
      <p>Explore locations and track your journey!</p>
      <Map
        viewPort={viewPort}
        setViewPort={setViewPort}
        logEntries={logEntries}
        addEntryLocation={addEntryLocation}
        setAddEntryLocation={setAddEntryLocation}
      />
    </div>
  );
};

export default App;

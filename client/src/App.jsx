import { useEffect, useState } from "react";
import Map from "./Map";
import { listLogEntries } from "./API";
const App = () => {
  const [logEntries, setLogEntries] = useState([]);
  const [viewPort, setViewPort] = useState({
    width: "100%",
    height: "500px",
    latitude: 9.0192,
    longitude: 38.7525,
    zoom: 10,
  });

  useEffect(() => {
    const fetchLogEntries = async () => {
      const logEntries = await listLogEntries();
      setLogEntries(logEntries);
      console.log(logEntries);
      
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
      <Map viewPort={viewPort} setViewPort={setViewPort} />
    </div>
  );
};

export default App;

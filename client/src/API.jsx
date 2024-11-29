const API_URL = "http://localhost:1337";

export async function listLogEntries() {
  const response = await fetch("http://localhost:1337/api/logs");

  // Call the .json() method to parse the response body
  const data = await response.json();
  return data;
}
export async function createLogEntry(entry) {
  const response = await fetch(`${API_URL}/api/logs`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(entry),
  });
  return response.json();
}

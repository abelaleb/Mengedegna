const API_URL = "http://localhost:1337";

export async function listLogEntries() {
  const response = await fetch("http://localhost:1337/api/logs");

  // Call the .json() method to parse the response body
  const data = await response.json();
  return data;
}

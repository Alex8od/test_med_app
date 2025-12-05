// src/config.js

// Ermittelt automatisch die richtige API-URL
const getApiUrl = () => {
  const host = window.location.hostname;

  // Wenn du lokal mit npm start auf deinem eigenen Rechner arbeiten würdest:
  if (host === "localhost") {
    return "http://localhost:8181";
  }

  // Im Skills Network Lab:
  // Frontend läuft z.B. auf:
  //   https://oleksandrava-3000.theiadockernext-0-labs-prod-theiak8s-4-tor01.proxy.cognitiveclass.ai
  //
  // Backend läuft parallel auf Port 8181:
  //   https://oleksandrava-8181.theiadockernext-0-labs-prod-theiak8s-4-tor01.proxy.cognitiveclass.ai
  //
  // -> wir ersetzen einfach 3000 durch 8181
  return `https://${host.replace("3000", "8181")}`;
};

export const API_URL = getApiUrl();

console.log("API_URL :", API_URL);

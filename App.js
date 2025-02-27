import React, { useState } from "react";
import axios from "axios";

const App = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  // Fetch Weather Data
  const getWeather = async () => {
    try {
      const { data } = await axios.get(`http://localhost:5000/weather?city=${city}`);
      setWeather(data);
      setError("");
    } catch {
      setError("City not found");
      setWeather(null);
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Weather App</h1>
      <input value={city} onChange={(e) => setCity(e.target.value)} placeholder="Enter city" />
      <button onClick={getWeather}>Get Weather</button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {weather && (
        <div>
          <h2>{weather.name}, {weather.country}</h2>
          <p>Temperature: {weather.temp}°C</p>
          <p>{weather.description}</p>
          <img src={`http://openweathermap.org/img/wn/${weather.icon}.png`} alt="Weather icon" />
        </div>
      )}
    </div>
  );
};

export default App;

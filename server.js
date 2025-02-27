require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());
const PORT = process.env.PORT || 5000;

app.get("/weather", async (req, res) => {
  try {
    const city = req.query.city;
    if (!city) return res.status(400).json({ message: "City is required" });

    const API_KEY = process.env.WEATHER_API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;

    const response = await axios.get(url);
    const data = response.data;

    res.json({
      name: data.name,
      country: data.sys.country,
      temp: data.main.temp,
      description: data.weather[0].description,
      icon: data.weather[0].icon
    });
  } catch (error) {
    res.status(404).json({ message: "City not found" });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const express = require("express");
const router = express.Router();
//const axios = require("axios");

//const auth = require("../middleware/auth.middleware");
//const Search = require("../models/Search");

router.get("/",  async (req, res) => {
  const city = req.query.city;

  if (!city) {
    return res.status(400).json({ message: "City is required" });
  }

  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.WEATHER_API_KEY}`;
    const response = await fetch(url);
    const weatherData = await response.json();
    console.log(weatherData);

    if (weatherData.cod !== 200) {
      return res.status(404).json({ message: "City not found" });
    }

    // ✅ SAVE SEARCH HISTORY
    /*await Search.create({
      user: req.user,
      city: city
    });*/

    res.json(weatherData);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
router.get("/history",  async (req, res) => {
  const history = await Search.find({ user: req.user.id })
    .sort({ createdAt: -1 })
    .limit(5);

  res.json(history);
});


export default async function handler(req, res) {
  const city = req.query.city;

  if (!city) {
    return res.status(400).json({ message: "City is required" });
  }

  try {
    const apiKey = process.env.WEATHER_API_KEY;

    if (!apiKey) {
      return res.status(500).json({ message: "Missing API key in Vercel" });
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    const response = await fetch(url);
    const weatherData = await response.json();

    if (weatherData.cod !== 200) {
      return res.status(404).json({ message: "City not found" });
    }

    return res.status(200).json(weatherData);

  } catch (error) {
    console.error("Weather API Error:", error);
    return res.status(500).json({ message: "Server error" });
  }
}

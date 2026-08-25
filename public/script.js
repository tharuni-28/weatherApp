const weather_body = document.querySelector(".weather-body");
const location_not_found = document.querySelector(".location-not-found");
const loadingText = document.querySelector(".loading");

const temperature = document.querySelector(".temperature");
const description = document.querySelector(".description");
const humidity = document.getElementById("humidity");
const wind_speed = document.getElementById("wind-speed");

const inputBox = document.querySelector(".input-box");
const searchBtn = document.getElementById("searchBtn");

// Search button
searchBtn.addEventListener("click", () => {
  const city = inputBox.value.trim();

  if (city !== "") {
    checkWeather(city);
  }
});

// Enter key
inputBox.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    const city = inputBox.value.trim();

    if (city !== "") {
      checkWeather(city);
    }
  }
});

async function checkWeather(city) {

  // Show loading
  loadingText.style.display = "block";
  weather_body.style.display = "none";
  location_not_found.style.display = "none";

  try {

    // IMPORTANT:
    // Relative URL works both locally and on Render
    const response = await fetch(
      `/api/weather?city=${encodeURIComponent(city)}`
    );

    if (!response.ok) {
      throw new Error("Weather data not found");
    }

    const data = await response.json();

    // Hide loading
    loadingText.style.display = "none";

    // Show weather
    weather_body.style.display = "flex";

    // Temperature
    temperature.innerHTML =
      `${Math.round(data.main.temp - 273.15)} <sup>°C</sup>`;

    // Description
    description.innerHTML = data.weather[0].description;

    // Humidity
    humidity.innerHTML = `${data.main.humidity}%`;

    // Wind speed
    wind_speed.innerHTML = `${data.wind.speed} Km/H`;

  } catch (error) {

    console.error("Weather error:", error);

    loadingText.style.display = "none";
    weather_body.style.display = "none";
    location_not_found.style.display = "block";
  }
}
const weather_body = document.querySelector(".weather-body");
const location_not_found = document.querySelector(".location-not-found");
const loadingText = document.querySelector(".loading");

const temperature = document.querySelector(".temperature");
const description = document.querySelector(".description");
const humidity = document.getElementById("humidity");
const wind_speed = document.getElementById("wind-speed");

const inputBox = document.querySelector(".input-box");
const searchBtn = document.getElementById("searchBtn");

// button click
searchBtn.addEventListener("click", () => {
  if (inputBox.value !== "") {
    checkWeather(inputBox.value);
  }
});

// enter key
inputBox.addEventListener("keypress", (e) => {
  if (e.key === "Enter" && inputBox.value !== "") {
    checkWeather(inputBox.value);
  }
});

async function checkWeather(city) {
  // show loading
  loadingText.style.display = "block";
  weather_body.style.display = "none";
  location_not_found.style.display = "none";

  try {
    const response = await fetch(
      `http://localhost:5000/api/weather?city=${city}`
    );

    if (!response.ok) {
      loadingText.style.display = "none";
      location_not_found.style.display = "block";
      return;
    }

    const data = await response.json();

    // hide loading
    loadingText.style.display = "none";

    // show weather
    weather_body.style.display = "flex";

    temperature.innerHTML =
      `${Math.round(data.main.temp - 273.15)} <sup>°C</sup>`;
    description.innerHTML = data.weather[0].description;
    humidity.innerHTML = `${data.main.humidity}%`;
    wind_speed.innerHTML = `${data.wind.speed} Km/H`;

  } catch (error) {
    loadingText.style.display = "none";
    location_not_found.style.display = "block";
    weather_body.style.display = "none";
  }
}
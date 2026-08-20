const WEATHER_THEMES = {
  clear: { icon: "☀️", color: "#87ceeb", label: "Clear" },
  cloudy: { icon: "☁️", color: "#b0b0b0", label: "Cloudy" },
  rain: { icon: "🌧️", color: "#4a6572", label: "Rain" },
  snow: { icon: "❄️", color: "#e0f7fa", label: "Snow" },
  storm: { icon: "⛈️", color: "#37474f", label: "Storm" },
  night: { icon: "🌙", color: "#1a1a2e", label: "Clear Night" },
};

function getWeatherCategory(weathercode, isDay) {
  if (weathercode === 0 && !isDay) return "night";
  if (weathercode === 0 || weathercode === 1) return "clear";
  if (weathercode === 2 || weathercode === 3) return "cloudy";
  if (weathercode >= 51 && weathercode <= 67) return "rain";
  if (weathercode >= 71 && weathercode <= 77) return "snow";
  if (weathercode >= 80 && weathercode <= 82) return "rain";
  if (weathercode >= 95) return "storm";
  return "cloudy";
}

const searchForm = document.getElementById("search-form");
const cityInput = document.getElementById("city-input");
const statusText = document.getElementById("status-text");
const weatherDisplay = document.getElementById("weather-display");
const weatherIcon = document.getElementById("weather-icon");
const temperatureText = document.getElementById("temperature-text");
const conditionText = document.getElementById("condition-text");
const colorInput = document.getElementById("color-input");
const resetBtn = document.getElementById("reset-btn");

let autoColor = null;
let overrideActive = false;

async function getCoordinates(city) {
  const response = await fetch(
    `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1`
  );
  if (!response.ok) throw new Error("Geocoding request failed");

  const data = await response.json();
  if (!data.results || data.results.length === 0) {
    throw new Error("City not found");
  }

  const { latitude, longitude, name } = data.results[0];
  return { latitude, longitude, name };
}

async function getWeather(latitude, longitude) {
  const response = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
  );
  if (!response.ok) throw new Error("Weather request failed");

  const data = await response.json();
  return data.current_weather;
}

function applyTheme(category) {
  const theme = WEATHER_THEMES[category];
  autoColor = theme.color;
  weatherIcon.textContent = theme.icon;
  conditionText.textContent = theme.label;

  if (!overrideActive) {
    document.body.style.background = autoColor;
  }
}

searchForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  statusText.textContent = "Loading weather...";
  weatherDisplay.classList.add("hidden");

  try {
    const { latitude, longitude, name } = await getCoordinates(cityInput.value);
    const weather = await getWeather(latitude, longitude);
    const category = getWeatherCategory(weather.weathercode, weather.is_day === 1);

    applyTheme(category);
    temperatureText.textContent = `${name}: ${weather.temperature}°C`;

    statusText.textContent = "";
    weatherDisplay.classList.remove("hidden");
  } catch (err) {
    statusText.textContent = err.message || "Something went wrong. Please try again.";
  }
});

colorInput.addEventListener("input", () => {
  overrideActive = true;
  document.body.style.background = colorInput.value;
});

resetBtn.addEventListener("click", () => {
  overrideActive = false;
  if (autoColor) {
    document.body.style.background = autoColor;
  }
});

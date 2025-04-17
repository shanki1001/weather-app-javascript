const apiKey = "3aa79a732be5389353371e7450ddd4a1";

const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");
const weatherInfo = document.getElementById("weatherInfo");
const errorMsg = document.getElementById("error");

const cityName = document.getElementById("cityName");
const description = document.getElementById("description");
const temperature = document.getElementById("temperature");
const weatherIcon = document.getElementById("weatherIcon");

searchBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();
  if (city === "") {
    showError("Please enter a city name.");
    return;
  }

  // Clear previous data
  weatherInfo.classList.add("hidden");
  errorMsg.classList.add("hidden");

  // Build API URL
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  // Fetch weather data
  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("City not found");
      }
      return response.json();
    })
    .then((data) => {
      // Update UI with data
      cityName.textContent = data.name;
      description.textContent = data.weather[0].description;
      temperature.textContent = `${data.main.temp} °C`;
      weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
      weatherIcon.alt = data.weather[0].description;

      weatherInfo.classList.remove("hidden");
    })
    .catch((error) => {
      showError(error.message);
    });
});

function showError(message) {
  errorMsg.textContent = message;
  errorMsg.classList.remove("hidden");
}

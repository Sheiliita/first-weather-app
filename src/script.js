// variables
let date = new Date();

let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let currentDay = days[date.getDay()];
let currentHours = date.getHours();
let currentMinutes = date.getMinutes();

let currentDate = document.querySelector("#day");
currentDate.innerHTML = `${currentDay} ${currentHours}:${currentMinutes}`;
let searchInput = document.querySelector("#search-box");
let currentCity = document.querySelector("#city");

let tempFahrenheit = document.querySelector("#to-f");
let fahrenheitTemp = null;
let tempCelsius = document.querySelector("#to-c");

let currentTemperature = document.querySelector("#temperature");
let apiKey = "b2ef35a4ca3a9550a2888bed0b3cf675";

let currentButton = document.querySelector("#current-temp");
let form = document.querySelector("#search-form");

// Event Listeners
tempCelsius.addEventListener("click", toCelsius);
tempFahrenheit.addEventListener("click", toFahrenheit);
currentButton.addEventListener("click", getGeoPosition);
form.addEventListener("submit", showCity);

// Functions

function toCelsius() {
  // let tempNum = parseInt(currentTemperature.innerHTML);
  let result = Math.round((fahrenheitTemp - 32) * (5 / 9));
  currentTemperature.innerHTML = result;

  let active = document.querySelector(".units a.active");
  active.classList.remove("active");
  tempCelsius.classList.add("active");
}

function toFahrenheit() {
  console.log(currentTemperature.innerHTML);
  currentTemperature.innerHTML = fahrenheitTemp;

  let active = document.querySelector(".units a.active");
  active.classList.remove("active");
  tempFahrenheit.classList.add("active");
}

function getGeoPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "imperial";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayWeatherData);
}

function displayWeatherData(response) {
  let currentTemp = Math.round(response.data.main.temp);
  fahrenheitTemp = currentTemp;
  let currentName = response.data.name;
  let humidity = response.data.main.humidity;
  let wind = response.data.wind.speed;
  let weather = response.data.weather[0].main;
  let tempMin = Math.round(response.data.main.temp_min);
  let tempMax = Math.round(response.data.main.temp_max);
  document.querySelector(".min-max").innerHTML = `Min ${tempMin}° • Max ${tempMax}°`;
  document.querySelector("#current-conditions .features").innerHTML = `Humidity: ${humidity} % • Wind: ${wind} mph`;
  document.querySelector(".temperature .main-weather").innerHTML = weather;
  currentTemperature.innerHTML = currentTemp;
  currentCity.innerHTML = currentName;
}

function showCity(event) {
  event.preventDefault();
  if (searchInput.value) {
    let city = searchInput.value;
    search(city);
  }
}

function search(city) {
  let units = "imperial";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayWeatherData);
}

// Call / Test
search("Jacksonville");

// Challenge - Week 4
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
let tempCelsius = document.querySelector("#to-c");
tempCelsius.addEventListener("click", toCelsius);
tempFahrenheit.addEventListener("click", toFahrenheit);

let currentTemperature = document.querySelector("#temperature");
let tempNum = parseInt(currentTemperature.innerHTML);

function toCelsius() {
  let result = Math.round((tempNum - 32) * (5 / 9));
  currentTemperature.innerHTML = result;
}

function toFahrenheit() {
  console.log(currentTemperature.innerHTML);
  currentTemperature.innerHTML = tempNum;
}

// Challenge - Week 5
let apiKey = "b2ef35a4ca3a9550a2888bed0b3cf675";

let currentButton = document.querySelector("#current-temp");
currentButton.addEventListener("click", getGeoPosition);

function getGeoPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(getWeatherData);
}

function getWeatherData(response) {
  console.log(response);

  let currentTemp = Math.round(response.data.main.temp);
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
  console.log(weather);
}

function showCity(event) {
  event.preventDefault();
  if (searchInput.value) {
    let city = searchInput.value;
    let units = "metric";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
    axios.get(apiUrl).then(getWeatherData);
  }
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", showCity);

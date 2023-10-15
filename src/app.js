function timeFormat(timeStamp) {
  let date = new Date(timeStamp);
  let day = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  day = days[day];

  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }

  return `${day} ${hours}:${minutes}`;
}

function displayWeatherCondition(response) {
  console.log(response);
  let cityElement = document.querySelector("h1");
  cities = response.data.city;
  cityElement.innerHTML = `${cities}`;

  weatherTime = document.querySelector("#time");
  weatherTime.innerHTML = timeFormat(response.data.time * 1000);

  let descriptionElement = document.querySelector("#description");
  let weatherDescription = response.data.condition.description;
  descriptionElement.innerHTML = weatherDescription;

  let iconHtml = document.querySelector("#weather-icon");
  iconHtml.setAttribute("src", response.data.condition.icon_url);

  let temperatureElement = document.querySelector("#temperature");
  let temperature = celsius;
  temperatureElement.innerHTML = temperature;

  temperatureElement = document.querySelector("#temperature");
  celsius = Math.round(response.data.temperature.current);
  temperatureElement.innerHTML = celsius;
}
function searchCity(city) {
  let apiKey = "93cf0a589b1befff9b43f05fbt79bo02";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&unit=metric`;

  axios.get(apiUrl).then(displayWeatherCondition);
}

function searchFahreheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  let fahreheit = Math.round((celsius * 9) / 32);
  temperatureElement.innerHTML = fahreheit;
}

function searchCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = celsius;
}

let celsius = null;

function handleSubmit(event) {
  event.preventDefault();
  let inputCity = document.querySelector("#input-text");
  searchCity(inputCity.value);
}

let fahElement = document.querySelector("#fahreheit-link");
fahElement.addEventListener("click", searchFahreheit);

celsius = document.querySelector("#celsius-link");
celsius.addEventListener("click", searchCelsius);

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);
searchCity("lagos");

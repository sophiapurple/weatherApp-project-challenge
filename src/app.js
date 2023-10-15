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
}
function searchCity(city) {
  let apiKey = "93cf0a589b1befff9b43f05fbt79bo02";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&unit=metric`;

  axios.get(apiUrl).then(displayWeatherCondition);
}
function handleSubmit(event) {
  event.preventDefault();
  let inputCity = document.querySelector("#input-text");
  searchCity(inputCity.value);
}
let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);
searchCity("lagos");

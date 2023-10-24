function formatDate(timeStamp) {
  let date = new Date(timeStamp * 1000);
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

  let hour = date.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day} ${hour} : ${minutes}`;
}

function formatDay(timeStamp) {
  let day = new Date(timeStamp * 1000);
  day = day.getDay();
  let days = ["Sun", "Mon", " Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function displayForcast(response) {
  let forcast = response.data.daily;
  console.log(forcast);
  let forcastElement = document.querySelector("#forcast-link");
  futureForcastHtml = ` <div class="row">`;
  forcast.forEach(function (forcastDay, index) {
    if (index < 6) {
      futureForcastHtml += ` 
      <div class="col-2">
    <div class="weatherDate">${formatDay(forcastDay.time)}</div>
        <img src=${forcastDay.condition.icon_url}
        } class="weather-forcast-image" alt="" />
       
        <div class="weatherForcastTemperature">
          <span class="weather-forcast-max">${Math.round(
            forcastDay.temperature.maximum
          )}°</span>
          <span class="weather-forcast-min">${Math.round(
            forcastDay.temperature.minimum
          )}°</span>
          <div class="temp">${getFahrient(forcastDay.temperature)}°F</div>
        </div>
        </div>
        
`;
    }
  });
  futureForcastHtml += `</div>`;
  forcastElement.innerHTML = futureForcastHtml;
}

function getFahrient(response) {
  let dailyTemp = response.day;

  console.log(response);

  let dailyFahreient = Math.round((dailyTemp * 9) / 5 + 32);

  return dailyFahreient;
}

function getForcast(coordinates) {
  console.log(coordinates);

  let apiKey = "93cf0a589b1befff9b43f05fbt79bo02";
  let urlApiKey = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${apiKey}&units=metric`;

  console.log(urlApiKey);
  axios.get(urlApiKey).then(displayForcast);
}

// function getTemp(response) {
//   let tempElement = document.querySelector("#temperature");

//   tempElement.innerHTML = Math.round(celsius);

//   celsius = response.data.temperature.current;
//   let celsiusTemp = document.querySelector("#temperature");
//   celsiusTemp.innerHTML = Math.round(celsius);
// }

function displayLocation(response) {
  let locationElement = document.querySelector("#location");
  locationElement.innerHTML = response.data.city;
}
function displayWeatherCondition(response) {
  console.log(response);

  let tempElement = document.querySelector("#temperature");

  tempElement.innerHTML = Math.round(celsius);

  celsius = response.data.temperature.current;
  let celsiusTemp = document.querySelector("#temperature");
  celsiusTemp.innerHTML = Math.round(celsius);

  let city = document.querySelector("h1");
  city.innerHTML = response.data.city;

  let date = document.querySelector("#time");
  date.innerHTML = formatDate(response.data.time);

  let descriptionElement = document.querySelector("#description");
  let description = response.data.condition.description;
  descriptionElement.innerHTML = description;

  let imageElement = document.querySelector("#weather-icon");
  imageElement.setAttribute("src", response.data.condition.icon_url);

  let humidityElement = document.querySelector("#humidity");
  let humidity = response.data.temperature.humidity;
  humidityElement.innerHTML = `Humidity: ${Math.round(humidity)}%`;

  let windElement = document.querySelector("#wind");
  let wind = response.data.wind.speed;
  windElement.innerHTML = `Wind: ${Math.round(wind)}km/h`;

  //getTemp(response);
  getForcast(response.data.coordinates);
  displayLocation(response);
}

function searchCity(city) {
  let apiKey = "93cf0a589b1befff9b43f05fbt79bo02";
  let urlApiKey = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  axios.get(urlApiKey).then(displayWeatherCondition);
}
function displayFahreheit(event) {
  event.preventDefault();
  let fahElement = document.querySelector("#temperature");
  let fahreheit = (celsius * 9) / 5 + 32;
  fahElement.innerHTML = Math.round(fahreheit);
}

function displayCelsius(event) {
  event.preventDefault();
  tempElement = document.querySelector("#temperature");
  tempElement.innerHTML = Math.round(celsius);
}
function findCurrentLocation(coordinates) {
  let apiKey = "93cf0a589b1befff9b43f05fbt79bo02";
  let urlApiKey = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${apiKey}&units=metric`;

  axios.get(urlApiKey).then(displayWeatherCondition);
}
function getNavigation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(displayLocation);
}
function handleSubmit(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#input-text");
  searchCity(cityInput.value);
}

let celsiusElement = document.querySelector("#celsius-link");
celsiusElement.addEventListener("click", displayCelsius);

let fahElement = document.querySelector("#fahreheit-link");
fahElement.addEventListener("click", displayFahreheit);

let formNav = document.querySelector("#form-nav");
formNav.addEventListener("submit", getNavigation);

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let celsius = null;

searchCity("lagos");

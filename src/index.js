let now = new Date();
function formatDate() {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let day = days[now.getDay()];
  let month = months[now.getMonth()];
  let date = now.getDate();
  let formatedDate = `${day}, ${month} ${date}`;
  return formatedDate;
}
function formatTime() {
  let hour = now.getHours();
  let minute = now.getMinutes();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  if (minute < 10) {
    minute = `0${minute}`;
  }
  let formatedTime = `${hour}:${minute}`;
  return formatedTime;
}
let currentDate = document.querySelector("div.current-date");
currentDate.innerHTML = formatDate();
let currentTime = document.querySelector("div.current-time");
currentTime.innerHTML = formatTime();

function submitCity(event) {
  event.preventDefault();
  let city = document.querySelector("#cityInput");
  city.value = city.value.trim();
  let cityName = city.value;
  retrieveCityInfo(cityName);
}
function submitKyiv(event) {
  event.preventDefault();
  retrieveCityInfo("Kyiv");
}
function submitLondon(event) {
  event.preventDefault();
  retrieveCityInfo("London");
}
function submitNewYork(event) {
  event.preventDefault();
  retrieveCityInfo("New York");
}
function submitTokio(event) {
  event.preventDefault();
  retrieveCityInfo("Tokio");
}
function retrieveCityInfo(cityName) {
  let apiKey = `932dccfce347762cffb3c2a4870d3177`;
  let unit = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(displayInfo);
}

function findCurrentLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = `932dccfce347762cffb3c2a4870d3177`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayInfo);
}
function getLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(findCurrentLocation);
}
function formatDaysForecast(timestamp) {
  let date = new Date(timestamp * 1000);
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

  return days[day];
}
function formatDatesForecast(timestamp) {
  let forecastDate = new Date(timestamp * 1000);
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let month = months[forecastDate.getMonth()];
  let date = forecastDate.getDate();
  let formatedDate = `${month}, ${date}`;
  return formatedDate;
}
function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<ul class="forecast-calendar">`;
  forecast.forEach(function (forecastDay, index) {
    forecastMaxTemp = forecastDay.temp.max;
    forecastMinTemp = forecastDay.temp.min;
    if ((index > 0) & (index < 7)) {
      forecastHTML =
        forecastHTML +
        `
  <li class="forcast-everyday">
              <div class="week-day details">${formatDaysForecast(
                forecastDay.dt
              )}</div>
              <div class="date details">${formatDatesForecast(forecastDay.dt)}
              </div>
              <img src="https://openweathermap.org/img/wn/${
                forecastDay.weather[0].icon
              }@2x.png" alt="" class="details" />
              <div>
              <span class="night-temp details">
                <span class="tempValue">${Math.round(forecastMinTemp)}
                </span>
                <span class="measureSystem">°</span>
              </span>
              <span class="day-temp details">
                <span class="tempValue">${Math.round(forecastMaxTemp)}
                </span>
                <span class="measureSystem">°</span>
              </span>
              
              </div>
            </li>`;
    }
  });

  forecastHTML = forecastHTML + `</ul>`;
  forecastElement.innerHTML = forecastHTML;
}
function getForecast(coordinates) {
  let apiKey = `932dccfce347762cffb3c2a4870d3177`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayInfo(response) {
  let mainCity = document.querySelector("h1");
  mainCity.innerHTML = response.data.name.toUpperCase();
  let tempValue = document.querySelector("span.tempValue");
  tempValue.innerHTML = Math.round(response.data.main.temp);
  let currentMinTemp = document.querySelector("#minTemp");
  currentMinTemp.innerHTML = Math.round(response.data.main.temp_min);
  let currentMaxTemp = document.querySelector("#maxTemp");
  currentMaxTemp.innerHTML = Math.round(response.data.main.temp_max);
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = Math.round(response.data.main.humidity);
  let windSpeed = document.querySelector("#wind");
  windSpeed.innerHTML = Math.round(response.data.wind.speed);
  let description = document.querySelector("#description");
  description.innerHTML = response.data.weather[0].description;
  let centralImg = document.querySelector("img.central-img");
  centralImg.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  getForecast(response.data.coord);
}
document.querySelector("#kyiv").addEventListener("click", submitKyiv);
document.querySelector("#london").addEventListener("click", submitLondon);
document.querySelector("#new-york").addEventListener("click", submitNewYork);
document.querySelector("#tokio").addEventListener("click", submitTokio);
let form = document.querySelector("form");
form.addEventListener("submit", submitCity);

let currentButton = document.querySelector("#currentButton");
currentButton.addEventListener("click", getLocation);

retrieveCityInfo("Kyiv");

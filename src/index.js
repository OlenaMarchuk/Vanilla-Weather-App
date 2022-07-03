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
function displayInfo(response) {
  let mainCity = document.querySelector("h1");
  mainCity.innerHTML = response.data.name.toUpperCase();
  let tempValue = document.querySelector("span.tempValue");
  tempValue.innerHTML = Math.round(response.data.main.temp);
  let currentMinTemp = document.querySelector("#minTemp");
  currentMinTemp.innerHTML = Math.round(response.data.main.temp_min);
  let currentMaxTemp = document.querySelector("#maxTemp");
  currentMaxTemp.innerHTML = Math.round(response.data.main.temp_max);
  //let precipitation = document.querySelector("#precipitation");
  //precipitation.innerHTML = Math.round(response.data....); (i didn't find this data in Openweather)
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = Math.round(response.data.main.humidity);
  let windSpeed = document.querySelector("#wind");
  windSpeed.innerHTML = Math.round(response.data.wind.speed);
  let description = document.querySelector("#description");
  description.innerHTML = response.data.weather[0].description;
}
let form = document.querySelector("form");
form.addEventListener("submit", submitCity);

let currentButton = document.querySelector("#currentButton");
currentButton.addEventListener("click", getLocation);

retrieveCityInfo("Kyiv");

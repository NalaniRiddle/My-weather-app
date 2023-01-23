/// current date and time
function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

/// Display
function showWeather(response) {
  let tempElement = document.querySelector("#main-temp");
  tempElement.innerHTML = Math.round(response.data.main.temp);

  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.name;

  let description = document.querySelector("#decription");
  description.innerHTML = response.data.weather[0].description;

  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = response.data.main.humidity;

  let wind = document.querySelector("#wind");
  wind.innerHTML = Math.round(response.data.wind.speed);

  let dateElement = document.querySelector("#date");
  dateElement.innerHTML = formatDate(response.data.dt * 1000);

  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}

function search(city){
  let apiKey = `369496079cb0740e8e8eb63feb92a9f7`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&units=imperial&appid=${apiKey}`;
  axios.get(apiUrl).then(showWeather);
}

/// Name of the city -> search
function handleSubmit(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#search-city");
  search(cityInput.value);
}


search("Phoenix");

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit)


/// current geo - lat and lon
function currentLocation(position) {
  let apiKey = "369496079cb0740e8e8eb63feb92a9f7";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;
  axios.get(apiUrl).then(showWeather);
}

function getcurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(currentLocation);
}
let locationButton = document.querySelector("#current-location");
locationButton.addEventListener("click", getcurrentLocation);

/// changing the city
function weatherLocation(response) {
  let searchTemp = document.querySelector("#main-temp");
  let temperature = Math.round(response.data.main.temp);
  searchTemp.innerHTML = `${temperature}`;
  let description = document.querySelector("#description");
  description.innerHTML = response.data.weather[0].description;
}


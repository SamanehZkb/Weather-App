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
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
let now = new Date();
let today = days[now.getDay()];
let thisMonth = months[now.getMonth()];
let Day = document.querySelector("#day");
let time = document.querySelector("#time");
let date = document.querySelector("#date");
Day.innerHTML = today;
time.innerHTML = `${now.getHours()} : ${now.getMinutes()}`;
date.innerHTML = `${now.getDate()} ${thisMonth} ${now.getFullYear()}`;
let city = document.querySelector("#title");
let cityinput = document.querySelector("#search-input");

function change(event) {
  event.preventDefault();
  cityinputvalue = cityinput.value;
  search(cityinputvalue);
}

function showWeather(response) {
  console.log(response);
  cityinputvalue = response.data.name;
  city.innerHTML = cityinputvalue;
  let Temperature = document.querySelector("#degree");
  let temp = Math.round(response.data.main.temp);
  Temperature.innerHTML = temp;
  let feels = document.querySelector(".feels");
  feelslike = Math.round(response.data.main.feels_like);
  feels.innerHTML = `Feels like ${feelslike}°`;
  let humidity = document.querySelector(".humidity");
  let hum = Math.round(response.data.main.humidity);
  humidity.innerHTML = `Humidity:  ${hum}%`;
  let wind = document.querySelector(".wind");
  let windvalue = Math.round(response.data.wind.speed);
  wind.innerHTML = `Wind:  ${windvalue} km/h`;
  let sky = document.querySelector(".skymood");
  let skymoodvalue = response.data.weather[0].main;
  sky.innerHTML = `${skymoodvalue}`;
  let skyimage = document.querySelector(".skyimage");
  let skyvalue = response.data.weather[0].icon;
  console.log(skyimage);
  skyimage.setAttribute(
    `src`,
    `http://openweathermap.org/img/wn/${skyvalue}@2x.png`
  );
}

function getPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "2980ff43226d67e53abfcdb6d457dcc8";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiURL).then(showWeather);
}
function search(nameinput) {
  cityinputvalue = `${nameinput}`;
  let apiKey = "2980ff43226d67e53abfcdb6d457dcc8";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityinputvalue}&appid=${apiKey}&units=metric`;
  axios.get(apiURL).then(showWeather);
}

function showCurrentweather(event) {
  event.preventDefault();
  cityinputvalue = cityinput.value;
  city.innerHTML = `${cityinputvalue}`;
  navigator.geolocation.getCurrentPosition(getPosition);
}

let current = document.querySelector("#current");
current.addEventListener("click", showCurrentweather);
let form = document.querySelector("#search-city");
form.addEventListener("submit", change);

let Celsius = document.querySelector("#Celsius");
let Fahrenheit = document.querySelector("#Fahrenheit");
let Temperature = document.querySelector("#degree");

search("Tehran");

//function changeCelsius(event) {
// event.preventDefault();
// Temperature.innerHTML = `7`;
// feels.innerHTML = `Feels like 6°`;
//}
//Celsius.addEventListener(`click`, changeCelsius);

//function changeFahrenheit(event) {
// event.preventDefault();
//  Temperature.innerHTML = `45`;
// feels.innerHTML = `Feels like 43°`;
//}
//Fahrenheit.addEventListener(`click`, changeFahrenheit);

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

let city = document.querySelector("#title");
let cityinput = document.querySelector("#search-input");

function change(event) {
  event.preventDefault();
  cityinputvalue = cityinput.value;
  search(cityinputvalue);
  getForcast(cityinputvalue);
}

function showWeather(response) {
  cityinputvalue = response.data.city;
  city.innerHTML = cityinputvalue;
  CelsiusTempreture = Math.round(response.data.temperature.current);
  Temperature.innerHTML = CelsiusTempreture;
  feelslike = Math.round(response.data.temperature.feels_like);
  feels.innerHTML = `Feels like ${feelslike}°`;
  let humidity = document.querySelector(".humidity");
  let hum = Math.round(response.data.temperature.humidity);
  humidity.innerHTML = `Humidity:  ${hum}%`;
  let wind = document.querySelector(".wind");
  let windvalue = Math.round(response.data.wind.speed);
  wind.innerHTML = `Wind:  ${windvalue} m/h`;
  let sky = document.querySelector(".skymood");
  let skymoodvalue = response.data.condition.description;
  sky.innerHTML = `${skymoodvalue}`;
  let skyimage = document.querySelector(".skyimage");
  let skyvalue = response.data.condition.icon_url;
  skyimage.setAttribute(`alt`, `${skymoodvalue}`);
  skyimage.setAttribute(`src`, `${skyvalue}`);
  let now = new Date(response.data.time * 1000);
  let today = days[now.getDay()];
  let thisMonth = months[now.getMonth()];
  let Day = document.querySelector("#day");
  let current = document.querySelector("#time");
  let date = document.querySelector("#date");
  Day.innerHTML = today;
  let minute = now.getMinutes();
  let hours = now.getHours();
  if (minute < 10) {
    minute = `0${now.getMinutes()}`;
  }
  if (hours < 10) {
    hours = `0${now.getHours()}`;
  }
  current.innerHTML = `${hours} : ${minute}`;
  date.innerHTML = `${now.getDate()} ${thisMonth} ${now.getFullYear()}`;
}

function getPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "o6e634db6050ata4f8132e3ce4047d3a";
  let apiURL = `https://api.shecodes.io/weather/v1/current?lon=${lon}&lat=${lat}&key=${apiKey}&units=metric`;
  axios.get(apiURL).then(showWeather);
}
function search(nameinput) {
  cityinputvalue = `${nameinput}`;
  let apiKey = "o6e634db6050ata4f8132e3ce4047d3a";
  let apiURL = `https://api.shecodes.io/weather/v1/current?query=${cityinputvalue}&key=${apiKey}&units=metric`;
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
let feels = document.querySelector(".feels");
let CelsiusTempreture = null;
let feelslike = null;

function changeCelsius(event) {
  event.preventDefault();
  Temperature.innerHTML = `${CelsiusTempreture}`;
  feels.innerHTML = `Feels like ${feelslike}°`;
  Fahrenheit.classList.remove("active");
  Celsius.classList.add("active");
}
Celsius.addEventListener(`click`, changeCelsius);

function changeFahrenheit(event) {
  event.preventDefault();
  Temperature.innerHTML = Math.round(CelsiusTempreture * 1.8 + 32);
  feels.innerHTML = `Feels like ${Math.round(feelslike * 1.8 + 32)}°`;
  Celsius.classList.remove("active");
  Fahrenheit.classList.add("active");
}
Fahrenheit.addEventListener(`click`, changeFahrenheit);

function displayforcast(response) {
  forcastdays = response.data.daily;

  let PredictedWeatherelement = document.querySelector("#predicted-weather");
  let PredictedWeather = `<div class="row g-1">`;

  forcastdays.slice(1, 6).forEach(function (i) {
    let day = days[new Date(i.time * 1000).getDay()];
    day = day.split(``, 3).join(``);

    let img = i.condition.icon_url;
    let skyvalue = i.condition.description;
    let min = Math.round(i.temperature.minimum);
    let max = Math.round(i.temperature.maximum);
    PredictedWeather =
      PredictedWeather +
      `
    <div class="col">
                  <div
                    class="card border border-dark day bg-transparent border-opacity-25 shadow-sm  bg-body rounded"
                  >
                    <div class="card-body pt-0 pb-1">
                      <img
                        src=${img}
                        alt=${skyvalue}
                        width="70px"
                      />
                      <div class="predicted-degree">
                        <span class="max">${max}<sup>°</sup></span>
                        <span class="min">${min}<sup>°</sup></span>
                        <hr />
                        ${day}
                      </div>
                    </div>
                  </div>
                </div>`;
  });

  PredictedWeather = PredictedWeather + `</div>`;
  PredictedWeatherelement.innerHTML = PredictedWeather;
}
function getForcast(nameinput) {
  cityinputvalue = `${nameinput}`;
  let apiKey = "o6e634db6050ata4f8132e3ce4047d3a";
  let apiURL = `https://api.shecodes.io/weather/v1/forecast?query=${cityinputvalue}&key=${apiKey}`;

  axios.get(apiURL).then(displayforcast);
}
search("Tehran");
getForcast("Tehran");

import { key } from "./key.js";

const classes = (classes) => document.querySelector(classes);

const api = {
  key: key,
  base: "https://api.openweathermap.org/data/2.5/",
};

const dateBuilder = (d) => {
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
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day} ${date} ${month} ${year}`;
};

const displyResults = (weather) => {
  let city = classes(".city-name");
  city.innerHTML = `${weather.name}, ${weather.sys.country}`;

  let now = new Date();
  let date = classes(".date");
  date.innerHTML = dateBuilder(now);

  let temp = classes(".temp");
  temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;

  let weath = classes(".weather");
  weath.innerHTML = weather.weather[0].main;

  let hiLow = classes(".hi-low");
  hiLow.innerHTML = `${Math.round(weather.main.temp_min)}°c/${Math.round(
    weather.main.temp_max
  )}°c`;
};

const getResults = (cityName) => {
  fetch(`${api.base}weather?units=metric&q=${cityName}&appid=${api.key}`)
    .then((resp) => {
      return resp.json();
    })
    .then(displyResults)
    .catch((err) => {
      console.log(err);
    });
};

const setQuery = (event) => {
  if (event.keyCode === 13) {
    getResults(searchBox.value);
  }
};

const searchBox = classes(".search-box");
searchBox.addEventListener("keypress", setQuery);

// default city
document.addEventListener("DOMContentLoaded", () => {
  getResults("london");
  navigator.geolocation.getCurrentPosition(function (position) {
    console.log("Geolocation permissions granted");
    console.log("Latitude:" + position.coords.latitude);
    console.log("Longitude:" + position.coords.longitude);
  });
});

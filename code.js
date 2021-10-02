import { key } from "./key.js";

const classes = classes => document.querySelector(classes);

const api = {
    key: key,
    base: 'http://api.weatherapi.com/v1/'
}

const dateBuilder = (d) => {
    let months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ];
    let days = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
}

const displyResults = (weather) => {

    let city = classes('.city-name');
    city.innerHTML = `${weather.location.name}, ${weather.location.country}`;

    let now = new Date();
    let date = classes('.date');
    date.innerHTML = dateBuilder(now);

    let temp = classes('.temp');
    temp.innerHTML = `${Math.round(weather.current.temp_c)}<span>°c</span>`

    let weath = classes('.weather');
    weath.innerHTML = weather.current.condition.text;


    let icon = classes('.icon');
    icon.src = `http:${weather.current.condition.icon}`;
}

const getResults = (cityName) => {
    fetch(`${api.base}current.json?key=${api.key}&q=${cityName}&aqi=no`)
        .then(resp => {
            return resp.json();
        })
        .then(displyResults)
        .catch(err => {
            console.log(err);
        })
}

const setQuery = (event) => {
    if (event.keyCode === 13) {
        getResults(searchBox.value);
    }
}

const searchBox = classes('.search-box');
searchBox.addEventListener('keypress', setQuery);

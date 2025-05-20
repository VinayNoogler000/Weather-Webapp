import { config } from "../config.js";
const API_KEY = config.API_KEY; //Open-Weather-Map API Key 

// Select the required DOM elements:
const tempCelsiusBtn = document.querySelector('.temp-in-celsius');
const tempFahrenheitBtn = document.querySelector(".temp-in-fahrenheit");
const searchForm = document.querySelector(".search-form");
const searchInputEl = document.querySelector("#search-input");

// Function to toggle temperature units:
function toggleTemperatureUnits(tempUnitBtn) {
    //when user is trying to toggle temperature unit, which is already toggled:
    if (tempUnitBtn.classList.contains("active")) { 
        return;
    }
    else { //toggle or change to the temperature unit, if not toggled:
        tempCelsiusBtn.classList.toggle("active");
        tempFahrenheitBtn.classList.toggle("active");
    }
}

// Function to get the geo co-ordinates (latitudes & longitudes) of a named location:
async function getGeoCoordinates(location) {
    const URL = "https://api.openweathermap.org/geo/1.0/direct?"; //GeoCoder API's Endpoint of Open-Weather-Map
    try {
        const response = await fetch(URL + `q=${location}&limit=1&appid=${API_KEY}`);
        const data = await response.json();
        return data[0];
    }
    catch (error) {
        console.log("Error in fetching the co-ordinates of the user-entered location.\n", error);
    }
}

// Function to get weather data by the co-ordinates of the location, entered by the user:
async function getWeatherData(lat, lon) {
    const API_URL = "https://api.openweathermap.org/data/2.5/weather?"; //Open-Weather-Map API URL
    try {
        let response = await fetch(API_URL + `lat=${lat}&lon=${lon}&units=metric&lang=en&appid=${API_KEY}`);
        let data = await response.json();
        return data;
    }
    catch (error) {
        console.log("Error in fetching weather data of the location, by its coordinates.\n", error);
    }
}

// Function to render the weather-data of the user-entered location:
function renderWeatherData(name, state) {
    // select location name element and replace it's content with the new location name:
    const locationEl = document.querySelector(".location");
    locationEl.textContent = `${name}, ${state}`;
}

// Function to get weather data of the user-entered location:
async function handleLocationWeatherSearch(event) {
    // prevent the default behaviour of form element:
    event.preventDefault();

    // get the location entered by the user:
    let location = searchInputEl.value;

    // get the co-ordinates of the location:
    getGeoCoordinates(location)
        .then( data => {
            // get the name and state of the location to display in the "main-weather-card"
            let {name, state, lat, lon} = data; 
            
            // update the name and state of location in the "main-weather" card
            renderWeatherData(name, state);

            // get the weather data by the co-ordinates of the location:
            // return getWeatherData(lat, lon);
        })
        .then( data => {
            console.log(data);
        })
        .catch(error => console.log(error));
}

// Add click event listener to both temperature unit buttons:
tempCelsiusBtn.addEventListener("click", () => toggleTemperatureUnits(tempCelsiusBtn));
tempFahrenheitBtn.addEventListener("click", () => toggleTemperatureUnits(tempFahrenheitBtn));

// Send a request to open-weather-map API
searchForm.addEventListener("submit", handleLocationWeatherSearch)
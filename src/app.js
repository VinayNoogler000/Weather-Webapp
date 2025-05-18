const API_KEY = "fb909bb33c68a62650d566b60fc8b778"; //Open-Weather-Map API Key 

// Select the required DOM elements:
const tempCelsiusBtn = document.querySelector('.temp-in-celsius');
const tempFahrenheitBtn = document.querySelector(".temp-in-fahrenheit");
const searchForm = document.querySelector(".search-form");
const searchInputEl = document.querySelector("#search-input");
const searchBtn = document.querySelector("#search-btn");

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
    try {
        const response = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=${API_KEY}`);
        const data = await response.json();
        return data[0];
    }
    catch (error) {
        console.log(error);
    }
}

// Function to get weather data of the user-entered location:
function getWeatherData(event) {
    // prevent the default behaviour of form element:
    event.preventDefault();

    // get the location entered by the user:
    let location = searchInputEl.value;

    // get the co-ordinates of the location:
    getGeoCoordinates(location)
        .then( data => {
            // print the fetched co-ordinates of the location:
            console.log(data.name, data.state, data.lat, data.lon);
        })
        .catch(error => console.log(error));
}

// Add click event listener to both temperature unit buttons:
tempCelsiusBtn.addEventListener("click", () => toggleTemperatureUnits(tempCelsiusBtn));
tempFahrenheitBtn.addEventListener("click", () => toggleTemperatureUnits(tempFahrenheitBtn));

// Send a request to open-weather-map API
searchForm.addEventListener("submit", getWeatherData)
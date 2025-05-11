const tempCelsiusBtn = document.querySelector('.temp-in-celsius');
const tempFahrenheitBtn = document.querySelector(".temp-in-fahrenheit");

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

// Add click event listener to both temperature unit buttons:
tempCelsiusBtn.addEventListener("click", () => toggleTemperatureUnits(tempCelsiusBtn));
tempFahrenheitBtn.addEventListener("click", () => toggleTemperatureUnits(tempFahrenheitBtn));
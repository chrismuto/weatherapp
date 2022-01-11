var searchInput = document.querySelector("#search-input");
var submitBtn = document.querySelector("#submitBtn");
var cityList = document.querySelector("#cityList");
var newCity;
var newDiv;
var newA;

//this function takes the name of the last city inputted and adds it to the list along with the API link(?)(replace #placeholder)
//Store the city data in localStorage so it persists
//ask John or tutor what information should be stored and retrieved from localStorage(maybe newCity and api return data?)
function addCity() {
    newCity = searchInput.value;
    newDiv = document.createElement("div");
    newA = document.createElement("a");
    newA.setAttribute("class", "text-decoration-none fs-3 text-dark");
    newA.setAttribute("href", "#placeholder");
    newA.textContent = newCity;
    cityList.appendChild(newDiv);
    newDiv.appendChild(newA);
    //local storage push goes here
}

//this function will call the weather api
function callWeather() {

}

//this function will translate city names into lat/long coordinates for weather api
function callGeo() {

}

//this function should push the data from the weather api into new div elements to display
//elements will replace the placeholder div and cards in #cityDisplay div
//weather information should have current day info
//weather information should have a 5 day forecast in cards
function pushWeather() {

}

//updates the div holding searched cities display to show new cities when searched(does this need to be a function? maybe code into event listener anon function)
function updateDisplay() {

}

//button should run function to add new city to storage list
//button should run function to update the div storing past cities
//button should run function to turn a city name into lat/long coordinates
//button should run function to call API and get weather information
//button should run function to push weather information to main body
//button should update the display of the div element containing past city searches
submitBtn.addEventListener("click", function() {
    addCity();
})

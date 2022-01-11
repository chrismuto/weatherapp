var searchInput = document.querySelector("#search-input");
var submitBtn = document.querySelector("#submitBtn");
var cityList = document.querySelector("#cityList");
var cityDisplay = document.querySelector("#cityDisplay");
var fiveDayDisplay = document.querySelector("#fiveDayDisplay");
var newCity = "chicago";
var newDiv;
var newA;
var lat;
var lon;

//this function takes the name of the last city inputted and adds it to the list along with the API link(?)(replace #placeholder)
//Store the city data in localStorage so it persists
//ask John or tutor what information should be stored and retrieved from localStorage(maybe newCity and api return data?)
function addCity() {
    newCity = "run";
    newDiv = document.createElement("div");
    newA = document.createElement("a");
    newA.setAttribute("class", "text-decoration-none fs-3 text-dark");
    newA.setAttribute("href", "#placeholder");
    newA.textContent = newCity;
    console.log(newA.textContent);
    cityList.appendChild(newDiv);
    newDiv.appendChild(newA);
    //local storage push goes here
}

//this function will call the weather api with the geo api information
function callWeather(lat, lon) {
    var weatherApiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=minutely,hourly,alert&appid=d06d736f70b1c7547ee6d36a7c3c8929&units=imperial";
    fetch(weatherApiUrl)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);
    });
}

callGeo();

//this function will translate city names into lat/long coordinates for weather api
function callGeo() {
    var geolocateApi = "https://api.openweathermap.org/geo/1.0/direct?q=" + newCity + "&limit=1&appid=d06d736f70b1c7547ee6d36a7c3c8929";
    fetch(geolocateApi)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);
    });
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
// submitBtn.addEventListener("click", function() {
//     addCity();
// })

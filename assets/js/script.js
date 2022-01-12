var searchInput = document.querySelector("#search-input");
var submitBtn = document.querySelector("#submitBtn");
var cityList = document.querySelector("#cityList");
var cityDisplay = document.querySelector("#cityDisplay");
var fiveDayDisplay = document.querySelector("#fiveDayDisplay");
var weatherContainer = document.querySelector("#weather-container");
var storageArray = [];

//this function takes the name of the last city inputted and adds it to the list along with the API link(?)(replace #placeholder)
//Store the city data in localStorage so it persists
//ask John or tutor what information should be stored and retrieved from localStorage(maybe newCity and api return data?)
function addCity() {
    var newDiv;
    var newA;
    var newCity = searchInput.value;
    newDiv = document.createElement("div");
    newA = document.createElement("a");
    newDiv.setAttribute("class", "bg-secondary my-4 p-2 text-center");
    newA.setAttribute("class", "text-decoration-none fs-3 text-dark");
    newA.setAttribute("href", "#placeholder");
    newA.textContent = newCity;
    cityList.appendChild(newDiv);
    newDiv.appendChild(newA);
    callGeo(newCity);
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
        //log icon for current weather
        console.log(data.current.weather[0].icon);
        //log icon description for current weather
        console.log(data.current.weather[0].description);
        //run pushWeather function to fill content
        pushWeather(data);
    });
}

//this function will translate city names into lat/long coordinates for weather api
function callGeo(newCity) {
    var geolocateApi = "https://api.openweathermap.org/geo/1.0/direct?q=" + newCity + "&limit=1&appid=d06d736f70b1c7547ee6d36a7c3c8929";
    fetch(geolocateApi)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        callWeather(data[0].lat, data[0].lon);
    });
}

//this function should push the data from the weather api into new div elements to display
//elements will replace the placeholder div and cards in #cityDisplay div
//weather information should have current day info
//weather information should have a 5 day forecast in cards
function pushWeather(data) {
    var currentDate = timeConverter(data.current.dt);
    var cityName = document.createElement("p");
    var p1 = document.createElement("p");
    var p2 = document.createElement("p");
    var p3 = document.createElement("p");
    var p4 = document.createElement("p");
    var icon = document.createElement("img");
    cityName.setAttribute("class", "card-text");
    p1.setAttribute("class", "card-text");
    p2.setAttribute("class", "card-text");
    p3.setAttribute("class", "card-text");
    p4.setAttribute("class", "card-text");
    icon.setAttribute("src", "https://openweathermap.org/img/wn/" + data.current.weather[0].icon + "@2px.png");
    icon.setAttribute("alt", data.current.weather[0].description)
    cityName.textContent =searchInput.value + ": " + currentDate + " " + icon;
    p1.textContent = "temp: " + data.current.temp;
    p2.textContent = "wind speed: " + data.current.wind_speed;
    p3.textContent = "humidity: " + data.current.humidity + "%";
    p4.textContent = "humidity: " + data.current.uvi;
    cityDisplay.appendChild(cityName);
    cityDisplay.appendChild(p1);
    cityDisplay.appendChild(p2);
    cityDisplay.appendChild(p3);
    cityDisplay.appendChild(p4);

    for (i = 0; i < 5; i++) {
        var date = timeConverter(data.daily[i].dt);
        var weatherCard = document.createElement("div");
        var weatherHeader = document.createElement("h5");
        var p1 = document.createElement("p");
        var p2 = document.createElement("p");
        var p3 = document.createElement("p");
        var p4 = document.createElement("p");
        weatherCard.setAttribute("class", "card col-2 border-dark border-2 mx-3");
        weatherHeader.setAttribute("class", "card-title");
        p1.setAttribute("class", "card-text");
        p2.setAttribute("class", "card-text");
        p3.setAttribute("class", "card-text");
        p4.setAttribute("class", "card-text");
        weatherHeader.textContent = date;
        p1.textContent = "temp: " + data.daily[i].weather[0].icon;
        p2.textContent = "wind speed: " + data.daily[i].temp.day;
        p3.textContent = "humidity: " + data.daily[i].wind_speed;
        p3.textContent = "humidity: " + data.daily[i].humidity + "%";
        fiveDayDisplay.appendChild(weatherCard);
        weatherCard.appendChild(weatherHeader);
        weatherCard.appendChild(p1);
        weatherCard.appendChild(p2);
        weatherCard.appendChild(p3);
        weatherCard.appendChild(p3);
    }
}

//updates the div holding searched cities display to show new cities when searched(does this need to be a function? maybe code into event listener anon function)
function updateDisplay() {

}

//retrieving and displaying icons
//create img url using icon ID in an html address
//select container element
// create img el
// set the src attribute
//set the alt attribute


//button should run function to add new city to storage list
//button should run function to update the div storing past cities
//button should run function to turn a city name into lat/long coordinates
//button should run function to call API and get weather information
//button should run function to push weather information to main body
//button should update the display of the div element containing past city searches
submitBtn.addEventListener("click", addCity)

// callGeo();

//converts unix time to a date
function timeConverter(timestamp){
    var a = new Date(timestamp * 1000);
    var months = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var time = month + '/' + date + '/' + year;
    return time;
  }
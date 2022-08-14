var searchInput = document.querySelector("#search-input");
var submitBtn = document.querySelector("#submitBtn");
var cityList = document.querySelector("#cityList");
var cityDisplay = document.querySelector("#cityDisplay");
var fiveDayDisplay = document.querySelector("#fiveDayDisplay");
var weatherContainer = document.querySelector("#weather-container");
var resetBtn = document.querySelector("#reset");
var storageArray = [];

//this function takes the name of the last city inputted and adds it to the list along with the API link(?)(replace #placeholder)
function addCity() {
    if (searchInput.value === "") {
        return;
    }
    // var newDiv;
    // var newA;
    var newCity = searchInput.value;
    callGeo(newCity);
    cityDisplay.textContent = "";
}

//this function will translate city names into lat/long coordinates for weather api
function callGeo(newCity) {
    var geolocateApi = "https://api.openweathermap.org/geo/1.0/direct?q=" + newCity + "&limit=1&appid=d06d736f70b1c7547ee6d36a7c3c8929";
    fetch(geolocateApi)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        if (!storageArray.some(e => e.city === data[0].name)) {
            storageArray.push({
                "city": data[0].name,
                "url": document.location.href
            })
            var newDiv = document.createElement("div");
            var newA = document.createElement("a");
            newDiv.setAttribute("class", "bg-secondary my-2 p-2 text-center");
            newA.setAttribute("class", "text-decoration-none fs-3 text-dark");
            newA.setAttribute("href", "#placeholder");
            newA.textContent = newCity;
            cityList.appendChild(newDiv);
            newDiv.appendChild(newA);
            localStorage.setItem("cities", JSON.stringify(storageArray));
            updateDisplay();
            ;
        }
            callWeather(data[0].lat, data[0].lon);
        });
}

//this function will call the weather api with the geo api information
function callWeather(lat, lon) {
    var weatherApiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=minutely,hourly,alert&appid=d06d736f70b1c7547ee6d36a7c3c8929&units=imperial";
    fetch(weatherApiUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            pushWeather(data);
        });
}

//this function will take the data from the weather api and create new div elements to display
function pushWeather(data) {
    var currentDate = timeConverter(data.current.dt);
    var cityName = document.createElement("h2");
    var p1 = document.createElement("p");
    var p2 = document.createElement("p");
    var p3 = document.createElement("p");
    var p4 = document.createElement("p");
    let uvi = document.createElement("span");
    var icon = document.createElement("img");
    uvi.textContent = data.current.uvi;
    uvi.setAttribute("class", "text-center");
    // uvi.setAttribute("style", "")
    cityName.setAttribute("class", "card-text m-2");
    p1.setAttribute("class", "card-text m-2");
    p2.setAttribute("class", "card-text m-2");
    p3.setAttribute("class", "card-text m-2");
    p4.setAttribute("class", "card-text m-2");
    icon.setAttribute("src", "https://openweathermap.org/img/wn/" + data.current.weather[0].icon + "@2x.png");
    icon.setAttribute("alt", data.current.weather[0].description);
    cityName.innerHTML = searchInput.value + "<br />" + currentDate;
    p1.innerHTML = "temp: " + Math.round(data.current.temp) + "&#176;";
    p2.textContent = "wind speed: " + Math.round(data.current.wind_speed) + " mph";
    p3.textContent = "humidity: " + data.current.humidity + "%";
    p4.textContent = "Current UV index: ";
    if (data.current.uvi < 1.5) {
        uvi.setAttribute("style", "width: 100px; height: 60px; background-image: url(/assets/images/uvigreen.png); background-size: 100% 100%; display: inline-block");
    } else if (data.current.uvi <= 3.0) {
        uvi.setAttribute("style", "width: 100px; height: 60px; background-image: url(/assets/images/uviyellow.png); background-size: 100% 100%; display: inline-block");
    } else {
        uvi.setAttribute("style", "width: 100px; height: 60px; background-image: url(/assets/images/uvired.png); background-size: 100% 100%; display: inline-block")
    }
    cityDisplay.appendChild(cityName);
    cityDisplay.appendChild(icon);
    cityDisplay.appendChild(p1);
    cityDisplay.appendChild(p2);
    cityDisplay.appendChild(p3);
    cityDisplay.appendChild(p4);
    p4.appendChild(uvi);

    //clear display if a search has already been sent
    fiveDayDisplay.textContent = "";

    //loop through the next 5 days of forecast information to make cards
    for (i = 1; i < 6; i++) {
        var date = timeConverter(data.daily[i].dt);
        var weatherCard = document.createElement("div");
        var weatherHeader = document.createElement("h5");
        var p1 = document.createElement("p");
        var p2 = document.createElement("p");
        var p3 = document.createElement("p");
        var p4 = document.createElement("p");
        var icon = document.createElement("img");
        weatherCard.setAttribute("class", "card col-12 col-xl-2 m-2 shadow-lg h-75");
        weatherHeader.setAttribute("class", "card-title mt-2");
        icon.setAttribute("src", "https://openweathermap.org/img/wn/" + data.daily[i].weather[0].icon + "@2x.png");
        icon.setAttribute("alt", data.daily[i].weather[0].description);
        p1.setAttribute("class", "fs-4 card-text m-1");
        p2.setAttribute("class", "fs-4 card-text m-1");
        p3.setAttribute("class", "fs-4 card-text m-1");
        p4.setAttribute("class", "fs-4 card-text m-1");
        weatherHeader.textContent = date;
        p1.textContent = "";
        p2.innerHTML = "temp: " + Math.round(data.daily[i].temp.day) + "&#176;";
        p3.textContent = "wind speed: " + data.daily[i].wind_speed;
        p4.textContent = "humidity: " + data.daily[i].humidity + "%";
        fiveDayDisplay.appendChild(weatherCard);
        weatherCard.appendChild(weatherHeader);
        weatherCard.appendChild(p1);
        weatherCard.appendChild(p2);
        weatherCard.appendChild(p3);
        weatherCard.appendChild(p4);
        p1.appendChild(icon);
        searchInput.value = "";
    }
}

//updates the div holding searched cities display to show new cities when searched
function updateDisplay() {
    storedArray = JSON.parse(localStorage.getItem("cities"));

    if (storedArray) {
        storageArray = storedArray;
        cityList.textContent = "";
        for (i = 0; i < storageArray.length; i++) {
            var newDiv;
            var newBtn;
            newDiv = document.createElement("div");
            newDiv.setAttribute("class", "col-12 fs-4 my-1 p-1");
            newBtn = document.createElement("button");
            newBtn.setAttribute("type", "button");
            newBtn.setAttribute("class", "btn btn-success text-decoration-none text-white col-12 fs-5 mt-4 p-2");
            newBtn.textContent = storageArray[i].city;
            cityList.appendChild(newDiv);
            newDiv.appendChild(newBtn);
            console.log(storageArray[i]);
        }
    }
}

submitBtn.addEventListener("click", addCity);

searchInput.addEventListener("keydown", function(e) {

    var key = e.which || e.keyCode || 0;

    if (key === 13) {
        e.preventDefault();
        addCity();
    }

});

cityList.addEventListener("click", function (event) {
    if (event.target.matches("button")) {
        callGeo(event.target.textContent);
        cityDisplay.textContent = "";
        cityDisplay.textContent = event.target.textContent;
    }
})
//converts unix time to a date
function timeConverter(timestamp) {
    var a = new Date(timestamp * 1000);
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var time = month + ' ' + date + ', ' + year;
    return time;
}

function reset() {
    localStorage.removeItem("cities");
    cityList.textContent = "";
    window.location.reload();
}
resetBtn.addEventListener("click", function (event) {
    event.preventDefault();
    reset();
})
updateDisplay();
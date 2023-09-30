var APIKey= '24bae20ba3202619b8245f99145d012b';
var city;
var searchHistory = document.getElementById('search-history');
var currentWeather = document.getElementById('current-weather');
var forecast = document.getElementById('forecast');
var queryURL="http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=5" + "&appid=" + APIKey;
let submitButton= document.getElementById('submit-button');

submitButton.addEventListener('click', getInput);

function getInput(event) {
    event.preventDefault();
    city = document.getElementById('city-input').value.trim();
    console.log(city);
    fetchWeatherSearchResults(city);
    queryURL="http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=5" + "&appid=" + APIKey;
    console.log(queryURL);
    document.getElementById("city-input").value = "";
  }
  
  function fetchWeatherSearchResults(queryURL) {
    fetch(queryURL)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        currentWeather(data);

        getForecastData(city);
    })
    .catch(function(error){
        console.log('Error:',error);
    });

  }




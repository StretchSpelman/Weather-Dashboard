var APIKey= '470b7771a430957c29f2cd9616f8bda0';
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

  function getForecastData(city) {
    var apiUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + APIKey;
  
    fetch(apiUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        displayForecast(data);
      })
      .catch(function (error) {
        console.log("Error:", error);
      });
    }

    function displayCurrentWeather(weatherData) {
        var cityName = weatherData.name;
        var date = new Date().toLocaleDateString();
        var iconUrl = "https://openweathermap.org/img/w/" + weatherData.weather[0].icon + ".png";
        var temperature = weatherData.main.temp;
        var humidity = weatherData.main.humidity;
        var windSpeed = weatherData.wind.speed;
      
        document.getElementById("city-name").textContent = cityName;
        document.getElementById("date").textContent = date;
        document.getElementById("weather-icon").setAttribute("src", iconUrl);
        document.getElementById("temperature").textContent = temperature;
        document.getElementById("humidity").textContent = humidity;
        document.getElementById("wind-speed").textContent = windSpeed;
      }

      function displayForecast(forecastData) {
        var forecastContainer = document.getElementById("forecast");
      
        forecastContainer.innerHTML = "";
      
        for (var i = 0; i < forecastData.list.length; i++) {
          var forecast = forecastData.list[i];
          var date = forecast.dt_txt.split(" ")[0];
          var iconUrl = "https://openweathermap.org/img/w/" + forecast.weather[0].icon + ".png";
          var temperature = forecast.main.temp;
          var humidity = forecast.main.humidity;
          var windSpeed = forecast.wind.speed;
      
          var forecastElement = document.createElement("div");
          forecastElement.classList.add("forecast-item");
      
          var dateElement = document.createElement("p");
          dateElement.textContent = date;
      
          var iconElement = document.createElement("img");
          iconElement.setAttribute("src", iconUrl);
      
          var temperatureElement = document.createElement("p");
          temperatureElement.textContent = temperature;
      
          var humidityElement = document.createElement("p");
          humidityElement.textContent = humidity;
      
          var windSpeedElement = document.createElement("p");
          windSpeedElement.textContent = windSpeed;
      
          forecastElement.appendChild(dateElement);
          forecastElement.appendChild(iconElement);
          forecastElement.appendChild(temperatureElement);
          forecastElement.appendChild(humidityElement);
          forecastElement.appendChild(windSpeedElement);
      
          forecastContainer.appendChild(forecastElement);
        }
      }
      
      document.getElementById("city-input").addEventListener("submit", getInput);





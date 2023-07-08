//todo list
//add search function
//add local storage
//make function to add to local storage
//add weatherforecast function

var click = document.getElementById("search");
var search = document.getElementById("cInput");
var weather = document.getElementById("weather");
var history = document.getElementById("sh");
var forecast = document.getElementById("wc");

click.addEventListener("click", function () {
   var city = search.value.trim();

//Weather
fetch('https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=f1b9b71d4a5734c217d9cf9a83a3077e')
    .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    
  }
  )
});

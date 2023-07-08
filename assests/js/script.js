//todo list
//add search function
//add local storage
//make function to add to local storage
//add weatherforecast function

var search = document.getElementById("search");
var input = document.getElementById("input");
var weatherRep = document.getElementById("weather");
var history = document.getElementById("history");
var forecast = document.getElementById("forecast");
var temperature = document.getElementById("temperature");
var chumidity = document.getElementById("humidity");
var wSpeed = document.getElementById("wind-speed");
var clear = document.getElementById("clear");

var API = "f1b9b71d4a5734c217d9cf9a83a3077e";

search.addEventListener("click", function () {
    var city = input.value.trim();
    currentWeather(city)
   });

function find(c){
    for (var i=0; i<cities.length; i++){
        if(c.toUpperCase()===cities[i]){
            return -1;
        }
    }
    return 1;
}


function displayWeather(event){
    event.preventDefault();
    if(searchCity.val().trim()!==""){
        city=searchCity.val().trim();
        currentWeather(city);
    }
}

function currentWeather(city) {
fetch('https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + API)
.then(function (response) {
    return response.json(); 
  })
.then(function (data) {
    console.log(data);
    retrieve(data, city);
    weatherreport(data)
})
}
function weatherreport(data) {
    console.log(data);
    var weathericon = data.weather[0].icon;
    var iconurl ="https://openweathermap.org/img/wn/"+weathericon +"@2x.png";
    var date = new Date(data.dt*1000).toLocaleDateString();
    weatherRep.innerHTML = data.name + " (" + date + ") " + "<img src='" + iconurl + "'>";
    var temp = (data.main.temp - 273.15) * 1.80 + 32;
    temperature.innerHTML = temp.toFixed(2) + "&#8457";
    var humid = data.main.humidity;
    console.log(humid)
    chumidity.innerhtml = " (" + humid + ") " + "%";
    var ws = data.wind.speed;
    var windsmph = (ws*2.237).toFixed(1);
    wSpeed.innerHTML = windsmph + " MPH";
}


function retrieve(data, city) {
   if(data.cod==200){
    cities=JSON.parse(localStorage.getItem("cityname"));
    console.log(cities);
    if (cities==null){
        cities=[];
        cities.push(city.toUpperCase()
        );
        localStorage.setItem("cityname",JSON.stringify(cities));
        addToList(city);
    }
    else {
        if(find(city)>0){
            cities.push(city.toUpperCase());
            localStorage.setItem("cityname",JSON.stringify(cities));
            addToList(city);
        }
    }
}}




function loadlastCity(){
        var cities = JSON.parse(localStorage.getItem("cityname"));
    if(cities!==null){
        cities=JSON.parse(localStorage.getItem("cityname"));
        for(i=0; i<cities.length;i++){
            addToList(cities[i]);
        }
        city=cities[i-1];
        currentWeather(city);
    }
}

function clearHistory(){ 
    cities=[];
    localStorage.removeItem("cityname");
    document.location.reload();
}

function addToList(c) {
    var listEl = document.createElement("li");
    var textNode = document.createTextNode(c.toUpperCase());
    
    listEl.appendChild(textNode);
    listEl.className = "list-group-item";
    listEl.setAttribute("data-value", c.toUpperCase());
    
    var listGroup = document.querySelector(".list-group");
    listGroup.appendChild(listEl);
}

//eventlisteners

clear.addEventListener ("click", function() {
    clearHistory();
});

loadlastCity()
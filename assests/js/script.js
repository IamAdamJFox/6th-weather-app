
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
const clear = document.getElementById("clear");

var API = "f1b9b71d4a5734c217d9cf9a83a3077e";
//handles search bar and iniatiing the fetches by inputing into the text box 
search.addEventListener("click", function (event) {
    event.preventDefault();
    var city = input.value.trim();
    currentWeather(city)
    forecastCity(city)
   });
//searches to see if city exists in past searches
function find(c){
    for (var i=0; i<cities.length; i++){
        if(c.toUpperCase()===cities[i]){
            return -1;
        }
    }
    return 1;
}


//collects weather data for current date and passes it onto weatherreport
function currentWeather(city) {
fetch('https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + API)
.then(function (response) {
    return response.json(); 
  })
.then(function (data) {
    console.log(data);
    retrieve(data, city);
    weatherreport(data);
})
}
//takes data from fetche and places them into html elements aswell as sets current date
function weatherreport(data) {
    var weathericon = data.weather[0].icon;
    var iconurl ="https://openweathermap.org/img/wn/" + weathericon +"@2x.png";
    var date = new Date(data.dt*1000).toLocaleDateString();
    weatherRep.innerHTML = data.name + " (" + date + ") " + "<img src='" + iconurl + "'>";
    var temp = (data.main.temp - 273.15) * 1.80 + 32;
    temperature.innerHTML = temp.toFixed(2) + "&#8457";
    var humid = data.main.humidity;
    console.log(humid)
    chumidity.innerHTML = " (" + humid + ") " + "%";
    var ws = data.wind.speed;
    var windsmph = (ws*2.237).toFixed(1);
    wSpeed.innerHTML = windsmph + " MPH ";
}

//sets city in local storage so it can be shown in history
function retrieve(data, city) {
   if(data.cod==200){
    cities=JSON.parse(localStorage.getItem("cityname"));
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
//retrieves forecast data and passes it to forecastreport
function forecastCity(city) {
      fetch('https://api.openweathermap.org/data/2.5/forecast?q=' + city + '&appid=' + API)
    .then(function (response1) {
        return response1.json();
        })
        .then(function (data2) {
            console.log(data2);
           forecastreport(data2);
        })
    };
//inserts forecast data into html elements
  function forecastreport(data2) {
             for (i=0;i<5;i++){
            var date= new Date((data2.list[((i+1)*8)-1].dt)*1000).toLocaleDateString();
            var iconcode= data2.list[((i+1)*8)-1].weather[0].icon;
            var iconurl="https://openweathermap.org/img/wn/"+iconcode+".png";
            var temp1= data2.list[((i+1)*8)-1].main.temp;
            var temp2=(((temp1-273.5)*1.80)+32).toFixed(2);
            var humidity= data2.list[((i+1)*8)-1].main.humidity;

            document.getElementById("Dates" + i).innerHTML = date;

            document.getElementById("Imgs" + i).innerHTML = "<img src=" + iconurl + ">";

            document.getElementById("Temps" + i).innerHTML = temp2 + "&#8457";

            document.getElementById("Humids" + i).innerHTML = humidity + "%";

        }
    }


//retrieves search and places them into a array so that it may be grabbed for display with addtolist
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
//clears past searches
function clearHistory(){ 
    cities=[];
    localStorage.removeItem("cityname");
    document.location.reload();
}
//renders past searches under searche bar
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

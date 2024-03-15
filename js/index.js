let WeatherForm = document.querySelector(".weatherform")
let CityInput = document.querySelector(".cityinput")
let Card = document.querySelector(".card")
let apikey = "9c495e0dfe07415ee7f9502beb51961d";

WeatherForm.addEventListener("submit", async event =>{
event.preventDefault()
let City = CityInput.value
if(City){
 
    try{

        let weatherData = await GetWeatherData (City) 
        DisplayWeatherinfo(weatherData) 
 
    }

    catch(error){

        console.log(error)
        displayError(error)
    }
}
else{
    displayError("please enter a city")
}

});


async function GetWeatherData(city){
 let apiUrl = `//api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;
 let response = await fetch(apiUrl)
 console.log(response)

if(!response.ok){
    throw new Error("could not fetch  wheather data");

}
return await response.json();





}

function DisplayWeatherinfo(data){
let {name: city,
     main:{temp ,humidity}, 
     weather:[{description, id}]} = data

Card.textContent = "";
Card.style.display = "flex";
let cityDisplay = document.createElement("h2")
let tempDisplay = document.createElement("p")
let humidityDisplay = document.createElement("p")
let descDisplay = document.createElement("p")
let weatherEmoji = document.createElement("p")


cityDisplay.textContent = city;
tempDisplay.textContent = `${(temp - 273.15).toFixed(1)}°C`;
humidityDisplay.textContent = `Humidity: ${humidity}%`;
descDisplay.textContent = description;
weatherEmoji.textContent = GetWeatherEmoji(id)


cityDisplay.classList.add("citydisplay");
tempDisplay.classList.add("tempdisplay");
humidityDisplay.classList.add("humiditydisplay");
descDisplay.classList.add("descdisplay");
weatherEmoji.classList.add("weatheremoji");



Card.appendChild(cityDisplay);
Card.appendChild(tempDisplay);
Card.appendChild(humidityDisplay);
Card.appendChild(descDisplay);
Card.appendChild(weatherEmoji);






}
function GetWeatherEmoji(wheaterId){
 switch(true){
    case(wheaterId >= 200 && wheaterId < 300):
     return "⛈️"
    case(wheaterId >= 300 && wheaterId < 400):
     return "🌧️"
    case(wheaterId >= 400 && wheaterId < 600):
     return "🌧️"
     case(wheaterId >= 600 && wheaterId < 700):
     return "❄️"
     case(wheaterId >= 700 && wheaterId < 800):
     return "🍃"
     case(wheaterId === 800):
     return "☀️"
     case(wheaterId >= 801 && wheaterId < 810):
     return "🌤️"
     default:
        return "🌥️"
 }



}
function displayError(message){

let errorDisplay = document.createElement("p");
errorDisplay.textContent = message;
errorDisplay.classList.add("errorDisplay");

Card.textContent="";
Card.style.display = "flex";
Card.appendChild(errorDisplay);
};

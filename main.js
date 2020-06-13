const input = document.querySelector('.input')
const cityName = document.querySelector('.city-name')
const dayValue = document.querySelector('.day')
const temperature = document.querySelector('.temperature')
const weather = document.querySelector('.weather')
const highLow = document.querySelector('.high-low')

const key = "71550012e8652d500097c6fb97094ece"
const base = "api.openweathermap.org/data/2.5/weather"

// this api doesn't allow to access it from localhost. to get around it add the following proxy before the request url
const proxy = 'https://cors-anywhere.herokuapp.com/'

// response(of the call) with .json() returns the data in json format
input.addEventListener('keyup', function (event) {
  if (event.keyCode === 13) {
    fetch(`${proxy}${base}?q=${input.value}&appid=${key}`)
      .then(response => response.json())
      .then(data => displayWeather(data))
  }
})



function displayWeather(data) {

  const cityValue = data.name;
  cityName.textContent = `${cityValue}, ${data.sys.country}`;

  var d = new Date();
  var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const month = months[d.getMonth()];
  const year = d.getFullYear();
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const day = days[d.getDay()];
  const date = d.getDate();
  dayValue.innerHTML = `${day} ${date}, ${month} ${year}`;

  const temperatureValue = Math.ceil(kelvinToCelcius(data['main']['temp']));
  temperature.innerHTML = `${temperatureValue}&deg;c`;

  const weatherDescription = data.weather[0].description;
  weather.innerHTML = weatherDescription;


  const maxTemp = Math.ceil(kelvinToCelcius(data.main.temp_max));
  const minTemp = Math.ceil(kelvinToCelcius(data.main.temp_min));
  highLow.innerHTML = `${maxTemp}&deg;c / ${minTemp}&deg;c`;

  input.value = '';
}

function kelvinToCelcius(num) {
  return (num - 273.1);
}
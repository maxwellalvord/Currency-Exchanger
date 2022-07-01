import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
// import './css/styles.css';
// import amenityChecker from './js/park-amenities.js';
// import weatherChecker from './js/weather.service.js';


function clearFields() {
  $('#park').val("");
  $('#amenities').text("");
  $('#descript').text("");
}


function getElements(response) {
  if (response.data) {
    $('#descript').text(`${response.data[0].description} `);
    $('#amenities').text(`${response.data[0].activities[0].name}`);
    $('#amenities').append(`, ${response.data[0].activities[1].name}`);
    $('#amenities').append(`, ${response.data[0].activities[2].name}`);
    $('#amenities').append(`, ${response.data[0].activities[3].name}`);
    $('#amenities').append(`, ${response.data[0].activities[4].name}`);
  } else {
    $('.showErrors').text(`There was an error: ${response}`);
  }
}

function getWeatherElements(response) {
  if (response.main) {
    const f = (1.8 * (response.main.temp - 273) + 32).toFixed(1);
    const fmin = (1.8 * (response.main.temp_min - 273) + 32).toFixed(1);
    const fmax = (1.8 * (response.main.temp_max - 273) + 32).toFixed(1);
    // $('.showHumidity').text(`The humidity in ${city} is ${response.main.humidity}%`);
    $('.showTemp').text(`The temperature is ` + f  + ` degrees.`);
    // $('.showWindSpeed').text(`The wind speed in MPH is ${response.wind.speed}.`);
    // $('.showDescript').text(`The weather description is ${response.weather[0].description}.`);
    $('.showTempMin').text(`The low for today is ` + fmin  + ` degrees.`);
    $('.showTempMax').text(`The high for today is ` + fmax  + ` degrees.`);
  } else {
    $('.showErrors').text(`There was an error: ${response}`);
  }
}
async function makeApiCall(park) {
  const response = await amenityChecker.getAmenities(park);
  console.log(response);
  getElements(response);
}

async function makeApiCallWeather(city) {
  const response = await weatherChecker.getWeather(city);
  console.log(response);
  getWeatherElements(response);
}

$(document).ready(function() {
  $('#formOne').submit(function() {
    let usd = parseInt($('#USD').val());
    let newMoney = $('#currency').val();
    clearFields();
    makeApiCall(usd, newMoney);
  });
});

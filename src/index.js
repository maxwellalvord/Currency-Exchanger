import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import usdAgainstOthers from './js/money.math.js';
import weatherChecker from './js/weather.service.js';

function clearFields() {
  $('#dollar').val("");
  $('#currency').val("");
  $('#showExchange').text("");
  $('#showError').text("");
}

function getElements(response, usd, newMoney) {
  if (response.conversion_rates) {
    const convert = (usd / response.conversion_rates.USD).toFixed(4);
    $('#showExchange').text(`With ${usd} American dollars you get ${convert} ${newMoney}s`);
  } else {
    $('#showError').text(`There was an error: ${response}`);
  }
}

async function makeApiCall(newMoney, usd) {
  const response = await usdAgainstOthers.getCurrency(newMoney, usd);
  getElements(response, usd, newMoney);
}

$(document).ready(function() {
  $('#formOne').submit(function() {
    event.preventDefault();
    let usd = parseFloat($('#dollar').val());
    let newMoney = $('#currency').val();
    clearFields();
    makeApiCall(newMoney, usd);
    $('#showExchange').show();
    $('#showError').show();
  });
});

function clearweather(){
  $('#location').val("");
}

function getWeatherElements(response) {
  if (response.main) {
    console.log(response);
    const f = (1.8 * (response.main.temp - 273) + 32).toFixed(1);
    const fmin = (1.8 * (response.main.temp_min - 273) + 32).toFixed(1);
    const fmax = (1.8 * (response.main.temp_max - 273) + 32).toFixed(1);
    $('#showTemp').text(`In ${response.name} the temperature is ` + f  + ` degrees.`);
    $('#showTempMin').text(`The low for today is ` + fmin  + ` degrees.`);
    $('#showTempMax').text(`The high for today is ` + fmax  + ` degrees.`);
  } else {
    $('#showErrors').text(`There was an error: ${response}`);
  }
}

async function makeApiCallWeather(city) {
  const response = await weatherChecker.getWeather(city);
  console.log(response);
  getWeatherElements(response);
}

$(document).ready(function() {
  $('#weatherLocation').click(function() {
    let city = $('#location').val();
    clearweather();
    makeApiCallWeather(city);
    $('#showTemp').show();
    $('#showTempMin').show();
    $('#showTempMax').show();
    $('#showErrors').show();
  });
});


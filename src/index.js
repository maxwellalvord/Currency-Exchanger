import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import usdAgainstOthers from './js/money.math.js';


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
  });
});


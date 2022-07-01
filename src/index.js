import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
// import './css/styles.css';
import usdAgainstOthers from './js/money.math.js';



function clearFields() {
  $('#dollar').val("");
  $('#currency').val("");
  $('#showExchange').text("");
  $('#showErrors').text("");
}


function getElements(response, usd) {
  if (response.conversion_rates) {
    console.log(usd);
    // const convert = (response.conversion_rates.USD * usd)
    $('#showExchange').text(`${response.conversion_rates.USD} `);
  } else {
    $('.showErrors').text(`There was an error: ${response}`);
  }
}


async function makeApiCall(newMoney, usd) {
  const response = await usdAgainstOthers.getCurrency(newMoney);
  console.log(response);
  getElements(response, usd);
}



$(document).ready(function() {
  $('#formOne').submit(function() {
    event.preventDefault();
    let usd = parseInt($('#dollar').val());
    let newMoney = $('#currency').val();
    clearFields();
    makeApiCall(newMoney, usd);
  });
});

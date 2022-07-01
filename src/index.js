import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
// import './css/styles.css';
import usdAgainstOthers from './js/money.math.js';



function clearFields() {
  $('#USD').val("");
  $('#currency').val("");
  $('#showExchange').text("");
  $('#showErrors').text("");
}


function getElements(response) {
  if (response.conversion_rates) {
    $('#showExchange').text(`${response.conversion_rates.USD} `);
  } else {
    $('.showErrors').text(`There was an error: ${response}`);
  }
}


async function makeApiCall(newMoney) {
  const response = await usdAgainstOthers.getCurrency(newMoney);
  console.log(response);
  getElements(response);
}



$(document).ready(function() {
  $('#formOne').submit(function() {
    event.preventDefault();
    // let usd = parseInt($('#USD').val());
    let newMoney = $('#currency').val();
    clearFields();
    makeApiCall(newMoney);
  });
});

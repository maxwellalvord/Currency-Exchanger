export default class usdAgainstOthers {  
  static async getCurrency(currency) {
    try {
      const response = await fetch(`https://v6.exchangerate-api.com/v6/${process.env.API_KEY}/latest/${currency}`);
      if (!response.ok || response.result == "error") {
        // document.getElementById("showError").innerHTML = Error(response['error-type']);
        throw Error(response.statusText);
      }
      return response.json();
    } catch(error) {
      // return document.getElementById("showError").innerHTML = error.message;
      return error.message;
    }
  }
}

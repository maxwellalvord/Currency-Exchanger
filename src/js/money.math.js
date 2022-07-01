export default class usdAgainstOthers {  
  static async getCurrency(currency) {
    // if (currency > 10000){
    //   return alert("Please enter a number under 10,000");
    // }
    try {
      const response = await fetch(`https://v6.exchangerate-api.com/v6/${process.env.API_KEY}/latest/${currency}`);
      if (!response.ok) {
        throw Error(response.status);
      }
      return response.json();
    } catch(error) {
      return error.message;
    }
  }
}
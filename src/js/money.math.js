export default class usdAgainstOthers {  
  static async getCurrency(currency) {
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
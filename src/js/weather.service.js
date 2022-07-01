export default class weatherChecker {  
  static async getWeather(city) {
    try {
      const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.WEATHER_API_KEY}`);
      if (!response.ok) {
        throw Error(response.status);
      }
      console.log(response);
      return response.json();
    } catch(error) {
      return error.message;
    }
  }
}
const weather = new Weather('bunbury');

// TESTING
weather
  .getLocation()
  .then(() => weather.getWeather())
  .then(() => console.log(weather));

// TESTING

const searchField = document.querySelector('#search-field');
const searchButton = document.querySelector('#search-button');

let weather = {};
weather = new Weather('perth');
weather
  .getLocation()
  .then(() => weather.getWeather())
  .then(() => weather.buildCurrentWeather());

// searchButton.addEventListener('click', () => {
//   const searchLocation = searchField.value;
//   console.log(searchLocation);

//   weather = new Weather(searchLocation);
//   weather
//     .getLocation()
//     .then(() => weather.getWeather())
//     .then(() => weather.buildCurrentWeather());
// });

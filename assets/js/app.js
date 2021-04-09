// TESTING

const searchField = document.querySelector('#search-field');
const searchButton = document.querySelector('#search-button');

searchButton.addEventListener('click', () => {
  const searchLocation = searchField.value;
  console.log(searchLocation);

  const weather = new Weather(searchLocation);
  weather
    .getLocation()
    .then(() => weather.getWeather())
    .then(() => weather.buildCurrentWeather());
});

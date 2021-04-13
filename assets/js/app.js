const searchField = document.querySelector('#search-field');
const searchButton = document.querySelector('#search-button');
const clearHistoryButton = document.querySelector('#clear-history');

// function to build search results list
if (JSON.parse(localStorage.getItem('cityList')).length > 0) {
  const cityList = JSON.parse(localStorage.getItem('cityList'));
  // load screen with last search result
  const weather = new Weather(cityList[0]);
  weather.domBuilder();
} else {
  const weather = new Weather('perth');
  weather.domBuilder();
}

// click handler on search button
searchButton.addEventListener('click', () => {
  const searchLocation = searchField.value;
  const weather = new Weather(searchLocation);
  weather.domBuilder();
  // weather
  //   .getLocation()
  //   .then(() => weather.getWeather())
  //   .then(() => {
  //     weather.writeResult();
  //     weather.buildCurrentWeather();
  //     weather.buildForecast();
  //     weather.buildMap();
  //     searchResultsBuilder();
  //   });
});

// load search results on initial page load
// searchResultsBuilder();

// clear history button handler
clearHistoryButton.addEventListener('click', () => {
  window.localStorage.setItem('cityList', JSON.stringify([]));
  console.log(window.localStorage.getItem('cityList'));
  document.querySelector('#search-results').innerHTML = '';
});

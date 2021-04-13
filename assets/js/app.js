const searchField = document.querySelector('#search-field');
const searchButton = document.querySelector('#search-button');
const clearHistoryButton = document.querySelector('#clear-history');

// function to build search results list
function searchResultsBuilder() {
  // clear out search results
  document.querySelector('#search-results').innerHTML = '';

  const local = window.localStorage;
  const targetElement = document.querySelector('#search-results');
  // get city List
  const cityList = JSON.parse(local.getItem('cityList'));
  cityList.forEach((city) => {
    const newButton = document.createElement('button');
    newButton.classList.add(
      'button',
      'is-medium',
      'is-info',
      'is-light',
      'is-fullwidth'
    );
    newButton.innerText = city;
    targetElement.appendChild(newButton);
    // add click handler
    // newButton.addEventListener('click', () => )
  });
}
// click handler on search button
searchButton.addEventListener('click', () => {
  const searchLocation = searchField.value;
  weather = new Weather(searchLocation);
  weather.domBuilder();
  // .getLocation()
  // .then(() => weather.getWeather())
  // .then(() => {
  //   weather.writeResult();
  //   weather.buildCurrentWeather();
  //   weather.buildForecast();
  //   weather.buildMap();
  //   searchResultsBuilder();
  // });
});

// load search results on initial page load
searchResultsBuilder();

// clear history button handler
clearHistoryButton.addEventListener('click', () => {
  window.localStorage.setItem('cityList', JSON.stringify([]));
  console.log(window.localStorage.getItem('cityList'));
  document.querySelector('#search-results').innerHTML = '';
});

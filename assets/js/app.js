const searchField = document.querySelector('#search-field');
const searchButton = document.querySelector('#search-button');
const clearHistoryButton = document.querySelector('#clear-history');

// function to build search results list
if (localStorage.getItem('cityList')) {
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
});

// auto-search on return on search field
searchField.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    const searchLocation = searchField.value;
    const weather = new Weather(searchLocation);
    weather.domBuilder();
  }
});

// clear history button handler
clearHistoryButton.addEventListener('click', () => {
  window.localStorage.removeItem('cityList');
  console.log(window.localStorage.getItem('cityList'));
  document.querySelector('#search-results').innerHTML = '';
});

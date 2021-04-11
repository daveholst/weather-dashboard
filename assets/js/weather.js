// creates weather object. takes argument for search. <cityName> or <cityName>,<country-code> eg. bridgetown,au
class Weather {
  constructor(city) {
    this.apiKey = 'b0e377a6dc0651dc529d2d62a44c0ec9';
    this.owmApiURL = 'http://api.openweathermap.org/data/2.5/';
    this.cityInput = city;
    this.currentConditions = {};
    this.forecastConditions = [];
    // this.getWeatherCurrent();
  }

  // gets lat, long, country and formatted output name. returns promise
  getLocation() {
    // fetch JSON
    return new Promise((resolve, reject) => {
      const { apiKey, owmApiURL, cityInput } = this;
      fetch(`${owmApiURL}weather?q=${cityInput}&units=metric&appid=${apiKey}`)
        // parse JSON
        .then((response) => response.json())
        // write data to this object. --  return a promise for chaining later?
        .then((data) => {
          // put copy back onto object
          this.cityOutput = data.name;
          this.cityCountry = data.sys.country;
          this.cityCoords = {
            lat: data.coord.lat,
            lng: data.coord.lon,
          };

          if (this.cityOutput) {
            resolve(`Location fetched for ${this.cityOutput}`);
          } else {
            reject(
              console.error(`Error getting Location for ${this.cityInput}`)
            );
          }
        });
    });
  }

  // gets current weather + forecast. return promise
  getWeather() {
    return new Promise((resolve, reject) => {
      // deconstruct coordinates
      const { lat, lng } = this.cityCoords;
      // add exclude-list variable
      const exclude = 'minutely,hourly,alerts';
      fetch(
        `${this.owmApiURL}onecall?lat=${lat}&lon=${lng}&units=metric&exclude=${exclude}&appid=${this.apiKey}`
      )
        .then((response) => response.json())
        .then((data) => {
          // build current conditions object
          this.currentConditions = {
            date: dayjs.unix(data.current.dt),
            currentTemp: data.current.temp,
            humidity: data.current.humidity,
            windSpeed: data.current.wind_speed,
            icon: data.current.weather[0].icon,
            description: data.current.weather[0].description,
            uv: data.current.uvi,
          };
          // loop through daily array to build forecast data (array of objects)
          const forcastDays = 5;
          for (let i = 1; i <= forcastDays; i += 1) {
            const day = data.daily[i];
            this.forecastConditions[i] = {
              date: dayjs.unix(day.dt),
              description: day.weather[0].description,
              icon: day.weather[0].icon,
              forecastTemp: day.temp.day,
              minTemp: day.temp.min,
              maxTemp: day.temp.max,
              humidity: day.humidity,
              windSpeed: day.wind_speed,
              uv: day.uvi,
            };
          }
          if (this.currentConditions) {
            resolve(`Weather fetched for ${this.cityOutput}`);
          } else {
            reject(
              console.error(`Error getting Weather for ${this.cityInput}`)
            );
          }
        });
    });
  }

  buildCurrentWeather() {
    const targetElement = document.querySelector('#current-weather');
    const cond = this.currentConditions;
    const formattedDate = dayjs(cond.date).format('DD/MM/YYYY');
    const dayName = dayjs(cond.date).format('dddd');
    const iconLocation = `http://openweathermap.org/img/wn/${cond.icon}.png`;
    // if current weather is populated --> clear.
    if (targetElement.innerHTML) targetElement.innerHTML = '';
    const newDiv = document.createElement('div');
    // newDiv.classList.add('column', 'is-two-fifths');
    newDiv.innerHTML = `
    <div class="card">
      <div class="card-content p-1">
        <div class="media mb-2">
          <div class="media-left">
            <figure class="image is-48x48">
              <img src=${iconLocation} alt="weather-icon">
            </figure>
          </div>
          <div class="media-content">
            <p class="title is-6">${formattedDate}</p>
            <p class="subtitle is-6">${dayName}</p>
          </div>
          </div>
          <div class="content">
            <p class="is-size-6"><b>${cond.description}</b> </p>
            <p class="is-size-6"><b>Curent Temperature ${cond.currentTemp} °C</b> </p>
            <p class="is-6 mb-0">Todays Min: <b>${cond.minTemp} °C </b></p>
            <p class="is-6 mb-0">Todays Max: <b>${cond.maxTemp} °C</b></p>
            <p class="is-6 mb-0">Current Wind: <b>${cond.windSpeed} km/h</b> </p>
            <p class="is-6 mb-0">Current Humidity: <b>${cond.humidity} %</b> </p>
            <p class="is-6 mb-0">Current UV Index: <b>${cond.uv} %</b> </p>
          </div>
      </div>
    </div>
    `;
    targetElement.append(newDiv);
    this.buildForecast();
    this.buildMap();
  }

  buildForecast() {
    const targetElement = document.querySelector('#forecast-container');

    // if forecast weather is populated --> clear.
    if (targetElement.innerHTML) targetElement.innerHTML = '';
    // build loop - start from tomorrow.
    this.forecastConditions.forEach((day) => {
      const iconLocation = `http://openweathermap.org/img/wn/${day.icon}.png`;
      const formattedDate = dayjs(day.date).format('DD/MM/YYYY');
      const dayName = dayjs(day.date).format('dddd');
      // create and append flex container
      const newDiv = document.createElement('div');
      newDiv.classList.add('column', 'is-one-fifth');
      newDiv.innerHTML = `
      <div class="card">
        <div class="card-content p-1">
          <div class="media mb-2">
            <div class="media-left">
              <figure class="image is-48x48">
                <img src=${iconLocation} alt="weather-icon">
              </figure>
            </div>
            <div class="media-content">
              <p class="title is-6">${formattedDate}</p>
              <p class="subtitle is-6">${dayName}</p>
            </div>
            </div>
            <div class="content">
              <p class="is-size-6"><b>${day.description}</b> </p>
              <p class="is-6 mb-0">Min: <b>${day.minTemp} °C </b></p>
              <p class="is-6 mb-0">Max: <b>${day.maxTemp} °C</b></p>
              <p class="is-6 mb-0">Wind: <b>${day.windSpeed} km/h</b> </p>
              <p class="is-6 mb-0">Humidity: <b>${day.humidity} %</b> </p>
            </div>
        </div>
      </div>
      `;
      targetElement.append(newDiv);
      // create card div
    });
  }

  buildMap() {
    const targetElement = document.querySelector('#map');

    targetElement.innerHTML = `
    <div class="card ">
      <div class="card-content is-flex is-justify-content-center is-align-content-center is-flex-shrink-4">
        <iframe width="550" height="400" src="https://embed.windy.com/embed2.html?lat=${this.cityCoords.lat}&lon=${this.cityCoords.lng}&width=650&height=450&zoom=7&level=surface&overlay=wind&product=ecmwf&menu=&message=true&marker=&calendar=now&pressure=true&type=map&location=coordinates&detail=&metricWind=km%2Fh&metricTemp=%C2%B0C&radarRange=-1" frameborder="0"></iframe>
      </div>
    </div>
    `;
  }
}

{
  /* <iframe
  width="650"
  height="450"
  src="https://embed.windy.com/embed2.html?lat=-28.699&lon=118.079&detailLat=-31.967&detailLon=115.862&width=650&height=450&zoom=5&level=surface&overlay=wind&product=ecmwf&menu=&message=true&marker=&calendar=now&pressure=true&type=map&location=coordinates&detail=&metricWind=km%2Fh&metricTemp=%C2%B0C&radarRange=-1"
  frameBorder="0"
/>; */
}

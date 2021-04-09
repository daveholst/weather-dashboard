class Weather {
  constructor(city) {
    this.apiKey = 'b0e377a6dc0651dc529d2d62a44c0ec9';
    this.owmApiURL = 'http://api.openweathermap.org/data/2.5/';
    this.cityInput = city;
    this.currentConditions = {};
    this.forcastConditions = [];
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
          for (let i = 0; i <= forcastDays; i += 1) {
            const day = data.daily[i];
            this.forcastConditions[i] = {
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
    const iconLocation = `http://openweathermap.org/img/wn/${cond.icon}.png`;
    // create cityName Heading
    const newH3 = document.createElement('H3');
    newH3.innerHTML = `${this.cityOutput} (${formattedDate})<img src="${iconLocation}" alt="weather-icon">`;
    newH3.classList.add('title', 'is-4');
    targetElement.appendChild(newH3);
    // create weather icon + description
    const newP = document.createElement('p');
    newP.innerHTML = `Conditions: <b>${cond.description}</b>`;
    targetElement.appendChild(newP);
    // create temp
    const newStats = document.createElement('h4');
    newStats.innerHTML = `Current Temperature: <b>${cond.currentTemp} °C</b> <br>
     Current Wind Speed: <b>${cond.windSpeed} km/h</b> <br>
     Current Humidity: <b>${cond.humidity} %</b>`;
    targetElement.appendChild(newStats);
    // create UV
    const newUV = document.createElement('h4');
    newUV.innerHTML = `Current UV Index: <b>${cond.uv}</b><br> `;
    targetElement.appendChild(newUV);
  }
}

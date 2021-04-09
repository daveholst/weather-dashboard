// const apiKey = 'b0e377a6dc0651dc529d2d62a44c0ec9';
// const cityName = 'Perth';

// basic fetch for todays weather!
// fetch(`http://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`)
//   .then(response => response.json())
//   .then(parsedData => console.log(parsedData));

class Weather {
  constructor(city) {
    this.apiKey = 'b0e377a6dc0651dc529d2d62a44c0ec9';
    this.owmApiURL = 'http://api.openweathermap.org/data/2.5/';
    this.cityInput = city;
    this.parsedRawData = {};
    this.currentConditions = {};
    // this.getWeatherCurrent();
  }

  getWeatherCurrent() {
    // fetch JSON
    return new Promise((resolve, reject) => {
      fetch(
        `${this.owmApiURL}weather?q=${this.cityInput}&units=metric&appid=${this.apiKey}`
      )
        // parse JSON
        .then((response) => response.json())
        // write data to this object. --  return a promise for chaining later?
        .then((data) => {
          // put copy back onto object
          console.log(data);
          this.cityOutput = data.name;
          this.cityCountry = data.sys.country;
          this.cityCoords = {
            lat: data.coord.lat,
            lng: data.coord.lon,
          };
          this.currentConditions = {
            date: dayjs(data.dt),
            currentTemp: data.main.temp,
          };
          if (this.cityOutput) {
            resolve(`Weather fetched for ${this.cityOutput}`);
          } else {
            reject(
              console.error(`Error getting weather for ${this.cityInput}`)
            );
          }
          // TODO: get current DATA
        });
    });
  }

  getWeatherForcast() {
    // deconstruct coordinates
    const { lat, lng } = this.cityCoords;
    // add exclude-list variable
    const exclude = 'current,minutely,hourly,alerts';
    fetch(
      `${this.owmApiURL}onecall?lat=${lat}&lon=${lng}&units=metric&exclude=${exclude}&appid=${this.apiKey}`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
  }
}

const weather = new Weather('Albany');

// perthWeather.getWeather();
weather.getWeatherCurrent().then(() => console.log(weather));

// console.log(weather);

// weatherPrinter();
//

// const getWeather = (cityInput) => {
//   fetch(
//     `http://api.openweathermap.org/data/2.5/weather?q=${cityInput}&units=metric&appid=${apiKey}`
//   )
//     .then((response) => response.json())
//     .then((data) => {
//       // put copy back onto object
//       console.log(data);
//       return {
//         cityName: data.name,
//         country: data.sys.country,
//         cityCords: {
//           lat: data.coord.lat,
//           lng: data.corord.lon,
//         },
//       };
//     });
// };

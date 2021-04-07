const apiKey = 'b0e377a6dc0651dc529d2d62a44c0ec9';
let cityName = 'Perth'

// basic fetch for todays weather!
// fetch(`http://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`)
//   .then(response => response.json())
//   .then(parsedData => console.log(parsedData));


class weather {
  constructor(city) {
    this.cityInput = city;
    this.parsedRawData;

  }



}

const perthWeather = new weather('Perth');

//

const getWeather =(cityInput) => {
  fetch(`http://api.openweathermap.org/data/2.5/weather?q=${cityInput}&units=metric&appid=${apiKey}`)
  .then(response => response.json())
    .then(data => {
    //put copy back onto object
      return {
        cityName:
      }

  });

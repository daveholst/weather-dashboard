const apiKey = 'b0e377a6dc0651dc529d2d62a44c0ec9';
let cityName = 'Perth'

// basic fetch for todays weather!
fetch(`http://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`)
  .then(response => response.json())
  .then(parsedData => console.log(parsedData));



# Weather Dashboard WebApp

## Task

Third-party APIs allow developers to access their data and functionality by making requests with specific parameters to a URL. Developers are often tasked with retrieving data from another application's API and using it in the context of their own. Your challenge is to build a weather dashboard that will run in the browser and feature dynamically updated HTML and CSS.

Use the [OpenWeather One Call API](https://openweathermap.org/api/one-call-api) to retrieve weather data for cities. Read through the documentation for setup and usage instructions. You will use `localStorage` to store any persistent data.

## Link

A Live version of the site can be found here (https://daveholst.github.io/weather-dashboard/)

## Screenshot

![animated gif showing weather dashboard working](./assets/weather-dashboard.gif)

## User Story

**AS** A traveler\
**I WANT** to see the weather outlook for multiple cities\
**SO THAT** I can plan a trip accordingly

## Acceptance Criteria

**GIVEN** a weather dashboard with form inputs
**WHEN** I search for a city

- [x] **THEN** I am presented with current and future conditions for that city and that city is added to the search history

**WHEN** I view current weather conditions for that city

- [x] **THEN** I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index

**WHEN** I view the UV index

- [x] **THEN** I am presented with a color that indicates whether the conditions are favorable, moderate, or severe

**WHEN** I view future weather conditions for that city

- [x] **THEN** I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity

**WHEN** I click on a city in the search history

- [x] **THEN** I am again presented with current and future conditions for that city

## Technologies Used

- Open Weather API - https://openweathermap.org/api
- Windy.com Widget - https://www.windy.com/-Embed-widget-on-page/widgets?-31.967,115.862,5
- WesBos EsLint Settings - https://github.com/wesbos/eslint-config-wesbos

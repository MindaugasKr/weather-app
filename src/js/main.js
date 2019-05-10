import CurrentLocation from './models/currentLocation.js';
import CurrentWeather from './models/currentWeather.js';
import WeatherForecast from './models/weatherForecast.js';
import PlaceGeolocation from './models/placeGeocoding.js';
import UV from './models/uv.js';

import * as searchView from './views/searchView.js';
import * as currentWeatherView from './views/currentWeatherView.js';
import * as hourlyWeatherView from './views/hourlyWeatherView.js';
import * as weekWeatherView from './views/weekWeatherView.js';
import * as backgroundView from './views/backgroundView.js';
import { elements, addLoadingIndicator, removeLoadingIndicator, convertTemp, formatTemp, getTempAbbreviation } from './views/base.js';

import { config } from './config.js';
import { placesAutocomplete } from './views/autosugestPlaces.js';

const customEventPolyfill = require("custom-event-polyfill");
const tzlookup = require("tz-lookup");

"use strict";

const state = {
  toCelsius: true,
  // To enable new search before last one ended
  // Used to detect if new search performed. If yes, previous controlSearch returns without updating UI.
  setSearchTimeStamp: function() {
    this.searchTimeStamp = new Date();
    return this.searchTimeStamp;
  },
  init: true
}


/**
 * Custom event for background change
 */
const uiUpdatedEvent = new CustomEvent("uiUpdated");


const updateUI = (currentWeatherData, currentUVData, forecastDate, toCelsius, timeZone) => {
  /**
   * Clear UI
   */

  // Clear input field
  placesAutocomplete.setVal('');

  // Clear current weather container
  currentWeatherView.clearContainer();
  // Clear hourly forecast container
  hourlyWeatherView.clearContainer();
  // Clear week forecast container
  weekWeatherView.clearContainer();


  /**
   * Add new information to UI
   */

  // Add current weather information
  currentWeatherView.renderCurrentWeather(currentWeatherData, currentUVData, toCelsius, timeZone);

  // Add hourly forecast information
  hourlyWeatherView.renderHourlyForecast(forecastDate, toCelsius, timeZone);

  // Add week forecast information
  weekWeatherView.renderWeekForecast(forecastDate, toCelsius, timeZone);


  // Send custom event
  elements.currentWeatherContainer.dispatchEvent(uiUpdatedEvent);
}



/** 
 * SEARCH CONTROLLER
 */
const controlSearch = async () => {
    
  addLoadingIndicator();

  // Set time stamp
  const searchTimeStamp = state.setSearchTimeStamp();

  /**
   * Get location for search queries
   */
  if (!state.init) {
    try {
      // Get location from search query 
      state.searchQueryPlace = searchView.getInput();

      // Get coordinates of search location
      state.placeGeolocation = new PlaceGeolocation();
      await state.placeGeolocation.getData(state.searchQueryPlace);

      // Set location coordinates
      state.queryLongitude = state.placeGeolocation.data.lon;
      state.queryLatitude = state.placeGeolocation.data.lat;
    // If retrieving coordinates failed:
    } catch (err) {
      console.error(err);

      alert('Failed to get weather data.');

      removeLoadingIndicator();

      return;
    }
  }


  /**
   * Get location for page load
   */
  if (state.init) {
    // Current user location
    try {

      // New current location onject
      state.currentLocation = new CurrentLocation();
      // Get current user location
      await state.currentLocation.getLocation();
      
      // Set location coordinates
      state.queryLongitude = state.currentLocation.longitude;
      state.queryLatitude = state.currentLocation.latitude;

    // Fallback if finding current location fails
    } catch (err) {

      console.error(err);

      // Retrieve last succesful searched location from browser
      if (localStorage.getItem("latitude") && localStorage.getItem("longitude")) {
        state.queryLongitude = localStorage.getItem("longitude");
        state.queryLatitude = localStorage.getItem("latitude");
      // Use default location
      } else {
        // Set location coordinates
        state.queryLongitude = config.defaultLongitude;
        state.queryLatitude = config.defaultLatitude;
      }
    }
    state.init = false;
  }
 

  // Stop current process if new search submitted
  if (searchTimeStamp !== state.searchTimeStamp) {
    removeLoadingIndicator();
    return;
  }


  /**
   * Get weather data
   */
  try {
    // New current weather object
    state.currentWeather = new CurrentWeather();
    // New current UV object
    state.currentUV = new UV();
    // New forecast object
    state.forecast = new WeatherForecast();

    await Promise.all([
      ( async () => {
        // Get Current weather
        await state.currentWeather.getData(state.queryLatitude, state.queryLongitude);
      })(),
      ( async () => {
        // Get current UV
        await state.currentUV.getData(state.queryLatitude, state.queryLongitude);
      })(),
      ( async () => {
        // Get forecast
        await state.forecast.getData(state.queryLatitude, state.queryLongitude);
      })()
    ])

    // console.log('cur l ', state.currentLocation);
    // console.log('geo ',state.placeGeolocation);
    // console.log('cur w ', state.currentWeather);
    // console.log('uv', state.currentUV);
    // console.log('for', state.forecast);
    // console.log('\n');

  // If getting weather data fails:
  } catch (err) {

    console.error(err);

    alert('Failed to get weather data.');

    removeLoadingIndicator();

    return;
  }


  // Stop current process if new search submitted
  if (searchTimeStamp !== state.searchTimeStamp) {
    removeLoadingIndicator();
    return;
  }

  

  // Save search coordinates for page load, incase retrieving current location fails
  localStorage.setItem("latitude", state.queryLatitude)  
  localStorage.setItem("longitude", state.queryLongitude)


  // Get time zone of query location
  state.timeZone = tzlookup(state.queryLatitude, state.queryLongitude);


  /**
   * Update UI
   */
  updateUI(state.currentWeather.data, state.currentUV.data, state.forecast.dataList, state.toCelsius, state.timeZone);

  // Remove loading indicator
  removeLoadingIndicator();
}

window.addEventListener('load', controlSearch);

['click', 'keydown'].forEach(event => {
  elements.searchForm.addEventListener(event, e => {
    if (e.target === elements.searchButton || e.target.parentNode === elements.searchButton || e.keyCode === 13) {
      controlSearch();
    }
  })
});



/**
 * UNIT CHANGE CONTROLLER
 */
const controlUnitChange = () => {
  // Get temperature elements
  const tempElList = document.querySelectorAll('.kelvin-temp-js');

  // Convert and format temperature values
  tempElList.forEach( element => {
    element.textContent = formatTemp(convertTemp(element.getAttribute("value"), state.toCelsius));
  });

  // Get temperature unit elements
  const unitElList = document.querySelectorAll('.temp-unit-js');

  // Convert units
  unitElList.forEach( element => {
    element.textContent = getTempAbbreviation(state.toCelsius);
  })
}

elements.unitBtnContainer.addEventListener('click', e => {
  if (e.target === elements.unitBtnCelsius && state.toCelsius === false ||
    e.target === elements.unitBtnFahrenheit && state.toCelsius === true) {
    if (e.target === elements.unitBtnCelsius) {
      state.toCelsius = true;
    } else {
      state.toCelsius = false;
    }
    elements.unitBtnCelsius.classList.toggle("unit__btn--active");
    elements.unitBtnFahrenheit.classList.toggle("unit__btn--active");
    controlUnitChange();
  }
})



/**
 * BACKGROUND IMAGE CONTROLLER
 */
const controlBackgroundImage = () => {
  const imageUrl = backgroundView.getImageUrl(state.currentWeather.data.conditionCodeOpenWeather, 'openweathermap.org');
  backgroundView.changeImage(imageUrl);
}

elements.currentWeatherContainer.addEventListener('uiUpdated', controlBackgroundImage);





/**
 * FOCUS HOURLY CONTROLLER / rejected
 */

/**
 * FOCUS WEEKLY CONTROLLER / rejected
 */
import { elements, convertToDate, formatDateMDDHHMM, convertTemp, formatTemp, convertWindToAbbreviation, formatWindSpeed } from './base.js';

export const clearContainer = () => { elements.hourlyWeatherContainer.innerHTML = ''; };

export const renderHourlyForecast = (dataList, toCelsius, timeZone) => {
  // Use first 8 elements of forecast as hourly forecast
  dataList.slice(0, 8).forEach( data => {
    elements.hourlyWeatherContainer.insertAdjacentHTML('beforeend', `
    <div class="weather-table__info-block">
      <span class="weather-table__info-text  weather-table__info-text--strong">${formatDateMDDHHMM(convertToDate(data.time, timeZone))}</span>
      <span class="weather-table__info-text"><img class="" src="${data.icon}" alt=""></span>
      <span class="weather-table__info-text  weather-table__info-text--strong"><span class="kelvin-temp-js" value=${data.temp}>${formatTemp(convertTemp(data.temp, toCelsius))}</span>&deg;</span>
      <span class="weather-table__info-text">${data.fall} mm</span>
      <span class="weather-table__info-text">${data.windDeg ? convertWindToAbbreviation(data.windDeg) : ''}</span>
      <span class="weather-table__info-text">${formatWindSpeed(data.windSpeed)} m/s</span>
    </div>
  `);
  });
};
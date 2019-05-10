import { elements, convertToDate, formatDateMDD, convertTemp, formatTemp, convertWindToAbbreviation, formatWindSpeed } from './base.js';

export const clearContainer = () => { elements.weekWeatherContainer.innerHTML = ''; };

export const renderWeekForecast = (dataList, toCelsius, timeZone) => {
  // Get forecast elements with time 12:00:00
  const filteredData = dataList.filter( data => {
    return data.timeText.includes('09:00:00');
  })
  
  // Add data for selected elements to UI
  filteredData.forEach( data => {
    elements.weekWeatherContainer.insertAdjacentHTML('beforeend', `
      <div class="weather-table__info-block">
        <span class="weather-table__info-text  weather-table__info-text--strong">${formatDateMDD(convertToDate(data.time, timeZone))}</span>
        <span class="weather-table__info-text"><img class="" src="${data.icon}" alt=""></span>
        <span class="weather-table__info-text  weather-table__info-text--strong"><span class="kelvin-temp-js" value=${data.temp}>${formatTemp(convertTemp(data.temp, toCelsius))}</span>&deg;</span>
        <span class="weather-table__info-text">${data.fall} mm</span>
        <span class="weather-table__info-text">${data.windDeg ? convertWindToAbbreviation(data.windDeg) : ''}</span>
        <span class="weather-table__info-text">${formatWindSpeed(data.windSpeed)} m/s</span>
      </div>
    `);
  });
};
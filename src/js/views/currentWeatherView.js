import { elements, convertToDate, formatDateYYYYMDDHHMM, formatDateHHMM, getDayLength, convertTemp, formatTemp, getTempAbbreviation, convertWindToAbbreviation, formatWindSpeed } from './base.js';

export const clearContainer = () => {elements.currentWeatherContainer.innerHTML = '';};

export const renderCurrentWeather = (data, uvData, toCelsius, timeZone) => {
  elements.currentWeatherContainer.innerHTML = `
    <div class="current__location-time">
      <span class="current__location">${data.city}, ${data.country}</span>
      <span class="current__time">${formatDateYYYYMDDHHMM(convertToDate(data.time, timeZone))}</span>
    </div>
    <div class="current__info-container">
      <div class="current__info-block">
        <div class="current__img-container"><img class="current__img  v-center"  src="${data.icon}" alt=""></div>
        <span class="current__temperature"><span class="kelvin-temp-js" value=${data.temp}>${formatTemp(convertTemp(data.temp, toCelsius))}</span>&deg;</span>
      </div>
      <div class="current__info-block">
        <h3>Weather conditions:</h3>
        <span class="current__info-text"><strong>Temperature:</strong> <span class="kelvin-temp-js" value=${data.tempMin}>${formatTemp(convertTemp(data.tempMin, toCelsius))}</span>&deg;<span class="temp-unit-js">${getTempAbbreviation(toCelsius)}</span> ... <span class="kelvin-temp-js" value=${data.tempMax}>${formatTemp(convertTemp(data.tempMax, toCelsius))}</span>&deg;<span class="temp-unit-js">${getTempAbbreviation(toCelsius)}</span></span>
        <span class="current__info-text"><strong>Rain fall:</strong> ${data.fall} mm</span>
        <span class="current__info-text"><strong>Humidity:</strong> ${data.humidity}%</span>
        <span class="current__info-text"><strong>Presure:</strong> ${data.pressure} mbar</span>
        <span class="current__info-text"><strong>Wind:</strong> ${data.windDeg ? convertWindToAbbreviation(data.windDeg) + ',' : ''} ${formatWindSpeed(data.windSpeed)} m/s</span>
        <span class="current__info-text"><strong>UV:</strong> ${uvData.uv}</span>
      </div>
      <div class="current__info-block">         
        <h3>Day info:</h3>     
        <span class="current__info-text"><strong>Sun rise:</strong> ${formatDateHHMM(convertToDate(data.sunrise, timeZone))}</span>
        <span class="current__info-text"><strong>Sun set:</strong> ${formatDateHHMM(convertToDate(data.sunset, timeZone))}</span>
        <span class="current__info-text"><strong>Day length:</strong> ${getDayLength(convertToDate(data.sunrise), convertToDate(data.sunset))}</span>
      </div>
    </div>
  `
}
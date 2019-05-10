export default function openweathermapAdapter (that, data) {

  that.raw = data;

  that.country = data.sys.country;
  that.city = data.name;
  that.time = data.dt; // unix, UTC
  that.timeText = data.dt_txt;

  that.icon = `http://openweathermap.org/img/w/${data.weather[0].icon}.png`;

  that.temp = data.main.temp; // K
  that.tempMax = data.main.temp_max; // K
  that.tempMin = data.main.temp_min; // K
  that.pressure = data.main.pressure; // hPa
  that.humidity = data.main.humidity; // %

  if (data.rain) {
    if (data.rain["1h"]) {
      that.fall = data.rain["1h"];
    } else if (data.rain["3h"]) {
      that.fall = data.rain["3h"];
    } else {
      that.fall = 0;
    }
  } else if (data.snow) {
    if (data.snow["1h"]) {
      that.fall = data.snow["1h"];
    } else if (data.snow["3h"]) {
      that.fall = data.snow["3h"];
    } else {
      that.fall = 0;
    }
  } else {
    that.fall = 0;
  }

  that.sunrise = data.sys.sunrise;
  that.sunset = data.sys.sunset;

  that.windDeg = data.wind.deg;
  that.windSpeed = data.wind.speed; // m/s


  that.conditionCodeOpenWeather = data.weather[0].id;
}
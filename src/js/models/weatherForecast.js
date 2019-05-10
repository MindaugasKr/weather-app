import { a } from './qwe.js';
import axios from 'axios';
import openweathermapAdapter from './openweathermapAdapter.js';

export default class WeatherForecast {
  constructor() {}

  async getData(latitude, longitude) {
    // const response = await fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${a.c}`);
    const response = await axios.get(`http://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${a.c}`);
    
    if (response.status !== 200) throw 'Invalid response from server';

    // const data = await response.json();
    const data = response.data;

    this.dataList = [];
    data.list.map( (item, index) => {
      this.dataList[index] = {};
      openweathermapAdapter(this.dataList[index], item);
    })

    this.raw = data;
  }
}
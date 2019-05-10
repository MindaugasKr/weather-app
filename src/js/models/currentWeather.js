import { a } from './qwe.js';
import axios from 'axios';
import openweathermapAdapter from './openweathermapAdapter.js';

export default class CurrentWeather {
  constructor() {}

  async getData(latitude, longitude) {
    // const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${a.c}`)
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${a.c}`)
    
    if (response.status !== 200) throw 'Invalid response from server';

    const data = response.data;
    // const data = await response.json();

    this.data = {}

    openweathermapAdapter(this.data, data);
  }
}
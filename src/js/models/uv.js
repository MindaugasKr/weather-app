import { a } from './qwe.js';
import axios from 'axios';

export default class UV {
  constructor() {}

  async getData(latitude, longitude) {
    // const response = await fetch(`http://api.openweathermap.org/data/2.5/uvi?lat=${latitude}&lon=${longitude}&appid=${a.c}`);
    const response = await axios.get(`http://api.openweathermap.org/data/2.5/uvi?lat=${latitude}&lon=${longitude}&appid=${a.c}`);
    
    if (response.status !== 200) throw 'Invalid response from server';

    const data = response.data;
    // const data = await response.json();

    this.raw = data;
    this.data = {};
    this.data.uv = data.value;
  }
}
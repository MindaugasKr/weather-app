import { a } from './qwe.js';
import axios from 'axios';

export default class CurrentLocation {
  constructor() {}

  async getLocation() {
    // const response = await fetch(`https://api.ipgeolocation.io/ipgeo?apiKey=${a.b}`);
    const response = await axios.get(`https://api.ipgeolocation.io/ipgeo?apiKey=${a.b}`);
    // console.log(response)
    if (response.status !== 200) throw 'Invalid response from server';

    const data = response.data;
    // const data = await response.json();

    this.city = data.city;
    this.latitude = data.latitude;
    this.longitude = data.longitude;
  }
}

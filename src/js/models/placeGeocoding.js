import { a } from './qwe.js';
import axios from 'axios';

export default class PlaceGeolocation {
  constructor() {}

  async getData(query) {
    // const response = await fetch(`https://eu1.locationiq.com/v1/search.php?key=${a.f}&q=${query}&format=json`);
    const response = await axios.get(`https://eu1.locationiq.com/v1/search.php?key=${a.f}&q=${query}&format=json`);
    
    if (response.status !== 200) throw 'Invalid response from server';

    const data = response.data;
    // const data = await response.json();

    this.raw = data;
    this.data = data[0];
  }
}
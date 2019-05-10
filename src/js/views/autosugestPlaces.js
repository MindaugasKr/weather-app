import { a } from '../models/qwe.js';
import { elements } from './base.js';

var places = require('places.js');
export const placesAutocomplete = places({
  appId: a.d,
  apiKey: a.e,
  container: elements.searchInput
});
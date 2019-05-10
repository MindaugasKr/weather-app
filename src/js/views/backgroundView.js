import { elements } from "./base";

// List of possible conditions and respective images
const imgListForOpenWeatherMap = [
  // range - both values included >= <=
  {
    range: [200, 232], // thunderstorm
    timeOfDay: 'both',
    url: 'brandon-morgan-15365-unsplash.jpg'
  },

  {
    range: [300, 321], // drizzel
    timeOfDay: 'both',
    url: 'milkovi-1143501-unsplash.jpg'
  },

  {
    range: [500, 504], // rain
    timeOfDay: 'both',
    url: 'gabriele-diwald-201135-unsplash.jpg'
  },
  {
    range: [511, 511], // freezing rain
    timeOfDay: 'both',
    url: 'val-vesa-1280252-unsplash.jpg'
  },
  {
    range: [520, 531], // shower rain
    timeOfDay: 'both',
    url: 'gabriele-diwald-201135-unsplash.jpg'
  },

  {
    range: [600, 602], // snow
    timeOfDay: 'both',
    url: 'jessica-fadel-453102-unsplash.jpg'
  },
  {
    range: [611, 622], // snow and rain
    timeOfDay: 'both',
    url: 'val-vesa-1280252-unsplash.jpg'
  },

  {
    range: [700, 781], // mist
    timeOfDay: 'both',
    url: 'john-westrock-1547565-unsplash.jpg'
  },

  {
    range: [800, 800], // clear
    timeOfDay: 'both',
    url: 'nicholas-kampouris-97080-unsplash.jpg'
  },

  {
    range: [801, 802], // clouds few
    timeOfDay: 'both',
    url: 'vincenzo-di-giorgi-51527-unsplash.jpg'
  },
  {
    range: [803, 804], // clouds overcast
    timeOfDay: 'both',
    url: 'barry-simon-310250-unsplash.jpg'
  },
];

// const baseUrl = '../img/backgrounds/';
const baseUrl = './img/backgrounds/';

export const getImageUrl = (id, apiProvider) => {
  let imgList;

  // Get image list
  if (apiProvider === 'openweathermap.org') {
    imgList = imgListForOpenWeatherMap;
  } else {
    throw 'No image list for defined api provider.';
  }

  for (let obj of imgList) {
    if (id >= obj.range[0] && id <= obj.range[1]) {
      // Change background image
      return baseUrl + obj.url;
    }
  }
  throw 'image not found';
};

export const changeImage = url => {
  elements.backgroundImg.src = url;
};
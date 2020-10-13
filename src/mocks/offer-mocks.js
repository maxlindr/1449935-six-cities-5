import {generateRandomInteger, getRandomArrayElements, generateAvatar, generateName} from './utils';

const MAX_RATING = 5;
const MAX_PHOTOS_COUNT = 6;
const MAX_DESCRIPTION_SENTENCES = 5;
const MAX_BEDROOMS = 3;
const MAX_GUESTS = 4;
const MIN_PRICE = 30;
const MAX_PRICE = 1000;

const PHOTOS = [
  `img/apartment-01.jpg`,
  `img/apartment-02.jpg`,
  `img/apartment-03.jpg`,
  `img/apartment-01.jpg`,
  `img/apartment-02.jpg`,
  `img/apartment-03.jpg`,
];

const THUMBNAILS = [
  `img/room-small.jpg`,
  `img/apartment-small-03.jpg`,
  `img/apartment-small-04.jpg`,
];

const TITLES = [
  `Beautiful & luxurious studio at great location`,
  `A quiet cozy and picturesque that hides behind a river`,
  `An independent House`,
  `Nulla porttitor aliquam consectetur`,
  `Duis sodales libero sed faucibus lacinia`,
];

const TYPES = [
  `apartment`,
  `room`,
  `house`,
  `hotel`
];

const FEATURES = [
  `Wifi`,
  `Heating`,
  `Kitchen`,
  `Cable TV`,
  `Fridge`,
  `Washing machine`,
  `Coffee machine`,
  `Dishwasher`,
  `Towels`,
  `Baby seat`
];

const CITIES = [
  `Paris`,
  `Cologne`,
  `Brussels`,
  `Amsterdam`,
  `Hamburg`,
  `Dusseldorf`
];

const generateRandomBoolean = () => Boolean(generateRandomInteger(0, 1));

const generateDescription = () => {
  const paragraphsCount = generateRandomInteger(1, 2);
  return Array(paragraphsCount).fill()
    .map(() => getRandomArrayElements(TITLES, generateRandomInteger(1, MAX_DESCRIPTION_SENTENCES)).join(`. `) + `.`);
};

const createHost = () => ({
  avatar: generateAvatar(),
  name: generateName(),
  super: generateRandomBoolean()
});

let id = 0;

export default () => ({
  id: String(id++),
  thumbnail: getRandomArrayElements(THUMBNAILS)[0],
  photos: getRandomArrayElements(PHOTOS, MAX_PHOTOS_COUNT),
  title: getRandomArrayElements(TITLES)[0],
  description: generateDescription(),
  premium: generateRandomBoolean(),
  type: getRandomArrayElements(TYPES)[0],
  rating: Number((Math.random() * MAX_RATING).toFixed(1)),
  bedrooms: generateRandomInteger(1, MAX_BEDROOMS),
  maxAdults: generateRandomInteger(1, MAX_GUESTS),
  price: generateRandomInteger(MIN_PRICE, MAX_PRICE),
  features: getRandomArrayElements(FEATURES, generateRandomInteger(1, FEATURES.length)),
  host: createHost(),
  location: {
    city: getRandomArrayElements(CITIES)[0]
  },
  favorite: generateRandomBoolean(),
  reviews: []
});

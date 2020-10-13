import {generateRandomInteger, getRandomArrayElements, generateAvatar, generateName, generateId} from './utils';

const TEXTS = [
  `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.`,
  `An independent House, strategically located between Rembrand Square and National Opera, but where the bustle of the city comes to rest in this alley flowery and colorful.`,
  `Nulla porttitor aliquam consectetur. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae.`,
  `Duis sodales libero sed faucibus lacinia. Quisque sodales sagittis metus, id molestie odio. Morbi pharetra velit et volutpat tristique.`,
];

const RANDOM_DATE_RANGE_MS = 1000 * 60 * 60 * 24 * 365 * 5;

const generateRandomDate = () => {
  const now = Date.now();
  return new Date(now - RANDOM_DATE_RANGE_MS * Math.random());
};

const MAX_RATING = 5;

const createMock = () => ({
  id: generateId(),
  avatar: generateAvatar(),
  author: generateName(),
  rating: generateRandomInteger(1, MAX_RATING),
  date: generateRandomDate(),
  text: getRandomArrayElements(TEXTS)[0]
});

export default (count) => new Array(count).fill().map(createMock);

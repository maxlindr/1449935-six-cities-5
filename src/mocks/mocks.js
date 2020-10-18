import {generateRandomInteger, getRandomArrayElements} from './utils';
import createReviewMocks from './review-mocks';
import createOfferMock from './offer-mocks';

const OFFERS_COUNT = 10;
const MAX_REVIEWS = 5;

export const reviews = [];

const createOfferWithReviews = () => {
  const offerReviews = createReviewMocks(generateRandomInteger(0, MAX_REVIEWS));
  offerReviews.forEach((review) => reviews.push(review));
  const offerReviewsIds = offerReviews.map((review) => review.id);

  return Object.assign({}, createOfferMock(), {reviews: offerReviewsIds});
};

export const offers = new Array(OFFERS_COUNT).fill().map(createOfferWithReviews);

const amsterdamOffers = offers.filter((offer) => offer.location.city.name === `Amsterdam`);

const extractOfferId = (item) => item.id;
const excludeOneFrom = (collection, exclude) => collection.filter((item) => item.id !== exclude.id);

offers.forEach((offer) => {
  const otherOffers = offer.location.city.name === `Amsterdam`
    ? excludeOneFrom(amsterdamOffers, offer.id)
    : excludeOneFrom(offers, offer.id);

  offer.nearPlaces = getRandomArrayElements(otherOffers, 3).map(extractOfferId);
});

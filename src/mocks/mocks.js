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

offers.forEach((offer) => {
  const otherOffers = offers.filter((item) => item.id !== offer.id);
  offer.nearPlaces = getRandomArrayElements(otherOffers, 3).map((item) => item.id);
});

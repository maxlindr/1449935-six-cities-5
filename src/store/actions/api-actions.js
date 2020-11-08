import {fetchOffer} from './api-actions/fetch-offer';
import {fetchOffers} from './api-actions/fetch-offers';
import {fetchNearbyPlaces} from './api-actions/fetch-nearby-places';
import {fetchReviewsList} from './api-actions/fetch-reviews-list';
import {postComment} from './api-actions/post-comment';
import {updateFavoriteStatus} from './api-actions/update-favorite-status';
import {checkAuth} from './api-actions/check-auth';
import {login} from './api-actions/login';

export {
  fetchOffer,
  fetchOffers,
  fetchNearbyPlaces,
  fetchReviewsList,
  postComment,
  updateFavoriteStatus,
  checkAuth,
  login,
};

export default {
  fetchOffer,
  fetchOffers,
  fetchNearbyPlaces,
  fetchReviewsList,
  postComment,
  updateFavoriteStatus,
  checkAuth,
  login,
};

import {ActionCreator} from './action';
import {AuthorizationStatus, AppRoute, APIRoute} from '../constants';
import {OfferAdapter, CommentAdapter} from '../services/api-data-adapters/';

export const HttpCode = {
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
};

const processResponseError = (dispatch, err) => {
  switch (err.response.status) {
    case HttpCode.UNAUTHORIZED:
      dispatch(ActionCreator.redirectToRoute(AppRoute.LOGIN));
      break;

    case HttpCode.NOT_FOUND:
      // alert(`Service unavailable`);
      break;

    default:
      throw err;
  }
};

export const fetchOffers = () => (dispatch, _getState, api) => (
  api.get(APIRoute.OFFERS)
    .then(({data}) => {
      dispatch(ActionCreator.loadOffers(
          OfferAdapter.arrayToClient(data)
      ));
    })
    .catch((err) => {
      processResponseError(dispatch, err);
    })
);

export const fetchNearbyPlaces = (id) => (dispatch, _getState, api) => (
  api.get(`/hotels/${id}/nearby`)
    .then(({data}) => {
      dispatch(ActionCreator.setFetchedNearbyPlaces(
          OfferAdapter.arrayToClient(data)
      ));
    })
    .catch((err) => {
      processResponseError(dispatch, err);
    })
);

export const fetchReviewsList = (id) => (dispatch, _getState, api) => (
  api.get(`/comments/${id}`)
    .then(({data}) => {
      dispatch(ActionCreator.setFetchedReviews(
          data.map(CommentAdapter.toClient)
      ));
    })
    .catch((err) => {
      processResponseError(dispatch, err);
    })
);

export const checkAuth = () => (dispatch, _getState, api) => (
  api.get(APIRoute.LOGIN)
    .then(({data}) => {
      dispatch(ActionCreator.setAuthorizationStatus(AuthorizationStatus.AUTHORIZED));
      dispatch(ActionCreator.setUserData(data));
    })
    .catch((err) => {
      if (err.response.status !== HttpCode.UNAUTHORIZED) {
        throw err;
      }
    })
);

export const login = (email, password) => (dispatch, _getState, api) => (
  api.post(APIRoute.LOGIN, {email, password})
    .then(({data}) => {
      dispatch(ActionCreator.setAuthorizationStatus(AuthorizationStatus.AUTHORIZED));
      dispatch(ActionCreator.setUserData(data));
      dispatch(ActionCreator.redirectToRoute(AppRoute.ROOT));
    })
    .catch((err) => {
      if (err.response.status !== HttpCode.UNAUTHORIZED) {
        throw err;
      }
    })
);

export const updateFavoriteStatus = (offerId, status) => (dispatch, _getState, api) => (
  api.post(`/favorite/${offerId}/${Number(status)}`)
    .catch((err) => {
      processResponseError(dispatch, err);
    })
);

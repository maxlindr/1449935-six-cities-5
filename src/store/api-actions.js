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
      // const message = `Resource not found`;
      // set message to redux store
      dispatch(ActionCreator.redirectToRoute(AppRoute.ERROR));
      break;

    default:
      // const message1 = `Oops! Something went wrong`;
      // set message to redux store
      dispatch(ActionCreator.redirectToRoute(AppRoute.ERROR));
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

export const checkAuth = () => (dispatch, _getState, api) => {
  dispatch(ActionCreator.setAuthorizationStatus(AuthorizationStatus.PENDING));

  api.get(APIRoute.LOGIN)
    .then(({data}) => {
      dispatch(ActionCreator.setAuthorizationStatus(AuthorizationStatus.AUTHORIZED));
      dispatch(ActionCreator.setUserData(data));
    })
    .catch((err) => {
      if (err.response.status !== HttpCode.UNAUTHORIZED) {
        dispatch(ActionCreator.redirectToRoute(AppRoute.ERROR));
      }
    });
};

export const login = (email, password) => (dispatch, _getState, api) => {
  dispatch(ActionCreator.setAuthorizationStatus(AuthorizationStatus.PENDING));

  api.post(APIRoute.LOGIN, {email, password})
    .then(({data}) => {
      dispatch(ActionCreator.setAuthorizationStatus(AuthorizationStatus.AUTHORIZED));
      dispatch(ActionCreator.setUserData(data));
      dispatch(ActionCreator.redirectToRoute(AppRoute.ROOT));
    })
    .catch((err) => {
      dispatch(ActionCreator.setAuthorizationStatus(AuthorizationStatus.NOT_AUTHORIZED));
      if (err.response.status === HttpCode.NOT_AUTHORIZED) {
        dispatch(ActionCreator.setLoginFailed(true));
      } else {
        dispatch(ActionCreator.redirectToRoute(AppRoute.ERROR));
      }
    });
};

export const updateFavoriteStatus = (offerId, status) => (dispatch, _getState, api) => (
  api.post(`/favorite/${offerId}/${Number(status)}`)
    .catch((err) => {
      processResponseError(dispatch, err);
    })
);

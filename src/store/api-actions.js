import {ActionCreator} from './action';
import {AuthorizationStatus, AppRoute, APIRoute, ErrorMessage} from '../constants';
import {OfferAdapter, CommentAdapter} from '../services/api-data-adapters/';

export const HttpCode = {
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
};

const handleErrorWithAlert = (dispatch, err) => {
  switch (err.response.status) {
    case HttpCode.UNAUTHORIZED:
      dispatch(ActionCreator.showAlert(ErrorMessage.UNAUTHORIZED));
      break;

    case HttpCode.NOT_FOUND:
      dispatch(ActionCreator.showAlert(ErrorMessage.NOT_FOUND));
      break;

    default:
      dispatch(ActionCreator.showAlert(ErrorMessage.GENERAL));
  }
};

const handleErrorWithPage = (dispatch, err) => {
  switch (err.response.status) {
    case HttpCode.UNAUTHORIZED:
      dispatch(ActionCreator.redirectToRoute(AppRoute.LOGIN));
      break;

    case HttpCode.NOT_FOUND:
      dispatch(ActionCreator.setErrorMessage(ErrorMessage.NOT_FOUND));
      dispatch(ActionCreator.redirectToRoute(AppRoute.ERROR));
      break;

    default:
      dispatch(ActionCreator.setErrorMessage(ErrorMessage.GENERAL));
      dispatch(ActionCreator.redirectToRoute(AppRoute.ERROR));
  }
};

export const fetchOffer = (id) => (dispatch, _getState, api) => (
  api.get(`/hotels/${id}`)
    .then(({data}) => {
      dispatch(ActionCreator.setFetchedOffer(
          OfferAdapter.toClient(data)
      ));
    })
    .catch((err) => {
      handleErrorWithPage(dispatch, err);
    })
);

export const fetchOffers = () => (dispatch, _getState, api) => (
  api.get(APIRoute.OFFERS)
    .then(({data}) => {
      dispatch(ActionCreator.loadOffers(
          OfferAdapter.arrayToClient(data)
      ));
    })
    .catch((err) => {
      handleErrorWithPage(dispatch, err);
    })
);

export const fetchNearbyPlaces = (id) => (dispatch, _getState, api) => (
  api.get(`/hotels/${id}/nearby`)
    .then(({data}) => {
      dispatch(ActionCreator.setFetchedNearbyPlaces(
          OfferAdapter.arrayToClient(data)
      ));
    })
    .catch(() => {
      dispatch(ActionCreator.showAlert(`Cannot fetch places in the neighbourhood`));
    })
);

export const fetchReviewsList = (id) => (dispatch, _getState, api) => (
  api.get(`/comments/${id}`)
    .then(({data}) => {
      dispatch(ActionCreator.setFetchedReviews(
          data.map(CommentAdapter.toClient)
      ));
    })
    .catch(() => {
      dispatch(ActionCreator.showAlert(`Cannot fetch reviews`));
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
        dispatch(ActionCreator.setErrorMessage(ErrorMessage.GENERAL));
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
        dispatch(ActionCreator.setErrorMessage(ErrorMessage.GENERAL));
        dispatch(ActionCreator.redirectToRoute(AppRoute.ERROR));
      }
    });
};

export const updateFavoriteStatus = (offerId, status) => (dispatch, _getState, api) => (
  api.post(`/favorite/${offerId}/${Number(status)}`)
    .then(({data}) => {
      dispatch(ActionCreator.updateOffer(
          OfferAdapter.toClient(data))
      );
    })
    .catch((err) => {
      handleErrorWithAlert(dispatch, err);
      throw err;
    })
);

export const postComment = (offerId, comment) => (dispatch, _getState, api) => (
  api.post(`/comments/${offerId}`, CommentAdapter.toServer(comment))
    .then(({data}) => {
      dispatch(ActionCreator.setFetchedReviews(
          data.map(CommentAdapter.toClient)
      ));
    })
    .catch((err) => {
      handleErrorWithAlert(dispatch, err);
      throw err;
    })
);

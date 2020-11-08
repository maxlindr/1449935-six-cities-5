import {APIRoute, AppRoute, AuthorizationStatus, ErrorMessage, HttpCode} from '../../../constants';
import {ActionCreator} from '../action';

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

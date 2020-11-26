import {APIRoute, AppRoute, AuthorizationStatus, ErrorMessage, HttpCode} from '../../../constants';
import {ActionCreator} from '../action';

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

      if (
        err.response &&
        err.response.status === HttpCode.NOT_AUTHORIZED
      ) {
        dispatch(ActionCreator.setLoginFailed(true));
      } else {
        dispatch(ActionCreator.setErrorMessage(ErrorMessage.GENERAL));
        dispatch(ActionCreator.goToRoute(AppRoute.ERROR));
      }
    });
};

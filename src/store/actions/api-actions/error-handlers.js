import {HttpCode, AppRoute, ErrorMessage} from '../../../constants';
import {ActionCreator} from '../action';

export const handleErrorWithAlert = (dispatch, err) => {
  if (!err.response) {
    dispatch(ActionCreator.setErrorMessage(ErrorMessage.GENERAL));
    dispatch(ActionCreator.redirectToRoute(AppRoute.ERROR));
    return;
  }

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

export const handleErrorWithPage = (dispatch, err) => {
  if (!err.response) {
    dispatch(ActionCreator.setErrorMessage(ErrorMessage.GENERAL));
    dispatch(ActionCreator.redirectToRoute(AppRoute.ERROR));
    return;
  }

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

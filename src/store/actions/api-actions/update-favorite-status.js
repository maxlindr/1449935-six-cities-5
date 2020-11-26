import {handleErrorWithAlert} from './error-handlers';
import {OfferAdapter} from '../../../services/api-data-adapters';
import {ActionCreator} from '../action';
import {AppRoute, HttpCode} from '../../../constants';

export const updateFavoriteStatus = (offerId, status) => (dispatch, _getState, api) => (
  api.post(`/favorite/${offerId}/${Number(status)}`)
    .then(({data}) => {
      dispatch(
          ActionCreator.updateOffer(
              OfferAdapter.toClient(data)
          )
      );
    })
    .catch((err) => {
      if (
        err.response &&
        err.response.status === HttpCode.UNAUTHORIZED
      ) {
        dispatch(
            ActionCreator.goToRoute(AppRoute.LOGIN)
        );
      } else {
        handleErrorWithAlert(dispatch, err);
      }
    })
);

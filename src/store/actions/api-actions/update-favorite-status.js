import {handleErrorWithAlert} from './error-handlers';
import {OfferAdapter} from '../../../services/api-data-adapters';
import {ActionCreator} from '../action';


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

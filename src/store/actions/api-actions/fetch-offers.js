import {ActionCreator} from '../action';
import {OfferAdapter} from '../../../services/api-data-adapters';
import {APIRoute} from '../../../constants';

export const fetchOffers = () => (dispatch, _getState, api) => (
  api.get(APIRoute.OFFERS)
    .then(({data}) => {
      dispatch(ActionCreator.loadOffers(
          OfferAdapter.arrayToClient(data)
      ));
    })
);

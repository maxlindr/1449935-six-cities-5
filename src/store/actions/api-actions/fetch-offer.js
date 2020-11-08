import {ActionCreator} from '../action';
import {OfferAdapter} from '../../../services/api-data-adapters';
import {handleErrorWithPage} from './error-handlers';

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

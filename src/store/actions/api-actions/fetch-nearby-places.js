import {ActionCreator} from '../action';
import {OfferAdapter} from '../../../services/api-data-adapters';

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

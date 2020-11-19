import {ActionType} from '../../actions/action';

const initialState = {
  offer: null,
  reviews: null,
  nearbyPlaces: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SET_FETCHED_OFFER:
      return Object.assign({}, state, {
        offer: action.payload
      });

    case ActionType.SET_FETCHED_REVIEWS:
      return Object.assign({}, state, {
        reviews: action.payload
      });

    case ActionType.SET_FETCHED_NEARBY_PLACES:
      return Object.assign({}, state, {
        nearbyPlaces: action.payload
      });

    case ActionType.RESET_OFFER_PAGE_STORE:
      return initialState;
  }

  return state;
};

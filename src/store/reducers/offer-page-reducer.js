import {ActionType} from '../action';

const initialState = {
  reviews: null,
  nearbyPlaces: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SET_FETCHED_REVIEWS:
      return Object.assign({}, state, {
        reviews: action.payload
      });

    case ActionType.SET_FETCHED_NEARBY_PLACES:
      return Object.assign({}, state, {
        nearbyPlaces: action.payload
      });
  }

  return state;
};

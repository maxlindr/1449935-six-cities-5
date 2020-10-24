import {ActionType} from './action';

const reducer = (state, action) => {
  switch (action.type) {
    case ActionType.CHANGE_CITY:
      return Object.assign({}, state, {currentCity: action.payload});
    case ActionType.UPDATE_LOCAL_OFFERS:
      return Object.assign({}, state, {localOffers: action.payload});
    case ActionType.UPDATE_OFFER:
      const newOffer = action.payload;
      const newOffers = state.offers.map((item) => (item.id === newOffer.id) ? newOffer : item);
      return Object.assign({}, state, {offers: newOffers});
  }

  return state;
};


export {reducer};

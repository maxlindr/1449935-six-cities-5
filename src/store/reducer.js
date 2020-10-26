import {ActionType} from './action';

const reducer = (state, action) => {
  switch (action.type) {
    case ActionType.CHANGE_CITY:
      return Object.assign({}, state, {currentCity: action.payload});
    case ActionType.UPDATE_LOCAL_OFFERS:
      return Object.assign({}, state, {localOffers: action.payload});
    case ActionType.UPDATE_OFFER:
      const newOffer = action.payload;
      const offersCopy = state.offers.slice();
      const targetOfferIndex = offersCopy.findIndex((item) => item.id === newOffer.id);
      offersCopy[targetOfferIndex] = newOffer;
      return Object.assign({}, state, {offers: offersCopy});
  }

  return state;
};


export {reducer};

import {ActionType} from '../../action';
import {replaceOffer, getCitiesLocationData} from './utils';

const CITY_NAMES = [`Paris`, `Cologne`, `Brussels`, `Amsterdam`, `Hamburg`, `Dusseldorf`];

const initialState = {
  currentCity: CITY_NAMES[0],
  cities: CITY_NAMES,
  offers: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_CITY:
      return Object.assign({}, state, {
        currentCity: action.payload
      });

    case ActionType.UPDATE_LOCAL_OFFERS:
      return Object.assign({}, state, {
        localOffers: action.payload
      });

    case ActionType.UPDATE_OFFER:
      return Object.assign({}, state, {
        offers: replaceOffer(state.offers, action.payload)
      });

    case ActionType.LOAD_OFFERS:
      return Object.assign({}, state, {
        offers: action.payload
      });

    case ActionType.INIT_CITIES:
      return Object.assign({}, state, {
        cities: getCitiesLocationData(state.offers, CITY_NAMES)
      });
  }

  return state;
};

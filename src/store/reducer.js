import {ActionType} from './action';

const reducer = (state, action) => {
  switch (action.type) {
    case ActionType.CHANGE_CITY:
      return Object.assign({}, state, {currentCity: action.payload});
    case ActionType.UPDATE_LOCAL_OFFERS:
      return Object.assign({}, state, {localOffers: action.payload});
  }

  return state;
};


export {reducer};

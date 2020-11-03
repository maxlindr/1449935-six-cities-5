import {combineReducers} from 'redux';
import dataReducer from './data-reducer/data-reducer';
import userReducer from './user-reducer';
import offerPageReducer from './offer-page-reducer';

export const StateNameSpace = {
  DATA: `DATA`,
  USER: `USER`,
  OFFER_PAGE: `OFFER_PAGE`
};

export default combineReducers({
  [StateNameSpace.DATA]: dataReducer,
  [StateNameSpace.USER]: userReducer,
  [StateNameSpace.OFFER_PAGE]: offerPageReducer,
});

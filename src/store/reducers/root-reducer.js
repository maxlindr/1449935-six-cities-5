import {combineReducers} from 'redux';
import dataReducer from './data-reducer/data-reducer';
import userReducer from './user-reducer';
import offerPageReducer from './offer-page-reducer';
import loginReducer from './login-reducer';
import errorPageReducer from './error-page-reducer';

export const StateNameSpace = {
  DATA: `DATA`,
  USER: `USER`,
  OFFER_PAGE: `OFFER_PAGE`,
  LOGIN_PROCESSING: `LOGIN_PROCESSING`,
  ERROR_PAGE: `ERROR_PAGE`,
};

export default combineReducers({
  [StateNameSpace.DATA]: dataReducer,
  [StateNameSpace.USER]: userReducer,
  [StateNameSpace.OFFER_PAGE]: offerPageReducer,
  [StateNameSpace.LOGIN_PROCESSING]: loginReducer,
  [StateNameSpace.ERROR_PAGE]: errorPageReducer,
});

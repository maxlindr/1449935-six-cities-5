import {combineReducers} from 'redux';
import dataReducer from './data-reducer/data-reducer';
import userReducer from './user-reducer/user-reducer';
import offerPageReducer from './offer-page-reducer/offer-page-reducer';
import loginReducer from './login-reducer/login-reducer';
import errorPageReducer from './error-page-reducer/error-page-reducer';
import appReducer from './app-reducer/app-reducer';

export const StateNameSpace = {
  DATA: `DATA`,
  USER: `USER`,
  OFFER_PAGE: `OFFER_PAGE`,
  LOGIN_PROCESSING: `LOGIN_PROCESSING`,
  ERROR_PAGE: `ERROR_PAGE`,
  APP: `APP`
};

export default combineReducers({
  [StateNameSpace.DATA]: dataReducer,
  [StateNameSpace.USER]: userReducer,
  [StateNameSpace.OFFER_PAGE]: offerPageReducer,
  [StateNameSpace.LOGIN_PROCESSING]: loginReducer,
  [StateNameSpace.ERROR_PAGE]: errorPageReducer,
  [StateNameSpace.APP]: appReducer,
});

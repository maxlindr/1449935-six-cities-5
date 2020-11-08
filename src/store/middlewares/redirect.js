import browserHistory from '../../browser-history';
import {ActionType} from '../actions/action';

export const redirect = () => (next) => (action) => {
  if (action.type === ActionType.REDIRECT_TO_ROUTE) {
    browserHistory.replace(action.payload);
  }

  return next(action);
};

import browserHistory from '../../browser-history';
import {ActionType} from '../actions/action';

export const goToRoute = () => (next) => (action) => {
  if (action.type === ActionType.GO_TO_ROUTE) {
    browserHistory.push(action.payload);
  }

  return next(action);
};

import {AuthorizationStatus} from '../../constants';
import {ActionType} from '../actions/action';

const initialState = {
  user: null,
  authorizationStatus: AuthorizationStatus.NOT_AUTHORIZED,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SET_AUTHORIZATION_STATUS:
      return Object.assign({}, state, {
        authorizationStatus: action.payload,
      });

    case ActionType.SET_USER_DATA:
      return Object.assign({}, state, {
        user: action.payload,
      });
  }

  return state;
};

export default reducer;

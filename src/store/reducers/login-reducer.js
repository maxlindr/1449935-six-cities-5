import {ActionType} from '../action';

const initialState = {
  isLoginFailedWithUnauthorized: false,
};

export default (state = initialState, action) => {
  if (action.type === ActionType.SET_LOGIN_FAILED) {
    return Object.assign({}, state, {
      isLoginFailedWithUnauthorized: action.payload
    });
  }

  return state;
};

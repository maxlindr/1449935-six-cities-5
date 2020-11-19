import {ActionType} from '../../actions/action';

const initialState = {
  message: ``,
};

export default (state = initialState, action) => {
  if (action.type === ActionType.SET_ERROR_MESSAGE) {
    return Object.assign({}, state, {
      message: action.payload
    });
  }

  return state;
};

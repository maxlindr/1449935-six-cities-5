import {ActionType} from '../action';

const initialState = {
  alertMessage: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SHOW_ALERT:
      return Object.assign({}, state, {
        alertMessage: action.payload,
      });

    case ActionType.CLOSE_ALERT:
      return Object.assign({}, state, {
        alertMessage: null,
      });
  }

  return state;
};

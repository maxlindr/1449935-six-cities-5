import {ActionType} from './actions';

const MIN_COMMENT_LENGTH = 50;
const MAX_COMMENT_LENGTH = 300;

export const INITIAL_STATE = {
  rating: null,
  text: ``,
  isValid: false,
  isPending: false,
};

const checkCommentValidity = (text) => {
  const trimmedText = text.trim();

  return (
    trimmedText.length >= MIN_COMMENT_LENGTH &&
    trimmedText.length <= MAX_COMMENT_LENGTH
  );
};

export default (state, action) => {
  switch (action.type) {
    case ActionType.SET_RATING:
      return Object.assign({}, state, {
        rating: action.payload
      });
    case ActionType.SET_TEXT:
      return Object.assign({}, state, {
        text: action.payload
      });
    case ActionType.SET_VALID:
      return Object.assign({}, state, {
        isValid: action.payload
      });
    case ActionType.SET_PENDING:
      return Object.assign({}, state, {
        isPending: action.payload
      });
    case ActionType.RESET:
      return INITIAL_STATE;
    case ActionType.VALIDATE:
      return Object.assign({}, state, {
        isValid: checkCommentValidity(state.text) && state.rating > 0
      });
    default:
      return state;
  }
};

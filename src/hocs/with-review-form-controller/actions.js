export const ActionType = {
  SET_RATING: `SET_RATING`,
  SET_TEXT: `SET_TEXT`,
  SET_VALID: `SET_VALID`,
  SET_PENDING: `SET_PENDING`,
  VALIDATE: `VALIDATE`,
  RESET: `RESET`,
};

export const ActionCreator = {
  setRating: (rating) => ({
    type: ActionType.SET_RATING,
    payload: rating
  }),
  setText: (text) => ({
    type: ActionType.SET_TEXT,
    payload: text
  }),
  setPending: (value) => ({
    type: ActionType.SET_PENDING,
    payload: value
  }),
  validate: () => ({
    type: ActionType.VALIDATE
  }),
  reset: () => ({
    type: ActionType.RESET
  }),
};

import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import ApiActions from '../../store/actions/api-actions';

const MIN_COMMENT_LENGTH = 50;
const MAX_COMMENT_LENGTH = 300;

const INITIAL_STATE = {
  rating: null,
  text: ``,
  isValid: false,
  isPending: false,
};

const ActionType = {
  SET_RATING: `SET_RATING`,
  SET_TEXT: `SET_TEXT`,
  SET_VALID: `SET_VALID`,
  SET_PENDING: `SET_PENDING`,
  VALIDATE: `VALIDATE`,
  RESET: `RESET`,
};

const ActionCreator = {
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

function reducer(state, action) {
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
      throw new Error(`Action with type "${action.type}" not exists`);
  }
}

const checkCommentValidity = (text) => {
  const trimmedText = text.trim();

  return (
    trimmedText.length >= MIN_COMMENT_LENGTH &&
    trimmedText.length <= MAX_COMMENT_LENGTH
  );
};

const withReviewFormController = (Component) => {
  const WithReviewFormController = (props) => {
    const [state, dispatch] = React.useReducer(reducer, INITIAL_STATE);

    const handleSubmit = React.useCallback((evt) => {
      evt.preventDefault();

      const {offerId, postComment} = props;

      const comment = {
        text: state.text,
        rating: state.rating
      };

      const submitComment = () =>
        postComment(offerId, comment)
          .then(() => dispatch(
              ActionCreator.reset()
          ))
          .catch(() => dispatch(
              ActionCreator.setPending(false)
          ));

      dispatch(
          ActionCreator.setPending(true)
      );

      submitComment();
    }, []);

    const handleRatingClick = React.useCallback((evt) => {
      dispatch(ActionCreator.setRating(
          Number(evt.target.value)
      ));

      dispatch(ActionCreator.validate());
    }, []);

    const handleTextChange = React.useCallback((evt) => {
      dispatch(
          ActionCreator.setText(evt.target.value)
      );

      dispatch(ActionCreator.validate());
    }, []);

    const {text, rating, isValid, isPending} = state;

    return (
      <Component
        text={text}
        rating={rating}
        isValid={isValid}
        disabled={isPending}
        onTextChange={handleTextChange}
        onRatingClick={handleRatingClick}
        onSubmit={handleSubmit}
      />
    );
  };

  WithReviewFormController.propTypes = {
    offerId: PropTypes.string.isRequired,
    postComment: PropTypes.func.isRequired,
  };

  return WithReviewFormController;
};

const mapDispatchToProps = (dispatch) => ({
  postComment(offerId, comment) {
    return dispatch(ApiActions.postComment((offerId, comment)));
  }
});

export {withReviewFormController};

export default (WrappedComponent) => connect(null, mapDispatchToProps)(
    withReviewFormController(WrappedComponent)
);

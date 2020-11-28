import React, {useCallback} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import ApiActions from '../../store/actions/api-actions';
import reducer, {INITIAL_STATE} from './with-review-form-controller-reducer';
import {ActionCreator} from './actions';

const withReviewFormController = (Component) => {
  const WithReviewFormController = (props) => {
    const [state, dispatch] = React.useReducer(reducer, INITIAL_STATE);
    const {text, rating, isValid, isPending} = state;

    const handleSubmit = useCallback((evt) => {
      evt.preventDefault();

      const {offerId, postComment} = props;
      const comment = {text, rating};

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
    }, [text, rating]);

    const handleRatingClick = useCallback((evt) => {
      dispatch(
          ActionCreator.setRating(
              Number(evt.target.value)
          )
      );

      dispatch(
          ActionCreator.validate()
      );
    }, []);

    const handleTextChange = useCallback((evt) => {
      dispatch(
          ActionCreator.setText(evt.target.value)
      );

      dispatch(
          ActionCreator.validate()
      );
    }, []);

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
    return dispatch(
        ApiActions.postComment(offerId, comment)
    );
  }
});

export {withReviewFormController};

export default (WrappedComponent) => connect(null, mapDispatchToProps)(
    withReviewFormController(WrappedComponent)
);

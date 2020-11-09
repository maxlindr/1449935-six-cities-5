import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import ApiActions from '../../store/actions/api-actions';

const MIN_COMMENT_LENGTH = 50;
const MAX_COMMENT_LENGTH = 300;

const checkCommentValidity = (text) => {
  const trimmedText = text.trim();

  return (
    trimmedText.length >= MIN_COMMENT_LENGTH &&
    trimmedText.length <= MAX_COMMENT_LENGTH
  );
};

const INITIAL_STATE = {
  rating: null,
  text: ``,
  isValid: false,
  isPending: false,
};

const withReviewFormController = (Component) => {
  class WithReviewFormController extends React.PureComponent {
    constructor(props) {
      super(props);

      this.state = INITIAL_STATE;

      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleRatingClick = this.handleRatingClick.bind(this);
      this.handleTextChange = this.handleTextChange.bind(this);
    }

    handleSubmit(evt) {
      evt.preventDefault();

      const {offerId, postComment} = this.props;

      const comment = {
        text: this.state.text,
        rating: this.state.rating
      };

      const submitComment = () =>
        postComment(offerId, comment)
          .then(() => this.setState(INITIAL_STATE))
          .catch(() =>
            this.setState({
              isPending: false,
            })
          );

      this.setState({isPending: true}, submitComment);
    }

    handleRatingClick(evt) {
      this.setState({rating: Number(evt.target.value)}, this.validate);
    }

    handleTextChange(evt) {
      this.setState({text: evt.target.value}, this.validate);
    }

    validate() {
      const {rating, text} = this.state;

      this.setState({
        isValid: checkCommentValidity(text) && rating > 0
      });
    }

    render() {
      const {text, rating, isValid, isPending} = this.state;

      return (
        <Component
          text={text}
          rating={rating}
          isValid={isValid}
          disabled={isPending}
          onTextChange={this.handleTextChange}
          onRatingClick={this.handleRatingClick}
          onSubmit={this.handleSubmit}
        />
      );
    }
  }

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

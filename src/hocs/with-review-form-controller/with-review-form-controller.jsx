import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {postComment} from '../../store/api-actions';

const INITIAL_STATE = {
  rating: null,
  text: ``,
  isValid: false,
  isDisabled: false,
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

      const {offerId, dispatch} = this.props;

      const comment = {
        text: this.state.text,
        rating: this.state.rating
      };

      const submitComment = () => {
        dispatch(postComment(offerId, comment))
          .then(() => this.setState(INITIAL_STATE))
          .catch(() => this.setState({
            isDisabled: false
          }));
      };

      this.setState({isDisabled: true}, submitComment);
    }

    handleRatingClick(evt) {
      this.setState({rating: Number(evt.target.value)}, this.validate);
    }

    handleTextChange(evt) {
      this.setState({text: evt.target.value}, this.validate);
    }

    validate() {
      const {rating, text} = this.state;

      this.setState({isValid: Boolean(text.trim() && rating)});
    }

    render() {
      const {text, rating, isValid, isDisabled} = this.state;

      return (
        <Component
          text={text}
          rating={rating}
          isValid={isValid}
          disabled={isDisabled}
          onTextChange={this.handleTextChange}
          onRatingClick={this.handleRatingClick}
          onSubmit={this.handleSubmit}
        />
      );
    }
  }

  WithReviewFormController.propTypes = {
    offerId: PropTypes.string.isRequired,
    dispatch: PropTypes.func.isRequired,
  };

  return connect()(WithReviewFormController);
};

export default withReviewFormController;

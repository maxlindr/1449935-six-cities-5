import React from 'react';

const INITIAL_STATE = {
  rating: null,
  text: ``,
  isValid: false
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
      // todo: отправляем данные
      this.setState(INITIAL_STATE);
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
      const {text, rating, isValid} = this.state;

      return (
        <Component
          text={text}
          rating={rating}
          isValid={isValid}
          onTextChange={this.handleTextChange}
          onRatingClick={this.handleRatingClick}
          onSubmit={this.handleSubmit}
        />
      );
    }
  }

  return WithReviewFormController;
};

export default withReviewFormController;

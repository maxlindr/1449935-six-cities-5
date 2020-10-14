import React from 'react';

const INITIAL_STATE = {
  rating: null,
  text: ``,
};

const starLabelTitle = {
  5: `perfect`,
  4: `good`,
  3: `not bad`,
  2: `badly`,
  1: `terribly`
};

class ReviewForm extends React.PureComponent {
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

    return text.trim() && rating;
  }

  render() {
    const {text, rating} = this.state;

    return (
      <form className="reviews__form form" action="#" method="post" onSubmit={this.handleSubmit}>
        <label className="reviews__label form__label" htmlFor="review">Your review</label>

        <div className="reviews__rating-form form__rating">
          {Array(5).fill().map((val, i) => i + 1).reverse().map((starValue) => (
            <React.Fragment key={starValue}>
              <input
                className="form__rating-input visually-hidden"
                name="rating"
                id={`${starValue}-stars`}
                type="radio"
                defaultValue={starValue}
                checked={rating === starValue}
                onChange={this.handleRatingClick}
              />

              <label
                htmlFor={`${starValue}-stars`}
                className="reviews__rating-label form__rating-label"
                title={starLabelTitle[starValue]}>
                <svg className="form__star-image" width={37} height={33}>
                  <use xlinkHref="#icon-star" />
                </svg>
              </label>
            </React.Fragment>
          ))}
        </div>

        <textarea
          className="reviews__textarea form__textarea"
          id="review" name="review"
          placeholder="Tell how was your stay, what you like and what can be improved"
          value={text}
          onChange={this.handleTextChange}
        />

        <div className="reviews__button-wrapper">
          <p className="reviews__help">
            To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
          </p>
          <button
            className="reviews__submit form__submit button"
            type="submit"
            disabled={!this.validate()}>
            Submit
          </button>
        </div>
      </form>
    );
  }
}

export default ReviewForm;

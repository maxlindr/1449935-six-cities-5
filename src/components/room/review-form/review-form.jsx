import React from 'react';
// import PropTypes from 'prop-types';

const INITIAL_STATE = {
  rating: null,
  text: ``,
};

const Rating = {
  VALUE_1: 1,
  VALUE_2: 2,
  VALUE_3: 3,
  VALUE_4: 4,
  VALUE_5: 5
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
          <input className="form__rating-input visually-hidden" name="rating" id="5-stars" type="radio"
            defaultValue={Rating.VALUE_5}
            checked={rating === Rating.VALUE_5}
            onChange={this.handleRatingClick}
          />

          <label htmlFor="5-stars" className="reviews__rating-label form__rating-label" title="perfect">
            <svg className="form__star-image" width={37} height={33}>
              <use xlinkHref="#icon-star" />
            </svg>
          </label>

          <input className="form__rating-input visually-hidden" name="rating" id="4-stars" type="radio"
            defaultValue={Rating.VALUE_4}
            checked={rating === Rating.VALUE_4}
            onChange={this.handleRatingClick}
          />

          <label htmlFor="4-stars" className="reviews__rating-label form__rating-label" title="good">
            <svg className="form__star-image" width={37} height={33}>
              <use xlinkHref="#icon-star" />
            </svg>
          </label>

          <input className="form__rating-input visually-hidden" name="rating" id="3-stars" type="radio"
            defaultValue={Rating.VALUE_3}
            checked={rating === Rating.VALUE_3}
            onChange={this.handleRatingClick}
          />

          <label htmlFor="3-stars" className="reviews__rating-label form__rating-label" title="not bad">
            <svg className="form__star-image" width={37} height={33}>
              <use xlinkHref="#icon-star" />
            </svg>
          </label>

          <input className="form__rating-input visually-hidden" name="rating" id="2-stars" type="radio"
            defaultValue={Rating.VALUE_2}
            checked={rating === Rating.VALUE_2}
            onChange={this.handleRatingClick}
          />

          <label htmlFor="2-stars" className="reviews__rating-label form__rating-label" title="badly">
            <svg className="form__star-image" width={37} height={33}>
              <use xlinkHref="#icon-star" />
            </svg>
          </label>

          <input className="form__rating-input visually-hidden" name="rating" id="1-star" type="radio"
            defaultValue={Rating.VALUE_1}
            checked={rating === Rating.VALUE_1}
            onChange={this.handleRatingClick}
          />

          <label htmlFor="1-star" className="reviews__rating-label form__rating-label" title="terribly">
            <svg className="form__star-image" width={37} height={33}>
              <use xlinkHref="#icon-star" />
            </svg>
          </label>
        </div>

        <textarea
          className="reviews__textarea form__textarea"
          id="review" name="review" placeholder="Tell how was your stay, what you like and what can be improved"
          value={text}
          onChange={this.handleTextChange}
        />

        <div className="reviews__button-wrapper">
          <p className="reviews__help">
            To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
          </p>
          <button className="reviews__submit form__submit button" type="submit" disabled={!this.validate()}>Submit</button>
        </div>
      </form>
    );
  }
}

export default ReviewForm;

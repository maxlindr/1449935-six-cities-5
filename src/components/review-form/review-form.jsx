import React from 'react';
import PropTypes from 'prop-types';

const starLabelTitle = {
  5: `perfect`,
  4: `good`,
  3: `not bad`,
  2: `badly`,
  1: `terribly`
};

const ReviewForm = (props) => {
  const {text, rating, isValid, onTextChange, onRatingClick, onSubmit} = props;

  return (
    <form className="reviews__form form" action="#" method="post" onSubmit={onSubmit}>
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
              onChange={onRatingClick}
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
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={text}
        onChange={onTextChange}
      />

      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={!isValid}>
          Submit
        </button>
      </div>
    </form>
  );
};

ReviewForm.propTypes = {
  text: PropTypes.string.isRequired,
  rating: PropTypes.number,
  isValid: PropTypes.bool.isRequired,
  onTextChange: PropTypes.func.isRequired,
  onRatingClick: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
};

export default ReviewForm;

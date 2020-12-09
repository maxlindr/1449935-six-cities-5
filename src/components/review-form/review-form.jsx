import React from 'react';
import PropTypes from 'prop-types';
import ReviewFormRating from '../review-form-rating/review-form-rating';
import ReviewFormButtonWrapper from '../review-form-button-wrapper/review-form-button-wrapper';
import withReviewFormController from '../../hocs/with-review-form-controller/with-review-form-controller';

const ReviewForm = (props) => {
  const {text, rating, isValid, onTextChange, onRatingClick, onSubmit, disabled} = props;

  return (
    <form className="reviews__form form" action="#" method="post" onSubmit={onSubmit}>
      <label className="reviews__label form__label" htmlFor="review">Your review</label>

      <ReviewFormRating
        rating={rating}
        onClick={onRatingClick}
        disabled={disabled}
      />

      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={text}
        onChange={onTextChange}
        disabled={disabled}
      />

      <ReviewFormButtonWrapper disabled={disabled || !isValid} />
    </form>
  );
};

ReviewForm.propTypes = {
  text: PropTypes.string.isRequired,
  rating: PropTypes.number,
  isValid: PropTypes.bool.isRequired,
  disabled: PropTypes.bool.isRequired,
  onTextChange: PropTypes.func.isRequired,
  onRatingClick: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
};

export {ReviewForm};
export default withReviewFormController(ReviewForm);

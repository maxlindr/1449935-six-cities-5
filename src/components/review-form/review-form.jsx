import React from 'react';
import PropTypes from 'prop-types';
import ReviewFormRating from '../review-form-rating/review-form-rating';
import ReviewFormButtonWrapper from '../review-form-button-wrapper/review-form-button-wrapper';
import withReviewFormController from '../../hocs/with-review-form-controller/with-review-form-controller';

const ReviewForm = (props) => {
  const {text, rating, isValid, onTextChange, onRatingClick, onSubmit} = props;

  return (
    <form className="reviews__form form" action="#" method="post" onSubmit={onSubmit}>
      <label className="reviews__label form__label" htmlFor="review">Your review</label>

      <ReviewFormRating rating={rating} onClick={onRatingClick} />

      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={text}
        onChange={onTextChange}
      />

      <ReviewFormButtonWrapper isValid={isValid} />
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

export {ReviewForm};
export default withReviewFormController(ReviewForm);

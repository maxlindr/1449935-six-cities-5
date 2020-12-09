import React from 'react';
import PropTypes from 'prop-types';

const ReviewFormButtonWrapper = ({disabled}) => (
  <div className="reviews__button-wrapper">
    <p className="reviews__help">
      To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
    </p>

    <button
      className="reviews__submit form__submit button"
      type="submit"
      disabled={disabled}
    >
      Submit
    </button>
  </div>
);

ReviewFormButtonWrapper.propTypes = {
  disabled: PropTypes.bool.isRequired
};

export {ReviewFormButtonWrapper};
export default React.memo(ReviewFormButtonWrapper);

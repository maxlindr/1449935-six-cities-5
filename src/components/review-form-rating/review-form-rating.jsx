import React from 'react';
import PropTypes from 'prop-types';

const starLabelTitle = {
  5: `perfect`,
  4: `good`,
  3: `not bad`,
  2: `badly`,
  1: `terribly`
};

function ReviewFormRating(props) {
  const {rating, onClick, disabled} = props;

  return (
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
            onChange={onClick}
            disabled={disabled}
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
  );
}

ReviewFormRating.propTypes = {
  rating: PropTypes.number,
  disabled: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired
};

export default React.memo(ReviewFormRating);

import React from 'react';
import PropTypes from 'prop-types';

const StarLabelTitle = {
  5: `perfect`,
  4: `good`,
  3: `not bad`,
  2: `badly`,
  1: `terribly`
};

const STAR_VALUES = [5, 4, 3, 2, 1];

function ReviewFormRating(props) {
  const {rating, onClick, disabled} = props;

  return (
    <div className="reviews__rating-form form__rating">
      {STAR_VALUES.map((starValue) => (
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
            title={StarLabelTitle[starValue]}
          >
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

export {ReviewFormRating};
export default React.memo(ReviewFormRating);

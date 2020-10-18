import React from 'react';
import PropTypes from 'prop-types';

const MAX_RATING = 5;
const convertRatingToPerc = (rating) => (rating / MAX_RATING) * 100;

const RatingStars = (props) => {
  const {rating, type} = props;

  return (
    <div className={`${type}__rating rating`}>
      <div className={`${type}__stars rating__stars`}>
        <span style={{width: `${convertRatingToPerc(rating)}%`}} />
        <span className="visually-hidden">Rating</span>
      </div>
      {
        type === RatingStars.TYPE_OFFER
          ? <span className="property__rating-value rating__value">{rating}</span>
          : null
      }
    </div>
  );
};

RatingStars.TYPE_CARD = `place-card`;
RatingStars.TYPE_OFFER = `property`;
RatingStars.TYPE_REVIEW = `reviews`;

RatingStars.propTypes = {
  rating: PropTypes.number.isRequired,
  type: PropTypes.oneOf([
    RatingStars.TYPE_CARD,
    RatingStars.TYPE_OFFER,
    RatingStars.TYPE_REVIEW
  ]).isRequired,
};

export default RatingStars;

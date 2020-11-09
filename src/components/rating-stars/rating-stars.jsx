import React from 'react';
import PropTypes from 'prop-types';

const MAX_RATING = 5;

export const RatingStarsType = {
  CARD: `place-card`,
  OFFER: `property`,
  REVIEW: `reviews`,
};

const convertRatingToPerc = (rating) => (rating / MAX_RATING) * 100;

const RatingStars = (props) => {
  const {rating, type, round} = props;

  const ratingDisplay = round ? Math.round(rating) : rating;

  return (
    <div className={`${type}__rating rating`}>
      <div className={`${type}__stars rating__stars`}>
        <span style={{width: `${convertRatingToPerc(ratingDisplay)}%`}} />
        <span className="visually-hidden">Rating</span>
      </div>
      {
        type === RatingStarsType.OFFER
          ? <span className="property__rating-value rating__value">{rating}</span>
          : null
      }
    </div>
  );
};

RatingStars.propTypes = {
  rating: PropTypes.number.isRequired,
  round: PropTypes.bool,
  type: PropTypes.oneOf([
    RatingStarsType.CARD,
    RatingStarsType.OFFER,
    RatingStarsType.REVIEW
  ]).isRequired,
};

export {RatingStars};
export default React.memo(RatingStars);

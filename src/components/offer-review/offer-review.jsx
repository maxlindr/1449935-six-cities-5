import React from 'react';
import {reviewPropTypes} from '../../prop-types';
import RatingStars, {RatingStarsType} from '../rating-stars/rating-stars';

const formatDate = (date) => date.toLocaleDateString(`en-US`, {month: `long`, year: `numeric`});
const formatDateTimeAttribute = (date) => date.toISOString().substring(0, 10);

function OfferReview(props) {
  const {avatar, author, rating, text, date} = props.review;

  return (
    <li className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img className="reviews__avatar user__avatar" src={avatar} alt="Reviews avatar" width={54} height={54} />
        </div>

        <span className="reviews__user-name">
          {author}
        </span>
      </div>

      <div className="reviews__info">
        <RatingStars type={RatingStarsType.REVIEW} rating={rating}/>
        <p className="reviews__text">{text}</p>

        <time className="reviews__time" dateTime={formatDateTimeAttribute(date)}>
          {formatDate(date)}
        </time>
      </div>
    </li>
  );
}

OfferReview.propTypes = {
  review: reviewPropTypes
};

export {OfferReview};
export default React.memo(OfferReview);

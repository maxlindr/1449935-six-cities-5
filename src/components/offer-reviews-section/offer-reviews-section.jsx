import React from 'react';
import PropTypes from 'prop-types';
import {userPropTypes, reviewPropTypes} from '../../prop-types';
import RatingStars from '../rating-stars/rating-stars';
import ReviewForm from '../review-form/review-form';

const formatDate = (date) => date.toLocaleDateString(`en-US`, {month: `long`, year: `numeric`});
const formatDateTimeAttribute = (date) => date.toISOString().substring(0, 10);

const OfferReviewsSection = (props) => {
  const {user, reviews} = props;

  return (
    <section className="property__reviews reviews">
      <h2 className="reviews__title">Reviews · <span className="reviews__amount">{reviews.length}</span></h2>

      <ul className="reviews__list">
        {reviews.map((review) => {
          const {id, avatar, author, rating, text, date} = review;

          return (
            <li key={id} className="reviews__item">
              <div className="reviews__user user">
                <div className="reviews__avatar-wrapper user__avatar-wrapper">
                  <img className="reviews__avatar user__avatar" src={avatar} alt="Reviews avatar" width={54} height={54} />
                </div>

                <span className="reviews__user-name">
                  {author}
                </span>
              </div>

              <div className="reviews__info">
                <RatingStars type={RatingStars.TYPE_REVIEW} rating={rating}/>
                <p className="reviews__text">{text}</p>

                <time className="reviews__time" dateTime={formatDateTimeAttribute(date)}>
                  {formatDate(date)}
                </time>
              </div>
            </li>
          );
        })}
      </ul>

      {user ? <ReviewForm /> : null}
    </section>
  );
};

OfferReviewsSection.propTypes = {
  reviews: PropTypes.arrayOf(reviewPropTypes),
  user: userPropTypes,
};

export default OfferReviewsSection;

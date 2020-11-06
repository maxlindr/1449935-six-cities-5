import React from 'react';
import PropTypes from 'prop-types';
import {userPropTypes, reviewPropTypes} from '../../prop-types';
import ReviewForm from '../review-form/review-form';
import OfferReview from '../offer-review/offer-review';


const OfferReviewsSection = (props) => {
  const {user, reviews} = props;

  return (
    <section className="property__reviews reviews">
      <h2 className="reviews__title">Reviews · <span className="reviews__amount">{reviews.length}</span></h2>

      <ul className="reviews__list">
        {reviews.map((review) => <OfferReview key={review.id} review={review}/>)}
      </ul>

      {user ? <ReviewForm /> : null}
    </section>
  );
};

OfferReviewsSection.propTypes = {
  reviews: PropTypes.arrayOf(reviewPropTypes),
  user: userPropTypes,
};

export default React.memo(OfferReviewsSection);

import React from 'react';
import PropTypes from 'prop-types';
import {userPropTypes, reviewPropTypes} from '../../prop-types';
import withReviewFormController from '../../hocs/with-review-form-controller/with-review-form-controller';
import ReviewForm from '../review-form/review-form';
import OfferReview from '../offer-review/offer-review';

const ReviewFormComponent = withReviewFormController(ReviewForm);

const OfferReviewsSection = (props) => {
  const {user, reviews} = props;

  return (
    <section className="property__reviews reviews">
      <h2 className="reviews__title">Reviews · <span className="reviews__amount">{reviews.length}</span></h2>

      <ul className="reviews__list">
        {reviews.map((review) => <OfferReview key={review.id} review={review}/>)}
      </ul>

      {user ? <ReviewFormComponent /> : null}
    </section>
  );
};

OfferReviewsSection.propTypes = {
  reviews: PropTypes.arrayOf(reviewPropTypes),
  user: userPropTypes,
};

export default OfferReviewsSection;

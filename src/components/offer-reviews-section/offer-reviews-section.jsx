import React, {memo} from 'react';
import PropTypes from 'prop-types';
import {userPropTypes, reviewPropTypes} from '../../prop-types';
import ReviewForm from '../review-form/review-form';
import OfferReview from '../offer-review/offer-review';
import {connect} from 'react-redux';
import {getUser} from '../../store/selectors';


const OfferReviewsSection = (props) => {
  const {user, reviews, offerId} = props;

  const reviewsAmountString = reviews ? reviews.length : `...`;

  return (
    <section className="property__reviews reviews">
      <h2 className="reviews__title">
        Reviews · <span className="reviews__amount">{reviewsAmountString}</span>
      </h2>

      <ul className="reviews__list">
        {
          reviews
            ? reviews.map((review) => <OfferReview key={review.id} review={review}/>)
            : null
        }
      </ul>

      {user ? <ReviewForm offerId={offerId}/> : null}
    </section>
  );
};

OfferReviewsSection.propTypes = {
  reviews: PropTypes.arrayOf(reviewPropTypes),
  user: userPropTypes,
  offerId: PropTypes.string.isRequired
};

const mapStateToProps = (state) => ({
  user: getUser(state),
});

export {OfferReviewsSection};
export default connect(mapStateToProps)(memo(OfferReviewsSection));

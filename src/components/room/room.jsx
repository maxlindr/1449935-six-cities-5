import React from 'react';
import PropTypes from 'prop-types';
import {userPropTypes, offerPropTypes, reviewPropTypes} from '../../prop-types';
import PageHeader from '../page-header/page-header';
import RatingStars, {RatingStarsType} from '../rating-stars/rating-stars';
import BookmarkToggle, {BookmarkToggleType} from '../bookmark-toggle/bookmark-toggle';
import OfferReviewsSection from '../offer-reviews-section/offer-reviews-section';
import OfferEssentials from '../offer-essentials/offer-essentials';
import OfferFeatures from '../offer-features/offer-features';
import OfferGallery from '../offer-gallery/offer-gallery';
import NearPlaces from '../near-places/near-places';
import OfferHost from '../offer-host/offer-host';
import CityMap, {CityMapType} from '../city-map/city-map';

const PREMIUM_MARK_ELEMENT = (
  <div className="property__mark">
    <span>Premium</span>
  </div>
);

class Room extends React.PureComponent {
  render() {
    const {user, offer} = this.props;
    const {photos, premium, title, favorite, rating, price, features, host,
      description, reviews: reviewIds, nearPlaces: nearPlacesIds, location} = offer;

    const reviews = reviewIds.map((id) => this.props.reviews.find((review) => review.id === id));
    reviews.sort((a, b) => b.date.getTime() - a.date.getTime());

    const nearPlaces = nearPlacesIds.map((placeId) => this.props.offers.find((item) => item.id === placeId));

    return (
      <div className="page">
        <PageHeader user={this.props.user}/>

        <main className="page__main page__main--property">
          <section className="property">
            <OfferGallery photos={photos}/>

            <div className="property__container container">
              <div className="property__wrapper">
                {premium ? PREMIUM_MARK_ELEMENT : null}

                <div className="property__name-wrapper">
                  <h1 className="property__name">{title}</h1>
                  <BookmarkToggle type={BookmarkToggleType.OFFER} active={favorite}/>
                </div>

                <RatingStars type={RatingStarsType.OFFER} rating={rating}/>
                <OfferEssentials offer={offer}/>

                <div className="property__price">
                  <b className="property__price-value">€{price}</b>
                  <span className="property__price-text">&nbsp;night</span>
                </div>

                <OfferFeatures features={features}/>
                <OfferHost host={host} description={description}/>
                <OfferReviewsSection user={user} reviews={reviews}/>
              </div>
            </div>

            <CityMap type={CityMapType.OFFER} city={location.city} offers={nearPlaces}/>
          </section>

          <div className="container">
            <NearPlaces offers={nearPlaces}/>
          </div>
        </main>
      </div>
    );
  }
}

Room.propTypes = {
  user: userPropTypes,
  offer: offerPropTypes.isRequired,
  offers: PropTypes.arrayOf(offerPropTypes).isRequired,
  reviews: PropTypes.arrayOf(reviewPropTypes).isRequired,
};

export default Room;

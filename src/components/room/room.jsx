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
import withLeafletMap from '../../hocs/with-leaflet-map/with-leaflet-map';
import cityMapFactory, {CityMapType} from '../city-map-factory/city-map-factory';
import {connect} from 'react-redux';
import withUpdateOfferOnFavoriteToggle from '../../hocs/with-update-offer-on-favorite-toggle/with-update-offer-on-favorite-toggle';
import withActiveOffer from '../../hocs/with-active-offer/with-active-offer';

const BookmarkToggleWithUpdateOffer = withUpdateOfferOnFavoriteToggle(BookmarkToggle);

const CityMap = withLeafletMap(cityMapFactory(CityMapType.OFFER));

const PREMIUM_MARK_ELEMENT = (
  <div className="property__mark">
    <span>Premium</span>
  </div>
);

const Room = (props) => {
  const {user, offer, offers, reviews, activeOffer, onActivate, onDeactivate} = props;
  const {photos, premium, title, favorite, rating, price, features, host,
    description, reviews: reviewIds, nearPlaces: nearPlacesIds} = offer;

  const offerReviews = reviewIds.map((id) => reviews.find((review) => review.id === id));
  offerReviews.sort((a, b) => b.date.getTime() - a.date.getTime());

  const nearPlaces = nearPlacesIds.map((placeId) => offers.find((item) => item.id === placeId));

  return (
    <div className="page">
      <PageHeader />

      <main className="page__main page__main--property">
        <section className="property">
          <OfferGallery photos={photos}/>

          <div className="property__container container">
            <div className="property__wrapper">
              {premium ? PREMIUM_MARK_ELEMENT : null}

              <div className="property__name-wrapper">
                <h1 className="property__name">{title}</h1>
                <BookmarkToggleWithUpdateOffer offer={offer} type={BookmarkToggleType.OFFER} active={favorite} />
              </div>

              <RatingStars type={RatingStarsType.OFFER} rating={rating}/>
              <OfferEssentials offer={offer}/>

              <div className="property__price">
                <b className="property__price-value">€{price}</b>
                <span className="property__price-text">&nbsp;night</span>
              </div>

              <OfferFeatures features={features}/>
              <OfferHost host={host} description={description}/>
              <OfferReviewsSection user={user} reviews={offerReviews}/>
            </div>
          </div>

          <CityMap activeOffer={activeOffer} offers={nearPlaces}/>
        </section>

        <div className="container">
          <NearPlaces offers={nearPlaces} onCardOver={onActivate} onCardLeave={onDeactivate}/>
        </div>
      </main>
    </div>
  );
};

Room.propTypes = {
  user: userPropTypes,
  offer: offerPropTypes.isRequired,
  activeOffer: offerPropTypes,
  offers: PropTypes.arrayOf(offerPropTypes).isRequired,
  reviews: PropTypes.arrayOf(reviewPropTypes).isRequired,
  onActivate: PropTypes.func.isRequired,
  onDeactivate: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  user: state.user,
  offers: state.offers,
  reviews: state.reviews
});

export {Room};
export default connect(mapStateToProps)(withActiveOffer(Room));

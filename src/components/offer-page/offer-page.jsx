import React from 'react';
import PropTypes from 'prop-types';
import {offerPropTypes, reviewPropTypes} from '../../prop-types/prop-types';
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
import withExtraOfferData from '../../hocs/with-extra-offer-data/with-extra-offer-data';
import withAlertDialog from '../../hocs/with-alert-dialog/with-alert-dialog';

const MAX_VISIBLE_OFFERS_ON_MAP = 4;

const CityMap = withLeafletMap(cityMapFactory(CityMapType.OFFER));

const PREMIUM_MARK_ELEMENT = (
  <div className="property__mark">
    <span>Premium</span>
  </div>
);

const OfferPage = (props) => {
  const {offer, reviews, offers} = props;
  const {photos, premium, title, favorite, rating, price, features, host, description} = offer;

  const offerReviews = reviews
    ? reviews.slice().sort((a, b) => b.date.getTime() - a.date.getTime())
    : null;

  return (
    <div className="page">
      <PageHeader />

      <main className="page__main page__main--property">
        <section className="property">
          <OfferGallery photos={photos} />

          <div className="property__container container">
            <div className="property__wrapper">
              {premium ? PREMIUM_MARK_ELEMENT : null}

              <div className="property__name-wrapper">
                <h1 className="property__name">{title}</h1>
                <BookmarkToggle
                  offer={offer}
                  type={BookmarkToggleType.OFFER}
                  active={favorite}
                />
              </div>

              <RatingStars type={RatingStarsType.OFFER} rating={rating} />
              <OfferEssentials offer={offer} />

              <div className="property__price">
                <b className="property__price-value">€{price}</b>
                <span className="property__price-text">&nbsp;night</span>
              </div>

              <OfferFeatures features={features} />
              <OfferHost host={host} description={description} />
              <OfferReviewsSection offerId={offer.id} reviews={offerReviews} />
            </div>
          </div>

          <CityMap
            activeOffer={offer}
            offers={[offer, ...offers]}
            maxOffers={MAX_VISIBLE_OFFERS_ON_MAP}
          />
        </section>

        <div className="container">
          {offers.length > 0 ? <NearPlaces offers={offers} /> : null}
        </div>
      </main>
    </div>
  );
};

OfferPage.propTypes = {
  offer: offerPropTypes.isRequired,
  offers: PropTypes.arrayOf(offerPropTypes).isRequired,
  reviews: PropTypes.arrayOf(reviewPropTypes),
};

export {OfferPage};
export default withExtraOfferData(withAlertDialog(OfferPage));

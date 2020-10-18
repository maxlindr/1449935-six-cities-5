import React from 'react';
import PropTypes from 'prop-types';
import {userPropTypes, offerPropTypes, reviewPropTypes} from '../../prop-types';
import PageHeader from '../page-header/page-header';
import NearPlaceCard from '../near-place-card/near-place-card';
import RatingStars from '../rating-stars/rating-stars';
import BookmarkToggle from '../bookmark-toggle/bookmark-toggle';
import OfferReviewsSection from '../offer-reviews-section/offer-reviews-section';
import OfferEssentials from '../offer-essentials/offer-essentials';

const PREMIUM_MARK_ELEMENT = (
  <div className="property__mark">
    <span>Premium</span>
  </div>
);

class Room extends React.PureComponent {
  render() {
    const {user, offer} = this.props;
    const {photos, premium, title, favorite, rating, price, features, host,
      description, reviews: reviewIds, nearPlaces: nearPlacesIds} = offer;

    const reviews = reviewIds.map((id) => this.props.reviews.find((review) => review.id === id));
    reviews.sort((a, b) => b.date.getTime() - a.date.getTime());

    const avatarWrapperClassname = host.super
      ? `property__avatar-wrapper property__avatar-wrapper--pro user__avatar-wrapper`
      : `property__avatar-wrapper user__avatar-wrapper`;

    const nearPlaces = nearPlacesIds.map((placeId) => this.props.offers.find((item) => item.id === placeId));

    return (
      <div className="page">
        <PageHeader user={this.props.user}/>
        <main className="page__main page__main--property">
          <section className="property">
            <div className="property__gallery-container container">
              <div className="property__gallery">
                {photos.map((url, i) => (
                  <div key={url + i} className="property__image-wrapper">
                    <img className="property__image" src={url} alt="Photo studio" />
                  </div>
                ))}
              </div>
            </div>

            <div className="property__container container">
              <div className="property__wrapper">
                {premium ? PREMIUM_MARK_ELEMENT : null}

                <div className="property__name-wrapper">
                  <h1 className="property__name">{title}</h1>
                  <BookmarkToggle type={BookmarkToggle.TYPE_OFFER} active={favorite}/>
                </div>

                <RatingStars type={RatingStars.TYPE_OFFER} rating={rating}/>
                <OfferEssentials offer={offer}/>

                <div className="property__price">
                  <b className="property__price-value">€{price}</b>
                  <span className="property__price-text">&nbsp;night</span>
                </div>

                <div className="property__inside">
                  <h2 className="property__inside-title">What&apos;s inside</h2>
                  <ul className="property__inside-list">
                    {features.map((feature) => (
                      <li key={feature} className="property__inside-item">
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="property__host">
                  <h2 className="property__host-title">Meet the host</h2>
                  <div className="property__host-user user">
                    <div className={avatarWrapperClassname}>
                      <img className="property__avatar user__avatar" src={host.avatar} alt="Host avatar" width={74} height={74} />
                    </div>
                    <span className="property__user-name">
                      {host.name}
                    </span>
                  </div>
                  <div className="property__description">
                    {description.map((paragraph, i) => <p key={i} className="property__text">{paragraph}</p>)}
                  </div>
                </div>

                <OfferReviewsSection user={user} reviews={reviews}/>
              </div>
            </div>
            <section className="property__map map" />
          </section>

          <div className="container">
            <section className="near-places places">
              <h2 className="near-places__title">Other places in the neighbourhood</h2>
              <div className="near-places__list places__list">
                {nearPlaces.map((place) => (
                  <NearPlaceCard
                    key={place.id}
                    offer={place}
                    onMouseOver={() => {}}
                    onMouseLeave={() => {}}
                  />
                ))}
              </div>
            </section>
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

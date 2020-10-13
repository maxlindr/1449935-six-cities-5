import React from 'react';
import PropTypes from 'prop-types';
import {userPropTypes, offerPropTypes, reviewPropTypes} from '../../prop-types';
import PageHeader from '../page-header/page-header';
import {convertRatingToPerc, capitalizeFirstLetter} from '../offer-card-utils';
import NearPlaceCard from '../near-place-card/near-place-card';
import ReviewForm from './review-form/review-form';

const PREMIUM_MARK_ELEMENT = (
  <div className="property__mark">
    <span>Premium</span>
  </div>
);

const formatDate = (date) => date.toLocaleDateString(`en-US`, {month: `long`, year: `numeric`});
const formatDateTimeAttribute = (date) => date.toISOString().substring(0, 10);

class Room extends React.PureComponent {
  render() {
    const {user, offer} = this.props;
    const {photos, premium, title, favorite, rating, type, bedrooms, maxAdults, price, features, host,
      description, reviews: reviewIds, nearPlaces: nearPlacesIds} = offer;

    const reviews = reviewIds.map((id) => this.props.reviews.find((review) => review.id === id));
    reviews.sort((a, b) => b.date.getTime() - a.date.getTime());

    const bookmarkBtnClassname = favorite
      ? `property__bookmark-button property__bookmark-button--active button`
      : `property__bookmark-button button`;

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
                  <button className={bookmarkBtnClassname} type="button">
                    <svg className="property__bookmark-icon" width={31} height={33}>
                      <use xlinkHref="#icon-bookmark" />
                    </svg>
                    {
                      favorite
                        ? <span className="visually-hidden">In bookmarks</span>
                        : <span className="visually-hidden">To bookmarks</span>
                    }
                  </button>
                </div>

                <div className="property__rating rating">
                  <div className="property__stars rating__stars">
                    <span style={{width: `${convertRatingToPerc(rating)}%`}} />
                    <span className="visually-hidden">Rating</span>
                  </div>
                  <span className="property__rating-value rating__value">{rating}</span>
                </div>

                <ul className="property__features">
                  <li className="property__feature property__feature--entire">
                    {capitalizeFirstLetter(type)}
                  </li>
                  <li className="property__feature property__feature--bedrooms">
                    {bedrooms} Bedrooms
                  </li>
                  <li className="property__feature property__feature--adults">
                    Max {maxAdults} adults
                  </li>
                </ul>

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

                <section className="property__reviews reviews">
                  <h2 className="reviews__title">Reviews · <span className="reviews__amount">{reviews.length}</span></h2>

                  <ul className="reviews__list">
                    {reviews.map((review) => (
                      <li key={review.id} className="reviews__item">
                        <div className="reviews__user user">
                          <div className="reviews__avatar-wrapper user__avatar-wrapper">
                            <img className="reviews__avatar user__avatar" src={review.avatar} alt="Reviews avatar" width={54} height={54} />
                          </div>
                          <span className="reviews__user-name">
                            {review.author}
                          </span>
                        </div>
                        <div className="reviews__info">
                          <div className="reviews__rating rating">
                            <div className="reviews__stars rating__stars">
                              <span style={{width: `${convertRatingToPerc(review.rating)}%`}} />
                              <span className="visually-hidden">Rating</span>
                            </div>
                          </div>
                          <p className="reviews__text">{review.text}</p>
                          <time className="reviews__time" dateTime={formatDateTimeAttribute(review.date)}>{formatDate(review.date)}</time>
                        </div>
                      </li>
                    ))}
                  </ul>

                  {user ? <ReviewForm /> : null}
                </section>
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

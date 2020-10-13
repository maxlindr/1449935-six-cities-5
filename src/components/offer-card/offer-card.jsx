import React from 'react';
import {withRouter, Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import offerPropTypes from '../../prop-types/offer-prop-types';
import {convertRatingToPerc, capitalizeFirstLetter, generateOfferPageEndpoint} from '../offer-card-utils';

const PREMIUM_MARK_ELEMENT = (
  <div className="place-card__mark">
    <span>Premium</span>
  </div>
);

const OfferCard = (props) => {
  const {id, premium, photos, price, title, type, rating, favorite} = props.offer;

  const bookmarkBtnClassname = favorite
    ? `place-card__bookmark-button place-card__bookmark-button--active button`
    : `place-card__bookmark-button button`;

  const offerPageEndpoint = generateOfferPageEndpoint(id);

  return (
    <article className="cities__place-card place-card"
      onMouseOver={() => props.onMouseOver(props.offer)}
      onMouseLeave={props.onMouseLeave}
      // onClick={() => props.history.push(`/offer/${props.offer.id}`)} // грузит указанную страницу, после чего тут же перезагружает приложение
    >
      {premium ? PREMIUM_MARK_ELEMENT : null}

      <div className="cities__image-wrapper place-card__image-wrapper">
        <Link to={offerPageEndpoint}>
          <img className="place-card__image" src={photos[0]} alt="Place image" width={260} height={200} />
        </Link>
      </div>

      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">€{price}</b>
            <span className="place-card__price-text">/&nbsp;night</span>
          </div>

          <button className={bookmarkBtnClassname} type="button">
            <svg className="place-card__bookmark-icon" width={18} height={19}>
              <use xlinkHref="#icon-bookmark" />
            </svg>
            {
              favorite
                ? <span className="visually-hidden">In bookmarks</span>
                : <span className="visually-hidden">To bookmarks</span>
            }
          </button>
        </div>

        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: `${convertRatingToPerc(rating)}%`}} />
            <span className="visually-hidden">Rating</span>
          </div>
        </div>

        <h2 className="place-card__name">
          <Link to={offerPageEndpoint}>{title}</Link>
        </h2>

        <p className="place-card__type">{capitalizeFirstLetter(type)}</p>
      </div>
    </article>
  );
};

OfferCard.propTypes = {
  offer: offerPropTypes,
  onMouseOver: PropTypes.func.isRequired,
  onMouseLeave: PropTypes.func.isRequired,
  history: PropTypes.object
};

export default withRouter(OfferCard);

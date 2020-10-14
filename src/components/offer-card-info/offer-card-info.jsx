import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import offerPropTypes from '../../prop-types/offer-prop-types';
import {generateOfferPageEndpoint, convertRatingToPerc, capitalizeFirstLetter} from '../offer-card-utils';

const OfferCardInfo = (props) => {
  const {id, price, title, type, rating, favorite} = props.offer;

  const bookmarkBtnClassname = favorite
    ? `place-card__bookmark-button place-card__bookmark-button--active button`
    : `place-card__bookmark-button button`;

  return (
    <div className={props.favorites ? `favorites__card-info place-card__info` : `place-card__info`}>
      <div className="place-card__price-wrapper">
        <div className="place-card__price">
          <b className="place-card__price-value">€{price}</b>
          <span className="place-card__price-text">/&nbsp;night</span>
        </div>

        <button className={bookmarkBtnClassname} type="button">
          <svg className="place-card__bookmark-icon" width={18} height={19}>
            <use xlinkHref="#icon-bookmark" />
          </svg>

          <span className="visually-hidden">
            {favorite ? `In bookmarks` : `To bookmarks`}
          </span>
        </button>
      </div>

      <div className="place-card__rating rating">
        <div className="place-card__stars rating__stars">
          <span style={{width: `${convertRatingToPerc(rating)}%`}} />
          <span className="visually-hidden">Rating</span>
        </div>
      </div>

      <h2 className="place-card__name">
        <Link to={generateOfferPageEndpoint(id)}>
          {title}
        </Link>
      </h2>

      <p className="place-card__type">{capitalizeFirstLetter(type)}</p>
    </div>
  );
};

OfferCardInfo.propTypes = {
  offer: offerPropTypes,
  favorites: PropTypes.bool,
};

export default OfferCardInfo;

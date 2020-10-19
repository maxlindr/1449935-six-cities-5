import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import offerPropTypes from '../../prop-types/offer-prop-types';
import {generateOfferPageEndpoint, capitalizeFirstLetter} from '../offer-card-utils';
import RatingStars, {RatingStarsType} from '../rating-stars/rating-stars';
import BookmarkToggle, {BookmarkToggleType} from '../bookmark-toggle/bookmark-toggle';

const OfferCardInfo = (props) => {
  const {id, price, title, type, rating, favorite} = props.offer;

  return (
    <div className={props.favorites ? `favorites__card-info place-card__info` : `place-card__info`}>
      <div className="place-card__price-wrapper">
        <div className="place-card__price">
          <b className="place-card__price-value">€{price}</b>
          <span className="place-card__price-text">/&nbsp;night</span>
        </div>

        <BookmarkToggle type={BookmarkToggleType.CARD} active={favorite}/>
      </div>

      <RatingStars type={RatingStarsType.CARD} rating={rating}/>

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

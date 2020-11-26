import React from 'react';
import PropTypes from 'prop-types';
import offerPropTypes from '../../prop-types/offer-prop-types';
import OfferCardInfo from '../offer-card-info/offer-card-info';
import OfferCardImage from '../offer-card-image/offer-card-image';
import {OfferCardType} from '../../constants';

const selectRootClassName = (type) => {
  switch (type) {
    case OfferCardType.CITIES:
      return `cities__place-card place-card`;
    case OfferCardType.NEAR_PLACE:
      return `near-places__card place-card`;
    case OfferCardType.FAVORITE:
      return `favorites__card place-card`;
    default:
      throw new Error(`Invalid card type: "${type}"`);
  }
};

const OfferCard = ({type, offer, onMouseOver, onMouseLeave}) => {
  return (
    <article
      className={selectRootClassName(type)}
      onMouseOver={onMouseOver ? () => onMouseOver(offer) : null}
      onMouseLeave={onMouseLeave}
    >
      <OfferCardImage cardType={type} offer={offer}/>

      <OfferCardInfo
        offer={offer}
        roundRating={type === OfferCardType.CITIES}
        favorites={type === OfferCardType.FAVORITE}
      />
    </article>
  );
};

OfferCard.propTypes = {
  type: PropTypes.oneOf([
    OfferCardType.CITIES,
    OfferCardType.NEAR_PLACE,
    OfferCardType.FAVORITE
  ]).isRequired,
  offer: offerPropTypes.isRequired,
  onMouseOver: PropTypes.func,
  onMouseLeave: PropTypes.func,
};

export {OfferCard};
export default React.memo(OfferCard);

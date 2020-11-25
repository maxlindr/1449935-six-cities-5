import React from 'react';
import PropTypes from 'prop-types';
import offerPropTypes from '../../prop-types/offer-prop-types';
import OfferCardInfo from '../offer-card-info/offer-card-info';
import OfferCardImage from '../offer-card-image/offer-card-image';
import {OfferCardType} from '../../constants';

const OfferCard = ({type, offer, onMouseOver, onMouseLeave}) => {
  let rootClassName;

  switch (type) {
    case OfferCardType.CITIES:
      rootClassName = `cities__place-card place-card`;
      break;
    case OfferCardType.NEAR_PLACE:
      rootClassName = `near-places__card place-card`;
      break;
    default:
      throw new Error(`Invalid card type: "${type}"`);
  }

  return (
    <article
      className={rootClassName}
      onMouseOver={onMouseOver ? () => onMouseOver(offer) : null}
      onMouseLeave={onMouseLeave}
    >
      <OfferCardImage cardType={type} offer={offer}/>

      <OfferCardInfo
        offer={offer}
        roundRating={type === OfferCardType.CITIES}
      />
    </article>
  );
};

OfferCard.propTypes = {
  type: PropTypes.oneOf([
    OfferCardType.CITIES,
    OfferCardType.NEAR_PLACE]
  ).isRequired,
  offer: offerPropTypes,
  onMouseOver: PropTypes.func,
  onMouseLeave: PropTypes.func,
};

export {OfferCard};
export default React.memo(OfferCard);

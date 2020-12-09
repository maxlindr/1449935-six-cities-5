import React from 'react';
import PropTypes from 'prop-types';
import offerPropTypes from '../../prop-types/offer-prop-types';
import OfferCardInfo from '../offer-card-info/offer-card-info';
import OfferCardImage from '../offer-card-image/offer-card-image';
import {OfferCardType} from '../../constants';

const RootClassName = {
  [OfferCardType.CITIES]: `cities__place-card place-card`,
  [OfferCardType.NEAR_PLACE]: `near-places__card place-card`,
  [OfferCardType.FAVORITE]: `favorites__card place-card`,
};

const OfferCard = ({type, offer, onMouseOver, onMouseLeave}) => {
  return (
    <article
      className={RootClassName[type]}
      onMouseOver={() => onMouseOver(offer)}
      onMouseLeave={onMouseLeave}
    >
      <OfferCardImage
        cardType={type}
        offer={offer}
      />

      <OfferCardInfo
        offer={offer}
        roundRating={type === OfferCardType.CITIES}
        favorites={type === OfferCardType.FAVORITE}
      />
    </article>
  );
};

OfferCard.defaultProps = {
  onMouseOver: () => {}
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

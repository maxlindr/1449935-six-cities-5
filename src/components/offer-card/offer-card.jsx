import React from 'react';
import PropTypes from 'prop-types';
import offerPropTypes from '../../prop-types/offer-prop-types';
import OfferCardInfo from '../offer-card-info/offer-card-info';
import OfferCardImage from '../offer-card-image/offer-card-image';
import {OfferCardType} from '../../constants';

const OfferCard = (props) => {
  const {offer, onMouseOver, onMouseLeave} = props;

  return (
    <article className="cities__place-card place-card"
      onMouseOver={() => onMouseOver(offer)}
      onMouseLeave={onMouseLeave}
    >
      <OfferCardImage cardType={OfferCardType.CITIES} offer={offer}/>
      <OfferCardInfo offer={offer} roundRating />
    </article>
  );
};

OfferCard.propTypes = {
  offer: offerPropTypes,
  onMouseOver: PropTypes.func.isRequired,
  onMouseLeave: PropTypes.func.isRequired,
};

export {OfferCard};
export default React.memo(OfferCard);

import React from 'react';
import PropTypes from 'prop-types';
import offerPropTypes from '../../prop-types/offer-prop-types';
import OfferCardInfo from '../offer-card-info/offer-card-info';
import OfferCardImage from '../offer-card-image/offer-card-image';
import {OfferCardType} from '../../constants';

const NearPlaceCard = ({offer, onMouseOver, onMouseLeave}) => (
  <article
    className="near-places__card place-card"
    onMouseOver={onMouseOver ? () => onMouseOver(offer) : null}
    onMouseLeave={onMouseLeave}
  >
    <OfferCardImage cardType={OfferCardType.NEAR_PLACE} offer={offer}/>
    <OfferCardInfo offer={offer}/>
  </article>
);

NearPlaceCard.propTypes = {
  offer: offerPropTypes,
  onMouseOver: PropTypes.func,
  onMouseLeave: PropTypes.func,
};

export default React.memo(NearPlaceCard);

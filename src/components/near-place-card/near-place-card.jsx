import React from 'react';
import offerPropTypes from '../../prop-types/offer-prop-types';
import OfferCardInfo from '../offer-card-info/offer-card-info';
import OfferCardImage from '../offer-card-image/offer-card-image';
import {OfferCardType} from '../../constants';

const NearPlaceCard = ({offer}) => (
  <article className="near-places__card place-card">
    <OfferCardImage cardType={OfferCardType.NEAR_PLACE} offer={offer}/>
    <OfferCardInfo offer={offer}/>
  </article>
);

NearPlaceCard.propTypes = {
  offer: offerPropTypes,
};

export default React.memo(NearPlaceCard);

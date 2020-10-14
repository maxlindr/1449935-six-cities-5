import React from 'react';
import offerPropTypes from '../../prop-types/offer-prop-types';
import OfferCardInfo from '../offer-card-info/offer-card-info';
import OfferCardImage from '../offer-card-image/offer-card-image';
import {OfferCardType} from '../../constants';

const FavoritesOfferCard = ({offer}) => (
  <article className="favorites__card place-card">
    <OfferCardImage cardType={OfferCardType.FAVORITE} offer={offer}/>
    <OfferCardInfo favorites offer={offer}/>
  </article>
);

FavoritesOfferCard.propTypes = {
  offer: offerPropTypes.isRequired,
};

export default FavoritesOfferCard;

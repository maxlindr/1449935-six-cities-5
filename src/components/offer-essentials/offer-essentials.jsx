import React from 'react';
import {capitalizeFirstLetter} from '../offer-card-utils';
import {offerPropTypes} from '../../prop-types';

function OfferEssentials(props) {
  const {type, bedrooms, maxAdults} = props.offer;

  return (
    <ul className="property__features">
      <li className="property__feature property__feature--entire">
        {capitalizeFirstLetter(type)}
      </li>
      <li className="property__feature property__feature--bedrooms">
        {bedrooms} Bedrooms
      </li>
      <li className="property__feature property__feature--adults">
        Max {maxAdults} adults
      </li>
    </ul>
  );
}

OfferEssentials.propTypes = {
  offer: offerPropTypes
};

export {OfferEssentials};
export default React.memo(OfferEssentials);

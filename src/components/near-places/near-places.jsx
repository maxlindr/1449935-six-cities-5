import React from 'react';
import PropTypes from 'prop-types';
import OfferCard from '../offer-card/offer-card';
import {offerPropTypes} from '../../prop-types/prop-types';
import {OfferCardType} from '../../constants';

const NearPlaces = (props) => {
  const {onCardOver, onCardLeave, offers} = props;

  return (
    <section className="near-places places">
      <h2 className="near-places__title">Other places in the neighbourhood</h2>
      <div className="near-places__list places__list">
        {offers.map((offer) => (
          <OfferCard
            key={offer.id}
            type={OfferCardType.NEAR_PLACE}
            offer={offer}
            onMouseOver={onCardOver}
            onMouseLeave={onCardLeave}
          />
        ))}
      </div>
    </section>
  );
};

NearPlaces.propTypes = {
  offers: PropTypes.arrayOf(offerPropTypes).isRequired,
  onCardOver: PropTypes.func,
  onCardLeave: PropTypes.func,
};

export {NearPlaces};
export default React.memo(NearPlaces);

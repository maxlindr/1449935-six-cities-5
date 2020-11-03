import React from 'react';
import PropTypes from 'prop-types';
import NearPlaceCard from '../near-place-card/near-place-card';
import {offerPropTypes} from '../../prop-types';

const NearPlaces = (props) => {
  const {onCardOver, onCardLeave} = props;

  return (
    <section className="near-places places">
      <h2 className="near-places__title">Other places in the neighbourhood</h2>
      <div className="near-places__list places__list">
        {props.offers.map((offer) => (
          <NearPlaceCard
            key={offer.id}
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

export default React.memo(NearPlaces);

import React from 'react';
import PropTypes from 'prop-types';
import NearPlaceCard from '../near-place-card/near-place-card';
import {offerPropTypes} from '../../prop-types';

function NearPlaces(props) {
  return (
    <section className="near-places places">
      <h2 className="near-places__title">Other places in the neighbourhood</h2>
      <div className="near-places__list places__list">
        {props.offers.map((offer) => (
          <NearPlaceCard
            key={offer.id}
            offer={offer}
            onMouseOver={() => {}}
            onMouseLeave={() => {}}
          />
        ))}
      </div>
    </section>
  );
}

NearPlaces.propTypes = {
  offers: PropTypes.arrayOf(offerPropTypes).isRequired,
};

export default React.memo(NearPlaces);

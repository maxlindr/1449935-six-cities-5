import React from 'react';
import PropTypes from 'prop-types';

function OfferFeatures(props) {
  return (
    <div className="property__inside">
      <h2 className="property__inside-title">What&apos;s inside</h2>
      <ul className="property__inside-list">
        {props.features.map((feature) => (
          <li key={feature} className="property__inside-item">
            {feature}
          </li>
        ))}
      </ul>
    </div>
  );
}

OfferFeatures.propTypes = {
  features: PropTypes.arrayOf(PropTypes.string).isRequired
};

export {OfferFeatures};
export default React.memo(OfferFeatures);

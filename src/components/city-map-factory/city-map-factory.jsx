import React from 'react';
import PropTypes from 'prop-types';

export const CityMapType = {
  MAIN: `cities`,
  OFFER: `property`
};

const cityMapFactory = (type) => {
  const CityMap = (props) => (
    <section ref={props.reference} className={`${type}__map map`} />
  );

  CityMap.propTypes = {
    reference: PropTypes.shape({
      current: PropTypes.instanceOf(Element)
    }),
  };

  return CityMap;
};


export default cityMapFactory;

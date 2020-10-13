import React from 'react';
import PropTypes from 'prop-types';

const createClickHandler = (city, cb) => (evt) => {
  evt.preventDefault();
  cb(city);
};

const CityTab = (props) => {
  const {city, active, onClick} = props;

  const anchorClassName = active
    ? `locations__item-link tabs__item tabs__item--active`
    : `locations__item-link tabs__item`;

  return (
    <li className="locations__item">
      <a className={anchorClassName} href="#" onClick={createClickHandler(city, onClick)}>
        <span>{city}</span>
      </a>
    </li>
  );
};

CityTab.propTypes = {
  city: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired
};

export default CityTab;

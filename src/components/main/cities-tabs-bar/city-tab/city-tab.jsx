import React from 'react';
import PropTypes from 'prop-types';

const CityTab = (props) => {
  const {city, active, onClick} = props;

  const clickHandler = (evt) => {
    evt.preventDefault();
    onClick(city);
  };

  const anchorClassName = active
    ? `locations__item-link tabs__item tabs__item--active`
    : `locations__item-link tabs__item`;

  return (
    <li className="locations__item">
      <a className={anchorClassName} href="#" onClick={clickHandler}>
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

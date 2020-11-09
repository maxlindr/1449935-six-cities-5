import React from 'react';
import PropTypes from 'prop-types';

const createOptionElement = (value, name, isActive, onClick) => {
  return (
    <li
      key={value}
      className={isActive ? `places__option places__option--active` : `places__option`}
      tabIndex="0"
      data-value={value}
      onClick={onClick}
    >
      {name}
    </li>
  );
};

const SortDropdownList = (props) => {
  const {isOpened, options, activeOption, onToggle, onOptionClick} = props;

  const listClassName = isOpened
    ? `places__options places__options--custom places__options--opened`
    : `places__options places__options--custom`;

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by </span>

      <span className="places__sorting-type" tabIndex="0" onClick={onToggle}>
        {options[activeOption]}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>

      <ul className={listClassName}>
        {Object.entries(options).map(([value, name]) =>
          createOptionElement(value, name, value === activeOption, onOptionClick))}
      </ul>
    </form>
  );
};

SortDropdownList.propTypes = {
  onToggle: PropTypes.func.isRequired,
  onOptionClick: PropTypes.func.isRequired,
  isOpened: PropTypes.bool.isRequired,
  activeOption: PropTypes.string.isRequired,
  options: PropTypes.object.isRequired
};

export {SortDropdownList};
export default SortDropdownList;

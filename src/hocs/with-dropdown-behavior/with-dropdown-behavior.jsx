import React from 'react';
import PropTypes from 'prop-types';

const withDropdownBehavior = (Component) => {
  const WithDropdownBehavior = (props) => {
    const [isOpened, setOpened] = React.useState(false);
    const [activeOption, setActiveOption] = React.useState(props.activeOption);
    const handleToggle = React.useCallback(() => setOpened(!isOpened));

    const handleOptionClick = React.useCallback((evt) => {
      const selectedOption = evt.target.dataset.value;

      if (activeOption !== selectedOption) {
        props.onChange(selectedOption);
        setActiveOption(selectedOption);
      }

      setOpened(false);
    });

    return (
      <Component
        {...props}
        isOpened={isOpened}
        activeOption={activeOption}
        onToggle={handleToggle}
        onOptionClick={handleOptionClick}
      />
    );
  };

  WithDropdownBehavior.propTypes = {
    onChange: PropTypes.func.isRequired,
    activeOption: PropTypes.string.isRequired,
    options: PropTypes.object.isRequired
  };

  return WithDropdownBehavior;
};

export default withDropdownBehavior;

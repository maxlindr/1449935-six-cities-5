import React from 'react';
import PropTypes from 'prop-types';

const withDropdownBehavior = (Component) => {
  class WithDropdownBehavior extends React.PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        isOpened: false,
        activeOption: props.activeOption
      };

      this.handleOptionClick = this.handleOptionClick.bind(this);

      this.toggle = () => this.setState({
        isOpened: !this.state.isOpened
      });
    }

    handleOptionClick(evt) {
      const selectedOption = evt.target.dataset.value;

      if (this.state.activeOption !== selectedOption) {
        this.props.onChange(selectedOption);
      }

      this.setState({
        isOpened: false,
        activeOption: selectedOption
      });
    }

    render() {
      const {isOpened, activeOption} = this.state;

      return (
        <Component
          {...this.props}
          isOpened={isOpened}
          activeOption={activeOption}
          onToggle={this.toggle}
          onOptionClick={this.handleOptionClick}
        />
      );
    }
  }

  WithDropdownBehavior.propTypes = {
    onChange: PropTypes.func.isRequired,
    activeOption: PropTypes.string.isRequired,
    options: PropTypes.object.isRequired
  };

  return WithDropdownBehavior;
};

export default withDropdownBehavior;

import React from 'react';
import PropTypes from 'prop-types';

const withDropdownBehavior = (Component) => {
  class WithDropdownBehavior extends React.PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        isOpened: false
      };

      this.handleOptionClick = this.handleOptionClick.bind(this);
      this.toggle = () => this.setState({isOpened: !this.state.isOpened});
    }

    handleOptionClick(evt) {
      const selectedOption = evt.target.dataset.value;

      if (this.props.activeOption !== selectedOption) {
        this.props.onChange(selectedOption);
      }
    }

    render() {
      return (
        <Component
          {...this.props}
          isOpened={this.state.isOpened}
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

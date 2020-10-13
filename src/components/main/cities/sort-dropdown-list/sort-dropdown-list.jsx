import React from 'react';
import PropTypes from 'prop-types';

class SortDropdownList extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isOpened: false
    };

    this.onOptionClick = this.onOptionClick.bind(this);
    this.createOptionElement = this.createOptionElement.bind(this);
    this.toggle = () => this.setState({isOpened: !this.state.isOpened});
  }

  onOptionClick(evt) {
    const selectedOption = evt.target.dataset.value;

    if (this.props.activeOption !== selectedOption) {
      this.props.onChange(selectedOption);
    }
  }

  createOptionElement([value, name]) {
    const isActive = value === this.props.activeOption;

    return (
      <li
        key={value}
        className={isActive ? `places__option places__option--active` : `places__option`}
        tabIndex="0"
        data-value={value}
        onClick={this.onOptionClick}
      >
        {name}
      </li>
    );
  }

  render() {
    const {isOpened} = this.state;

    return (
      <form className="places__sorting" action="#" method="get">
        <span className="places__sorting-caption">Sort by </span>
        <span className="places__sorting-type" tabIndex="0" onClick={this.toggle}>
          {this.props.options[this.props.activeOption]}
          <svg className="places__sorting-arrow" width="7" height="4">
            <use xlinkHref="#icon-arrow-select"></use>
          </svg>
        </span>
        <ul className={`places__options places__options--custom${isOpened ? ` places__options--opened` : ``}`}>
          {Object.entries(this.props.options).map(this.createOptionElement)}
        </ul>
      </form>
    );
  }
}

SortDropdownList.propTypes = {
  onChange: PropTypes.func.isRequired,
  activeOption: PropTypes.string.isRequired,
  options: PropTypes.object.isRequired
};

export default SortDropdownList;

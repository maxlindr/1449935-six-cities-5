import React from 'react';
import PropTypes from 'prop-types';
import {offerPropTypes} from '../../prop-types';
import SortDropdownList from '../../components/sort-dropdown-list/sort-dropdown-list';
import withDropdownBehavior from '../with-dropdown-behavior/with-dropdown-behavior';

const OffersSortDropdownList = withDropdownBehavior(SortDropdownList);

const SortType = {
  POPULAR: `popular`,
  TO_HIGH: `low-to-high`,
  TO_LOW: `high-to-low`,
  TOP_RATED: `top-rated`
};

const DROPDOWN_OPTIONS = {
  [SortType.POPULAR]: `Popular`,
  [SortType.TO_HIGH]: `Price: low to high`,
  [SortType.TO_LOW]: `Price: high to low`,
  [SortType.TOP_RATED]: `Top rated first`,
};

const sortOffers = (offers, sortType) => {
  switch (sortType) {
    case SortType.POPULAR:
      return offers;
    case SortType.TO_HIGH:
      return offers.slice().sort((a, b) => a.price - b.price);
    case SortType.TO_LOW:
      return offers.slice().sort((a, b) => b.price - a.price);
    case SortType.TOP_RATED:
      return offers.slice().sort((a, b) => b.rating - a.rating);
    default:
      throw new Error(`Bad sort type: ${sortType}`);
  }
};

const withSorting = (Component) => {
  class WithSorting extends React.PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        sortType: SortType.POPULAR,
      };

      this.handleSortOptionChange = (option) => this.setState({sortType: option});
    }

    render() {
      const {sortType} = this.state;
      const sortedOffers = sortOffers(this.props.offers, sortType);

      return (
        <Component {...this.props} offers={sortedOffers} >
          {/* При каждом рендере SortDropdownList должен закрываться, а для этого нужно сбрасывать его текущее состояние.
          Это решается с помощью генерации нового 'key' */}
          <OffersSortDropdownList
            key={Math.random()}
            activeOption={sortType}
            options={DROPDOWN_OPTIONS}
            onChange={this.handleSortOptionChange}
          />
        </Component>
      );
    }
  }

  WithSorting.propTypes = {
    offers: PropTypes.arrayOf(offerPropTypes),
  };

  return WithSorting;
};

export default withSorting;

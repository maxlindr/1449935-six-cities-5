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

const sortByPriceLowToHigh = (offers) => offers.slice().sort((a, b) => a.price - b.price);
const sortByPriceHighToLow = (offers) => offers.slice().sort((a, b) => b.price - a.price);
const sortByRatingHighToLow = (offers) => offers.slice().sort((a, b) => b.rating - a.rating);

const sortOffersBy = (offers, sortType) => {
  switch (sortType) {
    case SortType.POPULAR:
      return offers;
    case SortType.TO_HIGH:
      return sortByPriceLowToHigh(offers);
    case SortType.TO_LOW:
      return sortByPriceHighToLow(offers);
    case SortType.TOP_RATED:
      return sortByRatingHighToLow(offers);
    default:
      throw new Error(`Bad sort type: ${sortType}`);
  }
};

const withSorting = (Component) => {
  const WithSorting = (props) => {
    const [sortType, setSortType] = React.useState(SortType.POPULAR);
    const handleSortOptionChange = React.useCallback((option) => setSortType(option), []);

    const sortedOffers = sortOffersBy(props.offers, sortType);

    return (
      <Component {...props} offers={sortedOffers} >
        {/* При каждом рендере SortDropdownList должен закрываться, а для этого нужно сбрасывать его текущее состояние.
        Это решается с помощью генерации нового 'key' */}
        <OffersSortDropdownList
          key={Math.random()}
          activeOption={sortType}
          options={DROPDOWN_OPTIONS}
          onChange={handleSortOptionChange}
        />
      </Component>
    );
  };

  WithSorting.propTypes = {
    offers: PropTypes.arrayOf(offerPropTypes),
  };

  return WithSorting;
};

export const sortOffers = {
  byPriceLowToHigh: sortByPriceLowToHigh,
  byPriceHighToLow: sortByPriceHighToLow,
  byRatingHighToLow: sortByRatingHighToLow,
};

export {withSorting, SortType};
export default withSorting;

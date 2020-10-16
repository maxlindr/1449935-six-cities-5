import React from 'react';
import PropTypes from 'prop-types';
import {offerPropTypes, cityPropTypes} from '../../../prop-types';
import OffersList from '../../offers-list/offers-list';
import SortDropdownList from './sort-dropdown-list/sort-dropdown-list';
import CityMap from '../../city-map/city-map';

const SortOption = {
  POPULAR: `popular`,
  TO_HIGH: `low-to-high`,
  TO_LOW: `high-to-low`,
  TOP_RATED: `top-rated`
};

const DROPDOWN_OPTIONS = {
  [SortOption.POPULAR]: `Popular`,
  [SortOption.TO_HIGH]: `Price: low to high`,
  [SortOption.TO_LOW]: `Price: high to low`,
  [SortOption.TOP_RATED]: `Top rated first`,
};

const onCardMouseOver = () => {};

const sortOffers = (offers, sortType) => {
  switch (sortType) {
    case SortOption.POPULAR:
      return offers;
    case SortOption.TO_HIGH:
      return offers.slice().sort((a, b) => a.price - b.price);
    case SortOption.TO_LOW:
      return offers.slice().sort((a, b) => b.price - a.price);
    case SortOption.TOP_RATED:
      return offers.slice().sort((a, b) => b.rating - a.rating);
    default:
      throw new Error(`Bad sort type: ${sortType}`);
  }
};

class Cities extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      sortType: SortOption.POPULAR,
    };

    this.onSortOptionChange = (option) => this.setState({sortType: option});
  }

  render() {
    const {city, offers} = this.props;
    const sortedOffers = sortOffers(offers, this.state.sortType);

    return (
      <div className="cities__places-container container">
        <section className="cities__places places">
          <h2 className="visually-hidden">Places</h2>
          <b className="places__found">
            {sortedOffers.length} places to stay in {city.name}
          </b>

          {/* При каждом рендере SortDropdownList должен закрываться, а для этого нужно сбрасывать его текущее состояние.
          Это решается с помощью генерации нового 'key' */}
          <SortDropdownList
            key={Math.random()}
            activeOption={this.state.sortType}
            options={DROPDOWN_OPTIONS}
            onChange={this.onSortOptionChange}
          />

          <OffersList
            offers={sortedOffers}
            onCardMouseOver={onCardMouseOver}
          />
        </section>

        <div className="cities__right-section">
          <CityMap city={city} offers={offers}/>
        </div>
      </div>
    );
  }

}

Cities.propTypes = {
  offers: PropTypes.arrayOf(offerPropTypes),
  city: cityPropTypes.isRequired
};

export default Cities;

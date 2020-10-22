import React from 'react';
import PropTypes from 'prop-types';
import {offerPropTypes, cityPropTypes} from '../../../prop-types';
import OffersList from '../../offers-list/offers-list';
import SortDropdownList from './sort-dropdown-list/sort-dropdown-list';
import withDropdownBehavior from '../../../hocs/with-dropdown-behavior/with-dropdown-behavior';
import CityMap, {CityMapType} from '../../city-map/city-map';
import {connect} from 'react-redux';

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

const onCardMouseOver = () => {};

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

class Cities extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      sortType: SortType.POPULAR,
    };

    this.onSortOptionChange = (option) => this.setState({sortType: option});
  }

  render() {
    const {currentCity, offers, cities} = this.props;
    const sortedOffers = sortOffers(offers, this.state.sortType);

    const city = cities.find((item) => item.name === currentCity);

    return (
      <div className="cities__places-container container">
        <section className="cities__places places">
          <h2 className="visually-hidden">Places</h2>
          <b className="places__found">
            {sortedOffers.length} places to stay in {currentCity}
          </b>

          {/* При каждом рендере SortDropdownList должен закрываться, а для этого нужно сбрасывать его текущее состояние.
          Это решается с помощью генерации нового 'key' */}
          <OffersSortDropdownList
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
          <CityMap type={CityMapType.MAIN} city={city} offers={offers}/>
        </div>
      </div>
    );
  }
}

Cities.propTypes = {
  offers: PropTypes.arrayOf(offerPropTypes),
  currentCity: PropTypes.string.isRequired,
  cities: PropTypes.arrayOf(cityPropTypes).isRequired,
};

const mapStateToProps = (state) => ({
  cities: state.cities,
  currentCity: state.currentCity
});

export {Cities};
export default connect(mapStateToProps)(Cities);

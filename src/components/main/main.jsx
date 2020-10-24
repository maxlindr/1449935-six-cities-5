import React from 'react';
import PropTypes from 'prop-types';
import {offerPropTypes, reviewPropTypes} from '../../prop-types';
import PageHeader from '../page-header/page-header';
import CitiesTabsBar from './cities-tabs-bar/cities-tabs-bar';
import Cities from './cities/cities';
import withSorting from '../../hocs/with-sorting/with-sorting';
import CitiesNoPlaces from './cities-no-places/cities-no-places';
import {connect} from 'react-redux';

const CitiesWithSorting = withSorting(Cities);

const Main = (props) => {
  const {offers, currentCity} = props;

  const cityOffers = offers.filter((offer) => offer.location.city.name === currentCity);

  const mainElementClassname = cityOffers.length > 0
    ? `page__main page__main--index`
    : `page__main page__main--index page__main--index-empty`;

  return (
    <div className="page page--gray page--main">
      <PageHeader />
      <main className={mainElementClassname}>
        <h1 className="visually-hidden">Cities</h1>
        <CitiesTabsBar />
        <div className="cities">
          {cityOffers.length > 0
            ? <CitiesWithSorting offers={cityOffers}/>
            : <CitiesNoPlaces city={currentCity}/>}
        </div>
      </main>
    </div>
  );
};

Main.propTypes = {
  offers: PropTypes.arrayOf(offerPropTypes).isRequired,
  reviews: PropTypes.arrayOf(reviewPropTypes).isRequired,
  currentCity: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  currentCity: state.currentCity,
  offers: state.offers,
  reviews: state.reviews
});

export {Main};
export default connect(mapStateToProps)(Main);

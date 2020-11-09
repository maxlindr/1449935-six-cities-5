import React from 'react';
import PropTypes from 'prop-types';
import {cityPropTypes, offerPropTypes} from '../../prop-types';
import PageHeader from '../page-header/page-header';
import CitiesTabsBar from './cities-tabs-bar/cities-tabs-bar';
import Cities from './cities/cities';
import withSorting from '../../hocs/with-sorting/with-sorting';
import CitiesNoPlaces from './cities-no-places/cities-no-places';
import {connect} from 'react-redux';
import {getCurrentCity, getCurrentCityOffers} from '../../store/selectors';
import withAlertDialog from '../../hocs/with-alert-dialog/with-alert-dialog';

const CitiesWithSorting = withSorting(Cities);

const Main = ({currentCityOffers, currentCity}) => {
  const mainElementClassname = currentCityOffers.length > 0
    ? `page__main page__main--index`
    : `page__main page__main--index page__main--index-empty`;

  return (
    <div className="page page--gray page--main">
      <PageHeader />

      <main className={mainElementClassname}>
        <h1 className="visually-hidden">Cities</h1>
        <CitiesTabsBar />

        <div className="cities">
          {currentCityOffers.length > 0
            ? <CitiesWithSorting offers={currentCityOffers}/>
            : <CitiesNoPlaces city={currentCity.name}/>}
        </div>
      </main>
    </div>
  );
};

Main.propTypes = {
  currentCityOffers: PropTypes.arrayOf(offerPropTypes).isRequired,
  currentCity: cityPropTypes,
};

const mapStateToProps = (state) => {
  return {
    currentCity: getCurrentCity(state),
    currentCityOffers: getCurrentCityOffers(state),
  };
};

export {Main};
export default connect(mapStateToProps)(withAlertDialog(Main));

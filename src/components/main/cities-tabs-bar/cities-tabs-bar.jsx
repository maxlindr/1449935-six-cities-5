import React from 'react';
import PropTypes from 'prop-types';
import CityTab from './city-tab/city-tab';
import {connect} from 'react-redux';
import {ActionCreator} from '../../../store/actions/action';
import {cityPropTypes} from '../../../prop-types';
import {getCities, getCurrentCityName} from '../../../store/selectors';

const CitiesTabsBar = (props) => {
  const {activeCity, onChangeCity, cities} = props;

  const cityNames = cities.map((city) => city.name);

  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {cityNames.map((city) => (
            <CityTab
              key={city}
              city={city}
              active={city === activeCity}
              onActivate={onChangeCity}
            />
          ))}
        </ul>
      </section>
    </div>
  );
};

CitiesTabsBar.propTypes = {
  cities: PropTypes.arrayOf(cityPropTypes).isRequired,
  onChangeCity: PropTypes.func.isRequired,
  activeCity: PropTypes.string,
};

const mapStateToProps = (state) => ({
  activeCity: getCurrentCityName(state),
  cities: getCities(state),
});

const mapDispatchToProps = (dispatch) => ({
  onChangeCity(city) {
    dispatch(ActionCreator.changeCity(city));
  },
});

export {CitiesTabsBar};
export default connect(mapStateToProps, mapDispatchToProps)(CitiesTabsBar);

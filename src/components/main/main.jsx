import React from 'react';
import PropTypes from 'prop-types';
import {userPropTypes, offerPropTypes, reviewPropTypes} from '../../prop-types';
import PageHeader from '../page-header/page-header';
import CitiesTabsBar from './cities-tabs-bar/cities-tabs-bar';
import Cities from './cities/cities';
import CitiesNoPlaces from './cities-no-places/cities-no-places';

const CITIES = [
  `Paris`,
  `Cologne`,
  `Brussels`,
  `Amsterdam`,
  `Hamburg`,
  `Dusseldorf`
];

class Main extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      activeCity: CITIES[0]
    };

    this.onCityChange = (city) => this.setState({activeCity: city});
  }

  render() {
    const {offers, user} = this.props;
    const activeCity = this.state.activeCity;
    const cityOffers = offers.filter((offer) => offer.location.city.name === activeCity);

    const mainElementClassname = cityOffers.length > 0
      ? `page__main page__main--index`
      : `page__main page__main--index page__main--index-empty`;

    return (
      <div className="page page--gray page--main">
        <PageHeader user={user}/>
        <main className={mainElementClassname}>
          <h1 className="visually-hidden">Cities</h1>
          <CitiesTabsBar cities={CITIES} initialCity={activeCity} onChange={this.onCityChange}/>
          <div className="cities">
            {cityOffers.length > 0
              ? <Cities offers={cityOffers} city={cityOffers[0].location.city}/>
              : <CitiesNoPlaces city={activeCity}/>}
          </div>
        </main>
      </div>
    );
  }
}

Main.propTypes = {
  user: userPropTypes,
  offers: PropTypes.arrayOf(offerPropTypes).isRequired,
  reviews: PropTypes.arrayOf(reviewPropTypes).isRequired,
};

export default Main;

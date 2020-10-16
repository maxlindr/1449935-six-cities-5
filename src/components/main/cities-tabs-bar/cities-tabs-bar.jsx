import React from 'react';
import PropTypes from 'prop-types';
import CityTab from './city-tab/city-tab';

class CitiesTabsBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeCity: props.initialCity
    };

    this.clickHandler = this.clickHandler.bind(this);
  }

  clickHandler(city) {
    if (city !== this.state.activeCity) {
      this.setState({activeCity: city});
      this.props.onChange(city);
    }
  }

  render() {
    return (
      <div className="tabs">
        <section className="locations container">
          <ul className="locations__list tabs__list">
            {this.props.cities.map((city) => (
              <CityTab
                key={city}
                city={city}
                active={city === this.state.activeCity}
                onClick={this.clickHandler}
              />
            ))}
          </ul>
        </section>
      </div>
    );
  }
}

CitiesTabsBar.propTypes = {
  cities: PropTypes.arrayOf(PropTypes.string).isRequired,
  onChange: PropTypes.func.isRequired,
  initialCity: PropTypes.string
};

export default CitiesTabsBar;

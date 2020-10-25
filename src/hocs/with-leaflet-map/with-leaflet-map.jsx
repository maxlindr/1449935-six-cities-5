import React from 'react';
import PropTypes from 'prop-types';
import {cityPropTypes, offerPropTypes} from '../../prop-types';
import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {connect} from 'react-redux';

const PIN_SIZE = [27, 39];
const DEFAULT_ZOOM_LEVEL = 12;

const PIN = leaflet.icon({
  iconUrl: `img/pin.svg`,
  iconSize: PIN_SIZE
});

const PIN_ACTIVE = leaflet.icon({
  iconUrl: `img/pin-active.svg`,
  iconSize: PIN_SIZE
});

const findCityObject = (cityName, collection) => collection.find((item) => item.name === cityName);

const withLeafletMap = (Component) => {
  class WithLeafletMap extends React.PureComponent {
    constructor(props) {
      super(props);

      this.map = null;
      this.mapRef = React.createRef();
      this.pinsGroup = null;
    }

    componentDidMount() {
      const {city} = this.props;

      const map = this.map = leaflet.map(this.mapRef.current, {
        center: city.coordinates,
        zoom: DEFAULT_ZOOM_LEVEL,
        zoomControl: false,
        marker: true
      });

      leaflet
        .tileLayer(`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`, {
          attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`
        })
        .addTo(map);

      this.pinsGroup = leaflet.layerGroup();
      this.pinsGroup.addTo(map);

      this.forceUpdate();
    }

    addPin(pin) {
      const {coordinates, isActive} = pin;

      const marker = leaflet.marker(coordinates, {icon: isActive ? PIN_ACTIVE : PIN});
      this.pinsGroup.addLayer(marker);
    }

    clear() {
      this.pinsGroup.clearLayers();
    }

    render() {
      const {offers, city, activeOffer} = this.props;
      const map = this.map;

      if (map) {
        map.setView(city.coordinates, DEFAULT_ZOOM_LEVEL);
        this.clear();

        offers.forEach((offer) => {
          const isActive = activeOffer ? offer.id === activeOffer.id : false;

          this.addPin({
            coordinates: offer.location.coordinates,
            isActive
          });
        });
      }

      return <Component reference={this.mapRef}/>;
    }
  }

  WithLeafletMap.propTypes = {
    city: cityPropTypes.isRequired,
    cities: PropTypes.arrayOf(cityPropTypes).isRequired,
    offers: PropTypes.arrayOf(offerPropTypes).isRequired,
    activeOffer: offerPropTypes,
  };

  return connect(mapStateToProps)(WithLeafletMap);
};

const mapStateToProps = (state) => ({
  city: findCityObject(state.currentCity, state.cities),
  cities: state.cities,
});

export default withLeafletMap;

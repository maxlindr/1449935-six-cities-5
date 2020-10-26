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

const checkOffersListsEquals = (offers1, offers2) => {
  if (offers1.length !== offers2.length) {
    return false;
  }

  return offers1.every((offer) => offers2.includes(offer));
};

const findCityObject = (cityName, collection) => collection.find((item) => item.name === cityName);

const withLeafletMap = (Component) => {
  class WithLeafletMap extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        prevCity: null,
        reset: true
      };

      this.map = null;
      this.mapRef = React.createRef();
      this.pinsGroup = null;
      this.pins = new Map();
    }

    static getDerivedStateFromProps(props, state) {
      if (props.city !== state.prevCity) {
        return {
          prevCity: props.city,
          reset: true,
        };
      }

      return {
        reset: false,
      };
    }

    componentWillUnmount() {
      this.pins.clear();
    }

    componentDidUpdate() {
      const {offers, city, activeOffer} = this.props;
      const map = this.map;

      if (map) {
        if (this.state.reset) {
          map.setView(city.coordinates, DEFAULT_ZOOM_LEVEL);
          this.clear();
        }

        offers.forEach((offer) => {
          const {id, location} = offer;

          const pinActualData = {
            id,
            coordinates: location.coordinates,
            isActive: activeOffer ? (id === activeOffer.id) : false
          };

          const placedMapPin = this.pins.get(pinActualData.id);

          if (placedMapPin) {
            if (placedMapPin.isActive !== pinActualData.isActive) {
              this.updatePin(pinActualData);
            }
          } else {
            this.addPin(pinActualData);
          }
        });
      }
    }

    shouldComponentUpdate(nextProps) {
      const {offers, city, activeOffer} = this.props;

      return nextProps.city !== city
        || nextProps.activeOffer !== activeOffer
        || !checkOffersListsEquals(nextProps.offers, offers);
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
      const {coordinates, isActive, id} = pin;

      const marker = leaflet.marker(coordinates, {icon: isActive ? PIN_ACTIVE : PIN});
      this.pinsGroup.addLayer(marker);
      this.pins.set(id, {pin, marker});
    }

    clear() {
      this.pins.clear();
      this.pinsGroup.clearLayers();
    }

    updatePin(pin) {
      const oldPin = this.pins.get(pin.id);
      const icon = pin.isActive ? PIN_ACTIVE : PIN;
      oldPin.marker.setIcon(icon);
    }

    render() {
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

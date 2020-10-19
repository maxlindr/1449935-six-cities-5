import React from 'react';
import PropTypes from 'prop-types';
import {cityPropTypes, offerPropTypes} from '../../prop-types';
import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';

export const CityMapType = {
  MAIN: `cities`,
  OFFER: `property`
};

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

class CityMap extends React.PureComponent {
  constructor(props) {
    super(props);

    this.map = null;
    this.mapRef = React.createRef();
    this.pinsGroup = null;

    this.state = {
      activeOffer: null,
    };
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
    const {type, offers, city} = this.props;
    const map = this.map;

    if (map) {
      map.setView(city.coordinates, DEFAULT_ZOOM_LEVEL);
      this.clear();

      offers.forEach((offer) => {
        const isActive = this.state.activeOffer ? offer.id === this.state.activeOffer.id : false;

        this.addPin({
          coordinates: offer.location.coordinates,
          isActive
        });
      });
    }

    return <section ref={this.mapRef} className={`${type}__map map`} />;
  }
}

CityMap.propTypes = {
  type: PropTypes.oneOf([
    CityMapType.MAIN,
    CityMapType.OFFER
  ]).isRequired,
  city: cityPropTypes,
  offers: PropTypes.arrayOf(offerPropTypes).isRequired
};

export default CityMap;

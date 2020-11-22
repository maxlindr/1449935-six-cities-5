import React, {useCallback, useEffect, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import {cityPropTypes, offerPropTypes} from '../../prop-types';
import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {connect} from 'react-redux';
import {getCurrentCity} from '../../store/selectors';

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

const usePrevious = (value) => {
  const ref = useRef();

  useEffect(() => {
    ref.current = value;
  });

  return ref.current;
};

const withLeafletMap = (Component) => {
  const WithLeafletMap = (props) => {
    const {offers, city, activeOffer, maxOffers} = props;

    const mapRef = useRef(null);
    const [map, setMap] = useState(null);
    const [pinsGroup, setPinsGroup] = useState(null);
    const [mapPins] = useState(new Map());
    const [pinsData, setPinsData] = useState(new Map());
    const prevOffers = usePrevious(offers);
    const prevActiveOffer = usePrevious(activeOffer);

    useEffect(() => {
      return () => {
        mapPins.clear();
      };
    }, []);

    // reset map if city changed
    useEffect(() => {
      if (map) {
        map.setView(city.coordinates, DEFAULT_ZOOM_LEVEL);
        clear();
      }

    }, [city]);

    // update pins data
    useEffect(() => {
      if (
        activeOffer === prevActiveOffer &&
        checkOffersListsEquals(offers, prevOffers)
      ) {
        return;
      }

      const offersToShow = maxOffers
        ? offers.slice(0, maxOffers)
        : offers.slice();

      const newPinsData = new Map(
          offersToShow.map((offer) => {
            const {id, location} = offer;

            const data = {
              id,
              coordinates: location.coordinates,
              isActive: activeOffer ? (id === activeOffer.id) : false
            };

            return [id, data];
          })
      );

      setPinsData(newPinsData);
    }, [offers, activeOffer]);

    // draw pins
    useEffect(() => {
      if (!map) {
        return;
      }

      pinsData.forEach((pinData) => {
        const placedMapPin = mapPins.get(pinData.id);

        if (placedMapPin) {
          if (placedMapPin.isActive !== pinData.isActive) {
            updatePin(pinData);
          }
        } else {
          addPin(pinData);
        }
      });
    }, [map, pinsData]);

    // creating map
    useEffect(() => {
      const leafletMap = leaflet.map(mapRef.current, {
        center: city.coordinates,
        zoom: DEFAULT_ZOOM_LEVEL,
        zoomControl: false,
        marker: true
      });

      leaflet
        .tileLayer(`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`, {
          attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`
        })
        .addTo(leafletMap);

      const leafletPinsGroup = leaflet.layerGroup();
      leafletPinsGroup.addTo(leafletMap);
      setPinsGroup(leafletPinsGroup);

      setMap(leafletMap);
    }, []);

    const addPin = useCallback(
        (pin) => {
          const {coordinates, isActive, id} = pin;

          const marker = leaflet.marker(coordinates, {
            icon: isActive ? PIN_ACTIVE : PIN
          });

          pinsGroup.addLayer(marker);

          mapPins.set(id, {
            pin,
            marker
          });
        },
        [pinsGroup, mapPins]
    );

    const clear = useCallback(
        () => {
          mapPins.clear();
          pinsData.clear();
          pinsGroup.clearLayers();
        },
        [mapPins, pinsData, pinsGroup]
    );

    const updatePin = useCallback(
        (pin) => {
          const oldPin = mapPins.get(pin.id);
          const icon = pin.isActive ? PIN_ACTIVE : PIN;
          oldPin.marker.setIcon(icon);
        },
        [mapPins]
    );

    return <Component reference={mapRef}/>;
  };

  WithLeafletMap.propTypes = {
    city: cityPropTypes.isRequired,
    offers: PropTypes.arrayOf(offerPropTypes).isRequired,
    activeOffer: offerPropTypes,
    maxOffers: PropTypes.number
  };

  return WithLeafletMap;
};

const mapStateToProps = (state) => ({
  city: getCurrentCity(state),
});

export {withLeafletMap};

export default (WrappedComponent) => connect(mapStateToProps)(
    withLeafletMap(WrappedComponent)
);

import React from 'react';
import PropTypes from 'prop-types';
import {offerPropTypes} from '../../../prop-types';
import OffersList from '../../offers-list/offers-list';
import withLeafletMap from '../../../hocs/with-leaflet-map/with-leaflet-map';
import cityMapFactory, {CityMapType} from '../../city-map-factory/city-map-factory';
import withActiveOffer from '../../../hocs/with-active-offer/with-active-offer';
import {connect} from 'react-redux';
import {getCurrentCity} from '../../../store/selectors';

const CityMap = withLeafletMap(cityMapFactory(CityMapType.MAIN));

const Cities = (props) => {
  const {currentCity, offers, children, onActivate, onDeactivate, activeOffer} = props;

  return (
    <div className="cities__places-container container">
      <section className="cities__places places">
        <h2 className="visually-hidden">Places</h2>
        <b className="places__found">
          {offers.length} places to stay in {currentCity}
        </b>

        {/* sort dropdown list */}
        {children}

        <OffersList
          offers={offers}
          onActivate={onActivate}
          onDeactivate={onDeactivate}
        />
      </section>

      <div className="cities__right-section">
        <CityMap activeOffer={activeOffer} offers={offers}/>
      </div>
    </div>
  );
};

Cities.propTypes = {
  offers: PropTypes.arrayOf(offerPropTypes),
  currentCity: PropTypes.string.isRequired,
  activeOffer: offerPropTypes,
  children: PropTypes.element,
  onActivate: PropTypes.func.isRequired,
  onDeactivate: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  currentCity: getCurrentCity(state).name
});

export {Cities};
export default connect(mapStateToProps)(withActiveOffer(Cities));

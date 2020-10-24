import React from 'react';
import PropTypes from 'prop-types';
import {offerPropTypes} from '../../../prop-types';
import OffersList from '../../offers-list/offers-list';
import withActiveOffer from '../../../hocs/with-active-offer/with-active-offer';
import withLeafletMap from '../../../hocs/with-leaflet-map/with-leaflet-map';
import cityMapFactory, {CityMapType} from '../../city-map-factory/city-map-factory';
import {connect} from 'react-redux';

const OffersListWithActiveCard = withActiveOffer(OffersList);
const CityMap = withLeafletMap(cityMapFactory(CityMapType.MAIN));

const onCardMouseOver = () => {};
const onCardMouseLeave = () => {};

const Cities = (props) => {
  const {currentCity, offers, children} = props;

  return (
    <div className="cities__places-container container">
      <section className="cities__places places">
        <h2 className="visually-hidden">Places</h2>
        <b className="places__found">
          {offers.length} places to stay in {currentCity}
        </b>

        {/* sort dropdown list */}
        {children}

        <OffersListWithActiveCard
          offers={offers}
          onActivate={onCardMouseOver}
          onDeactivate={onCardMouseLeave}
        />
      </section>

      <div className="cities__right-section">
        <CityMap offers={offers}/>
      </div>
    </div>
  );
};

Cities.propTypes = {
  offers: PropTypes.arrayOf(offerPropTypes),
  currentCity: PropTypes.string.isRequired,
  children: PropTypes.element
};

const mapStateToProps = (state) => ({
  currentCity: state.currentCity
});

export {Cities};
export default connect(mapStateToProps)(Cities);

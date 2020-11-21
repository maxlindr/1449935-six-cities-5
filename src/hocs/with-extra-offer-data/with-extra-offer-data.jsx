import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {StateNameSpace} from '../../store/reducers/root-reducer';
import {fetchReviewsList, fetchNearbyPlaces, fetchOffer} from '../../store/actions/api-actions';
import {ActionCreator} from '../../store/actions/action';
import {offerPropTypes, reviewPropTypes} from '../../prop-types';
import {getNearbyOffers} from '../../store/selectors';

const withExtraOfferData = (WrappedComponent) => {
  class WithExtraOfferData extends React.PureComponent {
    constructor(props) {
      super(props);

      const {offerId, getOffer} = props;

      getOffer(offerId);
    }

    componentDidUpdate(prevProps) {
      const {offer: prevOffer, offerId: prevOfferId} = prevProps;
      const {offer, offerId, getOffer, getReviews, getNearbyPlaces, changeCity, reset} = this.props;

      if (prevOfferId !== offerId) {
        reset();
        getOffer(offerId);
      }

      if (!prevOffer && offer) {
        changeCity(offer.location.city.name);
        getReviews(offerId);
        getNearbyPlaces(offerId);
      }
    }

    componentWillUnmount() {
      this.props.reset();
    }

    render() {
      const {offer, updateOffer} = this.props;

      return offer ? (
        <WrappedComponent
          {...this.props}
          offer={offer}
          offers={this.props.offers || []}
          onUpdate={updateOffer}
        />
      ) : null;
    }
  }

  WithExtraOfferData.propTypes = {
    offer: offerPropTypes,
    offerId: PropTypes.string.isRequired,
    reviews: PropTypes.arrayOf(reviewPropTypes),
    offers: PropTypes.arrayOf(offerPropTypes),
    getReviews: PropTypes.func.isRequired,
    getNearbyPlaces: PropTypes.func.isRequired,
    reset: PropTypes.func.isRequired,
    getOffer: PropTypes.func.isRequired,
    changeCity: PropTypes.func.isRequired,
    updateOffer: PropTypes.func.isRequired,
  };

  return WithExtraOfferData;
};

const mapStateToProps = (state) => ({
  offer: state[StateNameSpace.OFFER_PAGE].offer,
  reviews: state[StateNameSpace.OFFER_PAGE].reviews,
  offers: getNearbyOffers(state)
});

const mapDispatchToProps = (dispatch) => ({
  getOffer(offerId) {
    dispatch(fetchOffer(offerId));
  },
  getReviews(offerId) {
    dispatch(fetchReviewsList(offerId));
  },
  getNearbyPlaces(offerId) {
    dispatch(fetchNearbyPlaces(offerId));
  },
  changeCity(city) {
    dispatch(ActionCreator.changeCity(city));
  },
  updateOffer(offer) {
    dispatch(ActionCreator.setFetchedOffer(offer));
  },
  reset() {
    dispatch(ActionCreator.resetOfferPageStore());
  }
});

export {withExtraOfferData};

export default (WrapperComponent) => connect(mapStateToProps, mapDispatchToProps)(
    withExtraOfferData(WrapperComponent)
);

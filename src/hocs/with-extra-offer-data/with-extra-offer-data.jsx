import React, {useEffect, useRef} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {StateNameSpace} from '../../store/reducers/root-reducer';
import {fetchReviewsList, fetchNearbyPlaces, fetchOffer} from '../../store/actions/api-actions';
import {ActionCreator} from '../../store/actions/action';
import {offerPropTypes, reviewPropTypes} from '../../prop-types';
import {getNearbyOffers} from '../../store/selectors';

const usePrevious = (value) => {
  const ref = useRef();

  // в оригинале здесь использовлся useEffect, но он заменен на setTimeout из-за проблемы тестирования,
  // поскольку в текущей версии Enzyme useEffect за пределами тестируемой функции не работает корректно
  setTimeout(() => {
    ref.current = value;
  }, 0);

  return ref.current;
};

const withExtraOfferData = (WrappedComponent) => {
  const WithExtraOfferData = (props) => {
    const {offers, offer, offerId, onFetchOffer, onFetchReviews, onFetchNearbyPlaces, onChangeCity, onReset, onUpdateOffer} = props;
    const prevOffer = usePrevious(offer);

    useEffect(() => {
      onFetchOffer(offerId);

      return () => onReset();
    }, [offerId]);

    useEffect(() => {
      if (!prevOffer && offer) {
        onChangeCity(offer.location.city.name);
        onFetchReviews(offerId);
        onFetchNearbyPlaces(offerId);
      }
    }, [offer, prevOffer]);

    return offer ? (
      <WrappedComponent
        {...props}
        offer={offer}
        offers={offers || []}
        onUpdate={onUpdateOffer}
      />
    ) : null;
  };

  WithExtraOfferData.propTypes = {
    offer: offerPropTypes,
    offerId: PropTypes.string.isRequired,
    reviews: PropTypes.arrayOf(reviewPropTypes),
    offers: PropTypes.arrayOf(offerPropTypes),
    onFetchReviews: PropTypes.func.isRequired,
    onFetchNearbyPlaces: PropTypes.func.isRequired,
    onReset: PropTypes.func.isRequired,
    onFetchOffer: PropTypes.func.isRequired,
    onChangeCity: PropTypes.func.isRequired,
    onUpdateOffer: PropTypes.func.isRequired,
  };

  return WithExtraOfferData;
};

const mapStateToProps = (state) => ({
  offer: state[StateNameSpace.OFFER_PAGE].offer,
  reviews: state[StateNameSpace.OFFER_PAGE].reviews,
  offers: getNearbyOffers(state)
});

const mapDispatchToProps = (dispatch) => ({
  onFetchOffer(offerId) {
    dispatch(fetchOffer(offerId));
  },
  onFetchReviews(offerId) {
    dispatch(fetchReviewsList(offerId));
  },
  onFetchNearbyPlaces(offerId) {
    dispatch(fetchNearbyPlaces(offerId));
  },
  onChangeCity(city) {
    dispatch(ActionCreator.changeCity(city));
  },
  onUpdateOffer(offer) {
    dispatch(ActionCreator.setFetchedOffer(offer));
  },
  onReset() {
    dispatch(ActionCreator.resetOfferPageStore());
  }
});

export {withExtraOfferData};

export default (WrapperComponent) => connect(mapStateToProps, mapDispatchToProps)(
    withExtraOfferData(WrapperComponent)
);

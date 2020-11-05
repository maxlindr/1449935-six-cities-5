import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {StateNameSpace} from '../../store/reducers/root-reducer';
import {fetchReviewsList, fetchNearbyPlaces} from '../../store/api-actions';
import {ActionCreator} from '../../store/action';
import {offerPropTypes, reviewPropTypes} from '../../prop-types';
import {getUser} from '../../store/selectors';
import ErrorPage from '../../components/error-page/error-page';
import {ErrorMessage} from '../../constants';

const withExtraOfferData = (WrappedComponent) => {
  class WithExtraOfferData extends React.PureComponent {
    constructor(props) {
      super(props);

      const {offer, getReviews, getNearbyPlaces} = props;

      if (offer) {
        const offerId = offer.id;

        getReviews(offerId);
        getNearbyPlaces(offerId);
      }
    }

    componentWillUnmount() {
      this.props.reset();
    }

    render() {
      if (this.props.offer) {
        return <WrappedComponent {...this.props} offers={this.props.offers || []} />;
      } else {
        return <ErrorPage message={ErrorMessage.NOT_FOUND}/>;
      }
    }
  }

  WithExtraOfferData.propTypes = {
    offer: offerPropTypes.isRequired,
    reviews: PropTypes.arrayOf(reviewPropTypes),
    offers: PropTypes.arrayOf(offerPropTypes),
    getReviews: PropTypes.func.isRequired,
    getNearbyPlaces: PropTypes.func.isRequired,
    reset: PropTypes.func.isRequired,
  };

  return WithExtraOfferData;
};

const mapStateToProps = (state) => ({
  user: getUser(state),
  reviews: state[StateNameSpace.OFFER_PAGE].reviews,
  offers: state[StateNameSpace.OFFER_PAGE].nearbyPlaces,
});

const mapDispatchToProps = (dispatch) => ({
  getReviews(offerId) {
    dispatch(fetchReviewsList(offerId));
  },
  getNearbyPlaces(offerId) {
    dispatch(fetchNearbyPlaces(offerId));
  },
  reset() {
    dispatch(ActionCreator.setFetchedReviews(null));
    dispatch(ActionCreator.setFetchedNearbyPlaces(null));
  }
});

export default (WrapperComponent) => connect(mapStateToProps, mapDispatchToProps)(withExtraOfferData(WrapperComponent));

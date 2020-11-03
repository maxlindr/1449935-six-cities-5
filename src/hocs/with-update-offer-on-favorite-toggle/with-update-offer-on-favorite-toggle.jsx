import React from 'react';
import PropTypes from 'prop-types';
import {offerPropTypes} from '../../prop-types';
import {ActionCreator} from "../../store/action";
import {connect} from 'react-redux';
import {updateFavoriteStatus} from '../../store/api-actions';

const excludeProperty = (from, name) => {
  const entries = Object.entries(from).filter(([key]) => key !== name);

  return Object.fromEntries(entries);
};

const withUpdateOfferOnFavoriteToggle = (Component) => {
  class WithUpdateOfferOnFavoriteToggle extends React.PureComponent {
    constructor(props) {
      super(props);

      this.handleToggle = this.handleToggle.bind(this);
    }

    handleToggle() {
      const {updateOffer, offer} = this.props;
      const newOffer = Object.assign({}, offer, {favorite: !offer.favorite});
      updateOffer(newOffer);
    }

    render() {
      const componentProps = excludeProperty(this.props, `offer`);

      return (
        <Component {...componentProps} onToggle={this.handleToggle}/>
      );
    }
  }

  WithUpdateOfferOnFavoriteToggle.propTypes = {
    offer: offerPropTypes.isRequired,
    updateOffer: PropTypes.func.isRequired
  };

  const mapDispatchToProps = (dispatch) => ({
    updateOffer(offer) {
      dispatch(updateFavoriteStatus(offer.id, offer.favorite))
        .then(() => dispatch(ActionCreator.updateOffer(offer)));
    },
  });

  return connect(null, mapDispatchToProps)(WithUpdateOfferOnFavoriteToggle);
};

export default withUpdateOfferOnFavoriteToggle;

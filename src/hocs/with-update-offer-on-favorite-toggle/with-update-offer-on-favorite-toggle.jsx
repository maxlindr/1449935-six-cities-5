import React from 'react';
import PropTypes from 'prop-types';
import {offerPropTypes} from '../../prop-types';
import {connect} from 'react-redux';
import {updateFavoriteStatus} from '../../store/actions/api-actions';

const excludeProperty = (from, name) => {
  const cloned = Object.assign({}, from);
  delete cloned[name];

  return cloned;
};

const doNothing = () => {};

const withUpdateOfferOnFavoriteToggle = (Component) => {
  class WithUpdateOfferOnFavoriteToggle extends React.PureComponent {
    constructor(props) {
      super(props);

      this.handleToggle = this.handleToggle.bind(this);
    }

    handleToggle() {
      const {updateOffer, offer, onUpdate = doNothing} = this.props;

      const newOffer = Object.assign({}, offer, {
        favorite: !offer.favorite
      });

      updateOffer(newOffer)
        .then(() => onUpdate(newOffer))
        .catch(doNothing);
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
    updateOffer: PropTypes.func.isRequired,
    onUpdate: PropTypes.func,
  };

  const mapDispatchToProps = (dispatch) => ({
    updateOffer(offer) {
      return dispatch(updateFavoriteStatus(offer.id, offer.favorite));
    },
  });

  return connect(null, mapDispatchToProps)(WithUpdateOfferOnFavoriteToggle);
};

export default withUpdateOfferOnFavoriteToggle;

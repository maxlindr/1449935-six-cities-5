import React from 'react';
import PropTypes from 'prop-types';
import {offerPropTypes} from '../../prop-types';
import {connect} from 'react-redux';
import {updateFavoriteStatus} from '../../store/actions/api-actions';
import {omitProperties} from '../../utils';

const withUpdateOfferOnFavoriteToggle = (Component) => {
  class WithUpdateOfferOnFavoriteToggle extends React.PureComponent {
    constructor(props) {
      super(props);

      this.handleToggle = this.handleToggle.bind(this);
    }

    handleToggle() {
      const {updateOffer, offer} = this.props;

      updateOffer(
          Object.assign({}, offer, {
            favorite: !offer.favorite
          })
      );
    }

    render() {
      const componentProps = omitProperties(this.props, [`offer`, `updateOffer`, `onUpdate`]);

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

  return WithUpdateOfferOnFavoriteToggle;
};

const mapDispatchToProps = (dispatch) => ({
  updateOffer(offer) {
    dispatch(updateFavoriteStatus(offer.id, offer.favorite));
  },
});

export {withUpdateOfferOnFavoriteToggle};

export default (WrappedComponent) => connect(null, mapDispatchToProps)(
    withUpdateOfferOnFavoriteToggle(WrappedComponent)
);

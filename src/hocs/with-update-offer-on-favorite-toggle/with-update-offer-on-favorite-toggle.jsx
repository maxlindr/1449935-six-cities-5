import React, {useCallback} from 'react';
import PropTypes from 'prop-types';
import {offerPropTypes} from '../../prop-types';
import {connect} from 'react-redux';
import {updateFavoriteStatus} from '../../store/actions/api-actions';
import {omitProperties} from '../../utils';

const withUpdateOfferOnFavoriteToggle = (Component) => {
  const WithUpdateOfferOnFavoriteToggle = (props) => {
    const {updateOffer, offer} = props;

    const handleToggle = useCallback(() => {
      updateOffer(
          Object.assign({}, offer, {
            favorite: !offer.favorite
          })
      );
    }, [offer]);

    const componentProps = omitProperties(props, [`offer`, `updateOffer`, `onUpdate`]);

    return (
      <Component {...componentProps} onToggle={handleToggle}/>
    );
  };

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

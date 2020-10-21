import React from 'react';
import PropTypes from 'prop-types';
import {userPropTypes, offerPropTypes} from '../../prop-types';
import Favorites from '../favorites/favorites';
import FavoritesEmpty from '../favorites-empty/favorites-empty';
import {connect} from 'react-redux';

const FavoritesRouter = (props) => props.offers.length > 0
  ? <Favorites {...props} />
  : <FavoritesEmpty {...props} />;

FavoritesRouter.propTypes = {
  offers: PropTypes.arrayOf(offerPropTypes).isRequired,
  user: userPropTypes
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export {FavoritesRouter};
export default connect(mapStateToProps)(FavoritesRouter);
